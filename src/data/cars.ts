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
        price: "14,500",
        description: "This 2011 Toyota Prius represents the gold standard in hybrid efficiency. Perfect for city driving and long commutes alike, it offers exceptional fuel economy without compromising on space or comfort. Meticulously maintained and ready for its next owner.",
        specs: { mileage: "64,000 km", engine: "1.8L Hybrid", transmission: "CVT", fuel: "Hybrid", year: "2011", color: "Pearl White" },
        highlights: ["Push Button Start", "Reverse Camera", "Keyless Entry", "Climate Control", "Bluetooth Connectivity"],
        images: [car1_1, car1_2, car1_3, car1_4, car1_5, car1_6, car1_7], // You can add more specific images later
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
    {
        id: 1,
        name: "Toyota Crown Sedan 2010",
        tagline: "Luxury Meets Reliability - V6 Power",
        price: "17,500",
        description: "Experience true luxury with the Toyota Crown. This sedan offers a whisper-quiet cabin, premium materials, and a smooth ride that rivals European competitors at a fraction of the cost.",
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
        price: "16,500",
        description: "The Honda Vezel (HR-V) combines the practicality of an SUV with the fuel efficiency of a hybrid hatch. Its magic seats offer versatile cargo options perfect for active lifestyles.",
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
        price: "24,999",
        description: "A flagship luxury sedan powered by a silky smooth V8 engine. The LS460 offers an abundance of power, sophisticated technology, and world-class comfort.",
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
        price: "32,000",
        description: "A legend of the streets. The Lancer Evolution offers raw, turbocharged performance and incredible handling dynamics thanks to its advanced all-wheel-drive system.",
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
        price: "16,900",
        description: "Another fine example of the LS460 lineage. This vehicle offers exceptional value for money, giving you access to V8 power and luxury for the price of a standard hatchback.",
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
        price: "26,500",
        description: "The C-HR stands out with its futuristic design. The G Mode-Nero edition adds stylish black accents and premium interior features to this fuel-sipping hybrid.",
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
        price: "28,500",
        description: "The S-Class is the benchmark for luxury. This S400h combines Mercedes prestige with hybrid technology for a quieter, more efficient executive transport.",
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
        price: "16,000",
        description: "The Honda Grace is the sedan version of the Fit/Jazz. It offers immense reliability, great fuel economy, and a surprisingly spacious interior.",
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
        price: "18,500",
        description: "A late-model Yaris with the added safety of All-Wheel Drive. Packed with Toyota's latest Safety Sense technology and incredibly fuel efficient.",
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
        price: "26,800",
        description: "The 2013 facelift brought the spindle grille and modernized interior to the LS460. A stunning vehicle that commands respect on the road.",
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
        price: "23,000",
        description: "The new generation Fit (Jazz) features the e:HEV system which feels more like an EV to drive. Incredible visibility and best-in-class space.",
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
        price: "18,000",
        description: "Imported directly from the JDM market, this Swift features the mild-hybrid system for superior economy. Sporty handling meets frugal running costs.",
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
        price: "18,000",
        description: "The 2018 facelift Fit Hybrid offers sharper styling and improved DCT transmission tuning. A reliable, fun-to-drive daily driver.",
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
        price: "39,999",
        description: "The 15th Generation Crown is a technological marvel. The RS Advance trim offers sporty suspension and aggressive styling coupled with next-gen connectivity.",
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
        price: "25,999",
        description: "A low mileage example of the classic LS460. These vehicles are known to last for hundreds of thousands of kilometers with basic maintenance.",
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
        price: "17,000",
        description: "Another great Vezel option in a different colorway. High driving position, great economy, and Honda reliability make this a top choice.",
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
        price: "26,000",
        description: "Designed for the urban jungle. The C-HR handles like a hatchback but rides like an SUV. Hybrid powertrain ensures visits to the petrol station are rare.",
        specs: { mileage: "50,000 km", engine: "1.8L Hybrid", transmission: "CVT", fuel: "Hybrid", year: "2018", color: "Metal Stream" },
        highlights: ["Toyota Safety Sense", "Dual Zone Climate", "Auto High Beam", "8-inch Screen", "Alloy Wheels"],
        images: [car19_1, car19_2, car19_3, car19_4, car19_5, car19_6, car19_7, car19_8],
        dealer: "Elite Motor Cars",
        dealerLocation: "Sydney, Australia",
        license: "MD100405"
    },
];