let myEvent = document.getElementById("cards")

function cardsEvents(list,place) {
    let allCards = ""
    for (let feature of list) {
        let template = 
        ` <div class="card g-3 mb-4" style="width: 18rem;">
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
    </div>`
        allCards += template
    }
    console.log(place)
    place.innerHTML = allCards
}

cardsEvents(data.events, myEvent)