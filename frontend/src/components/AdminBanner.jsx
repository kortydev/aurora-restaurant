import React from 'react';
import { LogOut } from 'lucide-react';

export default function AdminBanner({ handleLogout }) {
  return (
    <div className="bg-amber-950/20 border border-amber-900/50 p-5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
      <div className="space-y-1">
        <h4 className="text-amber-400 font-medium text-[10px] tracking-[0.2em] uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
          Демонстрационный режим
        </h4>
        <p className="text-neutral-400 text-xs font-light leading-relaxed">
          Это демонстрационная версия административной панели. Любые изменения статусов обновляются в реальной базе данных Supabase, но записи могут быть автоматически сброшены.
        </p>
      </div>
      <button 
        onClick={handleLogout}
        className="border border-neutral-800 hover:border-red-900 hover:text-red-400 text-[10px] tracking-widest uppercase px-5 py-2.5 transition text-white shrink-0 flex items-center gap-2"
      >
        <LogOut size={12} />
        <span>Выйти</span>
      </button>
    </div>
  );
}
