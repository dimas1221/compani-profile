import React from "react";
import "./style/loadingStyle.css";

export default function GlobalLoading() {
  return (
    <section className="relative py-20 sm:py-28 px-6 overflow-hidden max-w-7xl mx-auto">
      {/* Button Back Skeleton */}
      <div className="w-24 h-10 skeleton mb-6 rounded-full" />

      {/* Title Skeleton */}
      <div className="h-10 w-48 skeleton mb-12 mx-auto rounded" />

      {/* Main content flex */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image skeleton */}
        <div className="w-[14rem] h-[20rem] sm:w-[18rem] sm:h-[24rem] md:w-[22rem] md:h-[30rem] skeleton rounded-3xl" />

        {/* Text right side skeleton */}
        <div className="flex-grow max-w-2xl flex flex-col gap-6">
          <div className="h-8 w-3/4 skeleton rounded" />
          <div className="h-6 w-full skeleton rounded" />
          <div className="h-6 w-full skeleton rounded" />
          <div className="h-6 w-5/6 skeleton rounded" />

          {/* Buttons skeleton */}
          <div className="flex gap-4 mt-auto">
            <div className="h-12 w-40 skeleton rounded-full" />
            <div className="h-12 w-48 skeleton rounded-full" />
          </div>
        </div>
      </div>

      {/* Carousel skeleton */}
      <div className="mt-20 h-48 w-full skeleton rounded-xl" />
    </section>
  );
}
