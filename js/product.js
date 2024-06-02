var currentUrl = window.location.href;
var urlParts = currentUrl.split("?");
var id;

if (urlParts.length > 1) {
  var queryParams = urlParts[1];

  var params = queryParams.split("&");


  for (var i = 0; i < params.length; i++) {
    // Разбиваем пару ключ-значение на отдельные элементы
    var keyValue = params[i].split("=");
    // Если ключ соответствует "id", сохраняем значение
    if (keyValue[0] === "id") {
      id = keyValue[1];
      break; // Прерываем цикл, если нашли идентификатор
    }
  }

  // Если идентификатор найден, выводим его
  if (id !== undefined) {
    console.log("ID из ссылки:", id);
  } else {
    console.log("В ссылке нет идентификатора");
  }
} else {
  console.log("Ссылка не содержит параметров запроса");
}

async function getProduct() {
  try {
    if (!id) {
      throw new Error('Please provide a product ID');
    }

    const response = await fetch(`http://localhost:8080/product/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (!data || Object.keys(data).length === 0) {
      throw new Error('Received empty or invalid product data');
    }

    console.log('Product info:', data);
    displayProductInfo(data);
  } catch (error) {
    console.error('Error getting product info:', error.message);
  }
}

function displayProductInfo(product) {
  const productInfoDiv = document.getElementById('productInfo');

  // Format the date
  const rawDate = new Date(product.product.date);
  const formattedDate = rawDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let imagesHtml = '';
  for (let i = 0; i < 3; i++) {
    if (product.images[i]) {
      imagesHtml += `
        <div class="product-image-p">
          <img src="data:image/jpeg;base64,${product.images[i]}" alt="Product Image ${i + 1}">
        </div>`;
    }
  }

  productInfoDiv.innerHTML = `
    <div class="product-card-p">
      ${imagesHtml}
      <div class="product-details-p">
        <div class="product-title-p">${product.product.name}</div>
        <div class="product-info-p">
          <span data-label="ID"> ${product.product.id}</span>
          <span data-label="Count">${product.product.count}</span>
          <span data-label="Price">${product.product.price}</span>
          <span data-label="Grade">${product.product.grade}</span>
          <span data-label="Date">${formattedDate}</span>
          <button > Buy product</button>
          <button> Add to cart</button>
        </div>
      </div>
    </div>`;
}



