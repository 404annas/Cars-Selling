"use client";

import About from '@/components/About'
import Assistance from '@/components/Assistance';
import Benifits from '@/components/Benifits';
import BgSteps from '@/components/BgSteps'
import Cars from '@/components/Cars'
import Contact from '@/components/Contact'
import Faqs from '@/components/Faqs';
import FeaturedCars from '@/components/FeaturedCars'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Hero2 from '@/components/Hero2'
import Hero3 from '@/components/Hero3';
import HeroBottom from '@/components/HeroBottom';
import Navbar from '@/components/Navbar'
import Numbers from '@/components/Numbers'
import Offering from '@/components/Offering'
import Process from '@/components/Process';
import SellCar from '@/components/SellCar';
import SixSteps from '@/components/SixSteps';
import StepCards from '@/components/StepCards'
import Steps from '@/components/Steps'
import Testimonials from '@/components/Testimonials'
import Testimonials2 from '@/components/Testimonials2';

const Home = () => {
  return (
    <div>
      {/* <Hero /> */}
      <div id="home">
        <Hero3 />
      </div>
      <HeroBottom />
      <div id="featured-cars">
        <FeaturedCars />
      </div>
      <SixSteps />
      {/* <About /> */}
      {/* <div id="our-fleet">
          <Cars />
        </div> */}
      {/* <div id="about">
          <Offering />
        </div> */}
      {/* <div id="process">
          <StepCards />
        </div> */}
      {/* <div id="steps">
          <BgSteps />
        </div> */}

      {/* <div id="numbers">
        <Numbers />
      </div> */}
      <Benifits />
      <SellCar />
      {/* <div id="how-it-works">
        <Steps />
        </div> */}
      {/* <div id="faqs">
        <Faqs />
        </div> */}
      <div id="testimonials">
        <Testimonials2 />
      </div>
        {/* <Process /> */}
      {/* <div id="contact">
        <Contact />
      </div> */}
      {/* <Assistance /> */}
      {/* <Footer /> */}
    </div>
  )
}

export default Home