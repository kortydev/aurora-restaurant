import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RefreshCw } from 'lucide-react';

// Импортируем наши декомпозированные компоненты
import AdminBanner from '../components/AdminBanner';
import AdminFilters from '../components/AdminFilters';
import AdminTable from '../components/AdminTable';
import Pagination from '../components/Pagination';

export default function Admin() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Состояния для фильтрации и пагинации
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Проверка авторизации
  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated');
    if (isAuth !== 'true') {
      navigate('/admin');
    } else {
      fetchBookings();
    }
  }, [navigate]);

  // Выход из системы
  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    navigate('/admin');
  };

  // Динамический URL для админки
  const API_BASE_URL = import.meta.env.PROD 
    ? 'https://aurora-backend-1nio.onrender.com/api' 
    : 'http://localhost:5000/api';

  // Загрузка бронирований
  const fetchBookings = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings`);
      setBookings(response.data);
    } catch (error) {
      console.error('Ошибка при получении бронирований:', error);
      setErrorMessage('Не удалось загрузить список бронирований. Проверьте бэкенд.');
    } finally {
      setLoading(false);
    }
  };

  // Изменение статуса
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/bookings/${id}`, {
        status: newStatus
      });

      if (response.data.success) {
        setBookings(prevBookings =>
          prevBookings.map(b => b.id === id ? { ...b, status: newStatus } : b)
        );
      }
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      alert('Не удалось изменить статус бронирования. Попробуйте еще раз.');
    }
  };

  // Применяем фильтрацию
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesDate = !dateFilter || booking.booking_date === dateFilter;
    return matchesStatus && matchesDate;
  });

  // Расчет пагинации
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (date) => {
    setDateFilter(date);
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return (
          <span className="bg-blue-950/40 text-blue-400 border border-blue-900/50 text-[10px] tracking-wider uppercase px-2.5 py-1 font-medium rounded-sm">
            Новая
          </span>
        );
      case 'confirmed':
        return (
          <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 text-[10px] tracking-wider uppercase px-2.5 py-1 font-medium rounded-sm">
            Подтверждена
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-neutral-900 text-neutral-500 border border-neutral-800 text-[10px] tracking-wider uppercase px-2.5 py-1 font-medium rounded-sm">
            Отменена
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-black text-neutral-200 min-h-screen selection:bg-neutral-800 selection:text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. БАННЕР ДЕМО-РЕЖИМА */}
        <AdminBanner handleLogout={handleLogout} />

        {/* 2. ШАПКА */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-900 pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-light text-white tracking-[0.3em] uppercase">
              AURORA CONTROL PANEL<span className="text-red-500 font-bold">.</span>
            </h1>
            <p className="text-xs text-neutral-500 tracking-wider uppercase mt-1">
              Система управления резервами столов
            </p>
          </div>

          <button 
            onClick={fetchBookings}
            disabled={loading}
            className="flex items-center space-x-2 border border-neutral-800 hover:border-white text-xs tracking-widest uppercase px-5 py-2.5 transition text-white disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>{loading ? 'Синхронизация...' : 'Обновить'}</span>
          </button>
        </div>

        {/* 3. ФИЛЬТРЫ */}
        <AdminFilters 
          statusFilter={statusFilter}
          handleStatusFilterChange={handleStatusFilterChange}
          dateFilter={dateFilter}
          handleDateFilterChange={handleDateFilterChange}
        />

        {errorMessage && (
          <div className="bg-red-950/20 border border-red-900/50 text-red-400 text-xs py-4 px-6 text-center font-light">
            {errorMessage}
          </div>
        )}

        {/* 4. ТАБЛИЦА */}
        {loading && bookings.length === 0 ? (
          <div className="text-center py-20 text-neutral-500 text-sm tracking-wider uppercase animate-pulse">
            Синхронизация с сервером базы данных...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-20 border border-neutral-900 bg-neutral-950/10 text-neutral-500 text-sm tracking-wider uppercase font-light">
            Записей по заданным фильтрам не найдено
          </div>
        ) : (
          <div className="space-y-6">
            <AdminTable 
              bookings={currentBookings}
              handleStatusChange={handleStatusChange}
              getStatusBadge={getStatusBadge}
            />

            {/* 5. ПАГИНАЦИЯ */}
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        )}
        
        <div className="text-center pt-6">
          <a 
            href="/" 
            className="text-xs text-neutral-600 hover:text-white tracking-widest uppercase transition inline-flex items-center space-x-2"
          >
            <span>← На главную страницу ресторана</span>
          </a>
        </div>

      </div>
    </div>
  );
}
