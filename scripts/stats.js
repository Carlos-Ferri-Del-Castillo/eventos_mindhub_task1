let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let events = []

async function LosDatos() {

  const response = await fetch(urlApi);
  const datosApi = await response.json();
  events = datosApi.events;
  const currentDate = "2023-03-10";
  let eventosFuturos = futures(events, currentDate)
  let eventosPasados = past(events, currentDate)
  let percentage = assistance(events)
  let maxCapacity = capacity(events)
  printTable(results(percentage, percentage.reverse(), maxCapacity), "OutstandingEvents")

  printTable_Events(dataTable(eventosFuturos), "upcomingEvents")

  printTable_Events(dataTable(eventosPasados), "pastEvents")

}

function futures(events, currentDate) {
  return events.filter(event => event.date > currentDate)
}

function past(events, currentDate) {
  return events.filter(event => event.date < currentDate)
}

function assistance(events) {
  const arrayPercentage = events.map(event => {
    return {
      attendance: (event.assistance / event.capacity) * 100,
      nameEvent: event.name
    }
  })
  arrayPercentage.sort((a, b) => b.attendance - a.attendance)
  return arrayPercentage
}

function capacity(events) {
  const arrayCapacity = events.map(event => {
    return {
      capacity: event.capacity,
      nameEvent: event.name
    }
  })
  arrayCapacity.sort((a, b) => b.capacity - a.capacity)
  return arrayCapacity
}

function results(highestPercentage, lowestPercentage, largerCapacity) {
  let all = {
    highestPercentage: highestPercentage[0].nameEvent,
    lowestPercentage: lowestPercentage[0].nameEvent,
    largerCapacity: largerCapacity[0].nameEvent
  }
  return all
}

function printTable(results, container) {
  const table = document.getElementById(container)
  table.innerHTML = `
  <tr>
      <td>${results.highestPercentage}</td>
      <td>${results.lowestPercentage}</td>
      <td>${results.largerCapacity}</td>
  </tr>
  `
}

function dataTable(events) {
  let categories = Array.from(new Set(events.map(a => a.category)));
  let eventCategories = categories.map(cat => events.filter(event => event.category == cat))
  let result = eventCategories.map(eventCat => {
    let calculate = eventCat.reduce((acc, event) => {
      acc.category = event.category;
      acc.revenues += event.price * (event.assistance || event.estimate);
      acc.attendance += ((event.assistance || event.estimate) * 100) / event.capacity
      return acc
    }, {
      category: "",
      revenues: 0,
      attendance: 0,
    })
    calculate.attendance = calculate.attendance / eventCat.length
    return calculate
  })
  return result;
}

function printTable(events, idTag) {
  const table = document.getElementById(idTag)
  let html = `
      <tr>
              <td>${events.highestPercentage}</td>
              <td>${events.largerCapacity}</td>
              <td>${events.lowestPercentage}</td>
          </tr>
      `
  table.innerHTML = html
}

function printTable_Events(events, idTag) {
  const table = document.getElementById(idTag)
  let html = events.map(event => {
    return `
    <tr>
            <td>${event.category}</td>
            <td>$${event.revenues}</td>
            <td>${event.attendance.toFixed(2)}%</td>
        </tr>
    `
  })
  table.innerHTML = html.join("")
}
LosDatos();