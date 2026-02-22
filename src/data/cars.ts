// src/data/cars.ts
import { StaticImageData } from "next/image";

// Import your images here (adjust paths as necessary)
import car1 from "@/assets/car1.avif";
import car1_1 from "@/assets/car1-1.avif"
import car1_2 from "@/assets/car1-2.avif"
import car1_3 from "@/assets/car1-3.avif"
import car1_4 from "@/assets/car1-4.avif"
import car1_5 from "@/assets/car1-5.avif"
import car1_6 from "@/assets/car1-6.avif"
import car1_7 from "@/assets/car1-7.avif"

import car2 from "@/assets/car2.avif";
import car2_1 from "@/assets/car2-1.avif"
import car2_2 from "@/assets/car2-2.avif"
import car2_3 from "@/assets/car2-3.avif"
import car2_4 from "@/assets/car2-4.avif"
import car2_5 from "@/assets/car2-5.avif"
import car2_6 from "@/assets/car2-6.avif"
import car2_7 from "@/assets/car2-7.avif"
import car2_8 from "@/assets/car2-8.avif"

import car3 from "@/assets/car3.avif";
import car3_1 from "@/assets/car3-1.avif"
import car3_2 from "@/assets/car3-2.avif"
import car3_3 from "@/assets/car3-3.avif"
import car3_4 from "@/assets/car3-4.avif"
import car3_5 from "@/assets/car3-5.avif"
import car3_6 from "@/assets/car3-6.avif"
import car3_7 from "@/assets/car3-7.avif"
import car3_8 from "@/assets/car3-8.avif"

import car4 from "@/assets/car4.avif";
import car4_1 from "@/assets/car4-1.avif"
import car4_2 from "@/assets/car4-2.avif"
import car4_3 from "@/assets/car4-3.avif"
import car4_4 from "@/assets/car4-4.avif"
import car4_5 from "@/assets/car4-5.avif"
import car4_6 from "@/assets/car4-6.avif"
import car4_7 from "@/assets/car4-7.avif"

import car5 from "@/assets/car5.avif";
import car5_1 from "@/assets/car5-1.avif"
import car5_2 from "@/assets/car5-2.avif"
import car5_3 from "@/assets/car5-3.avif"
import car5_4 from "@/assets/car5-4.avif"
import car5_5 from "@/assets/car5-5.avif"
import car5_6 from "@/assets/car5-6.avif"
import car5_7 from "@/assets/car5-7.avif"
import car5_8 from "@/assets/car5-8.avif"

import car6 from "@/assets/car6.avif";
import car6_1 from "@/assets/car6-1.avif"
import car6_2 from "@/assets/car6-2.avif"
import car6_3 from "@/assets/car6-3.avif"
import car6_4 from "@/assets/car6-4.avif"
import car6_5 from "@/assets/car6-5.avif"
import car6_6 from "@/assets/car6-6.avif"
import car6_7 from "@/assets/car6-7.avif"
import car6_8 from "@/assets/car6-8.avif"

import car7 from "@/assets/car7.avif";
import car7_1 from "@/assets/car7-1.avif"
import car7_2 from "@/assets/car7-2.avif"
import car7_3 from "@/assets/car7-3.avif"
import car7_4 from "@/assets/car7-4.avif"
import car7_5 from "@/assets/car7-5.avif"
import car7_6 from "@/assets/car7-6.avif"
import car7_7 from "@/assets/car7-7.avif"
import car7_8 from "@/assets/car7-8.avif"

import car8 from "@/assets/car8.avif";
import car8_1 from "@/assets/car8-1.avif"
import car8_2 from "@/assets/car8-2.avif"
import car8_3 from "@/assets/car8-3.avif"
import car8_4 from "@/assets/car8-4.avif"
import car8_5 from "@/assets/car8-5.avif"
import car8_6 from "@/assets/car8-6.avif"
import car8_7 from "@/assets/car8-7.avif"
import car8_8 from "@/assets/car8-8.avif"

import car9 from "@/assets/car9.avif";
import car9_1 from "@/assets/car9-1.avif"
import car9_2 from "@/assets/car9-2.avif"
import car9_3 from "@/assets/car9-3.avif"
import car9_4 from "@/assets/car9-4.avif"
import car9_5 from "@/assets/car9-5.avif"
import car9_6 from "@/assets/car9-6.avif"
import car9_7 from "@/assets/car9-7.avif"
import car9_8 from "@/assets/car9-8.avif"

import car10 from "@/assets/car10.avif";
import car10_1 from "@/assets/car10-1.avif"
import car10_2 from "@/assets/car10-2.avif"
import car10_3 from "@/assets/car10-3.avif"
import car10_4 from "@/assets/car10-4.avif"
import car10_5 from "@/assets/car10-5.avif"
import car10_6 from "@/assets/car10-6.avif"
import car10_7 from "@/assets/car10-7.avif"

import car11 from "@/assets/car11.avif";
import car11_1 from "@/assets/car11-1.avif"
import car11_2 from "@/assets/car11-2.avif"
import car11_3 from "@/assets/car11-3.avif"
import car11_4 from "@/assets/car11-4.avif"
import car11_5 from "@/assets/car11-5.avif"
import car11_6 from "@/assets/car11-6.avif"
import car11_7 from "@/assets/car11-7.avif"

