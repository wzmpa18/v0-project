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

// 用户注册 API
app.post('/api/register', (req, res) => {
  const { email, password, code, referrer } = req.body;
  
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
  users[email] = {
    id: userId,
    email,
    password: crypto.createHash('md5').update(password).digest('hex'),
    createdAt: Date.now(),
    referrer: referrer || null
  };

  // 建立上下级关系
  if (referrer && users[referrer]) {
    userRelations[userId] = {
      parent: users[referrer].id,
      level: 1
    };
  }

  // 清除验证码
  delete verificationCodes[email];

  res.json({ 
    success: true, 
    message: '注册成功',
    data: { userId, email }
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
      referrer: user.referrer
    }
  });
});

// 获取下级列表 API
app.post('/api/get-downline', (req, res) => {
  const { userId } = req.body;
  
  const downline = Object.entries(userRelations)
    .filter(([, relation]) => relation.parent === userId)
    .map(([id]) => users[id] ? users[id].email : null)
    .filter(Boolean);

  res.json({ success: true, data: downline });
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
