//Copyright (c) 2020 Picorims

//page loaded
window.onload = function() {
    AnimateOnVisible();
}

//function to trigger animation when an element is visible. Track elements with a specific class
function AnimateOnVisible() {
    console.log("listening for scroll trigger.");
    var observer = new IntersectionObserver((entries) => {
        console.log("a");
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