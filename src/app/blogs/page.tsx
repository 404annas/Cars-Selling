import type { Metadata } from "next";
import { Suspense } from "react";

import BlogsContent from "./BlogsContent";

export const metadata: Metadata = {
    title: "Blogs | Elite Motor Cars",
    description:
        "Read the latest Elite Motor Cars blogs about imports, compliance, logistics, and premium vehicle buying across Australia.",
};

export default function BlogsPage() {
    return (
        <Suspense fallback={null}>
            <BlogsContent />
        </Suspense>
    );
}
