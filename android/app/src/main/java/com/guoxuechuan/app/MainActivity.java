package com.guoxuechuan.app;

import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.net.Uri;
import com.getcapacitor.BridgeActivity;
import android.content.Intent;

public class MainActivity extends BridgeActivity {
    @Override
    public void onStart() {
        super.onStart();
        WebView webView = getBridge().getWebView();
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        
        // 设置 WebViewClient 来处理导航
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // 如果是内部链接，允许导航
                if (url.startsWith("http://localhost") || 
                    url.startsWith("https://localhost") ||
                    url.startsWith("capacitor://localhost") ||
                    url.startsWith("http://127.0.0.1") ||
                    url.startsWith("file://")) {
                    return false; // 允许导航
                }
                // 外部链接使用系统浏览器打开
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(intent);
                return true;
            }
        });
    }
}
