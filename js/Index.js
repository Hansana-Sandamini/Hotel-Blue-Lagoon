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

    function scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbar = document.querySelector('.navbar');
        
        const scrollToTarget = () => {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        };

        // If navbar is collapsed (mobile view), wait for collapse animation before scrolling
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();

            setTimeout(scrollToTarget, 400);
        } else {
            scrollToTarget();
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