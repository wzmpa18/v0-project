import ftplib
import os

# 服务器配置
host = '82.156.228.87'
port = 21
username = 'root'
password = 'WUzhimin123'

# 本地文件路径
apk_path = '/workspace/android/app/build/outputs/apk/release/app-release.apk'
web_dir = '/workspace/out/'

def upload_file(ftp, local_path, remote_path):
    try:
        print(f"Uploading {local_path} to {remote_path}")
        with open(local_path, 'rb') as f:
            ftp.storbinary(f'STOR {remote_path}', f)
        print(f"Uploaded successfully!")
        return True
    except Exception as e:
        print(f"Upload failed: {e}")
        return False

def upload_directory(ftp, local_dir, remote_dir):
    try:
        # 尝试切换到远程目录
        try:
            ftp.cwd(remote_dir)
        except:
            ftp.mkd(remote_dir)
            ftp.cwd(remote_dir)
        
        for root, dirs, files in os.walk(local_dir):
            for file in files:
                local_path = os.path.join(root, file)
                relative_path = os.path.relpath(local_path, local_dir)
                remote_path = relative_path
                
                # 创建子目录
                dir_name = os.path.dirname(relative_path)
                if dir_name:
                    try:
                        ftp.cwd(dir_name)
                    except:
                        # 递归创建目录
                        parts = dir_name.split('/')
                        current = ''
                        for part in parts:
                            if part:
                                current += '/' + part
                                try:
                                    ftp.cwd(current)
                                except:
                                    ftp.mkd(current)
                                    ftp.cwd(current)
                    # 返回根目录
                    ftp.cwd(remote_dir)
                
                print(f"Uploading {local_path} to {remote_path}")
                with open(local_path, 'rb') as f:
                    ftp.storbinary(f'STOR {remote_path}', f)
        
        print("Directory uploaded successfully!")
        return True
    except Exception as e:
        print(f"Directory upload failed: {e}")
        return False

if __name__ == '__main__':
    try:
        ftp = ftplib.FTP()
        print(f"Connecting to {host}:{port}...")
        ftp.connect(host, port)
        print(f"Logging in...")
        ftp.login(username, password)
        print("Connected successfully!")
        
        # 上传 APK
        print("\n=== Uploading APK ===")
        ftp.cwd('/var/www/html/app-download')
        upload_file(ftp, apk_path, 'guoxue-release.apk')
        
        # 上传前端文件
        print("\n=== Uploading Web Files ===")
        upload_directory(ftp, web_dir, '/var/www/html/app')
        
        ftp.quit()
        print("\n=== All uploads completed ===")
        
    except Exception as e:
        print(f"FTP Error: {e}")
