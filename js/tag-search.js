const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const id = params.get("id");
const tagName = params.get("tag");
const tagUrl = "https://flower-power.orjan-berger.one/wp-json/wp/v2/posts?tags=" + id;
const loadingContainer = document.querySelector(".loading-container");
const description = document.querySelector(`meta[name="description"]`);
const blogListContainer = document.querySelector("#blog-list-container");
const title = document.querySelector("title")

setTimeout(function () {
    loadingContainer.style.display = "none";
},
    2500);

async function showPostWithTags() {
    try {
        const response = await fetch(tagUrl);
        const result = await response.json();
        createList(result);
        description.innerHTML = "";
        title.innerHTML = "";
        description.innerHTML = `This is a list of all the blogs with the tag of "${tagName}"`;
        title.innerHTML = `VehicleTalk | Blogs with the tag of ${tagName}`
    }
    catch (error) {
        errorMessage();
    }
}
showPostWithTags();

function createList(result) {
    const introSection = document.querySelector("#intro-section");
    introSection.innerHTML = "";
    introSection.innerHTML = `<h1>Blogs with a tag of "${tagName}"</h1>`;
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
                        <div class="blogInfo">
                            <h2>${result[i].title.rendered}</h2>
                            <p class="blog-preveiw-text">${result[i].acf.exerpts}</p>
                            <div class="authoranddate">
                                <p>By: ${result[i].acf.author}</p>
                                <p>${date}</p>
                            </div>
                            <p class="blog-preveiw-link">Click to see more...</p>
                        </div>
                    </div>
                </a>`;
    }
}
