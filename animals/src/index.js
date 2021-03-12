//Initial Render
getAllAnimals()

//Fetch Data
function getAllAnimals(){
  fetch('http://localhost:3000/animals')
  .then(res => res.json())
  .then(animals => animals.forEach(animal => renderOneAnimal(animal)))
  .catch(error => console.log(error))
}

function createAnimal(animalObj){
  fetch('http://localhost:3000/animals',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalObj)
  })
  .then(res => res.json())
  .then(animal => renderOneAnimal(animal))
  .catch(errors => console.log(errors))
}

function updateDonation(animalObj,id){
  fetch(`http://localhost:3000/animals/${id}`,{
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(animalObj)
  })
  .then(res => res.json())
  .then(animal => updateDomDonation(animal.id, animal.donations))
}

function deleteAnimal(id){
  fetch(`http://localhost:3000/animals/${id}`,{
    method:'DELETE'
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById(id).remove()
  })
  .catch(error => console.log(error))
}

//Dom Manipulation 
function renderOneAnimal(animal){
  const card = document.createElement('li')
  card.className = 'card'
  card.id = animal.id
  card.innerHTML = `
    <img src="${animal.imageUrl}">
    <div class="content" id=${animal.id}>
      <h4>${animal.name}</h4>
      <p>
        $ <span class="donation-count">${animal.donations}</span> Donated
      </p>
      <button id='donation_btn'>Donate $10</button>
      <button id='delete_btn'>Delete</button>
    </div>
  `
  card.querySelector('#delete_btn').addEventListener('click',() => deleteAnimal(animal.id))
  card.querySelector('#donation_btn').addEventListener('click', handleDonations)

  document.querySelector('#animal-list').append(card)
}

function updateDomDonation(id, donation){
  let card = document.getElementById(id)
  card.querySelector('.donation-count').innerText = donation

}

//Events
document.querySelector('#animal-form').addEventListener('submit', handleSubmit)

//Handlers 
function handleSubmit(e){
  e.preventDefault()
  let animalObj = {
    name:e.target.name.value,
    imageUrl:e.target.image_url.value,
    description:e.target.description.value,
    donations:0
  }
  // renderOneAnimal(animalObj)
  createAnimal(animalObj)

}

function handleDonations(e){
  let donations = e.target.previousElementSibling.innerText.split(' ')
  let id = e.target.parentElement.id
  let newDonation = parseInt(donations[1]) +10
  let animalObj = {
    donations: newDonation
  }
  // updateDomDonation(id,newDonation)
  updateDonation(animalObj,id)
}