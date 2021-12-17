const url = "https://flower-power.orjan-berger.one/wp-json/wp/v2/posts";
let count = 1;
let totalPages = 0;
const blogListContainer = document.querySelector("#blog-list-container");
const showMoreBtn = document.querySelector("#show-more");
const loadingContainer = document.querySelector(".loading-container");

setTimeout(function () {
    loadingContainer.style.display = "none";
},
    2500);

async function showMoreBlogs() {
    try {
        const response = await fetch(url);
        totalPages = response.headers.get('X-WP-TotalPages');
        if (totalPages >= count) {
            const response = await fetch(url + "?page=" + count);
            const result = await response.json();
            createBlogList(result);
            count++;
        } else {
            showMoreBtn.innerHTML = "No more blogs";
            showMoreBtn.style.backgroundColor = "var(--vehicleTalk-lightRed)";
            showMoreBtn.style.color = "var(--vehicleTalk-white)";
            showMoreBtn.style.cursor = "default";
        }
    }
    catch (error) {
        errorMessage();
    }
}
showMoreBlogs();

function createBlogList(result) {
    blogListContainer.innerHTML += "";
    for (let i = 0; i < result.length; i++) {
        let date = new Date(result[i].date);
        const dateDay = date.getDate();
        const dateMonth = date.getMonth() + 1;
        const dateYear = date.getFullYear();
        date = dateDay + "." + dateMonth + "." + dateYear;
        blogListContainer.innerHTML += `
            <a href="blog-specific.html?id=${result[i].id}">   
                <div class="blog-preview">
                    <img src="${result[i].acf.second_image}" class="blog-list-image">
                    <h2>${result[i].title.rendered}</h2>
                    <p class="blog-preveiw-text">${result[i].acf.exerpts}</p>
                    <div class="authoranddate">
                        <p>By: ${result[i].acf.author}</p>
                        <p>${date}</p>
                    </div>
                    <p class="blog-preveiw-link">Click to see more...</p>
                </div>
            </a>`;
    }
}
showMoreBtn.addEventListener("click", showMoreBlogs);
