export interface Job {
    slug: string
    title: string
    department: string
    location: string
    type: string
    description: string
}

export const jobs: Job[] = [
    {
        slug: 'experience-designer',
        title: 'Experience Designer',
        department: 'Creative',
        location: 'Cairo',
        type: 'Full-Time',
        description: 'Design immersive environments and brand experiences that engage audiences and leave lasting impressions.',
    },
    {
        slug: 'event-producer',
        title: 'Event Producer',
        department: 'Production',
        location: 'Cairo',
        type: 'Full-Time',
        description: 'Lead end-to-end production of large-scale events, managing teams, vendors, and timelines with precision.',
    },
    {
        slug: 'account-manager',
        title: 'Account Manager',
        department: 'Client Services',
        location: 'Cairo',
        type: 'Full-Time',
        description: 'Build and manage strong client relationships, ensuring seamless delivery and exceptional satisfaction across every project.',
    },
]

export function getJobBySlug(slug: string): Job | undefined {
    return jobs.find((j) => j.slug === slug)
}
