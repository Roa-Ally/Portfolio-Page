const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
const prevImageBtn = document.getElementById("prevImage");
const nextImageBtn = document.getElementById("nextImage");

const clickableImages = Array.from(
  document.querySelectorAll(
    ".project-thumbnail img, .project-hero img, .gallery-box img",
  ),
);

let currentImageIndex = 0;

function showImage(index) {
  currentImageIndex = index;
  modalImg.src = clickableImages[currentImageIndex].src;
  modalImg.alt = clickableImages[currentImageIndex].alt;
  modal.style.display = "flex";
}

clickableImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    showImage(index);
  });
});

nextImageBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex + 1) % clickableImages.length;
  showImage(currentImageIndex);
});

prevImageBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  currentImageIndex =
    (currentImageIndex - 1 + clickableImages.length) % clickableImages.length;
  showImage(currentImageIndex);
});

closeModal?.addEventListener("click", () => {
  modal.style.display = "none";
});

modal?.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("keydown", (e) => {
  if (modal?.style.display === "flex") {
    if (e.key === "Escape") {
      modal.style.display = "none";
    } else if (e.key === "ArrowRight") {
      currentImageIndex = (currentImageIndex + 1) % clickableImages.length;
      showImage(currentImageIndex);
    } else if (e.key === "ArrowLeft") {
      currentImageIndex =
        (currentImageIndex - 1 + clickableImages.length) %
        clickableImages.length;
      showImage(currentImageIndex);
    }
  }
});
