function submitForm(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const text = document.getElementById('textarea').value;

  const news = {
    title: title,
    text: text
  };

  console.log('Отправка данных:', news);

  fetch('http://localhost:8080/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(news)
  })
    .then(response => {
      console.log('Ответ сервера:', response);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text();  // Обрабатываем ответ как текст
    })
    .then(data => {
      console.log('Ответ от сервера в виде текста:', data);
      try {
        // Пробуем парсить текст как JSON
        const jsonData = JSON.parse(data);
        console.log('Парсинг ответа JSON:', jsonData);
        alert('Новость успешно создана!');
      } catch (e) {
        // Если это не JSON, просто выводим текст ответа
        console.warn('Ответ не в формате JSON:', data);
        if (data === "News created") {
          alert('Новость успешно создана!');
        } else {
          alert('Ответ сервера: ' + data);
        }
      }
    })
    .catch((error) => {
      console.error('Ошибка:', error);
      alert('Ошибка при создании новости.');
    });
}



function getNews() {
  fetch("http://localhost:8080/news")
    .then(response => response.json())
    .then(data => {
      // Обработка полученных данных (списка новостей)
      displayNews(data);
    })
    .catch(error => {
      console.error('Error fetching news:', error);
    });
}

// Функция для отображения списка новостей
function displayNews(news) {
  const newsListDiv = document.getElementById("newsList");
  newsListDiv.innerHTML = ""; // Очищаем содержимое перед добавлением новых элементов

  // Создаем элементы для каждой новости и добавляем их в newsListDiv
  news.forEach(newsItem => {
    const newsItemDiv = document.createElement("div");
    newsItemDiv.innerHTML = `
                <h2>${newsItem.title}</h2>
                <p>${newsItem.text}</p>
            `;
    newsListDiv.appendChild(newsItemDiv);
  });
}

// Вызываем функцию getNews() для получения новостей при загрузке страницы
getNews();

// Функция для отправки формы
function submitFormAdmin() {
  const title = document.getElementById('title').value;
  const text = document.getElementById('text').value;

  const news = {
    title: title,
    text: text
  };

  console.log('Отправка данных:', news);

  fetch('http://localhost:8080/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(news)
  })
    .then(response => {
      console.log('Ответ сервера:', response);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text();  // Обрабатываем ответ как текст
    })
    .then(data => {
      console.log('Ответ от сервера в виде текста:', data);
      try {
        // Пробуем парсить текст как JSON
        const jsonData = JSON.parse(data);
        console.log('Парсинг ответа JSON:', jsonData);
        alert('Новость успешно создана!');
      } catch (e) {
        // Если это не JSON, просто выводим текст ответа
        console.warn('Ответ не в формате JSON:', data);
        if (data === "News created") {
          alert('Новость успешно создана!');
        } else {
          alert('Ответ сервера: ' + data);
        }
      }
    })
    .catch((error) => {
      console.error('Ошибка:', error);
      alert('Ошибка при создании новости.');
    });
}





