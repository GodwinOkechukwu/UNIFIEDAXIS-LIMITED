"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import HeroCarousel from "../Cards/HeroCarousel";
import Image from "next/image";
import { heroBg,frbg } from "@public/images";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;
  const TotalCatgory = Categories?.length - 1;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`,
              );

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0
                  ? response?.data[0]?.images[0]?.src
                  : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage, // Store the first product's image
              };
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {},
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  return (
    <>
      <section className="font-inter relative overflow-hidden flex items-center min-h-[70dvh] sm:min-h-screen pt-32 md:pt-32">
        {/* ── Layer 0: Deep purple-to-magenta gradient base ── */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, #1a0533 0%, #3d1060 35%, #6b1a8a 60%, #8b2a6b 80%, #a03060 100%)",
          }}
        />

        {/* ── Layer 1: Full-bleed background image — low opacity, right-biased ── */}
        <div className="absolute inset-0 z-0">
          <Picture
            src={frbg}
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* ── Layer 2: Subtle grid/line overlay — matching the reference geometry ── */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          aria-hidden="true"
        />

        {/* ── Layer 3: Radial glow — top right warm pink bloom ── */}
        <div
          className="absolute z-0 pointer-events-none"
          style={{
            width: "clamp(300px, 50vw, 700px)",
            height: "clamp(300px, 50vw, 700px)",
            background:
              "radial-gradient(circle, rgba(200,80,120,0.45) 0%, transparent 70%)",
            top: "-10%",
            right: "-5%",
          }}
          aria-hidden="true"
        />

        {/* ══════════════════════════════════════════════════════════════
      INNER GRID
  ══════════════════════════════════════════════════════════════ */}
        <div className="relative z-10 w-full  mx-auto px-8 sm:px-12 md:px-16 lg:px-24 py-16 md:py-0">
          <div className="grid grid-cols-1 max-w-7xl md:grid-cols-2 gap-10 md:gap-0 items-center min-h-[70dvh] sm:min-h-screen">
            {/* ── LEFT · Text content ── */}
            <div className="flex flex-col items-start text-left space-y-5 md:pr-10">
              {/* Status pill badge */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm"
                style={{
                  background: "#1C2B3C",
                  border: "1px solid rgba(80,180,100,0.3)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: "#4ade80" }}
                  aria-hidden="true"
                />
                <span
                  className="text-[10px] font-bold  tracking-[0.2em] uppercase"
                  style={{ color: "#fff" }}
                >
                  Network Status: Nominal
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-black uppercase text-white leading-[1.0]
            text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Orbital
                <br />
                Connectivity At
                <br />
                Light Speed
              </h1>

              {/* Sub-copy */}
              <p
                className="leading-relaxed max-w-sm text-sm sm:text-[15px]"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Engineered for deep-space reliability. Deploy high-bandwidth
                mesh networks across LEO, MEO, and GEO constellations with
                millimeter-wave precision.
              </p>

              {/* CTA — white filled, dark text, matching reference */}
              <div className="pt-2">
                <Link
                  href="/category"
                  className="
              inline-block
              text-[#1a1a1a] text-[11px] sm:text-xs font-bold
              tracking-[0.25em] uppercase
              px-10 py-4
              transition-all duration-200 hover:opacity-90 hover:scale-105
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            "
                  style={{ background: "#ffffff" }}
                >
                  Buy Now
                </Link>
              </div>
            </div>

            {/* ── RIGHT · Product image — floats, no background ── */}
            <div className="relative flex items-center justify-center md:justify-end">
              <div
                className="relative w-full"
                style={{
                  maxWidth: "clamp(260px, 45vw, 540px)",
                  aspectRatio: "1 / 1",
                }}
              >
                <Picture
                  src={heroBg}
                  alt="Featured product"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section Styling Idea */}
      {/* <h5 className="max-w-[1350px] mx-auto mt-[50px] pl-2 md:pl-0 text-#181818 font-bold text-[30px] lg:text-[48px]">
        Popular Products
      </h5>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mx-auto max-w-[1350px] px-2 lg:px-0  mt-6 gap-10">
        {Categories?.slice(0, 5).map((cat) => {
          const productImage = categoryProductsMap[cat?.id];
          return (
            <Link
              key={cat.id}
              href={`/category/${convertToSlug(cat.name)}-${cat.id}`}
              className="group relative h-40 sm:h-48 bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all"
            >
              <Picture
                src={cat.image?.src ?? productImage}
                alt={cat.image?.name}
                className="w-full h-full object-contain opacity-60 group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute bottom-4 left-4">
                <h3 className="text-sm sm:text-lg font-bold text-white uppercase">
                  {cat.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div> */}
      {/* </Carousel> */}
    </>
  );
};

export default AllCategorySection;
