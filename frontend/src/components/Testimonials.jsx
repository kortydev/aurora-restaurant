import React from 'react';

export default function Testimonials() {
  const reviews = [
    { text: "Потрясающая атмосфера и идеальное обслуживание. Стейк Рибай буквально тает во рту. Теперь это мое любимое место для важных ужинов.", author: "Алексей С." },
    { text: "Настоящий темный минимализм! Блюда выглядят как произведения искусства. Черная треска — абсолютный фаворит.", author: "Мария К." },
    { text: "Ресторан премиального уровня во всем. Каждая деталь от приборов до музыки продумана до мелочей. Обязательно вернемся.", author: "Дмитрий В." }
  ];

  return (
    <section className="py-8 lg:py-16 px-6 max-w-7xl mx-auto border-b border-neutral-900">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-xs tracking-[0.3em] uppercase text-neutral-500 block mb-3">Отзывы</span>
        <h2 className="text-2xl md:text-4xl font-light text-white tracking-wide uppercase">Мнения наших гостей</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((item, idx) => (
          <div key={idx} className="border border-neutral-900 p-8 flex flex-col justify-between space-y-6 text-left rounded-sm bg-neutral-950/10">
            <p className="text-neutral-200 font-light italic leading-relaxed text-sm">
              «{item.text}»
            </p>
            <span className="text-xs tracking-[0.2em] uppercase text-neutral-500 font-medium">
              — {item.author}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
