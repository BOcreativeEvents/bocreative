'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronRight } from 'lucide-react'
import { useScroll, motion } from 'motion/react'

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden">
                <section>
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-bold md:text-6xl lg:mt-16 xl:text-7xl text-white">
                                    Experience Architecture{' '}
                                    <span style={{ color: '#CF5070' }}>in Motion™</span>
                                </h1>
                                <p className="mt-8 max-w-2xl text-balance text-lg" style={{ color: '#c49aaa' }}>
                                    BlueOcean transforms your vision into extraordinary experiences. From corporate galas to intimate celebrations, we handle every detail so you can be present for every moment.
                                </p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="h-12 rounded-full pl-5 pr-3 text-base text-white border-0"
                                        style={{ backgroundColor: '#CF5070' }}>
                                        <Link href="#contact">
                                            <span className="text-nowrap">Plan Your Event</span>
                                            <ChevronRight className="ml-1" />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-12 rounded-full px-5 text-base text-white border border-white/20 hover:bg-white/10">
                                        <Link href="#portfolio">
                                            <span className="text-nowrap">View Our Work</span>
                                        </Link>
                                    </Button>
                                </div>

                                <div className="mt-16 flex flex-col sm:flex-row gap-8 lg:justify-start justify-center">
                                    {[
                                        { stat: '500+', label: 'Events Delivered' },
                                        { stat: '16+', label: 'Years Experience' },
                                        { stat: '98%', label: 'Client Satisfaction' },
                                    ].map((item) => (
                                        <div key={item.label} className="text-center lg:text-left">
                                            <p className="text-3xl font-bold" style={{ color: '#CF5070' }}>{item.stat}</p>
                                            <p className="text-sm" style={{ color: '#c49aaa' }}>{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-white/10 sm:aspect-video lg:rounded-[3rem] -z-10">
                            <div
                                className="absolute inset-0 z-10"
                                style={{ background: 'linear-gradient(135deg, rgba(1,1,1,0.85) 0%, rgba(15,11,11,0.7) 40%, rgba(41,31,35,0.6) 100%)' }}
                            />
                            <iframe
                                src="https://player.vimeo.com/video/1122589285?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&autopause=0&transparent=0&app_id=122963"
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full"
                                style={{ opacity: 0.7, border: 'none', pointerEvents: 'none' }}
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                                title="BlueOcean showreel"
                            />
                        </div>
                    </div>
                </section>

                {/* Services Strip */}
                <section className="py-12 border-y" style={{ backgroundColor: '#0F0B0B', borderColor: 'rgba(207,80,112,0.2)' }}>
                    <div className="mx-auto max-w-7xl px-6 text-center mb-8">
                        <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: '#CF5070' }}>Our Expertise</p>
                    </div>
                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6" style={{ borderColor: 'rgba(207,80,112,0.2)' }}>
                                <p className="text-end text-sm" style={{ color: '#c49aaa' }}>Events we manage</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                                    {[
                                        'Corporate Conferences',
                                        'Wedding Ceremonies',
                                        'Product Launches',
                                        'Award Galas',
                                        'Team Building',
                                        'Private Parties',
                                        'Charity Fundraisers',
                                        'Trade Shows',
                                    ].map((service) => (
                                        <div key={service} className="flex items-center gap-3 whitespace-nowrap">
                                            <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#CF5070' }} />
                                            <span className="text-sm font-medium" style={{ color: '#f5e6ea' }}>{service}</span>
                                        </div>
                                    ))}
                                </InfiniteSlider>

                                <div className="absolute inset-y-0 left-0 w-20" style={{ background: 'linear-gradient(to right, #0F0B0B, transparent)' }} />
                                <div className="absolute inset-y-0 right-0 w-20" style={{ background: 'linear-gradient(to left, #0F0B0B, transparent)' }} />
                                <ProgressiveBlur className="pointer-events-none absolute left-0 top-0 h-full w-20" direction="left" blurIntensity={1} />
                                <ProgressiveBlur className="pointer-events-none absolute right-0 top-0 h-full w-20" direction="right" blurIntensity={1} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trusted By */}
                <section className="py-12" style={{ backgroundColor: '#291F23' }}>
                    <div className="mx-auto max-w-7xl px-6 text-center mb-8">
                        <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: '#CF5070' }}>Trusted by leading brands</p>
                    </div>
                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="relative py-4">
                            <InfiniteSlider speedOnHover={20} speed={30} gap={112}>
                                {[
                                    { src: 'https://html.tailus.io/blocks/customers/nvidia.svg', alt: 'Nvidia', h: 'h-5' },
                                    { src: 'https://html.tailus.io/blocks/customers/github.svg', alt: 'GitHub', h: 'h-4' },
                                    { src: 'https://html.tailus.io/blocks/customers/nike.svg', alt: 'Nike', h: 'h-5' },
                                    { src: 'https://html.tailus.io/blocks/customers/laravel.svg', alt: 'Laravel', h: 'h-4' },
                                    { src: 'https://html.tailus.io/blocks/customers/openai.svg', alt: 'OpenAI', h: 'h-6' },
                                    { src: 'https://html.tailus.io/blocks/customers/lilly.svg', alt: 'Lilly', h: 'h-7' },
                                    { src: 'https://html.tailus.io/blocks/customers/lemonsqueezy.svg', alt: 'LemonSqueezy', h: 'h-5' },
                                ].map((logo) => (
                                    <div key={logo.alt} className="flex items-center">
                                        <img
                                            className={cn('mx-auto w-fit invert opacity-50 hover:opacity-90 transition-opacity', logo.h)}
                                            src={logo.src}
                                            alt={logo.alt}
                                            width="auto"
                                        />
                                    </div>
                                ))}
                            </InfiniteSlider>
                            <div className="absolute inset-y-0 left-0 w-20" style={{ background: 'linear-gradient(to right, #291F23, transparent)' }} />
                            <div className="absolute inset-y-0 right-0 w-20" style={{ background: 'linear-gradient(to left, #291F23, transparent)' }} />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="group fixed z-20 w-full pt-2">
                <div
                    className={cn('mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12')}
                    style={scrolled ? { backgroundColor: 'rgba(1,1,1,0.85)', backdropFilter: 'blur(24px)', border: '1px solid rgba(207,80,112,0.2)' } : {}}>
                    <motion.div
                        key={1}
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6', scrolled && 'lg:py-4')}>
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link href="/" aria-label="home" className="flex items-center">
                                <BlueOceanLogo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-white">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link href={item.href} className="block duration-150 hover:opacity-100 opacity-80" style={{ color: '#f5e6ea' }}>
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div
                            className="group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none"
                            style={{ backgroundColor: '#0F0B0B', borderColor: 'rgba(207,80,112,0.2)' }}>
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link href={item.href} className="block duration-150 hover:opacity-100 opacity-80" style={{ color: '#f5e6ea' }}>
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="text-white bg-transparent hover:bg-white/10"
                                    style={{ borderColor: 'rgba(207,80,112,0.5)', color: '#f5e6ea' }}>
                                    <Link href="#contact">
                                        <span>Get a Quote</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className="text-white border-0"
                                    style={{ backgroundColor: '#CF5070' }}>
                                    <Link href="#contact">
                                        <span>Book Now</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header>
    )
}

const BlueOceanLogo = ({ className }: { className?: string }) => {
    return (
        <Image
            src="/logo.png"
            alt="BlueOcean Events · Production · Design"
            width={160}
            height={80}
            className={cn('h-14 w-auto object-contain', className)}
            priority
        />
    )
}
