import React from "react";
import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
export default function HeroPage() {
    
    const navigate = useNavigate();

    return (
        <main className="relative w-screen min-h-screen overflow-hidden bg-gray-950"
            style={{
                background: "linear-gradient(180deg, #060311 0%, #180C44 75%, #21105E 86%, #2A1577 100%)"
            }}>
            <header className="flex items-center gap-1.5 p-2">
                <div className="flex items-center gap-3 px-4 py-6">
                    <img
                        src={Logo}
                        alt="Mess Food Logo"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="text-3xl font-bold text-white">MESS FOOD</p>
                </div>
            </header>

            <section className="flex flex-col items-center gap-3.5 mx-auto mt-10 max-w-[1225px] px-5">
                <div className="rounded-[45px] bg-[#1C1E36] bg-opacity-50 px-4 py-4 text-2xl leading-7 tracking-tight text-stone-300">
                    ✨ Real-Time Student Food Feedback Engine →
                </div>

                {/* Hero Content */}
                <div className="flex w-full flex-col items-center gap-12">
                    {/* Headings */}
                    <div className="flex max-w-[966px] flex-col items-center gap-3.5 px-2.5 text-center">
                        <div className="flex w-full flex-col items-center gap-1">
                            <h2 
                            className="text-7xl font-bold leading-20 max-md:text-4xl max-sm:text-3xl bg-gradient-to-t 
                            from-[rgba(255,255,255,0.96)] to-[rgba(255,255,255,0.62)] bg-clip-text text-transparent">
                                Mess Food: Crowd-Powered
                            </h2>
                            <h2 
                            className="text-7xl font-bold leading-20 max-md:text-4xl max-sm:text-3xl bg-gradient-to-t 
                            from-[rgba(255,255,255,0.96)] to-[rgba(255,255,255,0.66)] bg-clip-text text-transparent">
                                Menu &amp; Food Feedback
                            </h2>
                        </div>
                        {/* Subheadings */}
                        <div className="flex flex-col items-center gap-1.5 pt-2.5">
                            <p className="text-xl font-medium leading-7 tracking-normal text-white text-opacity-70 max-md:text-3xl max-sm:text-2xl">
                                The all-in-one solution for effortless mess menu creation, student
                            </p>
                            <p className="text-xl font-medium leading-tight tracking-normal text-white text-opacity-70 max-md:text-3xl max-sm:text-2xl">
                                dining tracking, and smart meal reporting
                            </p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-7 max-sm:flex-col">
                        <button 
                        onClick={() => navigate("/login")}
                        className="h-[62px] w-[130px] rounded-[200px] bg-[linear-gradient(90deg,#6949E7_0%,#5532E2_100%)] px-16 py-7 text-white hover:brightness-110 transition-all">
                            <p className="text-xl font-semibold">LOGIN</p>
                        </button>
                        <button 
                        onClick={() => navigate("/signup")}
                        className="h-[62px] w-[130px] rounded-[200px] bg-[linear-gradient(90deg,#6949E7_0%,#5532E2_100%)]  px-16 py-7 text-white hover:brightness-110 hover:bg-purple-700 transition-all">
                            <p className="text-xl font-semibold">SIGN UP</p>
                            {/* <img
                                src="/path/to/icon.png"
                                alt="Icon"
                                className="h-[24px] w-[24px]"
                            /> */}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

