let Data = document.querySelector("#Data");
let search = document.querySelector("#searchContainer");
let subBtn;

$(document).ready(() => {
    searchByName("").then(() => {
       
        $("body").css("overflow", "visible")

    })
})

function open() {
    $(".side-nav").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-solid fa-bars");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function close() {
    let boxWidth = $(".side-nav .nav").outerWidth()
    $(".side-nav").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-solid fa-bars");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

close()
$(".side-nav i.open-close-icon").click(() => {
    if ($(".side-nav").css("left") == "0px") {
        close()
    } else {
        open()
    }
})

let searcch =document.querySelector("#Search")
searcch.addEventListener('click',function(){
    Search()
    close()
})

function Search() {
    search.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control mb-2 bg-white text-black" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-white text-black" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    Data.innerHTML = ""
}

async function searchByName(term) {
    close()
    Data.innerHTML = ""
    $(".inner").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner").fadeOut(300)

}

async function searchByFLetter(term) {
    close()
    Data.innerHTML = ""
    $(".inner").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner").fadeOut(300)

}


function displayMeals(arr) {
    let displayMeal = "";

    for (let i = 0; i < arr.length; i++) {
        displayMeal += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    Data.innerHTML = displayMeal
}

let categories =document.querySelector("#Categories")
 categories.addEventListener('click',function(){
    Categories()
    close()
})
async function Categories() {
    Data.innerHTML = ""
    $(".inner").fadeIn(300)
    search.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`
    )

    response = await response.json()

    displayCategories(response.categories)
    $(".inner").fadeOut(300)

}

function displayCategories(box) {
    let displayBox = "";

    for (let i = 0; i < box.length; i++) {
        displayBox += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${box[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${box[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${box[i].strCategory}</h3>
                        <p>${box[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    Data.innerHTML = displayBox 
}
let area =document.querySelector("#Area")
area.addEventListener('click',function(){
    Area()
    close()
})

async function Area() {
    Data.innerHTML = ""
    $(".inner").fadeIn(300)

    search.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner").fadeOut(300)

}


function displayArea(box) {
    let displayArea = "";

    for (let i = 0; i < box.length; i++) {
        displayArea += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${box[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${box[i].strArea}</h3>
                </div>
        </div>
        `
    }

    Data.innerHTML = displayArea
}
let ingredients = document.querySelector("#ingredients")
ingredients.addEventListener('click',function(){
    Ingredients()
    close()
})

async function Ingredients() {
    Data.innerHTML = ""
    $(".inner").fadeIn(300)

    search.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner").fadeOut(300)

}


function displayIngredients(arr) {
    let display = "";

    for (let i = 0; i < arr.length; i++) {
        display += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    Data.innerHTML = display
}


async function getCategoryMeals(category) {
    Data.innerHTML = ""
    $(".inner").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner").fadeOut(300)

}



async function getAreaMeals(area) {
    Data.innerHTML = ""
    $(".inner").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner").fadeOut(300)

}


async function getIngredientsMeals(ingredients) {
    Data.innerHTML = ""
    $(".inner").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-").fadeOut(300)

}

async function getMealDetails(mealID) {
    close()
    Data.innerHTML = ""
    $(".inner").fadeIn(300)

    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner").fadeOut(300)

}


function displayMealDetails(meal) {
    
    search.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let mealBox = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    Data.innerHTML = mealBox
}


let contact =document.querySelector("#Contacts")
contact.addEventListener('click',function(){
    Contacts()
    close()
})

function Contacts() {
    Data.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="subBtn" disabled class="btn btn-outline-info px-2 mt-3">Submit</button>
    </div>
</div> `
    subBtn = document.querySelector("#subBtn")


    document.querySelector("#nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.querySelector("#emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.querySelector("#phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.querySelector("#ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.querySelector("#passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.querySelector("#repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.querySelector("#nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.querySelector("#nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.querySelector("#emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.querySelector("#emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.querySelector("#phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.querySelector("#phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.querySelector("#ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.querySelector("#ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.querySelector("#passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.querySelector("#passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.querySelector("#repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.querySelector("#repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (namee() &&
        email() &&
        phone() &&
        age() &&
        password() &&
        repassword()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function namee() {
    return (/^[a-zA-Z ]+$/.test(document.querySelector("#nameInput").value))
}

function email() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phone() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.querySelector("#phoneInput").value))
}

function age() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.querySelector("#ageInput").value))
}

function password() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.querySelector("#passwordInput").value))
}

function repassword() {
    return document.querySelector("#repasswordInput").value == document.querySelector("#passwordInput").value
}