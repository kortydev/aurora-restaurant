import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function Menu({ scrollToBooking }) {
  const [activeTab, setActiveTab] = useState('starters');

  const menuData = {
    starters: [
      { name: 'Тартар из мраморной говядины', desc: 'С трюфельным кремом и хрустящим багетом', price: '1200 ₽' },
      { name: 'Крудо из гребешка', desc: 'С соусом из спелых томатов и цитрусовой заправкой', price: '1450 ₽' },
      { name: 'Зеленый салат с авокадо', desc: 'Свежие листья романо, эдамаме, заправка из трав', price: '950 ₽' }
    ],
    mains: [
      { name: 'Стейк Рибай с перечным соусом', desc: 'Мраморная говядина зернового откорма, молодой картофель', price: '3800 ₽' },
      { name: 'Филе миньон с фуа-гра', desc: 'Классическое сочетание с соусом порто', price: '4200 ₽' },
      { name: 'Черная треска', desc: 'С мисо-глазурью и пюре из пастернака', price: '2900 ₽' }
    ],
    desserts: [
      { name: 'Фирменный шоколадный фондан', desc: 'С шариком ванильного мороженого премиум класса', price: '750 ₽' },
      { name: 'Мильфей с ягодами', desc: 'Тончайшее слоеное тесто, заварной крем, малина', price: '850 ₽' }
    ],
    drinks: [
      { name: 'Авторский лимонад Роза-Личи', desc: 'Освежающий микс с лепестками роз', price: '600 ₽' },
      { name: 'Кофе Эспрессо-Тоник', desc: 'Холодный тоник со свежесваренным эспрессо', price: '500 ₽' }
    ]
  };

  const signatureDishes = [
    {
      title: "Мраморный стейк с трюфелем",
      price: "3 800 ₽",
      desc: "Сочный Рибай высшей категории мраморности с ароматным маслом черного трюфеля.",
      img: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Черная треска на гриле",
      price: "2 900 ₽",
      desc: "Дикая черная треска со сливочно-мисо соусом на нежном пюре из пастернака.",
      img: "https://st.bork.ru/recipes/ryba-i-moreprodukty/chernaya-treska-s-sousom-marsala/1.jpg"
    },
    {
      title: "Мильфей с лесной малиной",
      price: "850 ₽",
      desc: "Хрустящие слои карамелизированного теста со свежей малиной и ванильным муслином.",
      img: "https://storage.ginzadelivery.ru/product/9592/l.1861991b333b1fa5da342f55c2446e6a.jpg"
    }
  ];

  return (
    <>
      {/* SECTION: ПОПУЛЯРНЫЕ БЛЮДА */}
      <section className="py-8 lg:py-16 px-6 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-500 block mb-3">Шедевры кухни</span>
          <h2 className="text-2xl md:text-4xl font-light text-white tracking-wide uppercase">Фирменные блюда</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureDishes.map((dish, idx) => (
            <div key={idx} className="group border border-neutral-900 bg-neutral-950/20 p-6 flex flex-col justify-between hover:border-neutral-800 transition duration-300 rounded-sm">
              <div className="space-y-6 text-left">
                <div className="aspect-[4/3] w-full overflow-hidden border border-neutral-900 rounded-sm">
                  <img 
                    src={dish.img} 
                    alt={dish.title} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition duration-500"
                  />
                </div>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-light text-white group-hover:text-red-400 transition">{dish.title}</h3>
                  <span className="text-sm font-medium tracking-wide text-neutral-300">{dish.price}</span>
                </div>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">{dish.desc}</p>
              </div>
              <button onClick={scrollToBooking} className="mt-6 flex items-center space-x-2 text-xs tracking-widest uppercase text-neutral-300 group-hover:text-white transition">
                <span>Заказать</span>
                <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: ИНТЕРАКТИВНОЕ МЕНЮ */}
      <section id="menu" className="py-8 lg:py-16 px-6 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-500 block mb-3">Гастрономия</span>
          <h2 className="text-2xl md:text-4xl font-light text-white tracking-wide uppercase">Изысканное Меню</h2>
        </div>

        {/* Переключатель вкладок */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16 border-b border-neutral-900 pb-6">
          {[
            { id: 'starters', name: 'Закуски' },
            { id: 'mains', name: 'Горячее' },
            { id: 'desserts', name: 'Десерты' },
            { id: 'drinks', name: 'Напитки' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-xs tracking-[0.2em] uppercase transition ${
                activeTab === tab.id 
                  ? 'border-b-2 border-red-500 text-white font-medium' 
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Список блюд активной вкладки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {menuData[activeTab].map((item, idx) => (
            <div key={idx} className="border-b border-neutral-900 pb-6 flex justify-between items-start gap-6 hover:border-neutral-800 transition">
              <div className="space-y-2">
                <h4 className="text-lg font-light text-white">{item.name}</h4>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">{item.desc}</p>
              </div>
              <span className="text-base font-light text-white whitespace-nowrap">{item.price}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
