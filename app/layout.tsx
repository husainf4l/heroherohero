import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rolevate - Land Your Dream Job',
  description: 'Find your perfect job match faster with AI-powered job search',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
