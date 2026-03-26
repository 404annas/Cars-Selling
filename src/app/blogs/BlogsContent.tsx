"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    CalendarDays,
    Clock3,
    MapPin,
} from "lucide-react";

import { blogs, findBlogByTitle } from "@/data/blogs";

const descriptionClampStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
};

const metaItems = (blog: (typeof blogs)[number]) => [
    {
        icon: CalendarDays,
        label: blog.postedDate,
    },
    {
        icon: Clock3,
        label: blog.readTime,
    },
    {
        icon: MapPin,
        label: blog.location,
    },
];

export default function BlogsContent() {
    const searchParams = useSearchParams();
    const titleParam = searchParams.get("title") ?? undefined;
    const selectedBlog = findBlogByTitle(titleParam);

    if (selectedBlog) {
        return (
            <main className="min-h-screen bg-black text-white selection:bg-[#f23410] selection:text-white">
                {/* Hero Header Section */}
                <section className="relative w-full border-b border-white/5 py-10">
                    <div className="mx-auto max-w-6xl px-6">
                        <Link
                            href="/blogs"
                            className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-[#f23410]"
                        >
                            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                            BACK TO BLOGS
                        </Link>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-xs font-bold text-[#f23410]">
                                <span className="h-[1px] w-8 bg-[#f23410]"></span>
                                {selectedBlog.readTime} read
                            </div>
                            <h1 className="orb text-4xl font-extrabold leading-[1] md:text-5xl lg:text-6xl">
                                {selectedBlog.title}
                            </h1>
                            <p className="max-w-4xl text-base leading-normal text-gray-400 md:text-lg">
                                {selectedBlog.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Cover Image Section */}
                <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                        <Image
                            src={selectedBlog.image}
                            alt={selectedBlog.title}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                </section>

                {/* Article Content Section */}
                <section className="px-6 py-10">
                    <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_280px]">
                        {/* Main Body */}
                        <article className="space-y-16">
                            {/* Introduction */}
                            <div className="relative border-l-2 border-[#f23410] pl-8">
                                <p className="text-base leading-normal text-gray-200 md:text-lg font-medium">
                                    {selectedBlog.introduction}
                                </p>
                            </div>

                            {/* Section Loop */}
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
                                                <p
                                                    key={pIdx}
                                                    className="text-base leading-7 text-gray-300 md:text-lg opacity-90"
                                                >
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Conclusion */}
                            <div className="rounded-2xl border border-[#f23410]/20 bg-gradient-to-br from-zinc-900/50 to-black p-8 md:p-10">
                                <h3 className="mb-6 orb text-xl sm:text-2xl font-bold uppercase text-[#f23410]">
                                    Final Thoughts
                                </h3>
                                <p className="text-lg leading-normal text-gray-300">
                                    {selectedBlog.conclusion}
                                </p>
                            </div>
                        </article>

                        {/* Sticky Sidebar */}
                        <aside className="relative">
                            <div className="sticky top-24 space-y-10">
                                <div className="space-y-6 border-t border-white/10 pt-8">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Details</h4>
                                    <div className="space-y-5">
                                        {metaItems(selectedBlog).map(({ icon: Icon, label }) => (
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

    return (
        <main className="bg-black text-white">
            <section className="px-4 py-10 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="">
                        <div className="max-w-3xl space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#f23410]/15 px-4 py-2 text-xs orb font-semibold uppercase tracking-wider text-[#f23410]">
                                <BookOpen size={14} />
                                Insights & Updates
                            </div>
                            <h1 className="text-3xl text-[#f23410] font-bold sm:text-4xl md:text-5xl orb uppercase">OUR Blogs</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 pb-10 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {blogs.map((blog) => (
                            <Link
                                key={blog.title}
                                href={`/blogs?title=${encodeURIComponent(blog.title)}`}
                                className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#f23410]/70"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/25 to-transparent" />
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="space-y-5 px-5 py-6 md:px-6">
                                    <div className="space-y-3">
                                        <h2 className="text-2xl font-bold orb leading-tight text-white transition group-hover:text-[#f23410]">
                                            {blog.title}
                                        </h2>
                                        <p className="text-sm leading-6 orb text-gray-300" style={descriptionClampStyle}>
                                            {blog.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                                        <div className="flex flex-wrap gap-3 text-sm text-gray-300">
                                            <div className="inline-flex items-center gap-2">
                                                <CalendarDays size={16} className="text-[#f23410]" />
                                                <span>{blog.postedDate}</span>
                                            </div>
                                            <div className="inline-flex items-center gap-2">
                                                <Clock3 size={16} className="text-[#f23410]" />
                                                <span>{blog.readTime}</span>
                                            </div>
                                        </div>

                                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#f23410]">
                                            Read More
                                            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
