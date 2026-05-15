// /**
//  * PopularProducts.tsx
//  * ─────────────────────────────────────────────────────────────────────────────
//  * Displays a paginated grid of popular products fetched from WooCommerce.
//  *
//  * Popularity logic:
//  *   Primary query  → `orderby=popularity`  (WooCommerce sorts by total_sales)
//  *   Fallback query → `orderby=rating`      (used if popularity returns empty)
//  *
//  * WooCommerce product fields consumed:
//  *   • product.id
//  *   • product.name
//  *   • product.images[0].src
//  *   • product.price             → newAmount
//  *   • product.regular_price     → oldAmount  (shows strike-through when set)
//  *   • product.categories[0].name → category  label on card
//  *   • product.average_rating    → rating     star score on card
//  *   • product.rating_count      → ratingCount review count on card
//  * ─────────────────────────────────────────────────────────────────────────────
//  */

// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { WooCommerce } from "@src/components/lib/woocommerce";
// import NewArrivalCard from "../Cards/NewArrivalCard";
// import PopularProductCard from "../Cards/PopularProductCard";

// /* ─────────────────────────────────────────────────────────────────────────────
//    Constants
// ───────────────────────────────────────────────────────────────────────────── */

// /** How many products to load per page. */
// const PAGE_SIZE = 6;

// /* ─────────────────────────────────────────────────────────────────────────────
//    Skeleton Loader
//    Mirrors the card proportions so the layout does not shift when data arrives.
// ───────────────────────────────────────────────────────────────────────────── */
// export const PopularProductsLoader = () => (
//   <div className="w-full py-12 md:py-16">
//     <div className="max-w-[1400px] mx-auto px-4 md:px-6">
//       {/* Section heading skeleton */}
//       <div className="flex items-center justify-between mb-8 md:mb-12">
//         <div className="space-y-2">
//           <div className="h-8 bg-gray-200 animate-pulse rounded-lg w-56 md:w-72" />
//           <div className="h-4 bg-gray-200 animate-pulse rounded-lg w-36 md:w-52" />
//         </div>
//         <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
//       </div>

//       {/* Card skeletons — identical column layout to the real grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
//         {Array.from({ length: PAGE_SIZE }).map((_, i) => (
//           <div
//             key={i}
//             className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
//           >
//             {/* Image placeholder */}
//             <div className="w-full h-[180px] bg-gray-100 animate-pulse" />

//             {/* Text placeholders */}
//             <div className="p-4 space-y-2.5">
//               <div className="h-3 bg-gray-200 animate-pulse rounded w-1/3" />
//               <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
//               <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
//               <div className="h-3 bg-gray-200 animate-pulse rounded w-1/4 mt-1" />

//               {/* Price + button placeholder */}
//               <div className="flex items-center justify-between pt-1">
//                 <div className="h-5 bg-gray-200 animate-pulse rounded w-1/3" />
//                 <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-lg" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// /* ─────────────────────────────────────────────────────────────────────────────
//    Empty State
// ───────────────────────────────────────────────────────────────────────────── */
// const EmptyState = () => (
//   <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
//     {/* Simple icon */}
//     <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
//       <svg
//         className="w-8 h-8 text-gray-400"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={1.5}
//           d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4"
//         />
//       </svg>
//     </div>
//     <p className="text-gray-700 font-semibold text-lg">
//       No popular products yet
//     </p>
//     <p className="text-gray-400 text-sm max-w-xs">
//       Check back soon — trending items will appear here once sales data is
//       available.
//     </p>
//   </div>
// );

// /* ─────────────────────────────────────────────────────────────────────────────
//    Main Component
// ───────────────────────────────────────────────────────────────────────────── */
// export default function PopularProducts() {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [hasError, setHasError] = useState<boolean>(false);
//   const [page, setPage] = useState<number>(1);
//   const [hasMore, setHasMore] = useState<boolean>(true);
//   const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

//   /* ── Fetch helpers ─────────────────────────────────────────────────────── */

//   /**
//    * Builds the WooCommerce query string.
//    * Tries `orderby=popularity` first; the caller falls back to `orderby=rating`
//    * if the primary response returns an empty array.
//    */
//   const buildQuery = (orderby: "popularity" | "rating", pageNum: number) =>
//     `products?orderby=${orderby}&order=desc&per_page=${PAGE_SIZE}&page=${pageNum}&status=publish`;

//   /**
//    * Fetches one page of products.
//    * Returns the data array or throws so the caller can handle errors.
//    */
//   const fetchPage = async (
//     orderby: "popularity" | "rating",
//     pageNum: number,
//   ): Promise<ProductType[]> => {
//     const res = await WooCommerce.get(buildQuery(orderby, pageNum));
//     return res?.data || [];
//   };

//   /* ── Initial load ──────────────────────────────────────────────────────── */
//   useEffect(() => {
//     const loadInitial = async () => {
//       try {
//         setIsLoading(true);
//         setHasError(false);

