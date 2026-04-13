const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalVideo = document.getElementById("modalVideo");
const modalIframe = document.getElementById("modalIframe");
const closeModal = document.getElementById("closeModal");
const prevImageBtn = document.getElementById("prevImage");
const nextImageBtn = document.getElementById("nextImage");

const mediaItems = Array.from(document.querySelectorAll(".media-trigger"));

let currentMediaIndex = 0;

function clearModalMedia() {
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
    modalVideo.load();
  } else if (type === "youtube") {
    modalIframe.src = src;
    modalIframe.style.display = "block";
  } else {
    modalImage.src = src;
    modalImage.style.display = "block";
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
