import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Updates — BO Creative',
  description: 'News, insights, and updates from BO Creative — event management and experience architecture based in Cairo, Egypt.',
}

export default function UpdatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
