//Copyright (c) 2020-2022 Picorims

//page loaded
window.onload = function() {
    AnimateOnVisible();
    CreateGallery();

    document.getElementById("show_youtube_video").addEventListener("click", () => {
        document.getElementById("youtube_wall").remove();
        document.getElementById("features_video").innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/NWCe2zKY8Wo" title="YouTube video player" frameborder="0" allow="clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    });
}

//function to trigger animation when an element is visible. Track elements with a specific class
function AnimateOnVisible() {
    var observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                entry.target.classList.add('animation_trigger');
                observer.unobserve(entry.target);
            }
        });

    });

    var elements = document.querySelectorAll(".animate_on_visible");

    elements.forEach(elt => {
        observer.observe(elt);
    });
}



//creates a browsable gallery with thumbnails below
function CreateGallery() {
    let images = [
        "./assets/gallery/2021-03-17 110526 showcase album.png",
        "./assets/gallery/2021-03-17 110828 showcase blackhole.png",
        "./assets/gallery/2021-03-17 110952 showcase nightsky.png",
        "./assets/gallery/2021-03-17 111307 showcase radioshow.png",
        "./assets/gallery/2021-03-17 111504 showcase sunphone.png",
        "./assets/gallery/2021-03-17 111658 showcase waves_fade.png",
        "./assets/gallery/2021-07-21 155400 wav2bar 0.2.0 beta.png",
    ];
    let imagesDOM = [];
    let thumbnailsDOM = [];
    let selectedImage = 0;
    let imagesContainer = document.getElementById("gallery_images_container");
    let thumbnailsContainer = document.getElementById("gallery_thumbnails_container");

    //setup gallery
    //add space for thumbnails to the left
    let leftSpace = document.createElement("div");
    thumbnailsContainer.appendChild(leftSpace);
    leftSpace.style.width = "200px";
    leftSpace.style.height = "100%";
    leftSpace.style.flex = "0 0 100px";

    //add images and thumbnails
    for (let i=0; i<images.length; i++) {
        let src = images[i];

        //image
        let img = document.createElement("img");
        imagesContainer.appendChild(img);
        img.src = src;
        img.alt = src.replace(/^.*\//,"");
        if (i !== 0) img.style.display = "none";
        imagesDOM.push(img);

        //thumbnail
        let thumbnail = document.createElement("img");
        thumbnailsContainer.appendChild(thumbnail);
        thumbnail.src = src;
        thumbnail.alt = src.replace(/^.*\//,"");
        thumbnail.onclick = function() {
            DisplayGalleryImage(img, this);
            selectedImage = i;
        }
        thumbnailsDOM.push(thumbnail);
    }

    //add space for thumbnails to the right
    let rightSpace = document.createElement("div");
    thumbnailsContainer.appendChild(rightSpace);
    rightSpace.style.width = "200px";
    rightSpace.style.height = "100%";
    rightSpace.style.flex = "0 0 100px";

    //move in thumbnail timeline
    document.getElementById("thumbnails_go_left").onclick = function() {
        ThumbnailsGoLeft();
    }
    document.getElementById("thumbnails_go_right").onclick = function() {
        ThumbnailsGoRight();
    }

    //next or previous image
    document.getElementById("gallery_prev_img").onclick = function() {
        if (selectedImage > 0) {
            selectedImage--;
            DisplayGalleryImage(imagesDOM[selectedImage], thumbnailsDOM[selectedImage]);
        }
    }
    document.getElementById("gallery_next_img").onclick = function() {
        if (selectedImage < images.length-1) {
            selectedImage++;
            DisplayGalleryImage(imagesDOM[selectedImage], thumbnailsDOM[selectedImage]);
        }
    }
}

//Display the given image in the gallery
function DisplayGalleryImage(img, thumbnail) {
    console.log(img);
    let imagesContainer = document.getElementById("gallery_images_container");
    let thumbnailsContainer = document.getElementById("gallery_thumbnails_container");

    //switch image
    let imagesDOM = imagesContainer.getElementsByTagName("img");
    for (let i of imagesDOM) i.style.display = "none";
    img.style.display = "initial";

    //update thumbnails container
    let thumbnails = thumbnailsContainer.children;
    for (let t of thumbnails) t.classList.remove("focused");
    thumbnail.classList.add("focused");
}

//scroll to left in the thumbnails list
function ThumbnailsGoLeft() {
    let thumbnailsContainer = document.getElementById("gallery_thumbnails_container");

    thumbnailsContainer.velocity("stop"); //in case of ongoing animation
    Velocity(thumbnailsContainer, {scrollLeft: `${thumbnailsContainer.scrollLeft - 350}px`, duration : 100});
}

//scroll to right in the thumbnails list
function ThumbnailsGoRight() {
    let thumbnailsContainer = document.getElementById("gallery_thumbnails_container");

    thumbnailsContainer.velocity("stop"); //in case of ongoing animation
    Velocity(thumbnailsContainer, {scrollLeft: `${thumbnailsContainer.scrollLeft + 350}px`, duration : 100});
}