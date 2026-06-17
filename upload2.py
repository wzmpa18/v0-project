import requests
import os

# 服务器地址
base_url = 'http://82.156.228.87'

# 本地文件路径
apk_path = '/workspace/android/app/build/outputs/apk/release/app-release.apk'
web_dir = '/workspace/out/'

def upload_apk():
    url = f"{base_url}/upload.php"
    try:
        with open(apk_path, 'rb') as f:
            files = {'file': ('guoxue-release.apk', f, 'application/vnd.android.package-archive')}
            response = requests.post(url, files=files)
            print(f"APK Upload Response: {response.status_code}")
            print(response.text)
            return True
    except Exception as e:
        print(f"APK Upload failed: {e}")
        return False

def upload_web_files():
    success_count = 0
    fail_count = 0
    
    for root, dirs, files in os.walk(web_dir):
        for file in files:
            local_path = os.path.join(root, file)
            relative_path = os.path.relpath(local_path, web_dir)
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
    
    print(f"\nWeb files uploaded: {success_count} success, {fail_count} failed")
    return fail_count == 0

if __name__ == '__main__':
    print("=== Uploading APK ===")
    upload_apk()
    
    print("\n=== Uploading Web Files ===")
    upload_web_files()
    
    print("\n=== Done ===")