import car12 from "@/assets/car12.avif";
import car12_1 from "@/assets/car12-1.avif"
import car12_2 from "@/assets/car12-2.avif"
import car12_3 from "@/assets/car12-3.avif"
import car12_4 from "@/assets/car12-4.avif"
import car12_5 from "@/assets/car12-5.avif"
import car12_6 from "@/assets/car12-6.avif"
import car12_7 from "@/assets/car12-7.avif"
import car12_8 from "@/assets/car12-8.avif"

import car13 from "@/assets/car13.avif";
import car13_1 from "@/assets/car13-1.avif"
import car13_2 from "@/assets/car13-2.avif"
import car13_3 from "@/assets/car13-3.avif"
import car13_4 from "@/assets/car13-4.avif"
import car13_5 from "@/assets/car13-5.avif"
import car13_6 from "@/assets/car13-6.avif"

import car14 from "@/assets/car14.avif";
import car14_1 from "@/assets/car14-1.avif"
import car14_2 from "@/assets/car14-2.avif"
import car14_3 from "@/assets/car14-3.avif"
import car14_4 from "@/assets/car14-4.avif"
import car14_5 from "@/assets/car14-5.avif"
import car14_6 from "@/assets/car14-6.avif"
import car14_7 from "@/assets/car14-7.avif"

import car15 from "@/assets/car15.avif";
import car15_1 from "@/assets/car15-1.avif"
import car15_2 from "@/assets/car15-2.avif"
import car15_3 from "@/assets/car15-3.avif"
import car15_4 from "@/assets/car15-4.avif"
import car15_5 from "@/assets/car15-5.avif"
import car15_6 from "@/assets/car15-6.avif"
import car15_7 from "@/assets/car15-7.avif"

import car16 from "@/assets/car16.avif";
import car16_1 from "@/assets/car16-1.avif"
import car16_2 from "@/assets/car16-2.avif"
import car16_3 from "@/assets/car16-3.avif"
import car16_4 from "@/assets/car16-4.avif"
import car16_5 from "@/assets/car16-5.avif"
import car16_6 from "@/assets/car16-6.avif"

import car17 from "@/assets/car17.avif";
import car17_1 from "@/assets/car17-1.avif"
import car17_2 from "@/assets/car17-2.avif"
import car17_3 from "@/assets/car17-3.avif"
import car17_4 from "@/assets/car17-4.avif"
import car17_5 from "@/assets/car17-5.avif"

import car18 from "@/assets/car18.avif";
import car18_1 from "@/assets/car18-1.avif"
import car18_2 from "@/assets/car18-2.avif"
import car18_3 from "@/assets/car18-3.avif"
import car18_4 from "@/assets/car18-4.avif"
import car18_5 from "@/assets/car18-5.avif"
import car18_6 from "@/assets/car18-6.avif"

import car19 from "@/assets/car19.avif";
import car19_1 from "@/assets/car19-1.avif"
import car19_2 from "@/assets/car19-2.avif"
import car19_3 from "@/assets/car19-3.avif"
import car19_4 from "@/assets/car19-4.avif"
import car19_5 from "@/assets/car19-5.avif"
import car19_6 from "@/assets/car19-6.avif"
import car19_7 from "@/assets/car19-7.avif"
import car19_8 from "@/assets/car19-8.avif"

import car20_1 from "@/assets/car20-1.jpg"
import car20_2 from "@/assets/car20-2.jpg"
import car20_3 from "@/assets/car20-3.jpg"
import car20_4 from "@/assets/car20-4.jpg"
import car20_5 from "@/assets/car20-5.jpg"
import car20_6 from "@/assets/car20-6.jpg"
import car20_7 from "@/assets/car20-7.jpg"
import car20_8 from "@/assets/car20-8.jpg"
import car20_9 from "@/assets/car20-9.jpg"

import car21_1 from "@/assets/car21-1.jpg"
import car21_2 from "@/assets/car21-2.jpg"
import car21_3 from "@/assets/car21-3.jpg"
import car21_4 from "@/assets/car21-4.jpg"
import car21_5 from "@/assets/car21-5.jpg"
import car21_6 from "@/assets/car21-6.jpg"
import car21_7 from "@/assets/car21-7.jpg"

import car22_1 from "@/assets/car22-1.jpg"
import car22_2 from "@/assets/car22-2.jpg"
import car22_3 from "@/assets/car22-3.jpg"
import car22_4 from "@/assets/car22-4.jpg"
import car22_5 from "@/assets/car22-5.jpg"
import car22_6 from "@/assets/car22-6.jpg"
import car22_7 from "@/assets/car22-7.jpg"
import car22_8 from "@/assets/car22-8.jpg"

import car23_1 from "@/assets/car23-1.jpg"
import car23_2 from "@/assets/car23-2.jpg"
import car23_3 from "@/assets/car23-3.jpg"
import car23_4 from "@/assets/car23-4.jpg"
import car23_5 from "@/assets/car23-5.jpg"
import car23_6 from "@/assets/car23-6.jpg"
import car23_7 from "@/assets/car23-7.jpg"
import car23_8 from "@/assets/car23-8.jpg"
import car23_9 from "@/assets/car23-9.jpg"

import car24_1 from "@/assets/car24-1.jpg"
import car24_2 from "@/assets/car24-2.jpg"
import car24_3 from "@/assets/car24-3.jpg"
import car24_4 from "@/assets/car24-4.jpg"
import car24_5 from "@/assets/car24-5.jpg"
import car24_6 from "@/assets/car24-6.jpg"
import car24_7 from "@/assets/car24-7.jpg"
import car24_8 from "@/assets/car24-8.jpg"

