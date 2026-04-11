"use client";

import { ReactNode } from "react";
import SoftAurora from "./soft-aurora"
import { UploadSection } from "./upload-section";

interface SoftAuroraProps {
    isUserLogin : boolean;
    header : ReactNode
}

export const HomeView = ({ isUserLogin , header }: SoftAuroraProps) => {
    return (
        <main >
            {/* BG animation */}
            <SoftAurora
                speed={0.6}
                scale={1.5}
                brightness={1}
                color1="#f7f7f7"
                color2="#372aac"
                noiseFrequency={2.5}
                noiseAmplitude={1}
                bandHeight={0.5}
                bandSpread={1}
                octaveDecay={0.1}
                layerOffset={0}
                colorSpeed={1}
                enableMouseInteraction
                mouseInfluence={0.25}
            />

            <div className=" max-w-5xl m-auto relative pb-10">
                {/* Header */}
                {header}

                {/* Main content */}
                <section className="flex flex-col items-center justify-center text-center gap-6 mt-48 px-4">
                    <h1 className="text-5xl font-bold text-foreground">
                        Detect fake video with <span className="text-primary">Factify AI</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Factify AI uses advanced deepfake detection technology to identify manipulated and AI-generated videos. Protect yourself from misinformation and verify video authenticity with just a few clicks.
                    </p>
                    {/* If user is not logged in */}
                    {!isUserLogin ? (
                        <div className="flex gap-4">
                            <a href="/docs" className="px-6 py-3 bg-primary text-white rounded-full shadow hover:bg-primary/90 transition">
                                Get Started
                            </a>
                        </div>
                    ) : (
                        <UploadSection/>
                    )}
                </section>
            </div>
        </main>
    )
}
