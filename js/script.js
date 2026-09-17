/* =========================================================
   DAPUR HUHA
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   NAVBAR
========================================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");


    const icon =
        menuToggle.querySelector("i");


    if (navMenu.classList.contains("show")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});



/* =========================================================
   CLOSE MOBILE MENU
   WHEN CLICK NAVIGATION
========================================================= */

document
    .querySelectorAll(".nav-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");

            const icon =
                menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });



/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-menu a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});



/* =========================================================
   WHATSAPP
========================================================= */

function orderWhatsApp(product) {

    /*
        GANTI NOMOR INI
        Format internasional Indonesia

        Contoh:
        6281234567890
    */

    const phone =
        "6285382920804";


    const message =
        `Halo Dapur HUHA Dimsum Sorong 👋

Saya tertarik untuk memesan:

${product}

Mohon informasi mengenai ketersediaan, harga, dan cara pemesanannya.

Terima kasih 😊`;


    const url =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message);


    window.open(url, "_blank");

}



/* =========================================================
   GALLERY
========================================================= */

const galleryModal =
    document.getElementById("galleryModal");

const modalImage =
    document.getElementById("modalImage");


function openGallery(element) {

    const image =
        element.querySelector("img");

    modalImage.src =
        image.src;

    modalImage.alt =
        image.alt;

    galleryModal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function closeGallery() {

    galleryModal.classList.remove("show");

    document.body.style.overflow =
        "";

}


galleryModal.addEventListener("click", (event) => {

    if (
        event.target === galleryModal
    ) {

        closeGallery();

    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeGallery();

    }

});



/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

const track =
    document.getElementById("testimonialTrack");

const dotsContainer =
    document.getElementById("testimonialDots");


const testimonialCards =
    document.querySelectorAll(
        ".testimonial-card"
    );


let currentSlide = 0;

let cardsPerView = 3;

let totalSlides = 2;


function calculateSlider() {

    if (window.innerWidth <= 768) {

        cardsPerView = 1;

    } else if (window.innerWidth <= 1050) {

        cardsPerView = 2;

    } else {

        cardsPerView = 3;

    }


    totalSlides =
        Math.ceil(
            testimonialCards.length /
            cardsPerView
        );


    createDots();

    updateSlider();

}


function createDots() {

    dotsContainer.innerHTML = "";


    for (
        let i = 0;
        i < totalSlides;
        i++
    ) {

        const dot =
            document.createElement("span");


        if (i === currentSlide) {

            dot.classList.add("active");

        }


        dot.addEventListener("click", () => {

            currentSlide = i;

            updateSlider();

        });


        dotsContainer.appendChild(dot);

    }

}


function updateSlider() {

    const cardWidth =
        100 / cardsPerView;


    track.style.transform =
        `translateX(-${currentSlide * 100}%)`;


    const dots =
        dotsContainer.querySelectorAll("span");


    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });

}


function nextTestimonial() {

    currentSlide++;


    if (
        currentSlide >= totalSlides
    ) {

        currentSlide = 0;

    }


    updateSlider();

}


calculateSlider();


window.addEventListener(
    "resize",
    calculateSlider
);


/*
    AUTO SLIDE
*/

setInterval(
    nextTestimonial,
    4500
);



/* =========================================================
   SIMPLE SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".menu-card, .about-content, .about-images, .gallery-item, .testimonial-card"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    revealObserver.observe(element);

});