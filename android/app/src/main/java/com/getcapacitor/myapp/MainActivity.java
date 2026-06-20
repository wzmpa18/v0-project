package com.getcapacitor.myapp;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.net.Uri;
import com.getcapacitor.BridgeActivity;
import android.content.Intent;
import android.graphics.Color;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.LinearLayout;

public class MainActivity extends BridgeActivity {

    private static final String REMOTE_URL = "https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com/index.html";
    private static final int LOAD_TIMEOUT_MS = 8000;
    private static final int RETRY_DELAY_MS = 2000;
    private static final int MAX_RETRY = 3;

    private WebView webView;
    private LinearLayout loadingView;
    private LinearLayout offlineView;
    private Handler mainHandler;
    private int retryCount = 0;
    private boolean loadCompleted = false;
    private Runnable timeoutRunnable;

    @SuppressLint({"SetJavaScriptEnabled", "JavascriptInterface"})
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mainHandler = new Handler(Looper.getMainLooper());

        webView = getBridge().getWebView();
        if (webView != null) {
            configureWebView();
            buildLoadingView();
            buildOfflineView();
            showLoadingView();

            scheduleLoadTimeout();
            webView.loadUrl(REMOTE_URL);
        }
    }

    @Override
    protected void onDestroy() {
        if (mainHandler != null && timeoutRunnable != null) {
            mainHandler.removeCallbacks(timeoutRunnable);
        }
        super.onDestroy();
    }

    private void configureWebView() {
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
        settings.setDatabaseEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setTextZoom(100);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                if (url.contains("yandao-1300262413.cos.ap-guangzhou.myqcloud.com") ||
                    url.contains("yandao.vip") ||
                    url.startsWith("file://") ||
                    url.startsWith("data:") ||
                    url.startsWith("javascript:")) {
                    return false;
                }
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(intent);
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (!loadCompleted && isRemoteUrl(url)) {
                    loadCompleted = true;
                    if (mainHandler != null && timeoutRunnable != null) {
                        mainHandler.removeCallbacks(timeoutRunnable);
                    }
                    mainHandler.postDelayed(() -> hideLoadingView(), 300);
                }
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                super.onReceivedError(view, request, error);
                if (request == null || request.isForMainFrame()) {
                    handleLoadFailure();
                }
            }

            private boolean isRemoteUrl(String url) {
                return url != null && (
                    url.contains("yandao-1300262413.cos.ap-guangzhou.myqcloud.com") ||
                    url.contains("yandao.vip")
                );
            }
        });
    }

    private void buildLoadingView() {
        loadingView = new LinearLayout(this);
        loadingView.setOrientation(LinearLayout.VERTICAL);
        loadingView.setGravity(Gravity.CENTER);
        FrameLayout.LayoutParams lp = new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT
        );
        loadingView.setLayoutParams(lp);
        loadingView.setBackgroundColor(Color.parseColor("#1a1a1a"));

        ProgressBar progress = new ProgressBar(this);
        LinearLayout.LayoutParams progressLp = new LinearLayout.LayoutParams(
            120, 120
        );
        progressLp.gravity = Gravity.CENTER;
        progressLp.bottomMargin = 40;
        progress.setLayoutParams(progressLp);
        progress.setIndeterminate(true);

        TextView title = new TextView(this);
        title.setText("国学综合");
        title.setTextColor(Color.parseColor("#d4af37"));
        title.setTextSize(24);
        title.setGravity(Gravity.CENTER);
        title.setPadding(0, 0, 0, 20);

        TextView subtitle = new TextView(this);
        subtitle.setText("正在加载云端资源...");
        subtitle.setTextColor(Color.parseColor("#999999"));
        subtitle.setTextSize(14);
        subtitle.setGravity(Gravity.CENTER);

        loadingView.addView(progress);
        loadingView.addView(title);
        loadingView.addView(subtitle);

        FrameLayout root = findViewById(android.R.id.content);
        root.addView(loadingView);
        loadingView.setVisibility(View.GONE);
    }

    private void buildOfflineView() {
        offlineView = new LinearLayout(this);
        offlineView.setOrientation(LinearLayout.VERTICAL);
        offlineView.setGravity(Gravity.CENTER);
        FrameLayout.LayoutParams lp = new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT
        );
        offlineView.setLayoutParams(lp);
        offlineView.setBackgroundColor(Color.parseColor("#1a1a1a"));

        TextView iconText = new TextView(this);
        iconText.setText("⚠");
        iconText.setTextColor(Color.parseColor("#d4af37"));
        iconText.setTextSize(48);
        iconText.setGravity(Gravity.CENTER);
        iconText.setPadding(0, 0, 0, 30);

        TextView title = new TextView(this);
        title.setText("网络异常");
        title.setTextColor(Color.parseColor("#ffffff"));
        title.setTextSize(22);
        title.setGravity(Gravity.CENTER);
        title.setPadding(0, 0, 0, 16);

        TextView msg = new TextView(this);
        msg.setText("无法连接到云端服务\n请检查网络后重试");
        msg.setTextColor(Color.parseColor("#999999"));
        msg.setTextSize(14);
        msg.setGravity(Gravity.CENTER);
        msg.setLineSpacing(1.2f);
        msg.setPadding(0, 0, 0, 40);

        TextView retryBtn = new TextView(this);
        retryBtn.setText("重试连接");
        retryBtn.setTextColor(Color.parseColor("#ffffff"));
        retryBtn.setTextSize(16);
        retryBtn.setGravity(Gravity.CENTER);
        retryBtn.setBackgroundColor(Color.parseColor("#c8102e"));
        int padding = 40;
        retryBtn.setPadding(padding, 24, padding, 24);
        LinearLayout.LayoutParams btnLp = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        );
        btnLp.gravity = Gravity.CENTER;
        retryBtn.setLayoutParams(btnLp);
        retryBtn.setOnClickListener(v -> {
            loadCompleted = false;
            retryCount++;
            hideOfflineView();
            showLoadingView();
            scheduleLoadTimeout();
            if (webView != null) {
                webView.reload();
            }
        });

        offlineView.addView(iconText);
        offlineView.addView(title);
        offlineView.addView(msg);
        offlineView.addView(retryBtn);

        FrameLayout root = findViewById(android.R.id.content);
        root.addView(offlineView);
        offlineView.setVisibility(View.GONE);
    }

    private void showLoadingView() {
        if (loadingView != null) {
            loadingView.setVisibility(View.VISIBLE);
        }
    }

    private void hideLoadingView() {
        if (loadingView != null) {
            loadingView.setVisibility(View.GONE);
        }
    }

    private void showOfflineView() {
        if (offlineView != null) {
            offlineView.setVisibility(View.VISIBLE);
        }
        if (loadingView != null) {
            loadingView.setVisibility(View.GONE);
        }
    }

    private void hideOfflineView() {
        if (offlineView != null) {
            offlineView.setVisibility(View.GONE);
        }
    }

    private void handleLoadFailure() {
        if (loadCompleted) {
            return;
        }
        loadCompleted = true;
        if (mainHandler != null && timeoutRunnable != null) {
            mainHandler.removeCallbacks(timeoutRunnable);
        }
        mainHandler.post(() -> {
            hideLoadingView();
            showOfflineView();
        });
    }

    private void scheduleLoadTimeout() {
        timeoutRunnable = () -> {
            if (!loadCompleted) {
                handleLoadFailure();
            }
        };
        mainHandler.postDelayed(timeoutRunnable, LOAD_TIMEOUT_MS);
    }
}
