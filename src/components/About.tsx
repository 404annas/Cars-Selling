const About = () => {
    return (
        <section className="w-full pt-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Card */}
                <div className="bg-gradient-to-br from-[#0B1324] to-[#070E1A] rounded-3xl p-8 sm:p-12 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">

                    {/* Left Content */}
                    <div className="space-y-6 max-w-xl">
                        <span className="text-sm font-semibold text-blue-400 uppercase">
                            About Us
                        </span>

                        <h2 className="text-2xl md:text-3xl font-bold leading-none orb pt-4">
                            BUILT ON <span className="text-blue-500">CAR PASSION</span>,
                            <br />
                            <span className="text-blue-500">FOCUSED</span> ON YOUR NEEDS
                        </h2>

                        <p className="text-gray-400 sm:text-base text-sm leading-normal">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse varius enim in eros elementum tristique. Duis
                            cursus, mi viverra ornare, eros dolor interdum nulla, ut
                            commodo diam libero vitae erat.
                        </p>
                    </div>

                    {/* Right Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 orb rounded-2xl overflow-hidden">

                        <div className="p-10 border-b border-r border-white/10 text-center">
                            <h3 className="text-4xl font-bold">1000+</h3>
                            <p className="mt-2 text-sm text-gray-400 uppercase tracking-wide">
                                Happy Clients
                            </p>
                        </div>

                        <div className="p-10 border-b border-white/10 text-center">
                            <h3 className="text-3xl sm:text-4xl font-bold">500+</h3>
                            <p className="mt-2 text-sm text-gray-400 uppercase tracking-wide">
                                Cars Sold
                            </p>
                        </div>

                        <div className="p-10 border-b sm:border-b-0 border-r border-white/10 text-center">
                            <h3 className="text-4xl font-bold">300+</h3>
                            <p className="mt-2 text-sm text-gray-400 uppercase tracking-wide">
                                Cars In Stock
                            </p>
                        </div>

                        <div className="p-10 text-center">
                            <h3 className="text-4xl font-bold">50+</h3>
                            <p className="mt-2 text-sm text-gray-400 uppercase tracking-wide">
                                Car Brands
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;