let page = 1

const monsterList = document.getElementById('monster-container')
const url = `http://localhost:3000/monsters/?_limit=50&_page=${page}`

const fetchMonsters = (page) => {
    return fetch(url)
        .then(resp => resp.json())
        .then(monsters => {

            monsterList.innerHTML = ''

            monsters.forEach( monster => {

                createMonsterCard(monster)
            })
        })
}

function createMonsterCard(monster) {

    let monsterCard = document.createElement('div')
    monsterCard.className = 'card'
    let monsterName = document.createElement('h2')
    monsterName.textContent = monster.name
    let monsterAge = document.createElement('h4')
    monsterAge.textContent = `Age: ${monster.age}`
    let monsterBio = document.createElement('p')
    monsterBio.textContent = `Bio: ${monster.description}`

    monsterList.append(monsterCard)
    monsterCard.append(monsterName, monsterAge, monsterBio)
}


const addNavListeners = () => {
    const nextPageButton = document.querySelector('#forward')
    const previousPageButton = document.querySelector('#back')
    function nextPage() {page++, fetchMonsters(page)}
    function previousPage() {if (1<page) {page--, fetchMonsters(page)} else {alert("There's nothing for you in that direction.")}}

    nextPageButton.addEventListener('click', () => {nextPage()})
    previousPageButton.addEventListener('click', () => {previousPage()})
}

const newMonsterForm = document.querySelector('form')

newMonsterForm.addEventListener('submit', e => {
    e.preventDefault()

    const newMonsterCard = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
    }

    newMonsterForm.reset()
    createMonsterCard(newMonsterCard)
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(newMonsterCard),
    })
})

init = () => fetchMonsters(), addNavListeners()

document.addEventListener('DOMContentLoaded', init)