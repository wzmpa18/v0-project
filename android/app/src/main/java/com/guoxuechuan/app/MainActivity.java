package com.guoxuechuan.app;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.net.Uri;
import com.getcapacitor.BridgeActivity;
import android.content.Intent;
import android.webkit.WebSettings;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 在 onCreate 中配置 WebView，确保 bridge 已初始化
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            WebSettings settings = webView.getSettings();
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setAllowFileAccess(true);
            settings.setAllowContentAccess(true);
            settings.setAllowUniversalAccessFromFileURLs(true);
            settings.setAllowFileAccessFromFileURLs(true);
            settings.setMediaPlaybackRequiresUserGesture(false);
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
            settings.setCacheMode(WebSettings.LOAD_DEFAULT);
            
            // 设置 WebViewClient 处理导航
            webView.setWebViewClient(new WebViewClient() {
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    // 内部链接允许导航
                    if (url.startsWith("http://localhost") || 
                        url.startsWith("https://localhost") ||
                        url.startsWith("capacitor://localhost") ||
                        url.startsWith("http://127.0.0.1") ||
                        url.startsWith("file://")) {
                        return false;
                    }
                    // 外部链接使用系统浏览器
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(intent);
                    return true;
                }
                
                @Override
                public void onPageFinished(WebView view, String url) {
                    super.onPageFinished(view, url);
                    // 页面加载完成后注入修复脚本
                    view.evaluateJavascript(
                        "try { console.log('[Native] Page loaded: ' + window.location.href); } catch(e) {}",
                        null
                    );
                }
            });
        }
    }
}
