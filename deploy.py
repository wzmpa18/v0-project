import paramiko
import os
import stat

# 服务器配置
host = '82.156.228.87'
port = 22
username = 'root'
password = 'WUzhimin123'

# 本地文件路径
local_dir = '/workspace/out/'
remote_dir = '/var/www/guoxue-web/'

def create_remote_dir(sftp, remote_path):
    """递归创建远程目录"""
    dirs = remote_path.strip('/').split('/')
    current = ''
    for dir in dirs:
        current += '/' + dir
        try:
            sftp.stat(current)
        except FileNotFoundError:
            sftp.mkdir(current)
            print(f"Created directory: {current}")

def upload_files(sftp, local_path, remote_path):
    """递归上传目录"""
    for item in os.listdir(local_path):
        local_item = os.path.join(local_path, item)
        remote_item = os.path.join(remote_path, item).replace('\\', '/')
        
        if os.path.isdir(local_item):
            # 创建远程目录
            try:
                sftp.stat(remote_item)
            except FileNotFoundError:
                sftp.mkdir(remote_item)
                print(f"Created directory: {remote_item}")
            # 递归上传子目录
            upload_files(sftp, local_item, remote_item)
        else:
            # 上传文件
            print(f"Uploading: {local_item} -> {remote_item}")
            sftp.put(local_item, remote_item)

def main():
    try:
        # 建立SSH连接
        transport = paramiko.Transport((host, port))
        transport.connect(username=username, password=password)
        print(f"Connected to {host}:{port}")
        
        # 创建SFTP客户端
        sftp = paramiko.SFTPClient.from_transport(transport)
        
        # 确保远程目录存在
        create_remote_dir(sftp, remote_dir)
        
        # 上传文件
        print(f"\n=== Uploading files from {local_dir} to {remote_dir} ===")
        upload_files(sftp, local_dir, remote_dir)
        
        # 关闭连接
        sftp.close()
        transport.close()
        
        print("\n=== Upload completed successfully! ===")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
