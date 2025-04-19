// Update copyright year
function updateCopyrightYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.classList.contains('dropdown-toggle')) return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            scrollToSection(targetId);
        });
    });

    // Function to handle smooth scrolling to sections
    function scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            closeMobileMenu();
        }
    }

    function closeMobileMenu() {
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    }
    
    const navbar = document.querySelector('.navbar');
    
    updateNavbarScroll();
    
    window.addEventListener('scroll', updateNavbarScroll);
    
    function updateNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', formObject);
            
            showAlert('Thank you for your message! We will contact you shortly.', 'success');
            this.reset();
        });
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            console.log('Newsletter subscription:', email);
            
            showAlert('Thank you for subscribing to our newsletter!', 'success');
            this.reset();
        });
    }

    initTooltips();
    updateCopyrightYear();
    initRoomGallery();
    
    function initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    function updateCopyrightYear() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }
    
    function initRoomGallery() {
        document.querySelectorAll('.room-gallery-thumb').forEach(thumb => {
            thumb.addEventListener('click', function() {
                const imgSrc = this.getAttribute('data-full');
                const imgAlt = this.getAttribute('alt');
                const modal = document.getElementById('roomGalleryModal');
                const modalImg = modal.querySelector('.modal-img');
                
                modalImg.src = imgSrc;
                modalImg.alt = imgAlt;
                
                const myModal = new bootstrap.Modal(modal);
                myModal.show();
            });
        });
    }
    
    function showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        const container = document.querySelector('main') || document.body;
        container.prepend(alertDiv);
        
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }, 5000);
    }
    
    // Active nav link highlighting
    highlightActiveNavLink();
    window.addEventListener('scroll', highlightActiveNavLink);
    
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if (window.pageYOffset >= (sectionTop - navbarHeight - 100) && 
                window.pageYOffset < (sectionTop + sectionHeight - navbarHeight - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
});