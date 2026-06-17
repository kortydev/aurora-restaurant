import React from 'react';
import { Calendar, SlidersHorizontal } from 'lucide-react';

export default function AdminFilters({ 
  statusFilter, 
  handleStatusFilterChange, 
  dateFilter, 
  handleDateFilterChange 
}) {
  return (
    <div className="border border-neutral-900 bg-neutral-950/30 p-4 rounded-sm flex flex-col md:flex-row gap-4 items-center justify-between text-xs tracking-wider uppercase">
      
      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
        <span className="text-neutral-500 flex items-center gap-2">
          <SlidersHorizontal size={14} />
          Фильтры:
        </span>
        
        <div className="flex bg-neutral-950 border border-neutral-900 p-1 rounded-sm">
          {[
            { id: 'all', name: 'Все' },
            { id: 'new', name: 'Новые' },
            { id: 'confirmed', name: 'Подтвержденные' },
            { id: 'cancelled', name: 'Отмененные' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleStatusFilterChange(tab.id)}
              className={`px-3 py-1.5 rounded-sm transition ${
                statusFilter === tab.id 
                  ? 'bg-neutral-900 text-white font-medium' 
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <span className="text-neutral-500 flex items-center gap-1.5">
          <Calendar size={14} />
          Выбрать дату:
        </span>
        <input 
          type="date"
          value={dateFilter}
          onChange={(e) => handleDateFilterChange(e.target.value)}
          className="bg-neutral-950 border border-neutral-900 text-white px-3 py-1.5 rounded-sm outline-none focus:border-neutral-700 transition"
        />
        {dateFilter && (
          <button 
            onClick={() => handleDateFilterChange('')}
            className="text-red-400 hover:text-red-300 transition text-[10px]"
          >
            Сбросить
          </button>
        )}
      </div>

    </div>
  );
}
