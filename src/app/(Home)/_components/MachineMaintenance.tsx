"use client";

import Picture from "@src/components/picture/Picture";
import React from "react";
import { speaker } from "@public/images";
import { ShieldCheck, Lock } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   Features
───────────────────────────────────────────────────────────────────────────── */

const features = [
  {
    icon: ShieldCheck,
    title: "SOC2 Type II & HIPAA",
    description:
      "Fully compliant environments for regulated industries.",
  },
  {
    icon: Lock,
    title: "Quantum-Safe Encryption",
    description:
      "Next-generation cryptographic standards for data at rest.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */

export default function MachineMaintenance() {
  return (
    <section className="relative overflow-hidden bg-[#0D1C2D] py-20 lg:py-28 font-inter">
     

      <div className="relative max-w-[1350px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Main Card */}
        <div className="relative overflow-hidden  bg-[#191B23]">
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-16 items-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20">
            {/* LEFT CONTENT */}
            <div className="max-w-[540px]">
              {/* Eyebrow */}
              <p className="text-[#004AC6] uppercase tracking-[0.25em] text-xs font-bold mb-6">
                Fortress Architecture
              </p>

              {/* Heading */}
              <h2 className="text-white text-[2.7rem] sm:text-[4rem] leading-[0.95] tracking-[-0.05em] font-bold">
                The Craziest PC
              </h2>

              {/* Paragraph */}
              <p className="mt-8 text-[#9ca3af] text-[15px] sm:text-[17px] leading-[2] max-w-[520px]">
                SaaS Canvas is built with a zero-trust mindset. Every
                packet, every connection, and every byte is encrypted
                and verified through our hardware-level security modules.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >
                      {/* Icon */}
                      <div className="mt-1 text-[#004AC6] shrink-0">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>

                      {/* Text */}
                      <div>
                        <h4 className="text-white text-[15px] font-semibold">
                          {feature.title}
                        </h4>

                        <p className="mt-1 text-[#6b7280] text-[15px] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">

              {/* Image Wrapper */}
              <div className="relative  overflow-hidden rounded-2xl">
                <Picture
                  src={speaker}
                  alt="Security infrastructure"
                  className="
                    w-full
                    h-[320px]
                    sm:h-[430px]
                    lg:h-[500px]
                    object-cover
                  "
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}