import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Phone, User } from 'lucide-react';

export default function BookingForm({ isSubmitting, setIsSubmitting, errorMessage, setErrorMessage }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2'
  });

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, ''); 
    if (input.startsWith('7') || input.startsWith('8')) {
      input = input.substring(1);
    }

    let formatted = '';
    if (input.length > 0) {
      formatted += '+7 (' + input.substring(0, 3);
    }
    if (input.length >= 4) {
      formatted += ') ' + input.substring(3, 6);
    }
    if (input.length >= 7) {
      formatted += '-' + input.substring(6, 8);
    }
    if (input.length >= 9) {
      formatted += '-' + input.substring(8, 10);
    }
    if (input.length === 0) {
      formatted = '';
    }

    setFormData({ ...formData, phone: formatted });
  };

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      setErrorMessage('Пожалуйста, введите Ваше имя (минимум 2 символа).');
      return false;
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 11) {
      setErrorMessage('Пожалуйста, введите полный номер телефона: +7 (999) 999-99-99.');
      return false;
    }

    const numbersOnly = phoneDigits.substring(1);
    if (/^(\d)\1+$/.test(numbersOnly)) {
      setErrorMessage('Пожалуйста, введите Ваш реальный контактный номер телефона.');
      return false;
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setErrorMessage('Нельзя забронировать столик на прошедшую дату.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        name: formData.name,
        phone: formData.phone,
        booking_date: formData.date,
        booking_time: formData.time,
        guests: parseInt(formData.guests, 10)
      });

      if (response.data.success) {
        navigate('/reservation/success', { state: { booking: response.data.booking } });
        setFormData({
          name: '',
          phone: '',
          date: '',
          time: '',
          guests: '2'
        });
      }
    } catch (error) {
      console.error('Ошибка отправки бронирования:', error);
      setErrorMessage(
        error.response?.data?.error || 
        'Не удалось отправить бронирование. Проверьте интернет или состояние сервера.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-neutral-900 bg-neutral-950/20 p-5 sm:p-8 md:p-12 space-y-8 rounded-sm">
      <div className="text-center space-y-2">
        <span className="text-[10px] tracking-[0.25em] uppercase text-red-500 block">Бронирование стола</span>
        <h2 className="text-2xl sm:text-3xl font-light text-white tracking-wide uppercase leading-tight">Вечер изысканной кухни</h2>
        <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">Пожалуйста, заполни форму ниже. Мы подтвердим твой резерв в течение 10 минут.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        {errorMessage && (
          <div className="bg-red-950/20 border border-red-900/50 text-red-400 text-xs py-3 px-4 text-center font-light">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
              <User size={18} />
            </span>
            <input 
              type="text" 
              placeholder="Ваше имя" 
              required
              disabled={isSubmitting}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-neutral-950 border border-neutral-900 focus:border-white text-white pl-12 pr-4 py-4 text-sm font-light outline-none transition disabled:opacity-50"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
              <Phone size={18} />
            </span>
            <input 
              type="tel" 
              placeholder="+7 (999) 999-99-99" 
              required
              disabled={isSubmitting}
              value={formData.phone}
              onChange={handlePhoneChange}
              className="w-full bg-neutral-950 border border-neutral-900 focus:border-white text-white pl-12 pr-4 py-4 text-sm font-light outline-none transition disabled:opacity-50"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
              <Calendar size={18} />
            </span>
            <input 
              type="date" 
              required
              disabled={isSubmitting}
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full bg-neutral-950 border border-neutral-900 focus:border-white text-white pl-12 pr-4 py-4 text-sm font-light outline-none transition disabled:opacity-50"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
              <Clock size={18} />
            </span>
            <input 
              type="time" 
              required
              disabled={isSubmitting}
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full bg-neutral-950 border border-neutral-900 focus:border-white text-white pl-12 pr-4 py-4 text-sm font-light outline-none transition disabled:opacity-50"
            />
          </div>
        </div>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
            <Users size={18} />
          </span>
          <select
            disabled={isSubmitting}
            value={formData.guests}
            onChange={(e) => setFormData({...formData, guests: e.target.value})}
            className="w-full bg-neutral-950 border border-neutral-900 focus:border-white text-white pl-12 pr-4 py-4 text-sm font-light outline-none transition appearance-none disabled:opacity-50"
          >
            <option value="1">1 гость</option>
            <option value="2">2 гостя</option>
            <option value="3">3 гостя</option>
            <option value="4">4 гостя</option>
            <option value="5">5+ гостей</option>
          </select>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-black hover:bg-neutral-200 py-4 text-xs tracking-[0.2em] uppercase font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Отправляем...' : 'Подтвердить бронирование'}
        </button>
      </form>
    </div>
  );
}
