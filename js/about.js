/* Adding an Image Modal */
const aboutImage = document.querySelector("#about-image");
const imageModalContainer = document.querySelector("#image-modal-container");
const imageModal = document.querySelector("#image-modal");
const imageModalClose = document.querySelector(".closebtn");
aboutImage.onclick = function () {
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