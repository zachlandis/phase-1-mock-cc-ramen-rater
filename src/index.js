fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(data => data.forEach(ramen => buildMenu(ramen)))

function buildMenu(ramen) {
    let menuImg = document.createElement('img')
    menuImg.src = ramen.image
    document.querySelector(['#ramen-menu']).append(menuImg)
    menuImg.addEventListener('click', () => {
        let ramenDetailImg = document.querySelector(['.detail-image'])
        ramenDetailImg.src = ramen.image

        let ramenDetailName = document.querySelector(['.name'])
        ramenDetailName.textContent = `${ramen.name}`

        let ramenDetailRestaurant = document.querySelector(['.restaurant'])
        ramenDetailRestaurant.textContent = `${ramen.restaurant}`

        let ramenRating = document.querySelector(['#rating-display'])
        ramenRating.textContent = `${ramen.rating}`

        let ramenComment = document.querySelector('#comment-display')
        ramenComment.textContent = `${ramen.comment}`
        
    })

}

function createRamen() {
    let form = document.querySelector(['#new-ramen'])
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        let nameValue = document.querySelector(['#new-name']).value
        let restaurantValue = document.querySelector(['#new-restaurant']).value
        let imageValue = document.querySelector(['#new-image']).value
        let ratingValue = document.querySelector(['#new-rating']).value
        let commentValue = document.querySelector(['#new-comment']).value

        fetch(`http://localhost:3000/ramens`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                'name': `${nameValue}`,
                'restaurant': `${restaurantValue}`,
                'image': `${imageValue}`,
                'rating': parseInt(ratingValue),
                'comment': `${commentValue}`
            })
        })
        .then(res => res.json())
        .then(data => buildMenu(data))
    })
}

createRamen()

