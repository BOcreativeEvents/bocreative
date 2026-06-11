import { notFound } from 'next/navigation'
import { jobs, getJobBySlug } from '@/lib/jobs'
import JobPageClient from './job-page-client'

export function generateStaticParams() {
    return jobs.map((j) => ({ role: j.slug }))
}

export default async function JobPage({ params }: { params: Promise<{ role: string }> }) {
    const { role } = await params
    const job = getJobBySlug(role)
    if (!job) notFound()
    return <JobPageClient job={job} />
}
