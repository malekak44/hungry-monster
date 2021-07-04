const mealCards = document.getElementById("mealCards");
mealCards.innerHTML = `<h3 class="text-center" style="color:#F06C4E;">Search For Meals<h3>`;
const searchBtn = document.getElementById("search_button");
const searchInput = document.getElementById("searchVal");
searchBtn.addEventListener("click", searchMeals);
searchInput.addEventListener("keyup", (event) => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        searchBtn.click();
    }
});

function searchMeals() {
    searchVal = document.getElementById("searchVal").value;
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchVal}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}

function displayMeals(data) {
    if (data == null || /\s{1,}/.test(searchVal)) {
        mealCards.innerHTML = `<h4 class="text-center" style="color:#F06C4E;">Enter a valid food name<h4>`;
    } else {
        mealCards.innerHTML = "";
        data.forEach(elem => {
            const mealCard = document.createElement("div");
            mealCard.innerHTML = `
        <div class="card" data-bs-toggle="modal" data-bs-target="#mealModal" id="${elem.idMeal}" onclick="displayDetails(this.id)" style="width: 16rem;">
            <img src="${elem.strMealThumb}" class="card-img-top" alt="${elem.strMeal}">
            <div class="card-body">
            <h5 class="card-title">${elem.strMeal}</h5>
            </div>
        </div>`;
            mealCards.appendChild(mealCard);
        });
    }
}



function displayDetails(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => showDetails(data.meals))
}

function showDetails(data) {
    let ingredients = [];
    let details = data[0];
    for (let i = 1; i <= 20; i++) {
        if (details[`strIngredient${i}`]) {
            ingredients.push(`${details[`strIngredient${i}`]}`);
        } else {
            // Stop if there is no more ingredients
            break;
        }
    }
    const mealDetails = document.getElementById("mealDetails");
    mealDetails.innerHTML = `<div>
    <img style="max-width:100%" src="${details.strMealThumb}" alt="${details.strMeal}">
        <div class="details">
        <h5 class="text-center my-3">${details.strMeal}</h5>
        <ul>
        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        </div>
    </div>`
}