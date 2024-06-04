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
      return response.text();
    })
    .then(data => {
      console.log('Ответ от сервера в виде текста:', data);
      try {
        const jsonData = JSON.parse(data);
        console.log('Парсинг ответа JSON:', jsonData);
        alert('Новость успешно создана!');
      } catch (e) {
        console.warn('Ответ не в формате JSON:', data);
      }
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    });
  location.reload();
}


function getNews() {
  fetch("http://localhost:8080/news")
    .then(response => response.json())
    .then(data => {
      displayNews(data);
    })
    .catch(error => {
      console.error('Error fetching news:', error);
    });
}

getNews()

function displayNews(about) {
  const newsListDiv = document.getElementById("newsList");
  newsListDiv.innerHTML = "";

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
  fetch(`http://localhost:8080/news/${id}`, {
    method: 'DELETE',
  });

  location.reload();
}

function edit(id) {
  console.log(id)
  // Запрос текущих данных новости
  fetch(`http://localhost:8080/news/${id}`)
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

  fetch(`http://localhost:8080/news/${id}`, {
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
      location.reload();
    })
    .catch(error => {
      console.error('Ошибка при обновлении:', error);
    });
}

function closeEdit() {
  const form = document.getElementById('editForm');
  if (form) {
    form.remove();
  }
  location.reload()
}



