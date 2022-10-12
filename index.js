import css from './styles.css'

let imagesContainer = document.querySelector("#images-container");
let loader = document.querySelector(".loader-container");
let img = null;
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//unsplash API
const photosQty = 20;
const url = `https://api.unsplash.com/photos/random/?client_id=${process.env.API_KEY}&count=${photosQty}`;

const loadedImages = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.style.display = "none";
  }
};

const infiniteScroll = () => {
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000 &&
      ready
    ) {
      ready = false;
      getPhotos();
    }
  });
};

const mapImagesOnScreen = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    imagesContainer.insertAdjacentHTML(
      "afterbegin",
      `<a class="photo-link" target="_blank" href="${photo.links.html}"><img class="gallery-image" src="${photo.urls.regular}" alt="${photo.alt_description}"/><a>`
    );
  });
};

const getPhotos = async () => {
  try {
    const response = await fetch(url);
    photosArray = await response.json();
    mapImagesOnScreen();
    img = document.querySelectorAll(".gallery-image");
    img.forEach((img) => {
      img.addEventListener("load", loadedImages);
    });
  } catch (error) {
    console.log("ha ocurrido un error : ", error);
  }
};

window.addEventListener("load", () => {
  getPhotos();
  infiniteScroll();
});
