import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowLeft, BookOpen } from 'lucide-react';

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Извлекаем объект бронирования, переданный при редиректе
  const booking = location.state?.booking;

  // Если пользователь зашел на страницу напрямую (без оформления брони)
  if (!booking) {
    return (
      <div className="bg-black text-neutral-200 min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
        <h1 className="text-xl font-light text-white uppercase tracking-[0.3em] mb-4">Информация отсутствует</h1>
        <p className="text-neutral-500 text-sm max-w-sm mb-8 leading-relaxed font-light">
          К сожалению, мы не нашли информацию о Вашем бронировании. Возможно, сессия устарела или страница была открыта напрямую.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="border border-neutral-800 hover:border-white text-xs tracking-widest uppercase px-8 py-4 transition text-white"
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  // Красивое форматирование даты (например: "17 июня 2026 г.")
  const formattedDate = new Date(booking.booking_date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-black text-neutral-200 min-h-screen flex items-center justify-center p-6 select-none">
      <div className="max-w-md w-full border border-neutral-900 bg-neutral-950/20 p-8 md:p-12 text-center space-y-8">
        
        {/* Большая зеленая галочка */}
        <div className="w-20 h-20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
          <span className="text-4xl font-light">✓</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-light text-white tracking-wide">Спасибо за бронирование!</h1>
          <p className="text-neutral-500 text-[10px] tracking-[0.2em] uppercase">Ваш резерв зарегистрирован</p>
        </div>

        {/* Карточка с деталями забронированного стола */}
        <div className="border border-neutral-900 bg-neutral-950 p-6 space-y-4 text-left">
          <div className="text-[10px] text-neutral-500 tracking-widest uppercase border-b border-neutral-900 pb-2">
            Детали Вашего резерва
          </div>
          
          <div className="space-y-3">
            {/* Клиент */}
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-neutral-500 font-light">Имя:</span>
              <span className="text-white font-light ml-auto">{booking.name}</span>
            </div>

            {/* Дата */}
            <div className="flex items-center space-x-3 text-sm">
              <Calendar size={14} className="text-neutral-600" />
              <span className="text-neutral-500 font-light">Дата:</span>
              <span className="text-white font-light ml-auto">{formattedDate}</span>
            </div>

            {/* Время */}
            <div className="flex items-center space-x-3 text-sm">
              <Clock size={14} className="text-neutral-600" />
              <span className="text-neutral-500 font-light">Время:</span>
              <span className="text-white font-light ml-auto">{booking.booking_time.slice(0, 5)}</span>
            </div>

            {/* Гости */}
            <div className="flex items-center space-x-3 text-sm">
              <Users size={14} className="text-neutral-600" />
              <span className="text-neutral-500 font-light">Количество гостей:</span>
              <span className="text-white font-light ml-auto">{booking.guests}</span>
            </div>
          </div>
        </div>

        <p className="text-neutral-400 text-xs font-light leading-relaxed">
          Мы свяжемся с Вами по указанному телефону в течение 10 минут для подтверждения бронирования.
        </p>

        {/* Кнопки возврата */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button 
            onClick={() => navigate('/')}
            className="flex-1 bg-white text-black hover:bg-neutral-200 py-4 text-[10px] tracking-widest uppercase font-medium transition flex items-center justify-center space-x-2"
          >
            <ArrowLeft size={12} />
            <span>На главную</span>
          </button>
          <button 
            onClick={() => navigate('/#menu')}
            className="flex-1 border border-neutral-800 hover:border-white py-4 text-[10px] tracking-widest uppercase transition flex items-center justify-center space-x-2 text-white"
          >
            <BookOpen size={12} />
            <span>Посмотреть меню</span>
          </button>
        </div>

      </div>
    </div>
  );
}
