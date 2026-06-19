import requests
import os
import tarfile
import io

# 服务器配置
base_url = 'http://82.156.228.87'
upload_url = f"{base_url}/upload.php"

# 本地文件路径
local_dir = '/workspace/out/'

def create_tarball():
    """创建tar.gz压缩包"""
    tar_buffer = io.BytesIO()
    with tarfile.open(fileobj=tar_buffer, mode='w:gz') as tar:
        tar.add(local_dir, arcname='.', recursive=True)
    tar_buffer.seek(0)
    return tar_buffer

def upload_tarball():
    """上传tar.gz压缩包"""
    tar_buffer = create_tarball()
    files = {'file': ('guoxue-web.tar.gz', tar_buffer, 'application/gzip')}
    
    try:
        print(f"Uploading tarball to {upload_url}")
        response = requests.post(upload_url, files=files)
        print(f"Response: {response.status_code}")
        print(f"Response body: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Upload failed: {e}")
        return False

def upload_files_directly():
    """直接上传文件"""
    success_count = 0
    fail_count = 0
    
    for root, dirs, files in os.walk(local_dir):
        for file in files:
            local_path = os.path.join(root, file)
            relative_path = os.path.relpath(local_path, local_dir)
            url = f"{base_url}/upload_file.php?path={relative_path}"
            
            try:
                with open(local_path, 'rb') as f:
                    files = {'file': (file, f)}
                    response = requests.post(url, files=files)
                    if response.status_code == 200:
                        success_count += 1
                        print(f"Uploaded: {relative_path}")
                    else:
                        fail_count += 1
                        print(f"Failed: {relative_path} - {response.status_code}")
            except Exception as e:
                fail_count += 1
                print(f"Failed: {relative_path} - {e}")
    
    print(f"\nUpload completed: {success_count} success, {fail_count} failed")
    return fail_count == 0

def main():
    print("=== HTTP Deployment ===")
    
    # 先尝试上传PHP脚本到服务器
    print("\n1. Uploading upload script...")
    upload_script = """
<?php
$target_dir = '/var/www/guoxue-web/';
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0755, true);
}

if (isset($_FILES['file'])) {
    $filename = $_FILES['file']['name'];
    $target_file = $target_dir . basename($filename);
    
    if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
        echo "File uploaded: " . $target_file;
    } else {
        echo "Upload failed";
    }
} else {
    echo "No file received";
}
?>
"""
    script_files = {'file': ('upload_file.php', upload_script, 'text/php')}
    try:
        response = requests.post(f"{base_url}/upload.php", files=script_files)
        print(f"Upload script response: {response.status_code}")
    except Exception as e:
        print(f"Could not upload script: {e}")
    
    # 上传文件
    print("\n2. Uploading web files...")
    upload_files_directly()
    
    print("\n=== Deployment completed ===")

if __name__ == '__main__':
    main()
