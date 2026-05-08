import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin } from "lucide-react";
import { findBlogBySlug, BlogParagraph } from "@/data/blogs";
import { notFound } from "next/navigation";

const blog = findBlogBySlug("compliance-and-customs-handling-australia");
const selectedBlog = blog ?? notFound();

const meta: Metadata = {
    title: selectedBlog.metaTitle ?? selectedBlog.title,
    description: selectedBlog.metaDescription ?? selectedBlog.description,
};

const metaItems = [
    {
        icon: CalendarDays,
        label: selectedBlog.postedDate,
    },
    {
        icon: Clock3,
        label: selectedBlog.readTime,
    },
    {
        icon: MapPin,
        label: selectedBlog.location,
    },
];

function renderParagraph(paragraph: BlogParagraph) {
    if (typeof paragraph === "string") {
        return paragraph;
    }

    return (
        <>
            {paragraph.text}
            <a
                href={paragraph.linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#f23410] underline underline-offset-4 transition hover:text-white"
            >
                {paragraph.linkLabel}
            </a>
            {paragraph.linkSuffix ?? ""}
        </>
    );
}

export const metadata = meta;

export default function ComplianceAndCustomsHandlingPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#f23410] selection:text-white">
            <section className="relative w-full border-b border-white/5 py-10">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-xs font-bold text-[#f23410]">
                            <span className="h-px w-8 bg-[#f23410]"></span>
                            {selectedBlog.readTime} read
                        </div>
                        <h1 className="orb text-3xl font-extrabold leading-none md:text-4xl lg:text-5xl">
                            {selectedBlog.title}
                        </h1>
                        <p className="max-w-4xl text-base leading-normal text-gray-400 md:text-lg">
                            {selectedBlog.description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                <div className="relative aspect-21/9 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                    <Image
                        src={selectedBlog.image}
                        alt={selectedBlog.title}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                </div>
            </section>

            <section className="px-6 py-10">
                <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_280px]">
                    <article className="space-y-16">
                        <div className="relative border-l-2 border-[#f23410] pl-8">
                            <p className="text-base leading-normal text-gray-200 md:text-lg font-medium">
                                {renderParagraph(selectedBlog.introduction)}
                            </p>
                        </div>

                        <div className="space-y-14">
                            {selectedBlog.sections.map((section, idx) => (
                                <div key={section.heading} className="space-y-8">
                                    <div className="space-y-2">
                                        <span className="text-xs font-bold text-[#f23410]">0{idx + 1}</span>
                                        <h2 className="orb text-2xl font-bold tracking-tight text-white md:text-3xl uppercase">
                                            {section.heading}
                                        </h2>
                                    </div>
                                    <div className="space-y-4">
                                        {section.paragraphs.map((paragraph, pIdx) => (
                                            <p key={pIdx} className="text-base leading-7 text-gray-300 md:text-lg opacity-90">
                                                {renderParagraph(paragraph)}
                                            </p>
                                        ))}
                                        {section.items?.length ? (
                                            <ul className="space-y-3">
                                                {section.items.map((item) => (
                                                    <li key={item} className="flex gap-3 text-gray-300">
                                                        <CheckCircle2 size={18} className="mt-1 text-[#f23410]" />
                                                        <span className="leading-7">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl border border-[#f23410]/20 bg-linear-to-br from-zinc-900/50 to-black p-8 md:p-10">
                            <h3 className="mb-6 orb text-xl sm:text-2xl font-bold uppercase text-[#f23410]">
                                Final Thoughts
                            </h3>
                            <p className="text-lg leading-normal text-gray-300">
                                {renderParagraph(selectedBlog.conclusion)}
                            </p>
                        </div>
                    </article>

                    <aside className="relative">
                        <div className="sticky top-24 space-y-10">
                            <div className="space-y-6 border-t border-white/10 pt-8">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Details</h4>
                                <div className="space-y-5">
                                    {metaItems.map(({ icon: Icon, label }) => (
                                        <div key={label} className="flex items-center gap-4 group">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-[#f23410] ring-1 ring-white/10 transition group-hover:ring-[#f23410]/50">
                                                <Icon size={18} />
                                            </div>
                                            <span className="text-sm font-medium text-gray-300">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/5 bg-zinc-900/30 p-6">
                                <p className="mb-4 text-sm font-bold text-white">Need professional advice?</p>
                                <Link
                                    href="/contact"
                                    className="flex items-center justify-between rounded-xl bg-[#f23410] px-5 py-3 text-sm font-bold text-white transition hover:brightness-110"
                                >
                                    Contact Us
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
