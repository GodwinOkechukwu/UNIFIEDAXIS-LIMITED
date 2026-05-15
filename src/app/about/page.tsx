import Link from "@node_modules/next/link";
import AppLayout from "@src/components/AppLayout";
import Picture from "@src/components/picture/Picture";
import { about1 ,about2} from "@public/images";
import {
  ShieldCheck,
  Truck,
  Headphones,
  MonitorSmartphone,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    description:
      "We provide reliable and high-quality appliances sourced from trusted global brands.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description:
      "Fast and secure delivery services across Nigeria with customer-first logistics.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Dedicated support team ready to assist you before and after every purchase.",
  },
  {
    icon: MonitorSmartphone,
    title: "Modern Technology",
    description:
      "From office equipment to smart entertainment systems, we keep you connected.",
  },
];

const page = () => {
  return (
    <AppLayout>
      <main className="bg-[#ffffff] text-[#111111] overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative pt-36 md:pt-44 pb-24">
          {/* Background Glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D0BCFF]/20 blur-[140px]" />
          </div>

          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* LEFT CONTENT */}
              <div className="max-w-[620px]">
                <p className="text-[#7C5CFA] uppercase tracking-[0.3em] text-xs font-bold mb-6">
                  About UnifiedAxis Limited
                </p>

                <h1 className="text-[2.8rem] sm:text-[4rem] lg:text-[5rem] font-bold leading-[0.95] tracking-[-0.06em] text-[#111111]">
                  Powering Modern Living Through Technology
                </h1>

                <p className="mt-8 text-[#555555] text-[15px] sm:text-[17px] leading-[2]">
                  UnifiedAxis Limited is a trusted distributor of premium
                  appliances and modern technology solutions in Nigeria. We
                  provide high-quality products designed to improve homes,
                  offices, and everyday lifestyles through innovation,
                  performance, and reliability.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/category">
                    <button className="h-12 px-8 bg-[#7C5CFA] hover:bg-[#6f50eb] transition-colors duration-300 text-white text-sm font-semibold">
                      Explore Products
                    </button>
                  </Link>
                  <Link href="/contact-us">
                    <button className="h-12 px-8 border border-[#111111]/10 hover:border-[#7C5CFA] transition-colors duration-300 text-[#111111] text-sm font-semibold">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-[#D0BCFF]/30 blur-[100px]" />

                <div className="relative overflow-hidden rounded-[28px] border border-[#111111]/5 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
                  <Picture
                    src={about1}
                    alt="Modern tech appliances"
                    className="w-full h-[400px] sm:h-[520px] object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT CONTENT */}
        <section className="pb-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
              {/* IMAGE */}
              <div className="relative">
                <div className="overflow-hidden rounded-[24px]">
                  <Picture
                    src={about2}
                    alt="Electronics and appliances"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div>
                <p className="text-[#7C5CFA] uppercase tracking-[0.25em] text-xs font-bold mb-5">
                  Who We Are
                </p>

                <h2 className="text-[2.3rem] sm:text-[3.5rem] font-bold tracking-[-0.05em] leading-[1] text-[#111111]">
                  Delivering Quality Appliances Across Nigeria
                </h2>

                <p className="mt-8 text-[#555555] leading-[2] text-[15px] sm:text-[17px]">
                  At UnifiedAxis Limited, we specialize in delivering modern
                  appliances and digital solutions that combine functionality,
                  durability, and elegant design. Our extensive catalog includes
                  kitchen appliances, office equipment, home comfort systems,
                  entertainment devices, and advanced technology products built
                  for modern living.
                </p>

                <p className="mt-6 text-[#555555] leading-[2] text-[15px] sm:text-[17px]">
                  We are committed to helping individuals, families, and
                  businesses access reliable products that improve productivity,
                  convenience, and lifestyle experiences.
                </p>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-[#f8f6ff] border border-[#D0BCFF]/30">
                    <h3 className="text-3xl font-bold text-[#7C5CFA]">5K+</h3>
                    <p className="mt-2 text-sm text-[#666666]">
                      Happy Customers
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#f8f6ff] border border-[#D0BCFF]/30">
                    <h3 className="text-3xl font-bold text-[#7C5CFA]">100+</h3>
                    <p className="mt-2 text-sm text-[#666666]">
                      Product Categories
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#f8f6ff] border border-[#D0BCFF]/30">
                    <h3 className="text-3xl font-bold text-[#7C5CFA]">24/7</h3>
                    <p className="mt-2 text-sm text-[#666666]">
                      Customer Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="pb-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="text-center max-w-[700px] mx-auto mb-16">
              <p className="text-[#7C5CFA] uppercase tracking-[0.3em] text-xs font-bold mb-5">
                Why Choose Us
              </p>

              <h2 className="text-[2.4rem] sm:text-[3.8rem] font-bold tracking-[-0.05em] leading-[1] text-[#111111]">
                Built Around Reliability & Excellence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="
                      group
                      p-8
                      rounded-[24px]
                      border
                      border-[#111111]/5
                      bg-white
                      hover:border-[#D0BCFF]
                      hover:shadow-[0_20px_60px_rgba(124,92,250,0.08)]
                      transition-all
                      duration-500
                    "
                  >
                    <div
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-[#f4f0ff]
                        flex
                        items-center
                        justify-center
                        text-[#7C5CFA]
                      "
                    >
                      <Icon size={24} strokeWidth={2} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-[#111111]">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-[#666666] leading-[1.9] text-sm">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default page;
