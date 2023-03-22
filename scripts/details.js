urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function datosCompletos() {
  try {
    let response = await fetch(urlApi)

    let datos = await response.json()

    tarjetaDetalles(datos.events)
  }
  catch {
    console.log()
  }
}

datosCompletos()

let query = location.search
let parametros = new URLSearchParams(query)

let id = parametros.get("id")

function tarjetaDetalles(list) {
  let Details = document.querySelector(".theDetails")
  let feature = list.find(feature => feature._id == id)

  Details.innerHTML = `
    <div class="d-flex justify-content-center">
    <div class="card mb-3" style="max-width: 1000px;">
    <div class="row g-0">
      <div class="col-md-6">
            <img src="${feature.image}" class="img-fluid rounded mx-auto d-block"
              alt="${feature.name}">
          </div>
          <div class="col-md-6">
      <div class="card-body text-center"> 
              <h5 class="card-title">${feature.name}</h5>
              <p class="card-text">${feature.description}</p>
              <p><b>Date:</b>: ${feature.date}</p>
              <p><b>Place:</b>: ${feature.place}</p>
              <p><b>Capacity:</b>: ${feature.capacity}</p>
              <p><b>Price:</b> $${feature.price}</p>
              <p><b>Category:</b>: ${feature.category}</p>
              <div class="d-flex justify-content-center">
              <a href="./index.html" class="btn btn-primary "> Go Back </a>  
          </div>


            </div>
          </div>
        </div>
      </div>
   </div>`
}