//         /* Primary: sort by WooCommerce sales data */
//         let data = await fetchPage("popularity", 1);

//         /* Fallback: if no popularity data exists, sort by average rating */
//         if (!data.length) {
//           data = await fetchPage("rating", 1);
//         }

//         setProducts(data);

//         /* If fewer results than PAGE_SIZE came back, there are no more pages */
//         setHasMore(data.length === PAGE_SIZE);
//       } catch (err) {
//         console.error("[PopularProducts] initial fetch failed:", err);
//         setHasError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadInitial();
//   }, []);

//   /* ── Load more (pagination) ────────────────────────────────────────────── */
//   const loadMore = useCallback(async () => {
//     if (isFetchingMore || !hasMore) return;

//     try {
//       setIsFetchingMore(true);
//       const nextPage = page + 1;
//       const data = await fetchPage("popularity", nextPage);

//       setProducts((prev) => [...prev, ...data]);
//       setPage(nextPage);
//       setHasMore(data.length === PAGE_SIZE);
//     } catch (err) {
//       console.error("[PopularProducts] load-more fetch failed:", err);
//     } finally {
//       setIsFetchingMore(false);
//     }
//   }, [page, isFetchingMore, hasMore]);

//   /* ── Render: loading ───────────────────────────────────────────────────── */
//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-24">
//         <PopularProductsLoader />
//       </div>
//     );
//   }

//   /* ── Render: error ─────────────────────────────────────────────────────── */
//   if (hasError) {
//     return (
//       <div className="min-h-screen pt-24 flex items-center justify-center">
//         <div className="text-center space-y-3">
//           <p className="text-gray-700 font-semibold text-lg">
//             Something went wrong
//           </p>
//           <p className="text-gray-400 text-sm">
//             We couldn&apos;t load popular products. Please try again later.
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-2 px-5 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ── Render: main ──────────────────────────────────────────────────────── */
//   return (
//     <div className="min-h-screen bg-[#121414] ">
//       <div className="max-w-[1400px] mx-auto px-4  md:px-6 lg:px-8 py-8 md:py-12">
//         {/* ── Page Header ─────────────────────────────────────────────── */}
//         <div className="mb-4 md:mb-6">
//           <h1
//             style={{
//               fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
//             }}
//             className="uppercase font-semibold text-3xl md:text-4xl lg:text-5xl text-[#E3E2E2] mb-3"
//           >
//             All Products
//           </h1>
//           {/* <p className="text-base md:text-lg text-gray-500">
//             {products.length > 0
//               ? `Trending right now — ${products.length} item${products.length !== 1 ? "s" : ""}`
//               : "Trending products will appear here"}
//           </p> */}
//         </div>

//         {/* ── Products Grid ───────────────────────────────────────────── */}
//         {products.length > 0 ? (
//           <>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
//               {products.map((product: ProductType) => (
//                 <PopularProductCard
//                   key={product.id}
//                   id={product.id}
//                   image={product.images?.[0]?.src ?? ""}
//                   oldAmount={product.regular_price}
//                   newAmount={product.price}
//                   description={product.name}
//                   /*
//                    * New props introduced by the refactored card:
//                    *   category   — first WooCommerce category name
//                    *   rating     — WooCommerce average_rating (string → float)
//                    *   ratingCount— WooCommerce rating_count
//                    */
//                   category={product.categories?.[0]?.name}
//                   rating={
//                     product.average_rating
//                       ? parseFloat(product.average_rating)
//                       : undefined
//                   }
//                   ratingCount={product.rating_count ?? undefined}
//                 />
//               ))}
//             </div>

//             {/* ── Load More button ──────────────────────────────────────
//                 Shown only while there are more pages to fetch.
//                 Replaced by a spinner while the next page is in-flight.
//             ─────────────────────────────────────────────────────────── */}
//             {hasMore && (
//               <div className="flex justify-center mt-10 md:mt-14">
//                 <button
//                   onClick={loadMore}
//                   disabled={isFetchingMore}
//                   className="
//                     flex items-center gap-2
//                     px-8 py-3
//                     border-2 border-[#78787833]
//                     bg-[#78787833]
//                     text-gray-100 font-semibold text-sm
//                     rounded-lg
//                     hover:bg-[#78787833]/80 hover:text-white
//                     disabled:opacity-50 disabled:cursor-not-allowed
//                     transition-all duration-200
//                   "
//                   style={{
//                     fontFamily:
//                       "'Barlow Condensed', 'Arial Narrow', sans-serif",
//                   }}
//                 >
//                   {isFetchingMore ? (
//                     <>
//                       {/* Inline spinner — no extra dependency */}
//                       <svg
//                         className="animate-spin w-4 h-4"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         />
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
//                         />
//                       </svg>
//                       Loading…
//                     </>
//                   ) : (
//                     "See More"
//                   )}
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           /* ── Empty state ──────────────────────────────────────────── */
//           <EmptyState />
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { WooCommerce } from "@src/components/lib/woocommerce";
import Link from "next/link";
import Picture from "../picture/Picture";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { convertToSlug } from "@constants";
import { ArrowRight, Plus } from "lucide-react";

