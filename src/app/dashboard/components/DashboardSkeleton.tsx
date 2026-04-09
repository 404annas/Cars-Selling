import { Car } from "lucide-react";

export function DashboardSkeleton() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-zinc-800 bg-zinc-950 px-4 py-5 lg:border-b-0 lg:border-r">
          <div className="mb-8">
            <div className="h-3 w-28 animate-pulse rounded bg-zinc-800" />
            <div className="mt-3 h-8 w-40 animate-pulse rounded bg-zinc-800" />
          </div>

          <div className="space-y-3">
            <div className="h-12 animate-pulse rounded-lg bg-[#f23410]/40" />
            <div className="h-12 animate-pulse rounded-lg bg-zinc-800" />
            <div className="h-12 animate-pulse rounded-lg bg-zinc-800" />
          </div>

          <div className="mt-8 hidden rounded-xl border border-zinc-800 p-4 lg:block">
            <div className="h-3 w-20 animate-pulse rounded bg-zinc-800" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-zinc-800" />
            <div className="mt-4 h-9 animate-pulse rounded-lg bg-zinc-800" />
          </div>
        </aside>

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-800" />
              <div className="mt-3 h-9 w-72 max-w-full animate-pulse rounded bg-zinc-800" />
            </div>
            <div className="h-10 w-36 animate-pulse rounded-lg bg-[#f23410]/40" />
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
              >
                <div className="h-3 w-20 animate-pulse rounded bg-zinc-800" />
                <div className="mt-4 h-8 w-16 animate-pulse rounded bg-zinc-800" />
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="border-b border-zinc-800 p-4">
              <div className="mb-4 flex items-center gap-2">
                <Car size={18} className="text-[#f23410]" />
                <div className="h-4 w-28 animate-pulse rounded bg-zinc-800" />
              </div>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_180px_180px_auto]">
                <div className="h-10 animate-pulse rounded-lg bg-zinc-800" />
                <div className="h-10 animate-pulse rounded-lg bg-zinc-800" />
                <div className="h-10 animate-pulse rounded-lg bg-zinc-800" />
                <div className="h-10 animate-pulse rounded-lg bg-zinc-800" />
              </div>
            </div>

            <div className="divide-y divide-zinc-800">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[80px_1fr_120px_100px] gap-4 p-4"
                >
                  <div className="h-14 animate-pulse rounded-lg bg-zinc-800" />
                  <div>
                    <div className="h-4 w-72 max-w-full animate-pulse rounded bg-zinc-800" />
                    <div className="mt-3 h-3 w-40 animate-pulse rounded bg-zinc-800" />
                  </div>
                  <div className="h-9 animate-pulse rounded-lg bg-zinc-800" />
                  <div className="h-9 animate-pulse rounded-lg bg-zinc-800" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
