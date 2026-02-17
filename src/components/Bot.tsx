"use client";
import React, { useState, useEffect } from 'react';
import { RiRobot2Fill, RiCloseLine, RiCheckboxCircleFill } from 'react-icons/ri';
import { Car, Van } from 'lucide-react';
import { TbCarSuv } from 'react-icons/tb';
import { GiJeep } from 'react-icons/gi';
import { toast } from 'sonner'; // Sonner import kiya

const Bot = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false); // Success popup state

    // Form Field States
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        budget: "",
        year: "",
        email: "",
        phone: ""
    });

    const [activeTab, setActiveTab] = useState('Cars');

    const tabs = [
        { id: "Cars", icon: <Car size={30} /> },
        { id: "vans", icon: <Van size={30} /> },
        { id: "suv", icon: <TbCarSuv size={30} /> },
        { id: "jeep", icon: <GiJeep size={30} /> },
    ];

    useEffect(() => {
        const timer = setTimeout(() => setShowPopup(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showModal || showSuccess) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [showModal, showSuccess]);

    // Input handle karne ke liye function
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- SUBMIT LOGIC ---
    const handleSubmit = () => {
        // Validation check
        const { make, model, budget, year, email, phone } = formData;

        if (!make || !model || !budget || !year || !email || !phone) {
            toast.error("All fields are required!", {
                description: "Please fill in all details to proceed.",
            });
            return;
        }

        // Agar fields fill hain toh success show karein
        setShowModal(false);
        setShowSuccess(true);

        // 2 seconds baad automatically close
        setTimeout(() => {
            setShowSuccess(false);
            // Reset form
            setFormData({ make: "", model: "", budget: "", year: "", email: "", phone: "" });
        }, 3000);
    };

    return (
        <>
            {/* --- FLOATING ACTION BUTTON --- */}
            <div className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
                {showPopup && !showModal && !showSuccess && (
                    <div
                        onClick={() => setShowModal(true)}
                        className="bg-white border-2 border-[#050C4E] shadow-2xl w-20 h-20 rounded-full cursor-pointer flex items-center justify-center text-center animate-bounce-subtle pointer-events-auto hover:scale-105 transition-transform animate-bounce"
                    >
                        <p className="text-[#050C4E] text-xs font-bold uppercase leading-tight tracking-tighter">
                            I WANT <br /> TO <br /> IMPORT
                        </p>
                    </div>
                )}
            </div>

            {/* --- SUCCESS MODAL --- */}
            {showSuccess && (
                <div className="fixed inset-0 z-[10001] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"></div>
                    <div className="bg-white rounded-3xl p-8 shadow-2xl z-20 max-w-sm w-full text-center animate-in zoom-in duration-300">
                        <div className="flex justify-center mb-4">
                            <RiCheckboxCircleFill size={80} className="text-green-500 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#050C4E] mb-2">Enquiry Submitted!</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Our team will review your enquiry and get back to you within <span className="font-bold text-blue-600">24 to 48 hours</span>.
                        </p>
                        <div className="mt-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 animate-progress-shrink"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- FORM MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xl relative z-10 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">

                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 p-2 rounded-full transition-colors cursor-pointer">
                            <RiCloseLine size={24} />
                        </button>

                        <div className="p-6 sm:p-8 pt-12">
                            {/* TABS */}
                            <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
                                {tabs.map((tab) => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full h-16 sm:h-20 rounded-xl border-4 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${activeTab === tab.id ? "border-blue-500 bg-white shadow-lg translate-y-[-2px]" : "border-gray-200 bg-gray-100 text-gray-500 hover:bg-gray-50"}`}>
                                        <span className="text-xl sm:text-2xl">{tab.icon}</span>
                                        <span className="text-[10px] font-semibold uppercase mt-1">{tab.id}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Brand / Make</label>
                                        <select name="make" value={formData.make} onChange={handleChange} className="w-full mt-1 border border-blue-300 rounded-lg p-3 text-sm outline-none focus:border-blue-500 bg-white cursor-pointer">
                                            <option value="" disabled selected>Select Make</option>
                                            <option value="toyota">Toyota</option>
                                            <option value="honda">Honda</option>
                                            <option value="audi">Mitsubushi</option>
                                            <option value="bmw">Lexus</option>
                                            <option value="mercedes">Mercedes</option>
                                            <option value="audi">Suzuki</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Model</label>
                                        <input name="model" value={formData.model} onChange={handleChange} type="text" placeholder="e.g. Corolla" className="w-full mt-1 border border-blue-300 rounded-lg p-3 text-sm outline-none focus:border-blue-500" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Budget Range</label>
                                        <select name="budget" value={formData.budget} onChange={handleChange} className="w-full mt-1 border border-blue-300 rounded-lg p-3 text-sm outline-none focus:border-blue-500 bg-white cursor-pointer">
                                            <option value="" disabled selected>Select Range</option>
                                            <option value="10-20">$10k - $20k</option>
                                            <option value="20-50">$20k - $50k</option>
                                            <option value="50-100">$50k - $100k</option>
                                            <option value="100+">$100k +</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Year</label>
                                        <select name="year" value={formData.year} onChange={handleChange} className="w-full mt-1 border border-blue-300 rounded-lg p-3 text-sm outline-none focus:border-blue-500 bg-white cursor-pointer">
                                            <option value="">Select Year</option>
                                            <option value="2026">2026</option>
                                            <option value="2025">2025</option>
                                            <option value="2024">2024</option>
                                            <option value="Below 2024">Below 2024</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@example.com" className="w-full mt-1 border border-blue-300 rounded-lg p-3 text-sm outline-none focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                                        <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+61 (555) 000-0000" className="w-full mt-1 border border-blue-300 rounded-lg p-3 text-sm outline-none focus:border-blue-500" />
                                    </div>
                                </div>

                                <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg uppercase cursor-pointer transition-all duration-300 mt-2 text-xs sm:text-sm shadow-sm active:scale-95 flex items-center justify-center gap-2">
                                    Submit Enquiry
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                @keyframes progress-shrink { from { width: 100%; } to { width: 0%; } }
                .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
                .animate-progress-shrink { animation: progress-shrink 2.5s linear forwards; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 20px; }
            `}</style>
        </>
    );
};

export default Bot;