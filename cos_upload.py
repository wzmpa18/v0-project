#!/usr/bin/env python3
"""
腾讯云 COS 上传脚本 - 将 out/ 目录上传到 COS Bucket
用法:
  export COS_SECRET_ID="你的SecretId"
  export COS_SECRET_KEY="你的SecretKey"
  python3 cos_upload.py
"""
import os
import sys
import mimetypes
from qcloud_cos import CosConfig, CosS3Client

# ===== 配置 =====
SECRET_ID = os.environ.get('COS_SECRET_ID', '')
SECRET_KEY = os.environ.get('COS_SECRET_KEY', '')
BUCKET = 'yandao-1300262413'
REGION = 'ap-guangzhou'
LOCAL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out')

def get_content_type(filepath):
    """根据文件扩展名返回 Content-Type"""
    ext = os.path.splitext(filepath)[1].lower()
    types = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.glb': 'model/gltf-binary',
        '.txt': 'text/plain; charset=utf-8',
        '.xml': 'application/xml; charset=utf-8',
    }
    return types.get(ext, 'application/octet-stream')

def upload():
    if not SECRET_ID or not SECRET_KEY:
        print('ERROR: 请设置环境变量 COS_SECRET_ID 和 COS_SECRET_KEY')
        print('  export COS_SECRET_ID="AKIDxxxxxxxxxxxxxxx"')
        print('  export COS_SECRET_KEY="xxxxxxxxxxxxxxx"')
        sys.exit(1)

    if not os.path.isdir(LOCAL_DIR):
        print(f'ERROR: 目录不存在: {LOCAL_DIR}')
        sys.exit(1)

    config = CosConfig(
        Region=REGION,
        SecretId=SECRET_ID,
        SecretKey=SECRET_KEY,
        Scheme='https'
    )
    client = CosS3Client(config)

    total = 0
    success = 0
    failed = 0

    for root, dirs, files in os.walk(LOCAL_DIR):
        for filename in files:
            local_path = os.path.join(root, filename)
            relative_path = os.path.relpath(local_path, LOCAL_DIR)
            # COS key 使用正斜杠
            cos_key = relative_path.replace(os.sep, '/')

            total += 1
            try:
                content_type = get_content_type(local_path)
                with open(local_path, 'rb') as f:
                    client.put_object(
                        Bucket=BUCKET,
                        Body=f,
                        Key=cos_key,
                        ContentType=content_type,
                        CacheControl='no-cache, no-transform'
                    )
                success += 1
                if total % 20 == 0:
                    print(f'  已上传 {total} 个文件...')
            except Exception as e:
                failed += 1
                print(f'  FAILED: {cos_key} - {e}')

    print(f'\n=== 上传完成 ===')
    print(f'总计: {total}  成功: {success}  失败: {failed}')
    print(f'\n预览地址: https://{BUCKET}.cos.{REGION}.myqcloud.com/index.html')
    print(f'离线页面: https://{BUCKET}.cos.{REGION}.myqcloud.com/offline.html')

    return failed == 0

if __name__ == '__main__':
    print(f'=== 上传 out/ 到腾讯云 COS ===')
    print(f'Bucket: {BUCKET}')
    print(f'Region: {REGION}')
    print(f'本地目录: {LOCAL_DIR}')
    print()
    ok = upload()
    sys.exit(0 if ok else 1)
