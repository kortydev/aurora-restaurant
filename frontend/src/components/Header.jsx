import React, { useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

export default function Header({ scrollToBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-neutral-900 sticky top-0 bg-black/90 backdrop-blur-md z-50 w-full">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Исправленный логотип: точка прижата к букве А */}
        <div className="text-xl font-light select-none text-white">
          <span className="tracking-[0.3em]">AURORA</span>
          <span className="text-red-500 font-bold">.</span>
        </div>
        
        {/* Навигация для десктопа */}
        <nav className="hidden md:flex items-center space-x-12 text-sm tracking-[0.2em] uppercase text-neutral-200">
          <a href="#about" className="hover:text-white transition-colors duration-200">О нас</a>
          <a href="#menu" className="hover:text-white transition-colors duration-200">Меню</a>
          <a href="#chef" className="hover:text-white transition-colors duration-200">Шеф</a>
          <a href="#contacts" className="hover:text-white transition-colors duration-200">Контакты</a>
        </nav>

        <div className="hidden md:block">
          <button 
            onClick={scrollToBooking}
            className="border border-neutral-800 hover:border-white text-xs tracking-[0.2em] uppercase px-6 py-2.5 transition duration-300 text-white"
          >
            Забронировать
          </button>
        </div>

        {/* Мобильная кнопка бургера */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-neutral-300 transition-colors duration-200 p-2"
          aria-label="Открыть меню"
        >
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Мобильное выпадающее меню (Drawer) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-900 bg-black/95 backdrop-blur-md px-6 py-8 space-y-6 flex flex-col tracking-[0.2em] uppercase text-sm text-neutral-200 animate-fade-in">
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition py-2 border-b border-neutral-950">О нас</a>
          <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition py-2 border-b border-neutral-950">Меню</a>
          <a href="#chef" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition py-2 border-b border-neutral-950">Шеф</a>
          <a href="#contacts" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition py-2 border-b border-neutral-950">Контакты</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); scrollToBooking(); }}
            className="border border-neutral-800 hover:border-white text-xs tracking-[0.2em] uppercase py-3 transition text-white w-full"
          >
            Забронировать
          </button>
        </div>
      )}
    </header>
  );
}
