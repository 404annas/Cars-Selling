"use client";

export default function CarDetailError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-center">
        <h2 className="text-2xl font-bold text-[#f23410]">Failed to load car</h2>
        <p className="mt-3 text-sm text-red-200">{error.message}</p>
        <button
          onClick={reset}
          className="mt-5 rounded-xl bg-[#f23410] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
