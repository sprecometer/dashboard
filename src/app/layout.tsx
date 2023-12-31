import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TimeSeriesCSS } from './components/TimeSeriesSimulation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sprecometer',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <style>{TimeSeriesCSS}</style>
        <style>
          {`
          // .ant-table-expanded-row.ant-table-expanded-row-level-1 .ant-table-cell {
          //   padding: 0 16px;
          // }
          // .ant-spin-nested-loading {
          //   padding: 16px 0;
          // }
          .ant-menu-root {
            margin-top: 82px!important;
          }
          .ant-layout-content {
            margin: 0 !important;
          }
        `}
        </style>
        <script src="//d3js.org/d3.v2.min.js" charSet="utf-8"></script>
        <script src="https://square.github.io/cubism/cubism.v1.min.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Electrolize&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className} style={{ margin: '0' }}>{children}</body>
    </html>
  )
}