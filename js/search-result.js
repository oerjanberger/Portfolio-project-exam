const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const searchWord = params.get("search");
const searchUrl = "https://flower-power.orjan-berger.one/wp-json/wp/v2/posts/?per_page=100";
const description = document.querySelector(`meta[name="description"]`);
const blogListContainer = document.querySelector("#blog-list-container");
const loadingContainer = document.querySelector(".loading-container");
const introSection = document.querySelector("#intro-section");

setTimeout(function () {
    loadingContainer.style.display = "none";
},
    2500);

async function showPostWithSearch() {
    try {
        const response = await fetch(searchUrl);
        const searchResult = await response.json();
        description.innerHTML = "";
        description.innerHTML += `This is a list of all the blogs with the word "${searchWord}" in them`;
        introSection.innerHTML = "";
        console.log(searchResult)
        introSection.innerHTML = `<h1>We could not find a blog with the word "${searchWord}", please enter a different word or check out our blog list </h1>`;

        for (i = 0; i < searchResult.length; i++) {
            if (searchWord === null || searchWord === "") {
                introSection.innerHTML = "";
                introSection.innerHTML = `<h1>Did you forget to add a searchword?</h1>`;
                blogListContainer.innerHTML = "";
            }
            else if (searchResult[i].acf.post_title.toLowerCase().includes(searchWord) ||
                searchResult[i].acf.first_paragraph.toLowerCase().includes(searchWord) ||
                searchResult[i].acf.second_paragraph.toLowerCase().includes(searchWord) ||
                searchResult[i].acf.thrid_paragraph.toLowerCase().includes(searchWord) ||
                searchResult[i].acf.fourth_paragraph.toLowerCase().includes(searchWord) ||
                searchResult[i].acf.exerpts.toLowerCase().includes(searchWord) ||
                searchResult[i].acf.sub_headline_one.toLowerCase().includes(searchWord) ||
                searchResult[i].acf.subheading_two.toLowerCase().includes(searchWord)) {

                let date = new Date(searchResult[i].date);
                const dateDay = date.getDate();
                const dateMonth = date.getMonth() + 1;
                const dateYear = date.getFullYear();
                date = dateDay + "." + dateMonth + "." + dateYear;
                introSection.innerHTML = `<h1>Blogs with the word "${searchWord}"</h1>`;
                blogListContainer.innerHTML += `
                <a href="blog-specific.html?id=${searchResult[i].id}">   
                    <div class="blog-preview">
                        <img src="${searchResult[i].acf.second_image}" class="blog-list-image">
                        <div class="blogInfo">
                            <h2>${searchResult[i].acf.post_title}</h2>
                            <p class="blog-preveiw-text">${searchResult[i].acf.exerpts}</p>
                            <div class="authoranddate">
                                <p>By: ${searchResult[i].acf.author}</p>
                                <p>${date}</p>
                            </div>
                            <p class="blog-preveiw-link">Click to see more...</p>
                        </div>
                    </div>
                </a>`

            }
        }
    }
    catch (error) {
        errorMessage();
    }
}
showPostWithSearch();

