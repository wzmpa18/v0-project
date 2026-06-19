package com.getcapacitor.myapp;

import android.os.Bundle;
import android.util.Log;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebView;
import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.WebViewListener;

public class MainActivity extends BridgeActivity {

	private static final String TAG = "GuoxueMainActivity";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.i(TAG, "onCreate");
		logBridgeState("onCreate");
		attachWebViewDebugListener();
	}

	@Override
	public void onStart() {
		super.onStart();
		Log.i(TAG, "onStart");
		logBridgeState("onStart");
	}

	@Override
	public void onResume() {
		super.onResume();
		Log.i(TAG, "onResume");
		logBridgeState("onResume");
	}

	@Override
	public void onPause() {
		Log.i(TAG, "onPause");
		logBridgeState("onPause");
		super.onPause();
	}

	@Override
	public void onStop() {
		Log.i(TAG, "onStop");
		logBridgeState("onStop");
		super.onStop();
	}

	@Override
	protected void onDestroy() {
		Log.i(TAG, "onDestroy");
		logBridgeState("onDestroy");
		super.onDestroy();
	}

	private void attachWebViewDebugListener() {
		Bridge bridge = getBridge();
		if (bridge == null) {
			Log.w(TAG, "attachWebViewDebugListener: bridge is null");
			return;
		}

		bridge.addWebViewListener(new WebViewListener() {
			@Override
			public void onPageStarted(WebView webView) {
				Log.i(TAG, "WebView onPageStarted url=" + webView.getUrl());
			}

			@Override
			public void onPageLoaded(WebView webView) {
				Log.i(TAG, "WebView onPageLoaded url=" + webView.getUrl() + " progress=" + webView.getProgress());
			}

			@Override
			public void onReceivedError(WebView webView) {
				Log.e(TAG, "WebView onReceivedError url=" + webView.getUrl());
			}

			@Override
			public void onReceivedHttpError(WebView webView) {
				Log.e(TAG, "WebView onReceivedHttpError url=" + webView.getUrl());
			}

			@Override
			public boolean onRenderProcessGone(WebView webView, RenderProcessGoneDetail detail) {
				Log.e(TAG, "WebView onRenderProcessGone didCrash=" + detail.didCrash() + " url=" + webView.getUrl());
				return false;
			}
		});

		Log.i(TAG, "attachWebViewDebugListener: listener attached");
	}

	private void logBridgeState(String stage) {
		Bridge bridge = getBridge();
		if (bridge == null) {
			Log.w(TAG, stage + " bridge=null");
			return;
		}

		String serverUrl = bridge.getServerUrl();
		String localUrl = bridge.getLocalUrl();
		String webViewUrl = bridge.getWebView() != null ? bridge.getWebView().getUrl() : "null";
		int webViewProgress = bridge.getWebView() != null ? bridge.getWebView().getProgress() : -1;

		Log.i(
			TAG,
			stage
				+ " serverUrl=" + serverUrl
				+ " localUrl=" + localUrl
				+ " webViewUrl=" + webViewUrl
				+ " progress=" + webViewProgress
		);
	}
}
