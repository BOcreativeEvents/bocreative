import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — BO Creative',
  description: 'Since 2009, BO Creative has partnered with leading brands and institutions to transform business objectives into meaningful audience experiences.',
}

export default function BoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
