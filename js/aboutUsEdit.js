function submitForm(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const text = document.getElementById('textarea').value;

  const aboutUs = {
    title: title,
    text: text
  };

  console.log('Отправка данных:', aboutUs);

  fetch('http://localhost:8080/aboutus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(aboutUs)
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

      }
    })
    .catch((error) => {
      console.error('Ошибка:', error);

    });
  location.reload();
}


function getAboutUs() {
  fetch("http://localhost:8080/aboutus")
    .then(response => response.json())
    .then(data => {
      // Обработка полученных данных (списка новостей)
      displayAboutUs(data);
    })
    .catch(error => {
      console.error('Error fetching news:', error);
    });
}

getAboutUs()

function displayAboutUs(about) {
  const newsListDiv = document.getElementById("aboutUsList");
  newsListDiv.innerHTML = ""; // Очищаем содержимое перед добавлением новых элементов

  // Создаем элементы для каждой новости и добавляем их в newsListDiv
  about.forEach(newsItem => {
    const newsItemDiv = document.createElement("div");
    newsItemDiv.innerHTML = `
                <h2>${newsItem.id}</h2>
                <h2>${newsItem.title}</h2>
                <p>${newsItem.text}</p>
                <button onclick="edit(${newsItem.id})">edit</button>
                <button onclick="del(${newsItem.id})">delete</button>
            `;
    newsListDiv.appendChild(newsItemDiv);
  });
}

function del(id) {
  fetch(`http://localhost:8080/aboutus/${id}`, {
    method: 'DELETE',
  });

  location.reload();

}

function edit(id) {
  console.log(id)
  // Запрос текущих данных новости
  fetch(`http://localhost:8080/aboutus/${id}`)
    .then(response => response.json())
    .then(data => {
      // Создание формы редактирования
      const editForm = `
        <div id="editForm">
          <input type="text" id="editTitle" value="${data.title}" />
          <textarea id="editText">${data.text}</textarea>
          <button onclick="submitEdit(${id})">Save Changes</button>
          <button onclick="closeEdit()">Cancel</button>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', editForm);
    })
    .catch(error => console.error('Error:', error));
}

function submitEdit(id) {
  const title = document.getElementById('editTitle').value;
  const text = document.getElementById('editText').value;

  fetch(`http://localhost:8080/aboutus/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: title, text: text })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      closeEdit();
      location.reload(); // Обновить страницу, чтобы показать обновленные данные
    })
    .catch(error => {
      console.error('Ошибка при обновлении:', error);
    });
}

function closeEdit() {
  const form = document.getElementById('editHorm');
  if (form) {
    form.remove();
  }
  location.reload()
}



