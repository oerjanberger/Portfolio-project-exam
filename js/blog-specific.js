const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const id = params.get("id");
const blogSpecificUrl = "https://flower-power.orjan-berger.one/wp-json/wp/v2/posts/" + id;
const topImageContainer = document.querySelector("#image-container");
const intro = document.querySelector("#intro-section");
const content = document.querySelector("#content-container");
const title = document.querySelector("title");
const description = document.querySelector(`meta[name="description"]`);
const loadingContainer = document.querySelector(".loading-container");
const previousNextSection = document.querySelector("#linking-blogs");
const previousBlog = document.querySelector("#previous-blog");
const nextBlog = document.querySelector("#next-blog");

setTimeout(function () {
    loadingContainer.style.display = "none";
},
    2500);

async function getBlogSpecificDetails() {

    try {
        const response = await fetch(blogSpecificUrl);
        const results = await response.json();
        let date = new Date(results.date);
        const dateDay = date.getDate();
        const dateMonth = date.getMonth() + 1;
        const dateYear = date.getFullYear();
        date = dateDay + "." + dateMonth + "." + dateYear;
        description.innerHTML = "";
        title.innerHTML = "";
        topImageContainer.innerHTML = "";
        intro.innerHTML = "";
        content.innerHTML = "";


        description.innerHTML += `VehicleTalk | ${results.acf.post_title}. ${results.acf.exerpts}`;
        title.innerHTML += `VehicleTalk | ${results.acf.post_title}`;

        topImageContainer.innerHTML += `
            <img src="${results.acf.top_image}" class="about-image" id="top-image" alt="${results.acf.alt_text_image_one}">
            <div id="image-modal-container" class="image-modal-container">
                <i class="fas fa-times closebtn"></i>
                <img id="image-modal" class="image-modal">
            </div>
            `;

        intro.innerHTML += `
            <h1 class="blog-specific-h1">${results.acf.post_title}</h1>
            <div>
                <div class="authorinfo-container">
                    <img src="${results.acf.profile_picture}" alt="${results.acf.alt_text_profile_picture}"
                        class="profilepicture">
                    <div class="author-info">
                        <p>Written by: ${results.acf.author}</p>
                        <div class="author-twitter-info">
                            <a href=""><i class="fab fa-twitter author-twitter-link"></i></a>
                            <a href=""><p>@Random_twitter_account</p></a>
                        </div>
                    </div>
                    <p class="blog-specific-date">${date}</p>
                </div>
            </div>
            <div class="tags-container">
                
            </div>
            `;

        /* Getting the tag names */
        const tagUrl = "https://flower-power.orjan-berger.one/wp-json/wp/v2/tags?post=" + id;
        const tagsContainer = document.querySelector(".tags-container");
        async function getTagNames() {
            try {
                const tagResponse = await fetch(tagUrl);
                const tagResults = await tagResponse.json();
                for (i = 0; i < tagResults.length; i++) {
                    tagsContainer.innerHTML += `
                    <a href="tag-search.html?id=${tagResults[i].id}&tag=${tagResults[i].name}"><button class="inputsandbuttons tags">${tagResults[i].name}</button></a>
                    `;
                }
            }
            catch (error) {
                errorMessage();
            }
        }
        getTagNames();

        content.innerHTML += `
            <div class="intro-paragaph-container">
                <p>${results.acf.first_paragraph}</p>
            </div>
            <img src="${results.acf.second_image}" class="about-image" id="second-image" alt="${results.acf.alt_text_image_two}">
            <h2>${results.acf.sub_headline_one}</h2>
            <div class="intro-paragaph-container">
                <p>${results.acf.second_paragraph}</p>
            </div>
            <div class="quote-container">
                <p class="quote">"${results.acf.qoute}"</p>
            </div>
            <div class="intro-paragaph-container">
                <p>${results.acf.thrid_paragraph}</p>
            </div>
            <img src="${results.acf.third_image}" class="about-image" id="third-image" alt="${results.acf.alt_text_image_three}">
            <h2>${results.acf.subheading_two}</h2>
            <div class="intro-paragaph-container">
                <p>${results.acf.fourth_paragraph}</p>
            </div>
            <div id="image-modal-container" class="image-modal-container">
                <i class="fas fa-times closebtn"></i>
                <img id="image-modal" class="image-modal">
            </div>
            `;

        /* Image Modal for the images on the blog specific page */
        const topImage = document.querySelector("#top-image");
        const secondImage = document.querySelector("#second-image");
        const thirdImage = document.querySelector("#third-image");
        const imageModalContainer = document.querySelector("#image-modal-container");
        const imageModal = document.querySelector("#image-modal");
        const imageModalClose = document.querySelector(".closebtn");
        topImage.onclick = function () {
            imageModalContainer.style.display = "block";
            imageModal.src = this.src;
        }
        secondImage.onclick = function () {
            imageModalContainer.style.display = "block";
            imageModal.src = this.src;
        }
        thirdImage.onclick = function () {
            imageModalContainer.style.display = "block";
            imageModal.src = this.src;
        }
        imageModalClose.onclick = function () {
            imageModalContainer.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target === imageModalContainer) {
                imageModalContainer.style.display = "none"
            }
        }
        /* Previous/Next blog function */
        function noNewerBlogs() {
            if (results.next === null) {
                previousNextSection.innerHTML = `
                <div class="links-to-other-blogs">
                    <a href="blog-specific.html?id=${results.previous.id}">
                        <p id="previous-blog" class="previous-blog">&lt;&lt; Previus</p>
                    </a>
                </div>
                `;
            } else if (results.previous === null) {
                previousNextSection.innerHTML = `
                    <div class="links-to-other-blogs">
                        <a href="blog-specific.html?id=${results.next.id}">
                             <p id="previous-blog" class="previous-blog">&lt;&lt; Previus</p>
                         </a>
                    </div>
                    `;
            }
            else {
                previousNextSection.innerHTML = `
                <div class="links-to-other-blogs">
                    <a href="blog-specific.html?id=${results.previous.id}">
                        <p id="previous-blog" class="previous-blog">&lt;&lt; Previous</p>
                    </a>
                    <a href="blog-specific.html?id=${results.next.id}">
                        <p id="next-blog" clas="next-blog">Next &gt;&gt;</p>
                    </a>
                </div>
                `;
            }

        }
        noNewerBlogs();

    }
    catch (error) {
        errorMessage();
        console.log(error)
    }
}
getBlogSpecificDetails();






