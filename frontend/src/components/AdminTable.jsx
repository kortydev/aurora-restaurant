import React from 'react';
import { Calendar, Clock, Users, Phone, User, Check, X } from 'lucide-react';

export default function AdminTable({ bookings, handleStatusChange, getStatusBadge }) {
  return (
    <div className="overflow-x-auto border border-neutral-900">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-neutral-900 bg-neutral-950/50 text-neutral-400 text-[10px] tracking-wider uppercase font-light">
            <th className="p-4 md:p-6">Клиент</th>
            <th className="p-4 md:p-6">Телефон</th>
            <th className="p-4 md:p-6">Дата и Время</th>
            <th className="p-4 md:p-6 text-center">Гости</th>
            <th className="p-4 md:p-6">Статус</th>
            <th className="p-4 md:p-6 text-right">Управление статусом</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-950">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-neutral-950/30 transition duration-150">
              
              <td className="p-4 md:p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border border-neutral-900 flex items-center justify-center text-neutral-500">
                    <User size={14} />
                  </div>
                  <span className="font-light text-white text-base">{booking.name}</span>
                </div>
              </td>

              <td className="p-4 md:p-6 font-light text-neutral-400">
                <div className="flex items-center space-x-2">
                  <Phone size={12} className="text-neutral-600" />
                  <span>{booking.phone}</span>
                </div>
              </td>

              <td className="p-4 md:p-6 font-light">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-white">
                    <Calendar size={12} className="text-neutral-600" />
                    <span>{new Date(booking.booking_date).toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-neutral-500">
                    <Clock size={12} />
                    <span>{booking.booking_time.slice(0, 5)}</span>
                  </div>
                </div>
              </td>

              <td className="p-4 md:p-6 text-center font-light text-white">
                <div className="inline-flex items-center space-x-1.5 justify-center">
                  <Users size={12} className="text-neutral-600" />
                  <span>{booking.guests}</span>
                </div>
              </td>

              <td className="p-4 md:p-6">
                {getStatusBadge(booking.status)}
              </td>

              <td className="p-4 md:p-6 text-right">
                <div className="flex items-center justify-end space-x-2">
                  {booking.status !== 'confirmed' && (
                    <button
                      onClick={() => handleStatusChange(booking.id, 'confirmed')}
                      title="Подтвердить резерв"
                      className="w-8 h-8 border border-neutral-900 hover:border-emerald-900 hover:text-emerald-400 rounded-sm flex items-center justify-center text-neutral-500 transition"
                    >
                      <Check size={14} />
                    </button>
                  )}
                  
                  {booking.status !== 'cancelled' && (
                    <button
                      onClick={() => handleStatusChange(booking.id, 'cancelled')}
                      title="Отменить резерв"
                      className="w-8 h-8 border border-neutral-900 hover:border-red-900 hover:text-red-400 rounded-sm flex items-center justify-center text-neutral-500 transition"
                    >
                      <X size={14} />
                    </button>
                  )}
                  
                  {booking.status !== 'new' && (
                    <button
                      onClick={() => handleStatusChange(booking.id, 'new')}
                      title="Вернуть в статус 'Новая'"
                      className="w-8 h-8 border border-neutral-900 hover:border-blue-900 hover:text-blue-400 rounded-sm flex items-center justify-center text-neutral-500 transition"
                    >
                      <Clock size={14} />
                    </button>
                  )}
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
