// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Make external links open in new tab
    function setExternalLinks() {
        // Get all links
        const allLinks = document.querySelectorAll('a');
        const currentHost = window.location.hostname;

        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // If it's an external link (starts with http/https and not the current domain)
            if (href && href.startsWith('http') && !href.includes(currentHost) && !link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer'); // Security best practice
            }
        });
    }
    
    // Call the function on page load
    setExternalLinks();

    // Change header background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation with regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show sending status
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Lấy thông tin thời gian hiện tại
            const now = new Date();
            const time = now.toLocaleString('vi-VN', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            });
            
            // Use EmailJS to send the form data
            // Replace these with your actual EmailJS user ID, service ID, and template ID
            emailjs.send('service_ylzlp0h', 'template_msd8rsy', {
                name: name,
                email: email,
                subject: subject, 
                message: message,
                reply_to: email,
                time: time // Thêm thời gian gửi
            })
            .then(function() {
                // Success
                alert('Message sent successfully!');
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            })
            .catch(function(error) {
                // Error
                console.error('EmailJS error:', error);
                alert('Failed to send message. Please try again later.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let galleryImages = [];
    
    // Get all visible gallery images
    function updateGalleryImages() {
        galleryImages = [];
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (item.style.display !== 'none') {
                const img = item.querySelector('img');
                if (img) {
                    galleryImages.push({
                        src: img.src,
                        alt: img.alt
                    });
                }
            }
        });
    }
    
    // Open lightbox with clicked image
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            updateGalleryImages();
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                
                // Find current image index in the visible images array
                currentImageIndex = galleryImages.findIndex(image => image.src === img.src);
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
            }
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Previous image
    lightboxPrev.addEventListener('click', function() {
        if (galleryImages.length > 1) {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            lightboxImg.src = galleryImages[currentImageIndex].src;
            lightboxImg.alt = galleryImages[currentImageIndex].alt;
        }
    });
    
    // Next image
    lightboxNext.addEventListener('click', function() {
        if (galleryImages.length > 1) {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            lightboxImg.src = galleryImages[currentImageIndex].src;
            lightboxImg.alt = galleryImages[currentImageIndex].alt;
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowLeft') {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight') {
                lightboxNext.click();
            }
        }
    });
    
    // Update gallery images when filter changes
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setTimeout(updateGalleryImages, 100); // Small delay to ensure filtering is complete
        });
    });

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .hero-text, .about-text, .skills, .project-card, .gallery-item, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Call the function on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
