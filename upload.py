import paramiko
import os

# 服务器配置
host = '82.156.228.87'
port = 22
username = 'root'
password = 'WUzhimin123'

# 本地文件路径
apk_path = '/workspace/android/app/build/outputs/apk/release/app-release.apk'
web_dir = '/workspace/out/'

# 远程路径
remote_apk_path = '/var/www/html/app-download/guoxue-release.apk'
remote_web_path = '/var/www/html/app/'

def upload_file(local_path, remote_path):
    try:
        transport = paramiko.Transport((host, port))
        transport.connect(username=username, password=password)
        
        sftp = paramiko.SFTPClient.from_transport(transport)
        
        print(f"Uploading {local_path} to {remote_path}...")
        sftp.put(local_path, remote_path)
        print(f"Uploaded successfully!")
        
        sftp.close()
        transport.close()
        return True
    except Exception as e:
        print(f"Upload failed: {e}")
        return False

def upload_directory(local_dir, remote_dir):
    try:
        transport = paramiko.Transport((host, port))
        transport.connect(username=username, password=password)
        
        sftp = paramiko.SFTPClient.from_transport(transport)
        
        # 确保远程目录存在
        try:
            sftp.stat(remote_dir)
        except:
            sftp.mkdir(remote_dir)
        
        for root, dirs, files in os.walk(local_dir):
            for file in files:
                local_path = os.path.join(root, file)
                relative_path = os.path.relpath(local_path, local_dir)
                remote_path = os.path.join(remote_dir, relative_path)
                
                # 确保远程子目录存在
                remote_dir_path = os.path.dirname(remote_path)
                try:
                    sftp.stat(remote_dir_path)
                except:
                    # 递归创建目录
                    parts = remote_dir_path.split('/')
                    current = ''
                    for part in parts:
                        if part:
                            current += '/' + part
                            try:
                                sftp.stat(current)
                            except:
                                sftp.mkdir(current)
                
                print(f"Uploading {local_path} to {remote_path}")
                sftp.put(local_path, remote_path)
        
        print(f"Directory uploaded successfully!")
        
        sftp.close()
        transport.close()
        return True
    except Exception as e:
        print(f"Directory upload failed: {e}")
        return False

if __name__ == '__main__':
    # 上传 APK
    print("=== Uploading APK ===")
    upload_file(apk_path, remote_apk_path)
    
    # 上传前端文件
    print("\n=== Uploading Web Files ===")
    upload_directory(web_dir, remote_web_path)
    
    print("\n=== All uploads completed ===")
