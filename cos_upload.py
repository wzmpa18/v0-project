import boto3
import os
from botocore.config import Config

# 从环境变量读取配置，避免密钥泄露
secret_id = os.environ.get('COS_SECRET_ID', '')
secret_key = os.environ.get('COS_SECRET_KEY', '')
bucket_name = os.environ.get('COS_BUCKET', 'yandao-1300262413')
region = os.environ.get('COS_REGION', 'ap-guangzhou')

local_dir = '/workspace/out/'
remote_prefix = ''

def upload_to_cos():
    if not secret_id or not secret_key:
        print("错误: 请设置环境变量 COS_SECRET_ID 和 COS_SECRET_KEY")
        return False
        
    session = boto3.session.Session()
    client = session.client(
        's3',
        region_name=region,
        endpoint_url=f'https://cos.{region}.myqcloud.com',
        aws_access_key_id=secret_id,
        aws_secret_access_key=secret_key,
        config=Config(s3={'addressing_style': 'virtual'})
    )
    
    total_files = 0
    uploaded_files = 0
    
    for root, dirs, files in os.walk(local_dir):
        for file in files:
            local_path = os.path.join(root, file)
            relative_path = os.path.relpath(local_path, local_dir)
            remote_path = remote_prefix + relative_path
            
            try:
                with open(local_path, 'rb') as f:
                    content_type = 'text/html' if remote_path.endswith('.html') else \
                                   'application/javascript' if remote_path.endswith('.js') else \
                                   'text/css' if remote_path.endswith('.css') else \
                                   'image/png' if remote_path.endswith('.png') else \
                                   'application/octet-stream'
                    client.put_object(
                        Bucket=bucket_name,
                        Key=remote_path,
                        Body=f,
                        ContentType=content_type
                    )
                uploaded_files += 1
            except Exception as e:
                print(f"Failed: {relative_path} - {e}")
            
            total_files += 1
    
    print(f"=== Upload completed ===")
    print(f"Total: {total_files}, Uploaded: {uploaded_files}")
    
    return uploaded_files == total_files

if __name__ == '__main__':
    print("=== Uploading to Tencent Cloud COS ===")
    upload_to_cos()
