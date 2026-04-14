const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalVideo = document.getElementById("modalVideo");
const modalIframe = document.getElementById("modalIframe");
const closeModal = document.getElementById("closeModal");
const prevImageBtn = document.getElementById("prevImage");
const nextImageBtn = document.getElementById("nextImage");

const mediaItems = Array.from(document.querySelectorAll(".media-trigger"));

let currentMediaIndex = 0;

let isZoomed = false;

let isDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;

modalImage.addEventListener("dblclick", () => {
  if (!isZoomed) {
    isZoomed = true;
    modalImage.style.cursor = "grab";
  } else {
    isZoomed = false;
    translateX = 0;
    translateY = 0;
    modalImage.style.cursor = "zoom-in";
  }

  updateImageTransform();
});

function updateImageTransform() {
  const scale = isZoomed ? 2 : 1;
  modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

modalImage.addEventListener("mousedown", (e) => {
  if (!isZoomed) return;

  isDragging = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
  modalImage.style.cursor = "grabbing";
  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging || !isZoomed) return;

  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  updateImageTransform();
});

document.addEventListener("mouseup", () => {
  if (isDragging && isZoomed) {
    isDragging = false;
    modalImage.style.cursor = "grab";
  }
});

function clearModalMedia() {
  function clearModalMedia() {
    isZoomed = false;
    isDragging = false;
    translateX = 0;
    translateY = 0;
    modalImage.style.transform = "translate(0px, 0px) scale(1)";
    modalImage.style.cursor = "zoom-in";

    modalImage.style.display = "none";
    modalImage.removeAttribute("src");
    modalIframe.style.display = "none";
    modalIframe.src = "";
    modalVideo.pause();
    modalVideo.style.display = "none";
    modalVideo.removeAttribute("src");
    modalVideo.removeAttribute("poster");
    modalVideo.load();
  }
}

function showMedia(index) {
  currentMediaIndex = index;

  const item = mediaItems[currentMediaIndex];
  const type = item.dataset.type;
  const src = item.dataset.src;
  const alt = item.dataset.alt || "";
  const poster = item.dataset.poster || "";

  clearModalMedia();
  modal.style.display = "flex";

  if (type === "video") {
    modalVideo.src = src;
    modalVideo.style.display = "block";

    modalVideo.muted = true; // required for autoplay
    modalVideo.autoplay = true;
    modalVideo.controls = true;

    modalVideo.play();

    modalImage.style.display = "none";
    modalIframe.style.display = "none";
  } else if (type === "youtube") {
    modalIframe.src = src;
    modalIframe.style.display = "block";

    modalImage.style.display = "none";
    modalVideo.style.display = "none";
  } else {
    modalImage.src = src;
    modalImage.alt = alt;
    modalImage.style.display = "block";

    modalVideo.style.display = "none";
    modalIframe.style.display = "none";
  }
}

function closeMediaModal() {
  modal.style.display = "none";
  clearModalMedia();
}

mediaItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    showMedia(index);
  });
});

nextImageBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
  showMedia(currentMediaIndex);
});

prevImageBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  currentMediaIndex =
    (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
  showMedia(currentMediaIndex);
});

closeModal?.addEventListener("click", (e) => {
  e.stopPropagation();
  closeMediaModal();
});

modal?.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeMediaModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (modal?.style.display === "flex") {
    if (e.key === "Escape") {
      closeMediaModal();
    } else if (e.key === "ArrowRight") {
      currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
      showMedia(currentMediaIndex);
    } else if (e.key === "ArrowLeft") {
      currentMediaIndex =
        (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
      showMedia(currentMediaIndex);
    }
  }
});
