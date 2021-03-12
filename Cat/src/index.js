// - [x] Fetch all of the cats, create a <li> tag with the cats name and add each cat name to the <aside>'s <ul> 

//GET the data
function getCats(){
    fetch('http://localhost:3000/cats')
    .then(res => res.json())
    .then(cats => {
        buildMainCat(cats[0])
        let catsList = document.getElementById('cat_ul')
        cats.forEach(cat => buildCatLi(cat,catsList))
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}
getCats()

function postCat(cat){
    fetch('http://localhost:3000/cats', {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(cat),
    })
    .then(response => response.json())
    .then(cat => {
        console.log('Success:', cat)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}

function updateCat(likes, id){
    
    fetch(`http://localhost:3000/cats/${id}`, {
        method: 'PATCH', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(likes),
    })
    .then(response => response.json())
    .then(data => {
        let domLikes = document.getElementById('cat_likes')
        domLikes.textContent = data.likes
        console.log(data)
    })
    .catch(error => console.error('ERROR:', error))
}

function buildCatLi(cat, catsList){
    let catLi = document.createElement('li')
    catLi.textContent = cat.name

    catLi.addEventListener('click', (e) => buildMainCat(cat))
    catsList.append(catLi)
}

function buildMainCat(cat){
    let h2 = document.getElementById('party_cat_name')
    let img = document.querySelector('img')
    let p = document.getElementById('cat_phrase')
    let plikes = document.getElementById('cat_likes')
    let btn = document.getElementsByTagName('button')

    h2.textContent = cat.name
    btn[1].addEventListener('click', (e) => increaseLikes(e,cat))
    img.src = cat.image
    p.textContent = cat.catchphrase
    plikes.textContent = cat.likes
}   

document.getElementById('add_cat_btn').addEventListener('click', showForm)
document.getElementById('cat_form').addEventListener('submit',addNewCat)
function showForm(e){
   let form = document.getElementById('cat_form')
   form.classList.toggle('hide')
}


function addNewCat(e){
    e.preventDefault()
    let cat = {
        name: e.target['cat-name'].value,
        image: e.target.image.value,
        catchphrase: e.target.phrase.value,
        likes: 0
    }
   let catsList = document.getElementById('cat_ul')
   buildCatLi(cat,catsList)
   postCat(cat)
}

function increaseLikes(e,cat){
    let currentLikes = parseInt(e.target.previousElementSibling.textContent)+1
    let likesObj = {likes:currentLikes}
    updateCat(likesObj,cat.id)
}


//   {
//     "name": "Rose",
//     "image": "assets/gm_cat.jpg",
//     "catchphrase": "shout out to the 2 crew",
//     "likes": 100
//     "id": 3
//   }