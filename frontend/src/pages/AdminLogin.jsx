import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Демонстрационные учетные данные
    const DEMO_EMAIL = 'admin@aurora-demo.com';
    const DEMO_PASSWORD = 'DemoAdmin123';

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      // Сохраняем токен авторизации в локальное хранилище браузера
      localStorage.setItem('admin_authenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Неверный Email или Пароль. Используйте демонстрационные данные ниже.');
    }
  };

  return (
    <div className="bg-black text-neutral-200 min-h-screen flex items-center justify-center p-6 select-none">
      <div className="max-w-md w-full border border-neutral-900 bg-neutral-950/20 p-8 md:p-12 space-y-8 rounded-sm">
        
        {/* Логотип */}
        <div className="text-center space-y-2">
          <div className="text-xl font-light tracking-[0.3em] text-white">
            AURORA<span className="text-red-500 font-bold ml-1">.</span>
          </div>
          <p className="text-neutral-500 text-[10px] tracking-[0.2em] uppercase">Вход для администрации</p>
        </div>

        {/* Форма входа */}
        <form onSubmit={handleLogin} className="space-y-6 text-left">
          {error && (
            <div className="bg-red-950/20 border border-red-900/50 text-red-400 text-xs py-3 px-4 text-center font-light">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Поле: Email */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                <Mail size={16} />
              </span>
              <input 
                type="email" 
                placeholder="Email адрес" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-900 focus:border-white text-white pl-12 pr-4 py-4 text-sm font-light outline-none transition"
              />
            </div>

            {/* Поле: Пароль */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                <Lock size={16} />
              </span>
              <input 
                type="password" 
                placeholder="Пароль" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-900 focus:border-white text-white pl-12 pr-4 py-4 text-sm font-light outline-none transition"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-white text-black hover:bg-neutral-200 py-4 text-xs tracking-[0.2em] uppercase font-medium transition"
          >
            Войти в систему
          </button>
        </form>

        {/* ПУБЛИЧНЫЕ ДЕМО-ДАННЫЕ ДЛЯ ТВОИХ КЛИЕНТОВ (БОМБА ДЛЯ ПОРТФОЛИО!) */}
        <div className="border border-neutral-900 bg-neutral-950 p-4 space-y-2 rounded-sm text-left">
          <div className="text-[10px] text-amber-500 tracking-wider uppercase font-medium border-b border-neutral-900 pb-2">
            Демонстрационный доступ
          </div>
          <div className="text-xs space-y-1.5 text-neutral-400 font-light">
            <p>
              <span className="text-neutral-500">Email:</span>{' '}
              <code className="text-white font-mono select-all">admin@aurora-demo.com</code>
            </p>
            <p>
              <span className="text-neutral-500">Пароль:</span>{' '}
              <code className="text-white font-mono select-all">DemoAdmin123</code>
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button 
            onClick={() => navigate('/')}
            className="text-[10px] tracking-widest text-neutral-500 hover:text-white uppercase transition inline-flex items-center space-x-2"
          >
            <ArrowLeft size={10} />
            <span>Вернуться на сайт</span>
          </button>
        </div>

      </div>
    </div>
  );
}
