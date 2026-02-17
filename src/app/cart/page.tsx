"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  ShoppingBag,
  CheckCircle2,
  MapPin,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Lock,
  Landmark,
  Banknote,
  Calendar,
  Fuel,
  Gauge,
  Cog,
  ArrowLeft
} from "lucide-react";
import { toast } from 'sonner';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('wire');

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  useEffect(() => {
    setIsClient(true);
    const storedCart = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.error('Vehicle removed from selection');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const cleanPrice = String(item.price).replace(/,/g, '').replace(/[^\d.]/g, '');
      const price = parseFloat(cleanPrice);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate and Submit
  const handleConfirmReservation = () => {
    // Check if any field is empty
    const isValid = Object.values(formData).every(value => value.trim() !== '');

    if (!isValid) {
      toast.error("Please fill in all delivery details to proceed.");
      return;
    }

    setOrderPlaced(true);
  };

  const subtotal = calculateSubtotal();
  const processingFee = 495;
  const total = subtotal + processingFee;

  if (!isClient) return <div className="min-h-screen bg-red-50" />;

  // --- Success State ---
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 size={48} className="text-red-500" />
          </div>
          <h2 className="text-4xl orb font-black text-red-600 uppercase mb-4">Request Sent!</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Your reservation request has been securely transmitted. A dedicated sales concierge will contact you within 24 hours to finalize the wire transfer and shipping logistics.
          </p>
          <Link href="/" className="block w-full py-4 bg-red-500 text-white orb font-bold rounded-xl hover:bg-red-600 transition-all duration-300 cursor-pointer shadow-lg">
            RETURN TO SHOWROOM
          </Link>
        </div>
      </div>
    );
  }

  // --- Empty State ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="bg-black border border-red-200 rounded-3xl p-8 sm:p-10 md:p-16 text-center shadow-sm max-w-lg w-full">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl sm:text-2xl orb font-bold text-red-600 mb-2">Your garage is empty</h2>
          <p className="text-gray-500 mb-8">You haven't selected any vehicles for reservation yet.</p>
          <Link href="/" className="inline-block px-10 py-4 bg-red-500 text-white orb font-bold rounded-xl hover:bg-red-600 transition-all duration-300 shadow-lg shadow-red-200">
            BROWSE INVENTORY
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-10">

      {/* --- Top Header Section --- */}
      <div className="bg-black border-b border-red-800 pt-4 pb-4 z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl orb font-black text-red-600 uppercase tracking-tighter">
                Checkout<span className="text-red-700">.</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1 font-medium flex items-center gap-2">
                Review your selection and finalize reservation
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-full">
                <Lock size={14} className="text-red-600" />
                <span className="text-xs font-bold text-red-800 uppercase tracking-wide">256-Bit Secure SSL</span>
              </div>
              <Link href={"/"} className="flex items-center gap-2 text-xs font-bold text-red-800 uppercase bg-red-50 border border-red-100 px-4 py-2 cursor-pointer rounded-full"><ArrowLeft className="text-red-600" size={17} /> Go Back</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* --- LEFT COLUMN: Items & Form (lg:col-span-8) --- */}
          <div className="lg:col-span-8 space-y-8">

            {/* 1. Cart Items List */}
            <div className="bg-black border border-red-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-red-100 bg-black flex justify-between items-center">
                <h2 className="orb font-bold text-lg text-red-600 uppercase flex items-center gap-2">
                  <ShoppingBag size={18} /> Selected Vehicles ({cartItems.length})
                </h2>
              </div>

              <div className="divide-y divide-red-100">
                {cartItems.map((car) => (
                  <div key={car.id} className="p-6 flex flex-col sm:flex-row gap-6">
                    {/* Image */}
                    <div className="w-full sm:w-48 h-32 relative rounded-xl overflow-hidden bg-red-200 flex-shrink-0 border border-red-100">
                      <Image
                        src={car.images?.[0] || '/placeholder-car.jpg'}
                        alt={car.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm sm:text-base md:text-lg orb font-bold text-red-600 uppercase leading-none">{car.name}</h3>
                          <span className="text-base sm:text-lg orb font-black text-red-600">${car.price}</span>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                          <div className="flex items-center gap-2 text-xs text-gray-500 bg-red-50 p-2 rounded-lg">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="font-semibold text-gray-700">{car.specs?.year || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 bg-red-50 p-2 rounded-lg">
                            <Gauge size={14} className="text-gray-400" />
                            <span className="font-semibold text-gray-700">{car.specs?.mileage || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 bg-red-50 p-2 rounded-lg">
                            <Fuel size={14} className="text-gray-400" />
                            <span className="font-semibold text-gray-700">{car.specs?.fuel || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 bg-red-50 p-2 rounded-lg">
                            <Cog size={14} className="text-gray-400" />
                            <span className="font-semibold text-gray-700">{car.specs?.engine || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(car.id)}
                        className="mt-4 sm:mt-0 self-start text-red-400 hover:text-red-600 flex items-center gap-2 text-xs font-bold uppercase tracking-wide transition-colors duration-300 cursor-pointer"
                      >
                        <Trash2 size={14} /> Remove Vehicle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Delivery & Personal Info */}
            <div className="bg-black border border-red-200 rounded-2xl p-4 md:p-8">
              <h2 className="orb font-bold text-lg text-red-600 uppercase mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-red-600" /> Delivery Details
              </h2>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-red-500 uppercase tracking-wider">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-red-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-red-500 uppercase tracking-wider">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-red-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-red-500 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-red-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-red-500 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-red-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-red-500 uppercase tracking-wider">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-red-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    placeholder="123 Luxury Lane"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold text-red-500 uppercase tracking-wider">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-red-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      placeholder="New York"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-red-500 uppercase tracking-wider">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-red-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      placeholder="NY"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-red-500 uppercase tracking-wider">Zip Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-red-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      placeholder="10001"
                    />
                  </div>
                </div>

                {/* 3. New Payment Method Section */}
                <div className="pt-6 border-t border-red-100">
                  <h3 className="orb font-bold text-lg text-red-600 uppercase mb-4 flex items-center gap-2">
                    <CreditCard size={20} className="text-red-600" /> Payment Method
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Option 1: Wire Transfer */}
                    <label
                      className={`relative border rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center text-center gap-3
                      ${paymentMethod === 'wire' ? 'border-red-500 bg-red-50 ring-1 ring-red-500' : 'border-red-200 hover:border-red-300'}`}
                      onClick={() => setPaymentMethod('wire')}
                    >
                      <div className="bg-red-200 p-2 rounded-full shadow-sm text-red-600">
                        <Landmark size={24} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-base text-gray-900">Wire Transfer</p>
                        <p className="text-xs text-gray-500">1-2 Business Days</p>
                      </div>
                      {paymentMethod === 'wire' && <div className="absolute top-2 right-2 text-red-600"><CheckCircle2 size={16} /></div>}
                    </label>

                    {/* Option 2: Financing */}
                    <label
                      className={`relative border rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center text-center gap-3
                      ${paymentMethod === 'finance' ? 'border-red-500 bg-red-50 ring-1 ring-red-500' : 'border-red-200 hover:border-red-300'}`}
                      onClick={() => setPaymentMethod('finance')}
                    >
                      <div className="bg-red-200 p-2 rounded-full shadow-sm text-red-600">
                        <Banknote size={24} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-base text-red-600">Financing</p>
                        <p className="text-xs text-gray-500">Pre-approval Required</p>
                      </div>
                      {paymentMethod === 'finance' && <div className="absolute top-2 right-2 text-red-600"><CheckCircle2 size={16} /></div>}
                    </label>

                    {/* Option 3: Card Hold */}
                    <label
                      className={`relative border rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center text-center gap-3
                      ${paymentMethod === 'card' ? 'border-red-500 bg-red-50 ring-1 ring-red-500' : 'border-red-200 hover:border-red-300'}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="bg-red-200 p-2 rounded-full shadow-sm text-red-600">
                        <CreditCard size={24} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-base text-red-600">Credit Card</p>
                        <p className="text-xs text-gray-500">Deposit Only ($500)</p>
                      </div>
                      {paymentMethod === 'card' && <div className="absolute top-2 right-2 text-red-600"><CheckCircle2 size={16} /></div>}
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Summary (lg:col-span-4) --- */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="bg-red-900 text-white rounded-2xl p-8 shadow-xl">
              <h2 className="orb font-bold text-lg uppercase mb-6 flex items-center gap-3">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle Subtotal</span>
                  <span className="font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Documentation Fee</span>
                  <span className="font-bold">${processingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Import Duties</span>
                  <span className="text-red-400 font-bold uppercase text-xs bg-red-500/10 px-2 py-0.5 rounded">Calculated at port</span>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4 flex justify-between items-end">
                  <span className="orb font-bold uppercase text-gray-400">Total Est.</span>
                  <span className="text-3xl font-black text-red-500 tracking-tight">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleConfirmReservation}
                className="w-full py-4 bg-red-500 text-white orb font-bold rounded-xl hover:bg-red-600 transition-all flex items-center justify-center gap-2 group shadow-sm shadow-blue-red/20 duration-300 cursor-pointer"
              >
                CONFIRM RESERVATION <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-6 flex items-start gap-3 text-[10px] text-gray-400 leading-normal">
                <ShieldCheck size={32} className="text-red-500 shrink-0" />
                <p>
                  By placing this order, you initiate a reservation hold. No funds are deducted until the final dealer agreement is signed.
                </p>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-black border border-red-200 rounded-xl p-4 flex items-center gap-4">
              <div className="bg-red-50 p-2 rounded-full">
                <ShieldCheck className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-red-600 uppercase orb">Money-Back Guarantee</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Vehicle condition verified on arrival.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;