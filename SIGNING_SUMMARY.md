# APK Signing Summary

## Keystore
- File: `android/app/guoxue-release.keystore`

## Signing Values
- `storePassword`: `guoxue888`
- `keyAlias`: `guoxuechuan`
- `keyPassword`: `guoxue888`

## Gradle wiring
- `android/app/build.gradle` now reads:
  - `MYAPP_UPLOAD_STORE_FILE`
  - `MYAPP_UPLOAD_STORE_PASSWORD`
  - `MYAPP_UPLOAD_KEY_ALIAS`
  - `MYAPP_UPLOAD_KEY_PASSWORD`
- Release build uses `signingConfigs.release`

## Codemagic backend fields to configure
- `MYAPP_UPLOAD_STORE_FILE` = `guoxue-release.keystore`
- `MYAPP_UPLOAD_STORE_PASSWORD` = `guoxue888`
- `MYAPP_UPLOAD_KEY_ALIAS` = `guoxuechuan`
- `MYAPP_UPLOAD_KEY_PASSWORD` = `guoxue888`

## Notes
- The keystore file must be uploaded to Codemagic's Code Signing or made available at the path referenced by `MYAPP_UPLOAD_STORE_FILE`.
- If you prefer Codemagic's legacy naming, you can map the same values to `FCI_BUILD_STORE_FILE`, `FCI_BUILD_STORE_PASSWORD`, `FCI_BUILD_KEY_ALIAS`, and `FCI_BUILD_KEY_PASSWORD`.
