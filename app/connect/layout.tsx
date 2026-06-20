import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Connect  BO Creative',
  description: 'Start a project with BO Creative. Get in touch for events, brand experiences, and creative productions. Based in Cairo, Egypt.',
}

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
