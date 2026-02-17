import Image from "next/image"
import mainHeroImage from "@/assets/mainHero.jpg"

const Hero = () => {
    return (
        <section className="relative h-screen w-full">

            <Image
                src={mainHeroImage}
                alt="Car Hero"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 h-full flex items-center px-4 sm:px-10 pt-10">
                <div className="max-w-2xl text-white space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-bold leading-none">
                        Explore the Road Ahead <br />
                        with <span className="text-orange-500 orb">GearShift</span> Rentals
                    </h1>

                    <p className="text-gray-200 text-base sm:text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed aliquam justo nec ligula eleifend efficitur.
                    </p>

                    <button className="relative overflow-hidden rounded-lg border border-orange-500 px-6 py-3 group cursor-pointer orb sm:text-base text-sm">
                        <span className="absolute left-0 top-0 h-full w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />
                        <span className="relative z-10 text-orange-500 group-hover:text-white transition-colors duration-300 font-medium">
                            VIEW OUR FLEET
                        </span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Hero
