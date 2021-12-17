const toTopContainer = document.querySelector(".to-top-btn-container");
const toTopbtn = document.querySelector(".to-top")

window.onscroll = function () {
    topBtnScroll()
};

function topBtnScroll() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        toTopContainer.style.display = "flex";
    } else {
        toTopContainer.style.display = "none";
    }
}

toTopbtn.onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}