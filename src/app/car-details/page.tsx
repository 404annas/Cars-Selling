import { Suspense } from "react";
import CarDetailsByQuery from "./CarDetailsByQuery";

export default function CarDetailsStaticPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black px-4 py-16 text-white">Loading vehicle...</div>}>
      <CarDetailsByQuery />
    </Suspense>
  );
}
