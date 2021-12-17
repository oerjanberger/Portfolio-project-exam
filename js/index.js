let url = "https://flower-power.orjan-berger.one/wp-json/wp/v2/posts?per_page=3";
let count = 1;
const loadingContainer = document.querySelector(".loading-container");
const moreBlogsLeft = document.querySelector("#slideshow-button-left");
const moreBlogsRight = document.querySelector("#slideshow-button-right");
const slideshowBlogsContainer = document.querySelector("#slideshow-blogs-container");
const slideshowGrid = window.getComputedStyle(slideshowBlogsContainer).getPropertyValue("min-width");
const pageOneIcon = document.querySelector("#page-one");
const pageTwoIcon = document.querySelector("#page-two");
const pageThreeIcon = document.querySelector("#page-three");
const pageFourIcon = document.querySelector("#page-four");

function perPage() {
    if (slideshowGrid === "210px") {
        url = "https://flower-power.orjan-berger.one/wp-json/wp/v2/posts?per_page=2";
    } else {
        url = "https://flower-power.orjan-berger.one/wp-json/wp/v2/posts?per_page=3";
    }
}

async function getblogs() {
    perPage();
    try {
        const response = await fetch(url);
        const newUrl = await fetch(url + "&page=" + count);
        const result = await newUrl.json();
        loadingContainer.style.display = "none";
        createBlogPreveiw(result);
        showMoreButtons();
        showLessButtons();
        selectPageIcon();
    }
    catch (error) {
        errorMessage();
    }
}
getblogs()

/* Making circle icons navigate through the post pages */
pageOneIcon.onclick = function selectPageWithIcon() {
    getblogs();
    count = 1;
}
pageTwoIcon.onclick = function selectPageWithIcon() {
    getblogs();
    count = 2;
}
pageThreeIcon.onclick = function selectPageWithIcon() {
    getblogs();
    count = 3;
}
pageFourIcon.onclick = function selectPageWithIcon() {
    getblogs();
    count = 4;
}

function selectPageIcon() {
    if (count === 1) {
        pageOneIcon.classList.add("fas");
        pageTwoIcon.classList.remove("fas");
        pageThreeIcon.classList.remove("fas");
        pageFourIcon.classList.remove("fas");
    } else if (count === 2) {
        pageOneIcon.classList.remove("fas");
        pageTwoIcon.classList.add("fas");
        pageThreeIcon.classList.remove("fas");
        pageFourIcon.classList.remove("fas");
    } else if (count === 3) {
        pageOneIcon.classList.remove("fas");
        pageTwoIcon.classList.remove("fas");
        pageThreeIcon.classList.add("fas");
        pageFourIcon.classList.remove("fas");
    }
    else if (count === 4) {
        pageOneIcon.classList.remove("fas");
        pageTwoIcon.classList.remove("fas");
        pageThreeIcon.classList.remove("fas");
        pageFourIcon.classList.add("fas");
    }
}

/* Making the show next latest blogs buttons not count beyond the limit */
function showMoreButtons() {
    if (count >= 4) {
        moreBlogsRight.style.display = "none";
    }
    else {
        moreBlogsRight.style.display = "block";
    }
}
function showLessButtons() {
    if (count >= 2) {
        moreBlogsLeft.style.display = "block";
    }
    else {
        moreBlogsLeft.style.display = "none";
    }
}
function showMoreBlogsPreveiw() {
    getblogs();
    count++;
}
function showLessBlogsPreveiw() {
    getblogs();
    count--;
}

function createBlogPreveiw(result) {
    slideshowBlogsContainer.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
        let date = new Date(result[i].date);
        const dateDay = date.getDate();
        const dateMonth = date.getMonth() + 1;
        const dateYear = date.getFullYear();
        date = dateDay + "." + dateMonth + "." + dateYear;
        slideshowBlogsContainer.innerHTML += `
                <a href="blog-specific.html?id=${result[i].id}">
                    <div class="slideshow-blog">
                        <img src="${result[i].acf.second_image}">
                        <h3>${result[i].title.rendered}</h3>
                        <p class="slideshow-date">${date}</p>
                        <p class="link">Click to read...</p>
                    </div>
                </a>`;
    }
}
moreBlogsRight.addEventListener("click", showMoreBlogsPreveiw);
moreBlogsLeft.addEventListener("click", showLessBlogsPreveiw);


