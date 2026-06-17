import React from 'react';

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex justify-between items-center text-xs tracking-wider uppercase text-neutral-500 border-t border-neutral-900 pt-6">
      <span>Страница {currentPage} из {totalPages}</span>
      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="border border-neutral-900 hover:border-neutral-700 px-4 py-2 transition disabled:opacity-30 disabled:cursor-not-allowed text-white"
        >
          Назад
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="border border-neutral-900 hover:border-neutral-700 px-4 py-2 transition disabled:opacity-30 disabled:cursor-not-allowed text-white"
        >
          Вперед
        </button>
      </div>
    </div>
  );
}
