document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('nav ul');
    const sections = document.querySelectorAll('section');
    const logo = document.getElementById('logo');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('show');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navList.classList.remove('show');
            mobileMenu.classList.remove('active');

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for home section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        document.querySelector('#home').style.backgroundPositionY = scrollPosition * 0.7 + 'px';
    });

    // Scroll reveal animation
    const revealElement = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver(revealElement, revealOptions);

    document.querySelectorAll('.business-card, .service-card, .contact-card').forEach(el => {
        revealObserver.observe(el);
    });

    // Sticky header
    const stickyHeader = function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
            logo.style.height = '30px';
        } else {
            header.classList.remove('sticky');
            logo.style.height = '40px';
        }
    };

    window.addEventListener('scroll', stickyHeader);

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        console.log('Form submitted:', { name, email, subject, message });

        // Clear the form fields
        contactForm.reset();

        // Show a success message
        showNotification('Thank you for your message. We will get back to you soon!');
    });

    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#000';
        notification.style.color = '#fff';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Active section highlighting
    const highlightActiveSection = function() {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const correspondingLink = document.querySelector(`nav a[href="#${section.id}"]`);
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightActiveSection);
});