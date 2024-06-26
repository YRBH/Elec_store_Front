async function createProduct() {
  try {
    const inputName = document.getElementById('name').value;
    const inputCount = parseInt(document.getElementById('count').value);
    const inputPrice = parseFloat(document.getElementById('price').value);
    const inputGrade = parseInt(document.getElementById('grade').value);

    if (!inputName || isNaN(inputCount) || isNaN(inputPrice) || isNaN(inputGrade)) {
      throw new Error('Please fill out all fields correctly');
    }

    const data = {
      name: inputName,
      count: inputCount,
      price: inputPrice,
      grade: inputGrade
    };

    const response = await fetch('http://localhost:8080/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network error: ' + response.statusText);
    }

    const responseData = await response.json();
    console.log('Product successfully created:', responseData);
  } catch (error) {
    console.error('Error creating product:', error.message);
  }
}

async function getProducts() {
  try {
    const response = await fetch('http://localhost:8080/product');

    if (!response.ok) {
      throw new Error('Network error: ' + response.statusText);
    }

    const data = await response.json();
    console.log('Grocery list:', data);
    displayProductList(data);
  } catch (error) {
    console.error('Error getting product list:', error.message);
  }
}

function displayProductList(products) {
  const productListDiv = document.getElementById('productList');
  productListDiv.innerHTML = '';

  console.log(products)

  if (products.length === 0) {
    productListDiv.textContent = 'Product list is empty';
    return;
  }

  const productListHTML = '<div class="product-cards">' + products.map(product => `

    <div class="product-card" onClick ="cl(${product.product.id})">
    <div class="product-image-p">
        <img src="data:image/jpeg;base64,${product.images[0]}" alt="Product Image">
      </div>
      <p class="product-name">Name: ${product.product.name}</p>
      <p class="product-price">Price: ${product.product.price}</p>
      <p class="product-grade">Grade: ${product.product.grade}</p>
    </div>`).join('') + '</div>';

  productListDiv.innerHTML = productListHTML;
}

function cl(id) {
  window.location.href = `product.html?id=${id}`;
}

async function updateProduct() {
  try {
    const productId = document.getElementById('productIdUpdate').value;
    const productName = document.getElementById('productNameUpdate').value;
    const productCount = parseInt(document.getElementById('productCountUpdate').value);
    const productPrice = parseFloat(document.getElementById('productPriceUpdate').value);
    const productGrade = parseFloat(document.getElementById('productGradeUpdate').value);

    const data = {
      name: productName,
      count: productCount,
      price: productPrice,
      grade: productGrade
    };

    const response = await fetch(`http://localhost:8080/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    console.log('Product info updated successfully');
    location.reload();
  } catch (error) {
    console.error('Error updating product info:', error);
  }
}

async function deleteProduct() {
  try {
    const productId = document.getElementById('productIdDelete').value;
    const response = await fetch(`http://localhost:8080/product/${productId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    console.log('Product deleted successfully');

  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

function createBuyer() {
  var name = document.getElementById("buyerName").value;
  var age = document.getElementById("buyerAge").value;
  var mail = document.getElementById("buyerMail").value;
  var date = document.getElementById("buyerDate").value;

  var buyerData = {
    name: name,
    age: age,
    mail: mail,
    date: date
  };

  fetch("http://localhost:8080/buyer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buyerData)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Received response from the server:", data);
      document.getElementById("buyerName").value = "";
      document.getElementById("buyerAge").value = "";
      document.getElementById("buyerMail").value = "";
      document.getElementById("buyerDate").value = "";
      location.reload();
    })
    .catch(error => {
      console.error("An error has occurred:", error);
    });
  location.reload();

}

function getUsers() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8080/buyer', true);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var users = JSON.parse(xhr.responseText);
      displayUserList(users);
    } else {
      document.getElementById('users').innerHTML = 'Error: ' + xhr.status;
    }
  };
  xhr.send();
}

