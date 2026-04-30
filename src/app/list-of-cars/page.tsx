"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Clock,
  ArrowRight,
  X,
} from "lucide-react";
import carsData from "../../../list_all_cars.json";

const Page = () => {
  // --- DATA ---
  const allCars = carsData;

  // --- STATE ---
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // --- DISABLE BODY SCROLL ---
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(allCars.length / itemsPerPage);

  const currentData = allCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // --- HELPERS ---
  const getOptimizedUrl = (url: string) => {
    if (url && url.includes("cloudinary.com")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto,w_100,c_scale/");
    }
    return url;
  };

  const getLargeUrl = (url: string) => {
    if (url && url.includes("cloudinary.com")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto,w_1200/");
    }
    return url;
  };

  const getStatusStyle = (status: any) => {
    switch (status) {
      case "Eligible":
        return "text-emerald-500 border-emerald-500/20 bg-emerald-500/5";
      case "Expired":
        return "text-zinc-500 border-zinc-800 bg-zinc-900/50";
      case "Pending Renewal":
        return "text-amber-500 border-amber-500/20 bg-amber-500/5";
      default:
        return "text-zinc-400 border-zinc-800";
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-10 px-4 md:px-10">
      {/* HEADER SECTION */}
      <div className="max-w-[1600px] mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="w-full mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#F23410] tracking-tighter text-center">
              Cars We Can Import To Australia
            </h1>
            <p className="text-zinc-500 mt-2 font-medium text-sm md:text-base leading-normal max-w-5xl mx-auto text-center">
              Elite Motor Cars The Most Trusted Way to Buy and Sell Used Cars in
              Australia Choose from over 10,000 fully inspected second-hand car
              models at Elite Motor Cars. Buy used cars online and book a test
              drive at your home or visit an Elite Motor Cars location near you.
            </p>
          </div>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="max-w-[1600px] mx-auto bg-[#0A0A0A] border border-zinc-900 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/30">
                <th className="p-5 text-xs font-black uppercase text-zinc-500">
                  Preview
                </th>
                <th className="p-5 text-xs font-black uppercase text-zinc-500">
                  Vehicle Model
                </th>
                <th className="p-5 text-xs font-black uppercase text-zinc-500 text-center">
                  Status
                </th>
                <th className="p-5 text-xs font-black uppercase text-zinc-500">
                  Expiry
                </th>
                <th className="p-5 text-xs font-black uppercase text-zinc-500">
                  Production Window
                </th>
                <th className="p-5 text-xs font-black uppercase text-zinc-500">
                  Variant Details
                </th>
                <th className="p-5 text-xs font-black uppercase text-zinc-500">
                  Conditions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {currentData.map((car: any, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#0F0F0F] transition-all duration-300 group"
                >
                  {/* Image Preview */}
                  <td className="p-5">
                    <div
                      onClick={() => car.image && setSelectedImage(car.image)}
                      className={`w-14 h-14 bg-zinc-900 border rounded-full border-zinc-800 overflow-hidden relative group-hover:border-[#F23410]/50 transition-colors ${car.image ? "cursor-pointer" : ""}`}
                    >
                      {car.image ? (
                        <img
                          src={getOptimizedUrl(car.image)}
                          alt={car.vehicle}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] text-zinc-700 uppercase font-black">
                          No Image
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Model & Link */}
                  <td className="p-5">
                    <a
                      // href={car.url}
                      //  target="_blank"
                      className="flex items-center gap-2 font-bold group-hover:text-[#F23410] transition-all duration-300 text-xs md:text-sm"
                    >
                      {car.vehicle}
                      {/* <ExternalLink
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      /> */}
                    </a>
                  </td>

                  {/* SEVS Status */}
                  <td className="p-5 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle(car.sevs_status)}`}
                    >
                      {car.sevs_status || "N/A"}
                    </span>
                  </td>

                  {/* Expiry */}
                  <td className="p-5">
                    <span className="text-xs text-zinc-400">
                      {car.sevs_expiry || "—"}
                    </span>
                  </td>

                  {/* Production Window */}
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-zinc-300">{car.from_date}</span>
                      <span className="text-zinc-600">
                        <ArrowRight size={14} />
                      </span>
                      <span className="text-zinc-300">{car.to_date}</span>
                    </div>
                  </td>

                  {/* Variant Details */}
                  <td className="p-5 max-w-xs">
                    <p className="text-xs text-zinc-500 leading-normal line-clamp-2 hover:line-clamp-none transition-all duration-300 cursor-default">
                      {car.variant_details}
                    </p>
                  </td>

                  {/* Conditions */}
                  <td className="p-5">
                    {car.conditions ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-500/80">
                        <AlertCircle size={10} /> {car.conditions}
                      </span>
                    ) : (
                      <span className="text-zinc-600 text-xs">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="p-5 border-t border-zinc-900 bg-[#080808] flex items-center justify-between">
          <div className="text-[10px] md:text-xs font-bold text-zinc-600 uppercase tracking-wide">
            Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, allCars.length)} of{" "}
            {allCars.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-zinc-800 rounded hover:border-[#F23410] disabled:opacity-30 disabled:hover:border-zinc-800 transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Only show 5 pages around the current page to avoid clutter
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 text-[11px] font-black rounded transition-all duration-300 ${currentPage === pageNum ? "bg-[#F23410] text-black" : "hover:bg-zinc-800 text-zinc-500"}`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (pageNum === currentPage - 2 || pageNum === currentPage + 2)
                  return (
                    <span key={pageNum} className="text-zinc-800">
                      ...
                    </span>
                  );
                return null;
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-zinc-800 rounded hover:border-[#F23410] disabled:opacity-30 disabled:hover:border-zinc-800 transition-all duration-300 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* IMAGE PREVIEW OVERLAY */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10 transition-all duration-500 animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-0 right-0 -mt-2 -mr-2 md:-mt-6 md:-mr-6 p-3 bg-[#F23410] text-black rounded-full hover:bg-white transition-all duration-300 z-10 shadow-sm group"
            >
              <X size={20} className="group-hover:rotate-90 cursor-pointer transition-transform duration-300" />
            </button>

            {/* Image Wrapper */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getLargeUrl(selectedImage)}
                alt="Vehicle Preview"
                className="max-w-full max-h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg border border-zinc-800"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