import car25_1 from "@/assets/car25-1.jpg"
import car25_2 from "@/assets/car25-2.jpg"
import car25_3 from "@/assets/car25-3.jpg"
import car25_4 from "@/assets/car25-4.jpg"
import car25_5 from "@/assets/car25-5.jpg"

import car26_1 from "@/assets/car26-1.jpg"
import car26_2 from "@/assets/car26-2.jpg"
import car26_3 from "@/assets/car26-3.jpg"
import car26_4 from "@/assets/car26-4.jpg"
import car26_5 from "@/assets/car26-5.jpg"
import car26_6 from "@/assets/car26-6.jpg"

import car27_1 from "@/assets/car27-1.jpg"
import car27_2 from "@/assets/car27-2.jpg"
import car27_3 from "@/assets/car27-3.jpg"
import car27_4 from "@/assets/car27-4.jpg"
import car27_5 from "@/assets/car27-5.jpg"
import car27_6 from "@/assets/car27-6.jpg"
import car27_7 from "@/assets/car27-7.jpg"
import car27_8 from "@/assets/car27-8.jpg"
import car27_9 from "@/assets/car27-9.jpg"

import car28_1 from "@/assets/car28-1.jpg"
import car28_2 from "@/assets/car28-2.jpg"
import car28_3 from "@/assets/car28-3.jpg"
import car28_4 from "@/assets/car28-4.jpg"
import car28_5 from "@/assets/car28-5.jpg"
import car28_6 from "@/assets/car28-6.jpg"
import car28_7 from "@/assets/car28-7.jpg"

import car29_1 from "@/assets/car29-1.jpg"
import car29_2 from "@/assets/car29-2.jpg"
import car29_3 from "@/assets/car29-3.jpg"
import car29_4 from "@/assets/car29-4.jpg"
import car29_5 from "@/assets/car29-5.jpg"

import car30_1 from "@/assets/car30-1.jpg"
import car30_2 from "@/assets/car30-2.jpg"
import car30_3 from "@/assets/car30-3.jpg"
import car30_4 from "@/assets/car30-4.jpg"
import car30_5 from "@/assets/car30-5.jpg"
import car30_6 from "@/assets/car30-6.jpg"

import car31_1 from "@/assets/car31-1.jpg"
import car31_2 from "@/assets/car31-2.jpg"
import car31_3 from "@/assets/car31-3.jpg"
import car31_4 from "@/assets/car31-4.jpg"
import car31_5 from "@/assets/car31-5.jpg"
import car31_6 from "@/assets/car31-6.jpg"

export interface CarDetails {
    id: number;
    name: string;
    tagline: string;
    price: string;
    description: string;
    specs: {
        mileage: string;
        engine: string;
        transmission: string;
        fuel: string;
        year: string;
        color: string;
    };
    highlights: string[];
    images: StaticImageData[]; // Array of images for gallery
    dealer: string;
    dealerLocation: string;
    license: string;
}

