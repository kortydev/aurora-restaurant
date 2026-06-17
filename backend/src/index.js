import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Пробный роут для проверки работы сервера
app.get('/', (req, res) => {
  res.send('Сервер Aurora Restaurant запущен и готов к работе!');
});

/**
 * 1. Создание нового бронирования
 * Метод: POST
 * Путь: /api/bookings
 */
app.post('/api/bookings', async (req, res) => {
  const { name, phone, booking_date, booking_time, guests } = req.body;

  // Простая валидация полей на сервере
  if (!name || !phone || !booking_date || !booking_time || !guests) {
    return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          name,
          phone,
          booking_date,
          booking_time,
          guests: parseInt(guests, 10),
          status: 'new' // По умолчанию новая бронь имеет статус 'new'
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Бронирование успешно создано',
      booking: data[0]
    });
  } catch (error) {
    console.error('Ошибка при создании бронирования:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера при бронировании' });
  }
});

/**
 * 2. Получение списка всех бронирований (для админ-панели)
 * Метод: GET
 * Путь: /api/bookings
 */
app.get('/api/bookings', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false }); // Сначала новые записи

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Ошибка при получении списка бронирований:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера при получении данных' });
  }
});

/**
 * 3. Изменение статуса бронирования
 * Метод: PATCH
 * Путь: /api/bookings/:id
 */
app.patch('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Валидация разрешенных статусов
  const allowedStatuses = ['new', 'confirmed', 'cancelled'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Некорректный статус бронирования' });
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Бронирование с таким ID не найдено' });
    }

    res.status(200).json({
      success: true,
      message: 'Статус бронирования успешно обновлен',
      booking: data[0]
    });
  } catch (error) {
    console.error('Ошибка при обновлении статуса бронирования:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера при изменении статуса' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});
