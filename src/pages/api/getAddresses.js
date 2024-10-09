import axios from "axios";

const client_id = "kTEd7L8tcvklItLg9XTQf5lkXiyYVfbg"; // Замените на ваш client_id
const client_secret = "JcG3doDHAn3xEzvs2sbwqG8qfDvj1Uae"; // Замените на ваш client_secret

async function getCdekToken() {
  const { data } = await axios.post(
    `https://api.cdek.ru/v2/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`,
    {}
  );
  return data.access_token; // Возвращаем только токен
}

export default async function handler(req, res) {
  try {
    // Получаем токен
    const token = await getCdekToken();

    // Запрашиваем адреса с использованием полученного токена
    const { data } = await axios.get("https://api.cdek.ru/v2/deliverypoints", {
      headers: { Authorization: "Bearer " + token },
    });

    // Возвращаем адреса в ответе
    res.status(200).json(data);
  } catch (error) {
    console.error("Ошибка при получении адресов:", error);
    res.status(500).json({ error: "Ошибка при получении адресов" });
  }
}
