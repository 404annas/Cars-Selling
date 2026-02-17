"use client";
import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials2 = () => {
  // Data from your screenshot
  const reviews = [
    {
      id: 1,
      name: "Saurabh Sharma",
      date: "Jan 31, 2026",
      location: "Gurgaon",
      rating: 5,
      text: "I had the opportunity to interact with Ms. Monika Pundir during the follow-up of a delayed RC transfer case, and her support was truly commendable. She...",
    },
    {
      id: 2,
      name: "Sambasivarao Ch",
      date: "Jan 31, 2026",
      location: "Pune",
      rating: 5,
      text: "Good and quick documentation with delivery. I liked the comprehensive report on the vehicle checks",
    },
    {
      id: 3,
      name: "Souvik Chatterjee",
      date: "Jan 31, 2026",
      location: "Kolkata",
      rating: 5,
      text: "It was an excellent experience selling my car through Spinny. Seamless and smooth operations and everything was done within an hour. Overall I highly...",
    },
    {
      id: 4,
      name: "Anjali Gupta",
      date: "Jan 30, 2026",
      location: "Delhi",
      rating: 4,
      text: "Very professional service. The inspection was thorough and the price offered was fair compared to the market standards.",
    },
    {
      id: 5,
      name: "Rahul Verma",
      date: "Jan 29, 2026",
      location: "Bangalore",
      rating: 5,
      text: "Amazing experience! The car was delivered to my doorstep in pristine condition. Highly recommend their services.",
    },
  ];

  // State for the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Logic to show 3 cards on desktop, 1 on mobile
  const visibleCards = 3;
  const maxIndex = reviews.length - visibleCards;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? prev : prev + 1));
  };

  // Helper to render stars
  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < count ? "#FFC107" : "#E5E7EB"} // Yellow or Gray
          stroke={i < count ? "#FFC107" : "#E5E7EB"}
          className="mr-0.5"
        />
      ));
  };

  return (
    <section className="w-full py-10 bg-[#fbebeb] overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header with Lines and Navigation Arrows */}
        <div className="flex items-center justify-between mb-10 relative">
          {/* Background Line */}
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gray-200 -z-10 hidden md:block"></div>

          <div className="bg-[#fbebeb] pr-6 z-10 mx-auto md:mx-0">
            {/* Centered Title logic roughly matching image */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center pointer-events-none hidden md:block">
              <span className="bg-[#fbebeb] px-6 text-2xl sm:text-3xl font-bold text-red-600">
                User Reviews & Ratings
              </span>
            </div>
            {/* Mobile Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-red-600 md:hidden text-center">
              User Reviews & Ratings
            </h2>
          </div>

          {/* Navigation Arrows (Top Right) */}
          <div className="bg-[#fbebeb] pl-6 z-10 hidden md:flex items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full transition-colors cursor-pointer duration-300 ${currentIndex === 0 ? 'text-red-300 bg-black hover:cursor-not-allowed' : 'text-red-600 hover:bg-black'}`}
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-2 rounded-full transition-colors cursor-pointer duration-300 ${currentIndex >= maxIndex ? 'text-red-300 bg-black hover:cursor-not-allowed' : 'text-red-600 hover:bg-black'}`}
            >
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Main Content: Left Summary + Right Carousel */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* 1. Left Side: Rating Summary Box */}
          <div className="shrink-0 w-full lg:w-[280px]">
            <div className="bg-[#fdd1d1] rounded-xl p-8 flex flex-col items-center justify-center h-full min-h-[200px]">
              <span className="text-red-600 text-6xl font-bold mb-2">4.9</span>
              <div className="flex gap-1 mb-2">
                {/* 5 Big Stars */}
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={24} fill="#FFC107" stroke="#FFC107" />
                ))}
              </div>
              <p className="text-gray-500 text-sm">based on 2000+ reviews</p>
            </div>
          </div>

          {/* 2. Right Side: Carousel */}
          <div className="flex-1 overflow-hidden relative">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }} // Logic for sliding
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
                >
                  <div className="border border-gray-200 rounded-xl p-6 h-[250px] flex flex-col justify-between bg-white">

                    {/* Card Top: Name & Stars */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-red-600 font-medium text-lg truncate pr-2">
                          {review.name}
                        </h3>
                        <div className="flex shrink-0">
                          {renderStars(review.rating)}
                        </div>
                      </div>

                      <p className="text-gray-400 text-xs mb-4">
                        {review.date} | {review.location}
                      </p>

                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                        {review.text}
                      </p>
                    </div>

                    {/* Card Bottom: Read More */}
                    <button className="text-gray-400 text-sm underline self-start hover:text-red-600 cursor-pointer transition-all duration-300 mt-2">
                      Read more
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Mobile Navigation Controls (Visible only on small screens) */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <button onClick={handlePrev} disabled={currentIndex === 0} className="p-2 border rounded-full">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNext} disabled={currentIndex >= reviews.length - 1} className="p-2 border rounded-full">
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  )
}

export default Testimonials2