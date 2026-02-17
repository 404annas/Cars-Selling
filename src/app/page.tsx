"use client";

import Home from "@/app/Home/Home"
import NextTopLoader from "nextjs-toploader"
import PreLoader from "@/components/PreLoader"

const page = () => {
  return (
    <div>
      <PreLoader />
      <NextTopLoader
        color="#050c4e"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #050c4e,0 0 5px #050c4e"
        template='<div class="bar" role="bar"><div class="peg"></div></div>
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
      <Home />
    </div>
  )
}

export default page