export const allCars: CarDetails[] = [
    {
        id: 0,
        name: "Toyota Prius 2011",
        tagline: "Reliable Hybrid Technology - Excellent Economy",
        price: "SOLD",
        description: "SOLD - This 2011 Toyota Prius represents the gold standard in hybrid efficiency. Perfect for city driving and long commutes alike, it offers exceptional fuel economy without compromising on space or comfort. Meticulously maintained and ready for its next owner.",
        specs: { mileage: "64,000 km", engine: "1.8L Hybrid", transmission: "CVT", fuel: "Hybrid", year: "2011", color: "Pearl White" },
        highlights: ["Push Button Start", "Reverse Camera", "Keyless Entry", "Climate Control", "Bluetooth Connectivity"],
        images: [car1_1, car1_2, car1_3, car1_4, car1_5, car1_6, car1_7],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 1,
        name: "Toyota Crown Sedan 2010",
        tagline: "Luxury Meets Reliability - V6 Power",
        price: "SOLD",
        description: "SOLD - Experience true luxury with the Toyota Crown. This sedan offers a whisper-quiet cabin, premium materials, and a smooth ride that rivals European competitors at a fraction of the cost.",
        specs: { mileage: "89,000 km", engine: "3.5L V6", transmission: "Automatic", fuel: "Petrol", year: "2010", color: "Black" },
        highlights: ["Leather Seats", "Electric Power Seats", "Soft Close Doors", "Premium Sound System", "Cruise Control"],
        images: [car2_1, car2_2, car2_3, car2_4, car2_5, car2_6, car2_7, car2_8],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 2,
        name: "Honda Vezel 2014",
        tagline: "Compact SUV with Hybrid Efficiency",
        price: "SOLD",
        description: "SOLD - The Honda Vezel (HR-V) combines the practicality of an SUV with the fuel efficiency of a hybrid hatch. Its magic seats offer versatile cargo options perfect for active lifestyles.",
        specs: { mileage: "99,000 km", engine: "1.5L Hybrid", transmission: "Automatic", fuel: "Hybrid", year: "2014", color: "Silver" },
        highlights: ["Magic Seats", "Sport Mode", "Paddle Shifters", "Touchscreen Display", "LED Headlights"],
        images: [car3_1, car3_2, car3_3, car3_4, car3_5, car3_6, car3_7, car3_8],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 3,
        name: "LEXUS LS460 V8 2012",
        tagline: "The Pinnacle of Japanese Luxury",
        price: "SOLD",
        description: "SOLD - A flagship luxury sedan powered by a silky smooth V8 engine. The LS460 offers an abundance of power, sophisticated technology, and world-class comfort.",
        specs: { mileage: "93,000 km", engine: "4.6L V8", transmission: "8-Speed Auto", fuel: "Petrol", year: "2012", color: "Black" },
        highlights: ["Mark Levinson Audio", "Heated/Cooled Seats", "Sunroof", "Air Suspension", "Radar Cruise Control"],
        images: [car4_1, car4_2, car4_3, car4_4, car4_5, car4_6, car4_7],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 4,
        name: "Lexus LS460 2006, V8 Luxury",
        tagline: "Classic V8 Power and Comfort",
        price: "34,500",
        description: "An iconic model that redefined the luxury market. This 2006 LS460 has been kept in pristine condition and offers a driving experience that is still superior to many modern cars.",
        specs: { mileage: "135,000 km", engine: "4.6L V8", transmission: "Automatic", fuel: "Petrol", year: "2006", color: "Silver" },
        highlights: ["Wood Grain Trim", "Memory Seats", "Rear Shade", "Parking Sensors", "Dual Zone Climate"],
        images: [car5_1, car5_2, car5_3, car5_4, car5_5, car5_6, car5_7, car5_8],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 5,
        name: "Mitsubishi Lancer Evolution 2007",
        tagline: "Rally Bred Performance Icon",
        price: "SOLD",
        description: "SOLD - A legend of the streets. The Lancer Evolution offers raw, turbocharged performance and incredible handling dynamics thanks to its advanced all-wheel-drive system.",
        specs: { mileage: "50,200 km", engine: "2.0L Turbo", transmission: "Dual-Clutch", fuel: "Petrol", year: "2007", color: "Red" },
        highlights: ["Recaro Seats", "Brembo Brakes", "AWC System", "Turbocharged", "Sport Suspension"],
        images: [car6_1, car6_2, car6_3, car6_4, car6_5, car6_6, car6_7, car6_8],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 6,
        name: "Lexus LS460 V8 2007",
        tagline: "Executive Travel at its Best",
        price: "SOLD",
        description: "SOLD - Another fine example of the LS460 lineage. This vehicle offers exceptional value for money, giving you access to V8 power and luxury for the price of a standard hatchback.",
        specs: { mileage: "154,000 km", engine: "4.6L V8", transmission: "Automatic", fuel: "Petrol", year: "2007", color: "Grey" },
        highlights: ["Leather Interior", "Navigation System", "Alloy Wheels", "Auto Headlights", "Rain Sensing Wipers"],
        images: [car7_1, car7_2, car7_3, car7_4, car7_5, car7_6, car7_7, car7_8],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 7,
        name: "Toyota C-HR Hybrid G Mode-Nero",
        tagline: "Stylish Crossover with Hybrid Tech",
        price: "SOLD",
        description: "SOLD - The C-HR stands out with its futuristic design. The G Mode-Nero edition adds stylish black accents and premium interior features to this fuel-sipping hybrid.",
        specs: { mileage: "60,000 km", engine: "1.8L Hybrid", transmission: "CVT", fuel: "Hybrid", year: "2018", color: "Two-Tone" },
        highlights: ["Blind Spot Monitor", "Lane Assist", "Heated Seats", "Nero Styling Pack", "Adaptive Cruise"],
        images: [car8_1, car8_2, car8_3, car8_4, car8_5, car8_6, car8_7, car8_8],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 8,
        name: "Mercedes-Benz S400h Hybrid",
        tagline: "German Engineering, Hybrid Efficiency",
        price: "SOLD",
        description: "SOLD - The S-Class is the benchmark for luxury. This S400h combines Mercedes prestige with hybrid technology for a quieter, more efficient executive transport.",
        specs: { mileage: "40,000 km", engine: "3.5L Hybrid", transmission: "Automatic", fuel: "Hybrid", year: "2015", color: "Black" },
        highlights: ["Burmester Sound", "Panoramic Roof", "Massage Seats", "Digital Dash", "Ambient Lighting"],
        images: [car9_1, car9_2, car9_3, car9_4, car9_5, car9_6, car9_7, car9_8],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 9,
        name: "Honda Grace Hybrid EX 2015",
        tagline: "Compact Sedan Perfection",
        price: "SOLD",
        description: "SOLD - The Honda Grace is the sedan version of the Fit/Jazz. It offers immense reliability, great fuel economy, and a surprisingly spacious interior.",
        specs: { mileage: "43,000 km", engine: "1.5L Hybrid", transmission: "DCT", fuel: "Hybrid", year: "2015", color: "Pearl White" },
        highlights: ["Paddle Shifters", "Smart Key", "LED Lights", "Rear Vents", "Econ Mode"],
        images: [car10_1, car10_2, car10_3, car10_4, car10_5, car10_6, car10_7],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 10,
        name: "Toyota Yaris Hybrid G AWD 2020",
        tagline: "Modern, Safe, and AWD",
        price: "SOLD",
        description: "SOLD - A late-model Yaris with the added safety of All-Wheel Drive. Packed with Toyota's latest Safety Sense technology and incredibly fuel efficient.",
        specs: { mileage: "10,000 km", engine: "1.5L Hybrid", transmission: "CVT", fuel: "Hybrid", year: "2020", color: "Red" },
        highlights: ["Apple CarPlay", "Lane Trace Assist", "Pre-Collision Safety", "AWD System", "Digital Cluster"],
        images: [car11_1, car11_2, car11_3, car11_4, car11_5, car11_6, car11_7],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 11,
        name: "Lexus LS460 V8 RWD 2013",
        tagline: "Updated Facelift Model",
        price: "SOLD",
        description: "SOLD - The 2013 facelift brought the spindle grille and modernized interior to the LS460. A stunning vehicle that commands respect on the road.",
        specs: { mileage: "80,000 km", engine: "4.6L V8", transmission: "8-Speed Auto", fuel: "Petrol", year: "2013", color: "White" },
        highlights: ["Spindle Grille", "Updated Infotainment", "Blind Spot Monitor", "Soft Close Doors", "19-inch Alloys"],
        images: [car12_1, car12_2, car12_3, car12_4, car12_5, car12_6, car12_7, car12_8],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 12,
        name: "Honda Fit Hybrid eHEV",
        tagline: "The Ultimate City Hatchback",
        price: "SOLD",
        description: "SOLD - The new generation Fit (Jazz) features the e:HEV system which feels more like an EV to drive. Incredible visibility and best-in-class space.",
        specs: { mileage: "10,000 km", engine: "1.5L e:HEV", transmission: "e-CVT", fuel: "Hybrid", year: "2021", color: "Blue" },
        highlights: ["Honda Sensing", "Electronic Parking Brake", "Magic Seats", "Digital Cockpit", "LED Projectors"],
        images: [car13_1, car13_2, car13_3, car13_4, car13_5, car13_6],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 13,
        name: "Suzuki Swift Hybrid Hatchback",
        tagline: "JDM Ultra-Efficient Hatchback",
        price: "SOLD",
        description: "SOLD - Imported directly from the JDM market, this Swift features the mild-hybrid system for superior economy. Sporty handling meets frugal running costs.",
        specs: { mileage: "40,000 km", engine: "1.2L Hybrid", transmission: "CVT", fuel: "Hybrid", year: "2017", color: "Black" },
        highlights: ["Paddle Shifters", "Mild Hybrid", "Sport Seats", "Keyless Start", "Alloy Wheels"],
        images: [car14_1, car14_2, car14_3, car14_4, car14_5, car14_6, car14_7],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 14,
        name: "Honda Fit Hybrid 2018",
        tagline: "Sporty Facelift Model",
        price: "SOLD",
        description: "SOLD - The 2018 facelift Fit Hybrid offers sharper styling and improved DCT transmission tuning. A reliable, fun-to-drive daily driver.",
        specs: { mileage: "55,000 km", engine: "1.5L Hybrid", transmission: "DCT", fuel: "Hybrid", year: "2018", color: "Grey" },
        highlights: ["S-Package Styling", "LED Lights", "Cruise Control", "Safety Sense", "Reverse Cam"],
        images: [car15_1, car15_2, car15_3, car15_4, car15_5, car15_6, car15_7],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 15,
        name: "Toyota Crown RS Advance 2019",
        tagline: "The Future of Japanese Luxury",
        price: "SOLD",
        description: "SOLD - The 15th Generation Crown is a technological marvel. The RS Advance trim offers sporty suspension and aggressive styling coupled with next-gen connectivity.",
        specs: { mileage: "40,000 km", engine: "2.5L Hybrid", transmission: "CVT", fuel: "Hybrid", year: "2019", color: "White" },
        highlights: ["Connected Services", "Lane Tracing", "Heads Up Display", "Digital Mirror", "RS Bodykit"],
        images: [car16_1, car16_2, car16_3, car16_4, car16_5, car16_6],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 16,
        name: "Lexus LS460 V8 RWD 2007",
        tagline: "Timeless Elegance",
        price: "SOLD",
        description: "SOLD - A low mileage example of the classic LS460. These vehicles are known to last for hundreds of thousands of kilometers with basic maintenance.",
        specs: { mileage: "200,000 km", engine: "4.6L V8", transmission: "Automatic", fuel: "Petrol", year: "2007", color: "Silver" },
        highlights: ["Mark Levinson", "Sunroof", "Leather", "Parking Assist", "Keyless Go"],
        images: [car17_1, car17_2, car17_3, car17_4, car17_5],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 17,
        name: "Honda Vezel Hybrid 2014",
        tagline: "Best Selling Compact SUV",
        price: "SOLD",
        description: "SOLD - Another great Vezel option in a different colorway. High driving position, great economy, and Honda reliability make this a top choice.",
        specs: { mileage: "60,000 km", engine: "1.5L Hybrid", transmission: "Automatic", fuel: "Hybrid", year: "2014", color: "Red" },
        highlights: ["Electric Park Brake", "City Brake Assist", "Eco Assist", "Folding Mirrors", "Climate Control"],
        images: [car18_1, car18_2, car18_3, car18_4, car18_5, car18_6],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 18,
        name: "Toyota C-HR Hybrid 2018",
        tagline: "Urban Crossover",
        price: "SOLD",
        description: "SOLD - Designed for the urban jungle. The C-HR handles like a hatchback but rides like an SUV. Hybrid powertrain ensures visits to the petrol station are rare.",
        specs: { mileage: "50,000 km", engine: "1.8L Hybrid", transmission: "CVT", fuel: "Hybrid", year: "2018", color: "Metal Stream" },
        highlights: ["Toyota Safety Sense", "Dual Zone Climate", "Auto High Beam", "8-inch Screen", "Alloy Wheels"],
        images: [car19_1, car19_2, car19_3, car19_4, car19_5, car19_6, car19_7, car19_8],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 19,
        name: "2007 LEXUS LS600HL V8 5000CC",
        tagline: "Dual-zone automatic Climate Control",
        price: "29,000",
        description: "The LS600hL is the long-wheelbase hybrid version of the LS460. It offers rear-seat luxury and a powerful V8 hybrid system for effortless cruising.",
        specs: { mileage: "72,000 km", engine: "5.0L V8 Hybrid", transmission: "Hyrid", fuel: "Hybrid", year: "2007", color: "Black" },
        highlights: [
            "439hp stock", "Fledermaus Cuervo 21 inch wheels", "Long wheel base", "Rare spec in prestine condition", "Mark levinson Sound system", "Adjustable suspension", "Soft closing doors", "2x keys", "Dual-zone automatic Climate Control", "Power-Adjustable Front Seats", "Memory Front Seats", "Front & rear Heated & ventilated seats", "Keyless Entry & Push-button start", "Pre-Collision System", "Lane Departure Alert", "Adaptive Cruise Control", "Premium wood trim"
        ],
        images: [car20_1, car20_2, car20_3, car20_4, car20_5, car20_6, car20_7, car20_8, car20_9],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 20,
        name: "2013 BMW M5 F10 4.4L TWIN TURBO V8",
        tagline: "Finished in Bmw individual Frozen Blue Matte Metallic",
        price: "48,499",
        description: "The F10 M5 is a high-performance sedan that combines luxury with blistering speed. The 4.4L twin-turbo V8 produces 560hp, making it one of the most powerful sedans of its era. This particular example is finished in the rare Frozen Blue Matte Metallic, making it a true head-turner on the road.",
        specs: { mileage: "123,000 km", engine: "4.4L V8", transmission: "Automatic", fuel: "Hybrid", year: "2013", color: "Frozen Blue Matte Metallic" },
        highlights: [
            "Finished in Bmw individual Frozen Blue Matte Metallic", "4.4L Twin turbo V8", "7 speed sports Dual Clutch", "2x keys", "Ventilated/Heated luxury seating", "Electric side blind package", "Bmw connect drive option", "Remote central locking", "Regenerative brakes", "360 parking sensors", "Available for immediate Delivery", "Finance Available", "Alot more"],
        images: [car21_1, car21_2, car21_3, car21_4, car21_5, car21_6, car21_7],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 21,
        name: "2024 Yaris Hybrid 4WD",
        tagline: "Brand new condition not a single scratch on the car",
        price: "SOLD",
        description: "This 2024 Yaris Hybrid 4WD is in pristine condition with only 6,500 km on the clock. It combines the latest hybrid technology with the added traction of all-wheel drive, making it perfect for any driving conditions. The car is loaded with features and has been meticulously maintained, ensuring it looks and drives like new.",
        specs: { mileage: "6500 km", engine: "1.5L Hybrid", transmission: "Hybrid", fuel: "Hybrid", year: "2024", color: "Red" },
        highlights: [
            "Apple carplay + Android Auto", "Reverse camera", "360 parking sensors", "Hybrid", "Brand new condition not a single scratch on the car", "Premium audio system with six speakers and DAB+ for rich sound clarity", "ABS, EBD, brake assist, traction and stability control, hill-start assist, and lane departure warning", "Also include cross-traffic alert,rear-camera assistance, and automatic braking for pedestrian and collision avoidance", "Enhancement packs for luxury and tech features", "4 Driving modes Eco/Ev/Normal/Sports", "Push Start", "Service history & logbooks", "Electric Folding mirrors", "Optional 1,3 and 5 years hybrid battery warranty available", "Finance Available", "Rent to own Available", "Genuine odometer reading that can be verified through japnese Auction sheet,Export documents & Australian compliance certificate."],
        images: [car22_1, car22_2, car22_3, car22_4, car22_5, car22_6, car22_7, car22_8],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 22,
        name: "2009 Crown 3.5L V6 Hybrid",
        tagline: "Clean 10/10 condition no scratches or dent",
        price: "SOLD",
        description: "This 2009 Crown 3.5L V6 Hybrid is a rare find in such immaculate condition. With only 107,000 km on the odometer, this vehicle has been meticulously cared for and maintained. The hybrid powertrain offers a perfect blend of performance and efficiency, while the luxurious interior ensures a comfortable ride. Whether you're looking for a reliable daily driver or a stylish executive car, this Crown delivers on all fronts.",
        specs: { mileage: "107,000 km", engine: "3.5L Hybrid", transmission: "Hybrid", fuel: "Hybrid", year: "2009", color: "Off White" },
        highlights: [
            "1 Year Rego + CTP Included", "2x keys", "Keyless entry + Push Start", "Cruise control", "3.5L Hybrid", "Auto mirrors", "Full service history & log books", "Premium interior", "Driving modes,(Sports,Snow,Eco,Ev)", "Clean 10/10 condition no scratches or dent", "Reverse camera", "Finance Available", "Rent to own Available", "Alot more"],
        images: [car23_1, car23_2, car23_3, car23_4, car23_5, car23_6, car23_7, car23_8, car23_9],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 23,
        name: "2018 Toyota Prius C Hyrbid",
        tagline: "Eligible for Uber X , Didi, Ubereats Etc",
        price: "SOLD",
        description: "This 2018 Toyota Prius C Hybrid is a reliable and fuel-efficient hybrid vehicle. With only 109,000 km on the odometer, it's in excellent condition and ready for immediate delivery. The Prius C is perfect for city driving, offering a compact size and impressive fuel economy. Whether you're looking for a daily commuter or a practical ride for ridesharing, this Prius C delivers on all fronts.",
        specs: { mileage: "109,000 km", engine: "4.0L Hybrid", transmission: "Hybrid", fuel: "Hybrid", year: "2018", color: "Blue" },
        highlights: [
            "1 Year rego & ctp", "Keyless entry + Push Start", "Cruise control", "2x keys", "Hybrid", "Multimedia Steering wheel", "360 Parking sensors", "Auto mirrors", "Driving modes,(Sports,Eco,Ev)", "Reverse camera + Dashcam", "Optional 1, 3 & 5 Years Hybrid battery warranty Available", "Alot more"],
        images: [car24_1, car24_2, car24_3, car24_4, car24_5, car24_6, car24_7, car24_8],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 24,
        name: "2014 Toyota Prius c / Aqua",
        tagline: "Eligible for Uber X, UberEats, Didi, DoorDash etc",
        price: "SOLD",
        description: "This 2014 Toyota Prius c / Aqua is a reliable and fuel-efficient hybrid vehicle. With only 14,300 km on the odometer, it's in excellent condition and ready for immediate delivery. The Prius c is perfect for city driving, offering a compact size and impressive fuel economy. Whether you're looking for a daily commuter or a practical ride for ridesharing, this Prius c delivers on all fronts.",
        specs: { mileage: "14,300 km", engine: "3.9L Hybrid", transmission: "Hybrid", fuel: "Hybrid", year: "2014", color: "Red" },
        highlights: [
            "1 year Rego & Ctp", "Has a sporty look and feel to it with a very comfortable drive and cheap to run.", "Has a sporty look and feel to it with a very comfortable drive and cheap to run.", "Retractable mirrors", "Reverse camera", "Push start", "Keyless entry", "Cruise control", "Multimedia steering wheel", "Parking sensors", "Apple carply", "Traction control", "Eco mode", "Sports mode", "All 4 tyres like new"],
        images: [car25_1, car25_2, car25_3, car25_4, car25_5],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 25,
        name: "2020 YARIS HYBRID X 4WD",
        tagline: "1 year Rego & Ctp",
        price: "SOLD",
        description: "This 2020 Toyota Yaris Hybrid X 4WD is a reliable and fuel-efficient hybrid vehicle. With only 117,000 km on the odometer, it's in excellent condition and ready for immediate delivery. The Yaris Hybrid is perfect for city driving, offering a compact size and impressive fuel economy. Whether you're looking for a daily commuter or a practical ride for ridesharing, this Yaris Hybrid delivers on all fronts.",
        specs: { mileage: "117,000 km", engine: "3.0L Hybrid", transmission: "Hybrid", fuel: "Hybrid", year: "2020", color: "White" },
        highlights: [
            "Keyless entry (2x keys)", "Hybrid", "Premium audio system with six speakers and DAB+ for rich sound clarity", "Parking sensors", "Safety levels equipped with multiple airbags, ABS, EBD, brake assist, traction and stability control, hill-start assist, and lane departure warning", "Also include cross-traffic alert, blind-spot monitoring automatic braking for pedestrian and collision avoidance", "Premium fabric seats", "4 Driving modes Eco/Ev/Normal/Sports", "Push Start", "Infotainment system", "Gps Navigation", "New tyres", "ALOT MORE"],
        images: [car26_1, car26_2, car26_3, car26_4, car26_5, car26_6],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 26,
        name: "2020 YARIS HYBRID Z 4WD",
        tagline: "1 year Rego & Ctp",
        price: "SOLD",
        description: "This 2020 Toyota Yaris Hybrid Z 4WD is a reliable and fuel-efficient hybrid vehicle. With only 117,000 km on the odometer, it's in excellent condition and ready for immediate delivery. The Yaris Hybrid is perfect for city driving, offering a compact size and impressive fuel economy. Whether you're looking for a daily commuter or a practical ride for ridesharing, this Yaris Hybrid delivers on all fronts.",
        specs: { mileage: "117,000 km", engine: "1.5L Hybrid", transmission: "Hybrid", fuel: "Hybrid", year: "2020", color: "Blue" },
        highlights: [
            "Two tone interior", "Heads up Display", "Keyless entry (2x keys)", "Hybrid", "Led Hid’s sporty appearance", "Premium audio system with six speakers and DAB+ for rich sound clarity", "Parking sensors", "Safety levels equipped with multiple airbags, ABS, EBD, brake assist, traction and stability control, hill-start assist, and lane departure warning", "Also include cross-traffic alert, blind-spot monitoring, rear-camera assistance, and automatic braking for pedestrian and collision avoidance", "Premium leather & fabric two tone interior", "Enhancement packs for added luxury and tech features", "Heated seats", "4 Driving modes Eco/Ev/Normal/Sports", "Push Start", "Electric Folding mirrors", "Reverse Camera + 360 Camera", "Dashcam hard wired installed ($600)", "Infotainment system", "Gps Navigation", "New battery", "New tyres", "ALOT MORE"],
        images: [car27_1, car27_2, car27_3, car27_4, car27_5, car27_6, car27_7, car27_8, car27_9],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 27,
        name: "2014 LEXUS CT200H F SPORT",
        tagline: "1 year Rego & Ctp",
        price: "SOLD",
        description: "This 2014 Lexus CT200H F Sport is a stylish and well-maintained hybrid luxury vehicle. With only 79,000 km on the odometer, it's in excellent condition and ready for immediate delivery. The CT200H F Sport combines luxury with practicality, offering a comfortable ride and advanced features. Whether you're looking for a daily commuter or a premium ride for business or leisure, this CT200H delivers on all fronts.",
        specs: { mileage: "79,000 km", engine: "4.0L Hybrid", transmission: "Hybrid", fuel: "Hybrid", year: "2014", color: "Silver" },
        highlights: [
            "Aggressive grille, spoiler, 17″ wheels, unique colours", "Plush F Sport seats, steering wheel, pedals, premium trims", "Enhancement packs for added luxury and tech features", "Hybrid", "Full Service History & Log books", "Well Maintained", "Heated seats", "Electric seats", "4 Driving modes Eco/Ev/Normal/Sports", "Push Start", "Electric Folding mirrors", "Reverse Camera", "Infotainment system", "Gps Navigation", "Automatic seats with Lumbar Support", "ALOT MORE"],
        images: [car28_1, car28_2, car28_3, car28_4, car28_5, car28_6, car28_7],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 28,
        name: "2020 Lexus Ct200h Hybrid",
        tagline: "4 months rego",
        price: "SOLD",
        description: "This 2020 Lexus CT200H Hybrid is a well-maintained hybrid luxury vehicle. With only 188,000 km on the odometer, it's in excellent condition and ready for immediate delivery. The CT200H Hybrid combines luxury with practicality, offering a comfortable ride and advanced features. Whether you're looking for a daily commuter or a premium ride for business or leisure, this CT200H delivers on all fronts.",
        specs: { mileage: "188,000 km", engine: "4.2L Hybrid", transmission: "Hybrid", fuel: "Hybrid", year: "2020", color: "Silver" },
        highlights: [
            "Range: 650-800 kms on full tank", "Hybrid engine", "Eco mode", "Traction control", "2x keys", "Log books & Service history", "Reverse camera", "Parking sensors", "15” Wheels with Good Tyres", "Bluetooth Connectivity", "Recently Serviced", "Registration & CTP"],
        images: [car29_1, car29_2, car29_3, car29_4, car29_5],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 29,
        name: "2015 Audi A4 Quattro Sedan",
        tagline: "Great condition - full service history with Audi",
        price: "SOLD",
        description: "This 2015 Audi A4 Quattro Sedan is in excellent condition with a full service history from Audi. It has been meticulously maintained and is ready for immediate delivery. The vehicle features a powerful 2.0L engine, all-wheel drive, and a range of premium features including a sunroof, Bang and Olufsen sound system, and upgraded infotainment screen with Apple CarPlay and Android Auto.",
        specs: { mileage: "131,000 km", engine: "2.0L Hybrid", transmission: "Automatic", fuel: "Automatic", year: "2015", color: "Gray" },
        highlights: [
            "Top of the line model - full spec", "Great condition - full service history with Audi", "Paramatta and Northside Euros ACT", "Freshly serviced - new brakes", "131xxx kms - mostly highway kms", "Full radar cruise control system", "Active blindspot assist system", "Active crash mitigation system (automatic braking)", "Keyless entry and drive", "Sunroof", "Bang and Olufsen sound system", "Upgraded Infotainment Screen - Apple CarPlay and Android Auto", "Dark tints for privacy", "Steering wheel wrapped in Alcantara - can be taken off prior to sale if needed", "Michelin PS5 tires", "2 keys", "Full paint correction and ceramic coated by Elite", "Auto Lab - Sydney"],
        images: [car30_1, car30_2, car30_3, car30_4, car30_5, car30_6],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 30,
        name: "2020 Toyota Vitz / Yaris Hybrid",
        tagline: "Great condition - full service history with Audi",
        price: "SOLD",
        description: "This 2020 Toyota Vitz / Yaris Hybrid is in excellent condition with a full service history from Toyota. It has been meticulously maintained and is ready for immediate delivery. The vehicle features a fuel-efficient hybrid engine, all-wheel drive, and a range of premium features including a sunroof, Bang and Olufsen sound system, and upgraded infotainment screen with Apple CarPlay and Android Auto.",
        specs: { mileage: "43,000 km", engine: "3.5L Hybrid", transmission: "Hybrid", fuel: "Hybrid", year: "2020", color: "Silver" },
        highlights: [
            "Has a sporty look and feel to it", "With a very comfortable drive and cheap to run", "Hybrid engine", "Eco mode", "Traction control", "Dashcam installed", "Log books & Service history", "Reverse camera", "15” Wheels with Good Tyres", "Bluetooth Connectivity", "Recently Serviced", "Registration & CTP", "Fresh Japanese import"],
        images: [car31_1, car31_2, car31_3, car31_4, car31_5, car31_6],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
];