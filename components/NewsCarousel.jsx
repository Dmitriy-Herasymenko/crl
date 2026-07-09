'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function NewsCarousel({ slides }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const swiper = new Swiper(containerRef.current, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      grabCursor: true,
      allowTouchMove: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.news-swiper-pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.news-swiper-prev',
        nextEl: '.news-swiper-next',
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 16 },
        1024: { slidesPerView: 3, spaceBetween: 20 },
        1280: { slidesPerView: 4, spaceBetween: 20 },
      },
    });

    return () => swiper.destroy(true, true);
  }, []);

  return (
    <div className="relative news-swiper-wrap">
      <div className="swiper news-swiper" ref={containerRef}>
        <div className="swiper-wrapper">
          {slides.map((slide) => (
            <div className="swiper-slide" key={slide.slug}>
              <Link href={`/novyny/${slide.slug}`} className="news-card rounded-xl overflow-hidden bg-white block h-full">
                <img src={slide.image} alt={slide.title} className="w-full h-40 object-cover" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${slide.badgeClass}`}>{slide.badge}</span>
                    <span className="text-xs text-gray-400">{slide.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2">{slide.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{slide.excerpt}</p>
                  <span className="mt-3 text-xs text-blue-700 font-medium flex items-center gap-1">
                    Читати
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="news-swiper-pagination"></div>
    </div>
  );
}
