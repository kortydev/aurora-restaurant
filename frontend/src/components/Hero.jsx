import React from 'react';

export default function Hero({ scrollToBooking }) {
  return (
    /* Убрали min-h-[90dvh], оставили только w-full и аккуратный паддинг py-8 lg:py-16 */
    <section className="relative w-full flex items-center justify-center px-6 border-b border-neutral-900 overflow-hidden py-8 lg:py-16">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Текстовая колонка */}
        <div className="lg:col-span-7 space-y-8 z-10 text-left">
          <div className="inline-flex items-center space-x-2 text-xs tracking-[0.25em] uppercase text-red-500 whitespace-nowrap sm:whitespace-normal">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
            <span>Modern European Cuisine</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1] uppercase">
            Вкус за пределами <br />
            <span className="font-extralight text-neutral-400">ожиданий</span>
          </h1>
          
          <p className="text-neutral-200 text-sm md:text-base max-w-xl leading-relaxed font-light">
            Гастрономическое путешествие, где каждый ингредиент рассказывает свою историю. Современные европейские техники, премиальные локальные продукты и эстетика строгого минимализма в самом сердце города.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={scrollToBooking}
              className="bg-white text-black hover:bg-neutral-200 px-8 py-4 text-xs tracking-[0.2em] uppercase transition duration-300 font-medium text-center"
            >
              Резерв стола
            </button>
            <a 
              href="#menu"
              className="border border-neutral-800 hover:border-white px-8 py-4 text-xs tracking-[0.2em] uppercase transition duration-300 text-center text-white"
            >
              Посмотреть меню
            </a>
          </div>
        </div>

        {/* Изображение стейка (его высота теперь тоже аккуратно подстраивается) */}
        <div className="lg:col-span-5 relative w-full h-[250px] sm:h-[350px] lg:h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 rounded-sm"></div>
          <img 
            src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800" 
            alt="Премиальный стейк - европейская кухня" 
            className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 hover:scale-[1.01] transition duration-700 rounded-sm border border-neutral-900"
          />
        </div>

      </div>
    </section>
  );
}
