# Используем базовый образ Node.js
FROM node:16.14.0

# Создаем директорию приложения в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json (если есть) в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем файлы проекта в контейнер
COPY . .

# Собираем проект
# RUN npm run build

# Открываем порт, на котором будет работать Next.js приложение
EXPOSE 3000

# Запускаем Next.js приложение
# CMD ["npm", "start"]

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["/bin/sh", "entrypoint.sh"]