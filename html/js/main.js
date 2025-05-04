const mainURL = "https://api.escuelajs.co/api/v1/products";
const btnProducts = document.getElementById("btn-Products");
const cardsContainer = document.querySelector(".album .container .row");

function getData() {
    fetch(mainURL)
        .then(response => response.json())
        .then(products => {
            createCards(products.slice(0, 9));
        })
        .catch((error) => {
            cardsContainer.insertAdjacentHTML("beforeend", `
                <div class="alert alert-danger" role="alert">
                    ${error.message}
                </div>
            `);
        });
}


function createCards(products) {
    cardsContainer.innerHTML = "";
    products.forEach(product => {
        const { images, title, description, price } = product;
        const shortDescription = description.length > 100 
        ? description.slice(0, 100) + "..." 
        : description;
        const cardHTML = `
          <div class="col">
            <div class="card shadow-sm">
              <img src="${images[1]}" class="bd-placeholder-img card-img-top" width="100%" height="225" alt="${title}">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${shortDescription}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                  </div>
                  <small class="text-body-secondary">$ ${price}</small>
                </div>
              </div>
            </div>
          </div>
        `;
        cardsContainer.innerHTML += cardHTML;
    });
}

    btnProducts.addEventListener("click", getData);
