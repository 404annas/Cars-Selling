"use client";

import React, { useEffect } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

import logo from "@/assets/logo.jpeg";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Footer2 = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "How We Deliver", href: "/how-we-deliver" },
    { label: "Why Choose Us", href: "/why-choose-us" },
    { label: "FAQ's", href: "/faqs" },
    { label: "Blogs", href: "/blogs" },
    { label: "Browse Cars We Import", href: "/browse-cars" },
    { label: "List Of Cars We Import", href: "/list-of-cars" },
  ];

  useEffect(() => {
    if (sessionStorage.getItem("smooth-scroll-top") !== "true") {
      return;
    }

    sessionStorage.removeItem("smooth-scroll-top");

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, [pathname]);

  const handleNavigation = (href: string) => {
    sessionStorage.setItem("smooth-scroll-top", "true");

    if (pathname === href) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    router.push(href);
  };

  return (
    <footer className="bg-black text-white pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">
        {/* Left Side: Logo & Description */}
        <div className="flex-1 max-w-2xl">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full shadow-md"
              src={logo.src}
              alt="Logo"
              width={300}
              height={100}
              priority={true}
            />
          </div>

          {/* About Text */}
          <p className="text-gray-300 text-sm md:text-base leading-normal -mt-10 mb-4">
            Elite Motor Cars The Most Trusted Way to Buy and Sell Used Cars in
            Australia Choose from over 10,000 fully inspected second-hand car
            models at Elite Motor Cars. Buy used cars online and book a test
            drive at your home or visit an Elite Motor Cars location near you.
          </p>

          {/* Social Icons */}
          <div className="flex gap-6 text-xl">
            <a
              href="https://www.instagram.com/elitemotorcarsau?igsh=MWJqbGgwZHFuazMxbg%3D%3D&utm_source=qr"
              target="_blank"
            >
              <FaInstagram className="cursor-pointer hover:text-gray-400 transition-all duration-300 hover:-translate-y-1" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61576211886817&mibextid=wwXIfr&rdid=GHHTkWX86rqdvYY8&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Da79KmHou%2F%3Fmibextid%3DwwXIfr#"
              target="_blank"
            >
              <FaFacebookF className="cursor-pointer hover:text-gray-400 transition-all duration-300 hover:-translate-y-1" />
            </a>
          </div>
        </div>

        {/* Right Side: Links Column */}
        <div className="flex-shrink-0">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
            Navigation
          </h3>
          <ul className="space-y-3 text-gray-300 text-[15px]">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => handleNavigation(item.href)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-shrink-0">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
            Contact
          </h3>
          <div className="flex items-center gap-2 mb-2 bg-[#f23410] rounded-xl px-6 py-4">
            <Mail size={20} />
            <a
              href="mailto:sales@elitemotorcars.com.au"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              sales@elitemotorcars.com.au
            </a>
          </div>
          <div className="flex items-center gap-2 mb-2 bg-[#f23410] rounded-xl px-6 py-4">
            <Phone size={20} />
            <p>+61 466 318 074</p>
          </div>
          <div className="flex items-center gap-2 mb-2 bg-[#f23410] rounded-xl px-6 py-4">
            <MapPin size={20} />
            <p>Sydney, NSW, 2000</p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between text-gray-400 text-sm gap-4 sm:text-left text-center sm:items-start items-center">
        <p>Copyright © 2026 Elite Motor Cars | All rights reserved</p>
        <div className="flex gap-6">
          <p>
            Developed By{" "}
            <a
              className="text-white"
              href="http://techxudo.com/"
              target="_blank"
            >
              Techxudo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
