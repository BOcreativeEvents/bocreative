import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers — BO Creative',
  description: 'Join the BO Creative team. We're looking for talented people who are passionate about brand experiences, events, and creative production.',
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
