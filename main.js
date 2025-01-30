// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});


// Navbar Scroll Effect
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Intersection Observer for Animations
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('fade-in');
    sectionObserver.observe(section);
});


// Parallax Effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        element.style.transform = `translateY(${rate}px)`;
    });
});


// Contact Form
(function() {
    emailjs.init("User ID"); // Replace with your EmailJS user ID
})();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Collect form data
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const message = document.querySelector('textarea[name="message"]').value;

        // Create a template parameters object
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        // Send the email
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById('message').innerText = 'Thank you for contacting us, ' + name + '!';
                contactForm.reset(); // Reset the form
            }, function(error) {
                console.log('FAILED...', error);
                document.getElementById('message').innerText = 'Oops! Something went wrong. Please try again.';
            });
    });
}


// Image Loading Animation
function loadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));
}


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadImages();
});


//gallery
let lastScrollTop = 0;
const galleryItems = document.querySelectorAll('.gallery-item');

 
// Function to show or hide gallery items based on scroll direction
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    galleryItems.forEach((item, index) => {
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            if (scrollTop > item.offsetTop - window.innerHeight + 100) {
                item.classList.add('visible');
            }
        } else {
            // Scrolling up
            if (scrollTop < item.offsetTop + item.offsetHeight) {
                item.classList.remove('visible');
            }
        }
    });

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}


// Event listener for scroll
window.addEventListener('scroll', handleScroll);