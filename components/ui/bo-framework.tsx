"use client";

import { motion } from "framer-motion";

/* ── Tokens ───────────────────────────────────────────────────────────────── */
const LINE  = "rgba(163,86,113,0.28)";
const ROSE  = "#A35671";
const MUTED = "#9b7a87";
const MONO: React.CSSProperties = {
    fontFamily: 'var(--font-mono, "IBM Plex Mono", monospace)',
    fontSize: "10px",
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
};

/* ── Data ─────────────────────────────────────────────────────────────────── */
const services = [
    {
        number: "01",
        title: "Experience Strategy",
        description:
            "Transforming business objectives into experience platforms that align audiences, brands, and ambitions.",
    },
    {
        number: "02",
        title: "Creative Direction",
        description:
            "Designing environments, stories, and interactions that bring brands to life.",
    },
    {
        number: "03",
        title: "Signature Moments",
        description:
            "Crafting the moments people remember long after the experience ends.",
    },
    {
        number: "04",
        title: "Experience Orchestration",
        description:
            "Aligning creative, technical, and operational disciplines under one vision.",
    },
];

import React from "react";

/* ── Main export ──────────────────────────────────────────────────────────── */
export function BOFramework() {
    return (
        <section id="framework" style={{ backgroundColor: "#010101", borderBottom: `1px solid ${LINE}` }}
            className="py-20 sm:py-28 lg:py-36">
            <div className="mx-auto max-w-[1480px] px-6 lg:px-10">

                {/* Section header */}
                <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <motion.p
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            viewport={{ once: true }} transition={{ duration: 0.8 }}
                            style={{ ...MONO, fontSize: '12px', color: ROSE, display: "block", marginBottom: "14px" }}>
                            Capabilities
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="font-extrabold font-suisse"
                            style={{ fontSize: "clamp(1.8rem, 4vw, 4rem)", letterSpacing: "-0.035em", lineHeight: 1, color: "#F5E6EA" }}>
                            Building Experiences<br /><span style={{ color: ROSE }}>With Intent</span>
                        </motion.h2>
                    </div>
                </div>

                {/* Services list — Longeblack row style */}
                <div style={{ borderTop: `1px solid ${LINE}` }}>
                    {services.map((s, i) => (
                        <motion.div key={s.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group grid grid-cols-[48px_1fr] sm:grid-cols-[80px_1fr_1fr] gap-x-6 sm:gap-x-12"
                            style={{
                                padding: "40px 0",
                                borderBottom: `1px solid ${LINE}`,
                                alignItems: "start",
                            }}>

                            {/* Column 1 — number */}
                            <span style={{ ...MONO, fontSize: '12px', color: ROSE, opacity: 0.7, paddingTop: "4px" }}>
                                {s.number}
                            </span>

                            {/* Column 2 — title */}
                            <h3 className="font-semibold"
                                style={{ fontSize: "clamp(1.15rem, 2vw, 1.5rem)", letterSpacing: "-0.02em", color: "#F5E6EA", lineHeight: 1.2 }}>
                                {s.title}
                            </h3>

                            {/* Column 3 — description (mobile: full paragraph below the title) */}
                            <p className="col-start-2 mt-4 sm:col-auto sm:mt-0"
                                style={{ fontSize: "14px", lineHeight: 1.75, color: MUTED }}>
                                {s.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