const PAGE_SIZE = 12;

/* ─────────────────────────────────────────────────────────────────────────────
   Loader
───────────────────────────────────────────────────────────────────────────── */
export const PopularProductsLoader = () => (
  <section className="w-full py-20 bg-[#0D1C2D]">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-3">
          <div className="w-24 h-3 rounded bg-white/10 animate-pulse" />
          <div className="w-52 h-8 rounded bg-white/10 animate-pulse" />
        </div>

        <div className="w-28 h-4 rounded bg-white/10 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-4 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#06172d] border border-white/5 overflow-hidden"
          >
            <div className="h-[260px] bg-white/10 animate-pulse" />

            <div className="p-5 space-y-4">
              <div className="w-32 h-3 rounded bg-white/10 animate-pulse" />
              <div className="w-24 h-5 rounded bg-white/10 animate-pulse" />
              <div className="w-28 h-9 rounded bg-white/10 animate-pulse ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Product Card
───────────────────────────────────────────────────────────────────────────── */

interface CardProps {
  id: string | number;
  image: string;
  name: string;
  price: string;
}

const ProductCard = ({ id, image, name, price }: CardProps) => {
  const slugDesc = convertToSlug(name);
  const priceNum = parseInt(price);

  return (
    <Link
      href={`/home-item/product/${slugDesc}-${id}`}
      className="group bg-[#0D1C2D] rounded-md border border-[#4944541A]/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#FFFFFF]/40"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#d9d9d9]">
        <Picture
          src={image}
          alt={name}
          className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-5">
        <div className="space-y-2">
          <p className="text-[#D4E4FA] text-sm font-medium line-clamp-1">
            {name}
          </p>

          <span className="block text-[#BF0029] text-3xl font-semibold tracking-tight">
            {priceNum ? <FormatMoney2 value={priceNum} /> : "N/A"}
          </span>
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <button className="h-10 rounded-sm capitalize px-5 bg-[#FFFFFF] hover:bg-[#9d70ff] transition-colors duration-300 text-black text-xs font-semibold flex items-center gap-2">
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Empty State
───────────────────────────────────────────────────────────────────────────── */

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center">
    <p className="text-white text-xl font-semibold mb-2">
      No products available
    </p>

    <p className="text-white/50 text-sm">
      Products will appear here once added.
    </p>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────────────────────── */

export default function PopularProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const buildQuery = (orderby: "popularity" | "rating", pageNum: number) =>
    `products?orderby=${orderby}&order=desc&per_page=${PAGE_SIZE}&page=${pageNum}&status=publish`;

  const fetchPage = async (
    orderby: "popularity" | "rating",
    pageNum: number,
  ): Promise<ProductType[]> => {
    const res = await WooCommerce.get(buildQuery(orderby, pageNum));
    return res?.data || [];
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        let data = await fetchPage("popularity", 1);

        if (!data.length) {
          data = await fetchPage("rating", 1);
        }

        setProducts(data);
        setHasMore(data.length === PAGE_SIZE);
      } catch (err) {
        console.error(err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitial();
  }, []);

  const loadMore = useCallback(async () => {
    if (isFetchingMore || !hasMore) return;

    try {
      setIsFetchingMore(true);

      const nextPage = page + 1;

      const data = await fetchPage("popularity", nextPage);

      setProducts((prev) => [...prev, ...data]);

      setPage(nextPage);

      setHasMore(data.length === PAGE_SIZE);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchingMore(false);
    }
  }, [page, isFetchingMore, hasMore]);

  if (isLoading) return <PopularProductsLoader />;

  if (hasError) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#0D1C2D]">
        <div className="text-center">
          <p className="text-white text-2xl font-semibold mb-3">
            Something went wrong
          </p>

          <p className="text-white/60 mb-6">
            We couldn&apos;t load the products.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-6 h-11 bg-[#FFFFFF] text-black text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 bg-[#0D1C2D] font-inter">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2 className="text-[12px] font-bold text-[#D0BCFF] uppercase tracking-tight">
              All Products
            </h2>
          </div>

          <Link
            href="/catalog"
            className="hidden md:flex items-center gap-2 text-sm uppercase text-[12px] text-[#D0BCFF] hover:text-white transition-colors"
          >
            View Catalog
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-4 gap-5">
              {products.map((product: ProductType) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.images?.[0]?.src ?? ""}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-14">
                <button
                  onClick={loadMore}
                  disabled={isFetchingMore}
                  className="h-12 px-8 border border-white/10 text-white text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-40"
                >
                  {isFetchingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}
