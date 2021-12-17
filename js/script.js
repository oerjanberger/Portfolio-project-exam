const hamburgerContainer = document.querySelector(".hamburger-container");
const navItems = document.querySelector(".navigation-items");
const closeNavMenu = document.querySelector(".close-nav-menu");
const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburgerContainer.addEventListener("click", function () {
    if (navItems.style.display === "grid") {
        navItems.style.display = "none";
        closeNavMenu.style.display = "none";
        hamburgerMenu.style.display = "block";
    } else {
        navItems.style.display = "grid";
        closeNavMenu.style.display = "block";
        hamburgerMenu.style.display = "none";
    }
});

const searchForm = document.querySelector(".searchbar");
const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#searchbutton");
const searchBtnContainer = document.querySelector("#search-button-container");

function searchBlogs() {
    searchInput.onkeyup = function (event) {
        const searchValue = searchInput.value.toLowerCase();
        searchBtnContainer.innerHTML = `<a href="search-result.html?search=${searchValue}"><button type="button" id="searchbutton" name="searchbutton"><i class="fas fa-search"></i></button></a>`;
    }
}
searchBlogs();