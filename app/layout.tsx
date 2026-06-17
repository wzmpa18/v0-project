import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { AppShell } from '@/components/app-shell'
import './globals.css'

export const metadata: Metadata = {
  title: '国学综合 - 传承千年智慧',
  description: '集排盘系统、经方本草、古籍文献于一体的国学综合应用',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="bg-[#1a1a1a]">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          // 全局错误捕获
          window.onerror = function(msg, url, line, col, err) {
            try { localStorage.setItem('_lastError', msg + ' at ' + url + ':' + line); } catch(e) {}
          };
          // 全局导航回退
          document.addEventListener('DOMContentLoaded', function() {
            document.body.addEventListener('click', function(e) {
              var el = e.target.closest('[data-href]');
              if (el && el.dataset.href) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = el.dataset.href;
              }
            }, true);
          });
          // 错误日志
          console.log('[App] Layout loaded, ready for navigation');
        ` }} />
      </head>
      <body className="font-sans antialiased bg-[#1a1a1a] text-[#f5f5f7]">
        <AppShell>
          {children}
        </AppShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
