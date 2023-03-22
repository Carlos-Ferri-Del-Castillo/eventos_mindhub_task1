let seccion = document.getElementById('seccion-index')

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        let eventos = data.events
        crearCard(eventos, seccion)
        todasLasCategorias = Array.from(new Set(categoriasFiltradas(eventos)))
        $check.innerHTML = generarCheckbox(todasLasCategorias)
        $check.addEventListener('change', cruzarBusqueda)
        $input.addEventListener('input', cruzarBusqueda)

        function cruzarBusqueda() {
            const filtroInput = busquedaInputText($input, eventos)
            const filtroCheck = busquedaCheck($input, filtroInput, eventos)
            if (filtroCheck.length === 0) {
                return renderizar(mensajeNotFound(), 'seccion-index')
            }
            return renderizar(generarCards(filtroCheck), 'seccion-index')
        }
    })
    .catch(error => console.log(error))

function crearCard(list, place) {
    let div = document.createElement('div')
    div.classList.add('row', 'row-cols-2', 'container-fluid', 'px-0', 'mx-auto', 'justify-content-center', 'justify-content-lg-evenly', 'gap-3', 'my-4')

    for (let feature of list) {
        div.innerHTML +=
            ` <div class="card g-3 mb-4" style="width: 18rem;">
    <img src="${feature.image}" class="card-img-top" alt="${feature.name}">
    <div class="card-body d-flex flex-column justify-content-center">
        <h5 class="card-title">${feature.name}</h5>
        <p class="card-text">${feature.description}</p>
        <p> Date: ${feature.date}</p>
        <p>Price: $${feature.price}</p>
        <p>${feature.category}</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <a href="./details.html?id=${feature._id}" class="btn btn-primary">See More</a>
          </div>
    </div>
    </div>`
    }
    place.append(div)
}

const $check = document.getElementById('checks')
const $input = document.getElementById('busqueda-input')

let todasLasCategorias

function categoriasFiltradas(events) {
    const categorias = events.map(event => event.category)
    return categorias
}



function generarCheckbox(categorias) {

    let template = ''
    categorias.forEach(categoria => {
        template += `
        <div class="form-check col-lg-auto col-6 p-lg-0 d-flex justify-content-center justify-content-lg-start">
            <input value="${categoria}" type="checkbox" name="category2" class="check-box form-check-input" id="${categoria}">
            <label class="form-check-label ps-3 ps-lg-2 col-lg-auto label-formulario col-8" for="${categoria}">${categoria}</label>
        </div>
        `
    })
    return template
}



function obtenerCheckeados() {
    const checkbox = document.querySelectorAll('input[type="checkbox"]:checked')
    const checkboxArray = Array.from(checkbox)
    return checkboxArray
}

function renderizar(template, donde) {
    document.getElementById(donde).innerHTML = template
}

function generarCards(eventos) {
    let aux = ''
    let div = document.createElement('div')
    div.classList.add('row', 'row-cols-2', 'container-fluid', 'px-0', 'mx-auto', 'justify-content-center', 'justify-content-lg-evenly', 'gap-3', 'my-4')
    eventos.forEach(feature => {
        aux +=
            `<div class="card g-3 mb-4" style="width: 18rem;">
        <div class="p-2 pt-md-3">
        <img src="${feature.image}" class="card-img-top" alt="${feature.name}">
        <div class="card-body d-flex flex-column justify-content-center">
            <h5 class="card-title">${feature.name}</h5>
            <p class="card-text">${feature.description}</p>
            <p>${feature.date}</p>
            <p>${feature.category}</p>
            <p>Price: ${feature.price}</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <a href="./details.html" class="btn btn-primary">See More</a>
                </div>
            </div>
        </div>
    </div>`
    })
    div.innerHTML = aux
    let template = div.outerHTML;
    return template
}

function mensajeNotFound() {
    template = ''
    let div = document.createElement('h3')
    template = `
        <h3 class="not-found">Results Not Found</h3>
    `
    div.innerHTML = template
    return template
}


function busquedaCheck(valueInput, listaEventos, todosLosEventos) {
    const checkeados = obtenerCheckeados()
    const checkValue = checkeados.map(checkeados => checkeados.value)

    const eventosCheck = todosLosEventos.filter(evento => checkValue.includes(evento.category))

    if (eventosCheck.length > 0) {
        const filtroCruzado = eventosCheck.filter(evento => evento.name.toLowerCase().startsWith(valueInput.value.toLowerCase()))
        return filtroCruzado
    } else {
        return listaEventos
    }
}

function busquedaInputText(busquedaInput, todosLosEventos) {
    let inputFiltrado = todosLosEventos.filter(evento => evento.name.toLowerCase().startsWith(busquedaInput.value.toLowerCase()))
    return inputFiltrado
}
