import React, { useState, useRef } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Menu from '../components/Menu';
import BookingForm from '../components/BookingForm';
import Testimonials from '../components/Testimonials';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const bookingRef = useRef(null);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-neutral-200 min-h-screen selection:bg-neutral-800 selection:text-white">
      
      {/* 1. ШАПКА САЙТА */}
      <Header scrollToBooking={scrollToBooking} />

      {/* 2. ГЛАВНЫЙ ЭКРАН (HERO) */}
      <Hero scrollToBooking={scrollToBooking} />

      {/* 3. БЛОКИ "О НАС" И "ШЕФ-ПОВАР" */}
      <About />

      {/* 4. МЕНЮ РЕСТОРАНА */}
      <Menu scrollToBooking={scrollToBooking} />

      {/* 5. ОТЗЫВЫ ГОСТЕЙ */}
      <Testimonials />

      {/* 6. СЕКЦИЯ БРОНИРОВАНИЯ */}
      <section ref={bookingRef} id="booking" className="py-8 lg:py-16 px-6 max-w-4xl mx-auto">
        <BookingForm 
          isSubmitting={isSubmitting} 
          setIsSubmitting={setIsSubmitting} 
          errorMessage={errorMessage} 
          setErrorMessage={setErrorMessage} 
        />
      </section>

      {/* 7. КОНТАКТЫ & КАРТА */}
      <section id="contacts" className="py-8 lg:py-16 px-6 max-w-7xl mx-auto border-t border-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-8 text-left">
            <span className="text-xs tracking-[0.3em] uppercase text-neutral-500 block">Контакты</span>
            <h2 className="text-3xl font-light text-white tracking-wide uppercase">Ждем вас в гости</h2>
            
            <div className="space-y-6 text-sm font-light text-neutral-200">
              <div className="flex items-start space-x-4">
                <MapPin size={20} className="text-neutral-500 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Адрес</p>
                  <p className="mt-1">ул. Гастрономическая, д. 12, Санкт-Петербург</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone size={20} className="text-neutral-500 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Телефон для справок</p>
                  <p className="mt-1">+7 (999) 123-45-67</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock size={20} className="text-neutral-500 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Часы работы</p>
                  <p className="mt-1 font-light">Пн - Вс: с 12:00 до 00:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Интерактивная карта Яндекса с фиксированным премиальным темным стилем */}
          <div className="lg:col-span-7 border border-neutral-900 h-[350px] relative rounded-sm overflow-hidden bg-neutral-950">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=30.3158%2C59.9390&z=15"
              className="w-full h-full border-0 filter grayscale invert contrast-[1.15] brightness-[0.85] opacity-80 hover:opacity-100 transition duration-500"
              allowFullScreen="" 
              loading="lazy"
              title="Aurora Restaurant Map"
            ></iframe>
          </div>

        </div> {/* ЗАКРЫВАЕМ СЕТКУ GRID (Было пропущено) */}
      </section> {/* ЗАКРЫВАЕМ СЕКЦИЮ SECTION (Было пропущено) */}

      {/* 8. ФУТЕР */}
      <footer className="border-t border-neutral-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] tracking-[0.25em] uppercase text-neutral-600">
          <div>
            &copy; {new Date().getFullYear()} Aurora Restaurant. Все права защищены.
          </div>
          <div className="lowercase font-light text-neutral-700 hover:text-neutral-500 transition duration-300">
            designed & developed by <span className="text-neutral-600">korty</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
