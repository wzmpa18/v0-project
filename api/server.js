const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// 配置
const SMTP_CONFIG = {
  host: 'smtp.qcloudmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'noreply@yandao.vip',
    pass: 'Yandao2026Vip'
  }
};

// 内存存储（生产环境应使用数据库）
const users = {};
const verificationCodes = {};
const userRelations = {};
const inviteCodes = {}; // 邀请码 -> 用户ID映射

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../out')));

// 创建邮件发送器
const transporter = nodemailer.createTransport(SMTP_CONFIG);

// 生成验证码
function generateCode() {
  return crypto.randomInt(100000, 999999).toString();
}

// 生成邀请码（6位字母数字）
function generateInviteCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// 发送验证邮件
async function sendVerificationEmail(email, code) {
  const mailOptions = {
    from: '"言道科技" <noreply@yandao.vip>',
    to: email,
    subject: '【言道科技】验证码',
    html: `
      <div style="max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">验证码</h2>
        <p style="color: #666; text-align: center;">您的验证码是：</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 36px; font-weight: bold; color: #f59e0b;">${code}</span>
        </div>
        <p style="color: #999; text-align: center; font-size: 12px;">验证码有效期5分钟</p>
        <p style="color: #999; text-align: center; font-size: 12px;">如非本人操作，请忽略此邮件</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('邮件发送失败:', error);
    return false;
  }
}

// 发送验证码 API
app.post('/api/send-code', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, message: '请输入邮箱' });
  }

  const code = generateCode();
  verificationCodes[email] = {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000 // 5分钟后过期
  };

  const result = await sendVerificationEmail(email, code);
  
  if (result) {
    res.json({ success: true, message: '验证码已发送' });
  } else {
    res.status(500).json({ success: false, message: '邮件发送失败，请稍后重试' });
  }
});

// 用户注册 API（支持邀请码）
app.post('/api/register', (req, res) => {
  const { email, password, code, inviteCode } = req.body;
  
  if (!email || !password || !code) {
    return res.status(400).json({ success: false, message: '请填写完整信息' });
  }

  // 验证验证码
  const storedCode = verificationCodes[email];
  if (!storedCode || storedCode.expiresAt < Date.now()) {
    return res.status(400).json({ success: false, message: '验证码已过期，请重新获取' });
  }

  if (storedCode.code !== code) {
    return res.status(400).json({ success: false, message: '验证码错误' });
  }

  // 检查用户是否已存在
  if (users[email]) {
    return res.status(400).json({ success: false, message: '该邮箱已注册' });
  }

  // 创建用户
  const userId = crypto.randomUUID();
  const inviteCodeValue = generateInviteCode();
  
  // 检查邀请码是否有效
  let referrerId = null;
  if (inviteCode) {
    const referrerUserId = inviteCodes[inviteCode];
    if (referrerUserId) {
      referrerId = referrerUserId;
    }
  }

  users[email] = {
    id: userId,
    email,
    password: crypto.createHash('md5').update(password).digest('hex'),
    createdAt: Date.now(),
    inviteCode: inviteCodeValue,
    referrerId: referrerId
  };

  // 保存邀请码映射
  inviteCodes[inviteCodeValue] = userId;

  // 建立上下级关系（支持多级）
  if (referrerId) {
    userRelations[userId] = {
      parent: referrerId,
      level: 1
    };

    // 建立二级关系
    const parentRelation = userRelations[referrerId];
    if (parentRelation) {
      userRelations[userId].level = parentRelation.level + 1;
    }
  }

  // 清除验证码
  delete verificationCodes[email];

  res.json({ 
    success: true, 
    message: '注册成功',
    data: { userId, email, inviteCode: inviteCodeValue }
  });
});

// 用户登录 API
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: '请填写完整信息' });
  }

  const user = users[email];
  if (!user) {
    return res.status(400).json({ success: false, message: '用户不存在' });
  }

  const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
  if (user.password !== hashedPassword) {
    return res.status(400).json({ success: false, message: '密码错误' });
  }

  // 生成 token
  const token = crypto.randomBytes(32).toString('hex');
  
  res.json({ 
    success: true, 
    message: '登录成功',
    data: { 
      userId: user.id, 
      email: user.email,
      inviteCode: user.inviteCode,
      token 
    }
  });
});

// 获取用户信息 API
app.post('/api/user-info', (req, res) => {
  const { email } = req.body;
  
  const user = users[email];
  if (!user) {
    return res.status(400).json({ success: false, message: '用户不存在' });
  }

  res.json({ 
    success: true, 
    data: { 
      id: user.id, 
      email: user.email,
      createdAt: user.createdAt,
      inviteCode: user.inviteCode,
      referrerId: user.referrerId
    }
  });
});

// 获取下级列表 API（支持多级）
app.post('/api/get-downline', (req, res) => {
  const { userId, level = 2 } = req.body;
  
  // 获取指定层级的下级
  const downline = Object.entries(userRelations)
    .filter(([, relation]) => {
      // 直接下级（一级）
      if (relation.parent === userId) return true;
      // 二级下级
      if (level >= 2) {
        const parentRelation = userRelations[relation.parent];
        if (parentRelation && parentRelation.parent === userId) return true;
      }
      return false;
    })
    .map(([id]) => users[id] ? { id, email: users[id].email, level: userRelations[id].level } : null)
    .filter(Boolean);

  res.json({ success: true, data: downline });
});

// 获取下级统计 API
app.post('/api/get-downline-stats', (req, res) => {
  const { userId } = req.body;
  
  const stats = {
    level1: 0,  // 直接下级
    level2: 0,  // 二级下级
    total: 0
  };

  Object.values(userRelations).forEach(relation => {
    if (relation.parent === userId) {
      stats.level1++;
      stats.total++;
    } else {
      const parentRelation = userRelations[relation.parent];
      if (parentRelation && parentRelation.parent === userId) {
        stats.level2++;
        stats.total++;
      }
    }
  });

  res.json({ success: true, data: stats });
});

// 获取邀请二维码链接
app.post('/api/get-invite-url', (req, res) => {
  const { userId } = req.body;
  
  const user = Object.values(users).find(u => u.id === userId);
  if (!user) {
    return res.status(400).json({ success: false, message: '用户不存在' });
  }

  const inviteUrl = `https://www.yandao.vip/app/#register?invite=${user.inviteCode}`;
  
  res.json({ 
    success: true, 
    data: { 
      inviteCode: user.inviteCode,
      inviteUrl,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(inviteUrl)}`
    }
  });
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: '服务正常运行' });
});

// 首页
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../out/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
