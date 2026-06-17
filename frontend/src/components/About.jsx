import React from 'react';

export default function About() {
  return (
    <>
      {/* SECTION: О РЕСТОРАНЕ (ABOUT) */}
      <section id="about" className="py-8 lg:py-16 px-6 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 text-left">
            <span className="text-xs tracking-[0.3em] uppercase text-neutral-500 block mb-3">О нас</span>
            <h2 className="text-2xl md:text-4xl font-light text-white tracking-wide leading-snug uppercase">
              Традиции, рожденные заново в современном ритме
            </h2>
          </div>
          <div className="lg:col-span-7 text-neutral-200 font-light space-y-6 leading-relaxed text-left">
            <p>
              Ресторан Aurora предлагает новое видение европейской кухни. Мы берем проверенную веками классику и переосмысляем её через призму современной кулинарии. Чистые вкусы, идеальная температура подачи и абсолютное внимание к каждой детали оформления.
            </p>
            <p>
              Каждое наше блюдо — это баланс между текстурой и ароматом, созданный для того, чтобы удивлять гостей и дарить утонченные гастрономические впечатления.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: ШЕФ-ПОВАР (CHEF SPOTLIGHT) */}
      <section id="chef" className="py-8 lg:py-16 px-6 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 aspect-[3/4] overflow-hidden border border-neutral-900 max-h-[420px] rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800" 
              alt="Executive Chef Николай Кот" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
            />
          </div>
          
          <div className="lg:col-span-7 space-y-8 text-left">
            <span className="text-xs tracking-[0.3em] uppercase text-neutral-500 block">Шеф-Повар</span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight uppercase">Николай Кот</h2>
            
            <p className="text-neutral-200 font-light leading-relaxed text-base">
              «Моя философия проста: я не стремлюсь перегрузить блюдо лишними деталями. Премиальный продукт сам по себе великолепный. Задача повара — подчеркнуть его естественную текстуру и раскрыть природный вкус с помощью правильной температуры, выверенного соуса и эстетики подачи.»
            </p>
            
            <div className="border-t border-neutral-900 pt-6">
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-500">Опыт работы</p>
              <p className="text-sm text-neutral-300 mt-2 font-light">Более 15 лет в ресторанах со звездами Мишлен в Париже и Лионе.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
