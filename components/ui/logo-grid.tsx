'use client'

import React from 'react'

const LINE = 'rgba(163,86,113,0.12)'
const MONO: React.CSSProperties = {
    fontFamily: 'var(--font-mono, "IBM Plex Mono", monospace)',
    fontSize:   '11px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: 'rgba(245,230,234,0.5)',
}

const CLIENTS = [
    { name: 'Novo Nordisk',    file: 'novo-nordisk.png'   },
    { name: 'Unilever',        file: 'unilever.png'       },
    { name: 'Coca-Cola',       file: 'coca-cola.png'      },
    { name: 'British Embassy', file: 'british-embassy.png'},
    { name: 'Shell',           file: 'shell.png'          },
    { name: 'WHO',             file: 'who.png'            },
    { name: 'Hero',            file: 'hero.png'           },
    { name: 'Knorr',           file: 'knorr.png'          },
    { name: 'Sunsilk',         file: 'sunsilk.png'        },
    { name: 'Marriott',        file: 'marriott.png'       },
    { name: 'Lipton',          file: 'lipton.png'         },
    { name: 'Main Marks',      file: 'main-marks.png'     },
    { name: 'Kuehne+Nagel',    file: 'kuehne-nagel.png'   },
    { name: 'Pirelli',         file: 'pirelli.png'        },
    { name: 'Dreem',           file: 'dreem.png'          },
    { name: 'Direction White', file: 'direction-white.png'},
    { name: 'MSC',             file: 'msc.png'            },
    { name: 'Town Writers',    file: 'town-writers.png'   },
    { name: 'Bayer',           file: 'bayer.png'          },
    { name: 'Egyptian LNG',    file: 'egyptian-lng.png'   },
    { name: 'GIECO',           file: 'gieco.png'          },
    { name: 'Dove',            file: 'dove.png'           },
    { name: 'Clear',           file: 'clear.png'          },
    { name: 'Groupe Savencia', file: 'savencia.png'       },
    { name: 'Mondelēz',        file: 'mondelez.png'       },
    { name: 'Signal',          file: 'signal.png'         },
    { name: 'Medfest Egypt',   file: 'medfest.png'        },
    { name: 'Amreyah Cement',  file: 'amreyah-cement.png' },
]

const doubled = [...CLIENTS, ...CLIENTS]

export type LogoGridProps = { badge?: string; heading?: string }

export function LogoGrid({ badge = 'Our Clients' }: LogoGridProps = {}) {
    return (
        <div style={{ backgroundColor: '#010101', borderBottom: `1px solid ${LINE}` }}>

            {/* Header bar */}
            <div className="flex items-center justify-between" style={{ padding: '12px 24px', borderBottom: `1px solid ${LINE}` }}>
                <span style={MONO}>© Success Stories With</span>
                <span style={MONO}>(BO® · 2009)</span>
                <span style={MONO}>{badge}</span>
            </div>

            {/* Scrolling logo strip */}
            <style>{`
                @keyframes logo-scroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                .logo-scroll-track {
                    animation: logo-scroll 60s linear infinite;
                }
                .logo-scroll-track:hover {
                    animation-duration: 180s;
                }
            `}</style>
            <div style={{ overflow: 'hidden', height: '108px' }}>
                <div
                    className="logo-scroll-track"
                    style={{ display: 'flex', alignItems: 'center', height: '108px', width: 'max-content' }}
                >
                    {doubled.map((c, i) => (
                        <div key={i} style={{ flexShrink: 0, padding: '0 45px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '108px' }}>
                            <img
                                src={`/clients/${c.file}`}
                                alt={c.name}
                                style={{
                                    height: '94px',
                                    width: 'auto',
                                    maxWidth: '234px',
                                    objectFit: 'contain',
                                    filter: 'brightness(0) invert(1)',
                                    opacity: 0.28,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom divider */}
            <div style={{ height: '1px', backgroundColor: LINE }} />
        </div>
    )
}
