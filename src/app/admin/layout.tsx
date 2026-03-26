import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Nabil Portfolio',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F3F0' }}>
      {children}
    </div>
  )
}