function displayUserList(users) {
  const userListDiv = document.getElementById('users');
  userListDiv.innerHTML = '';

  if (users.length === 0) {
    userListDiv.textContent = 'User list is empty';
    return;
  }

  const userListHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Date of Birth</th>
          <th>E-mail</th>
          <th>Registration date</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(user => `
          <tr class="user-item">
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.dateOfBirthday}</td>
            <td>${user.mail}</td>
            <td>${user.registrationDate}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;

  userListDiv.innerHTML = userListHTML;
}

function getBuyerInfo() {
  const id = document.getElementById('buyerId').value;
  const url = `http://localhost:8080/buyer/${id}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const userInfoHTML = `
                        <div class="user-item">
                            <p class="user-id">ID: ${data.id}</p>
                            <p class="user-name">Name: ${data.name}</p>
                            <p class="user-age">Age: ${data.age}</p>
                            <p class="user-date-of-birthday">Date of Birth: ${data.dateOfBirthday}</p>
                            <p class="user-mail">E-mail: ${data.mail}</p>
                            <p class="user-registration-date">Registration date: ${data.registrationDate}</p>
                        </div>
                    `;
      document.getElementById('buyerInfo').innerHTML = userInfoHTML;
    })
    .catch(error => console.error('Error while retrieving customer data:', error.message));
}

async function updateBuyerInfo() {
  try {
    const id = document.getElementById('updateBuyerId').value;
    const name = document.getElementById('updateName').value;
    const age = document.getElementById('updateAge').value;
    const mail = document.getElementById('updateMail').value;
    const date = document.getElementById('updateDate').value;

    const buyerData = {
      name: name,
      age: age,
      mail: mail,
      date: date
    };

    const response = await fetch(`http://localhost:8080/buyer/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(buyerData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
      location.reload();
    }

    console.log('Received response from the server:', await response.json());

    document.getElementById('updateBuyerId').value = '';
    document.getElementById('updateName').value = '';
    document.getElementById('updateAge').value = '';
    document.getElementById('updateMail').value = '';
    document.getElementById('updateDate').value = '';

  } catch (error) {
    console.error('An error has occurred:', error);
  }
}

function deleteBuyer() {
  const id = document.getElementById('deleteBuyerId').value;

  fetch(`http://localhost:8080/buyer/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Buyer deleted successfully');
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
}

function sendPostRequest() {
  const userId = document.getElementById("userId").value;
  const productId = document.getElementById("productId").value;
  const productCount = document.getElementById("productCount").value;

  const url = 'http://localhost:8080/purchases';
  const xhr = new XMLHttpRequest();
  const postData = JSON.stringify({
    buyer: userId,
    product: productId,
    count: productCount
  });

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log('Successful response from the server:', xhr.responseText);
        location.reload();
      } else {
        console.error('An error has occurred:', xhr.status);
      }
    }
  };

  xhr.send(postData);
}

function deletePurchaseAndRefreshProduct() {
  var purchaseId = document.getElementById("purchaseId").value;

  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", "http://localhost:8080/purchases/" + purchaseId, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        alert("Purchase deleted successfully!");

        getProductDataAndUpdateCount();
      } else {
        alert("Error deleting purchase. Status: " + xhr.status);
      }
    }
  };
  xhr.send();
}

function getProductDataAndUpdateCount() {
  var purchaseId = document.getElementById("purchaseId").value;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/purchases/" + purchaseId + "/productData", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var productData = JSON.parse(xhr.responseText);

        var newProductCount = calculateNewProductCount(productData);
        updateProductCount(newProductCount);
      } else {
        alert("Error fetching product data. Status: " + xhr.status);
      }
    }
  };
  xhr.send();
}

function calculateNewProductCount(productData) {
  var currentCount = productData.currentCount;
  var quantityReturned = productData.quantityReturned;
  var newProductCount = currentCount + quantityReturned;

  return newProductCount;
}

function updateProductCount(newProductCount) {
  document.getElementById("productCount").innerText = newProductCount;
}






