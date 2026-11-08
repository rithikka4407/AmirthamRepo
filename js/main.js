/* ========================================
   Delicious Bites Catering - Main JavaScript
   ======================================== */

// Global config variable
let siteConfig = {};

document.addEventListener('DOMContentLoaded', function() {
    
    // Load configuration first
    loadSiteConfig();
    
    // ---------- Preloader ----------
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 500);
    });

    // ---------- Initialize AOS ----------
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // ---------- Navbar Scroll Effect ----------
    const navbar = document.getElementById('mainNav');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check on load

    // ---------- Smooth Scroll for Nav Links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    bsCollapse.hide();
                }
                
                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ---------- Active Nav Link on Scroll ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);

    // ---------- Counter Animation ----------
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
        
        countersAnimated = true;
    }
    
    // Trigger counter animation when hero section is visible
    const heroSection = document.getElementById('home');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 500);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (heroSection) {
        counterObserver.observe(heroSection);
    }

    // ---------- Menu Filter ----------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items with animation
            menuItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ---------- Testimonial Swiper ----------
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // ---------- Back to Top Button ----------
    const backToTop = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ---------- Form Submission ----------
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const eventType = document.getElementById('eventType').value;
            
            if (!name || !email || !eventType) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! We will contact you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ---------- Notification Function ----------
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="mdi mdi-${type === 'success' ? 'check-circle' : 'alert-circle'}"></span>
            <span>${message}</span>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: '9999',
            animation: 'slideIn 0.3s ease forwards',
            backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
            color: '#fff',
            fontWeight: '500',
            boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
        });
        
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // ---------- Gallery Lightbox (Simple Implementation) ----------
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('h5')?.textContent || 'Gallery Image';
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <img src="${imgSrc}" alt="${title}">
                    <p class="lightbox-title">${title}</p>
                </div>
            `;
            
            // Style lightbox
            Object.assign(lightbox.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '10000',
                animation: 'fadeIn 0.3s ease'
            });
            
            // Style close button
            const closeBtn = lightbox.querySelector('.lightbox-close');
            Object.assign(closeBtn.style, {
                position: 'absolute',
                top: '20px',
                right: '30px',
                fontSize: '40px',
                color: '#fff',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
            });
            
            // Style image
            const img = lightbox.querySelector('img');
            Object.assign(img.style, {
                maxWidth: '90%',
                maxHeight: '80vh',
                borderRadius: '10px'
            });
            
            // Style title
            const titleEl = lightbox.querySelector('.lightbox-title');
            Object.assign(titleEl.style, {
                color: '#fff',
                textAlign: 'center',
                marginTop: '15px',
                fontSize: '1.2rem'
            });
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Close on click
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target === closeBtn) {
                    lightbox.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        lightbox.remove();
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
            
            // Close on escape
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    lightbox.remove();
                    document.body.style.overflow = '';
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
        });
    });

    // ---------- Newsletter Form ----------
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            showNotification('Thank you for subscribing!', 'success');
            emailInput.value = '';
        });
    }

    // ---------- Add CSS Animations ----------
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100px); }
        }
    `;
    document.head.appendChild(styleSheet);

    // ---------- Lazy Load Images ----------
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    console.log('🍴 Delicious Bites Catering - Website Initialized');
});


// ---------- Load Site Configuration ----------
async function loadSiteConfig() {
    try {
        const response = await fetch('config.json');
        siteConfig = await response.json();
        applyConfig();
        console.log('✅ Configuration loaded successfully');
    } catch (error) {
        console.log('ℹ️ Using default configuration');
    }
}

// ---------- Apply Configuration to Page ----------
function applyConfig() {
    if (!siteConfig || Object.keys(siteConfig).length === 0) return;
    
    // Update Business Name
    const brandElements = document.querySelectorAll('.navbar-brand span:not(.material-icons), .footer-brand span:not(.material-icons)');
    brandElements.forEach(el => {
        if (siteConfig.business?.name) {
            el.textContent = siteConfig.business.name;
        }
    });
    
    // Update Hero Section
    if (siteConfig.business?.tagline) {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.textContent = siteConfig.business.tagline;
    }
    
    if (siteConfig.business?.description) {
        const heroDesc = document.querySelector('.hero-description');
        if (heroDesc) heroDesc.textContent = siteConfig.business.description;
    }
    
    // Update Stats
    if (siteConfig.stats) {
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsData = [
            siteConfig.stats.eventsCompleted,
            siteConfig.stats.menuItems,
            siteConfig.stats.yearsExperience || siteConfig.business?.yearsExperience
        ];
        statNumbers.forEach((stat, index) => {
            if (statsData[index]) {
                stat.setAttribute('data-count', statsData[index]);
            }
        });
    }
    
    // Update Contact Info
    updateContactLinks();
    
    // Update Social Links
    updateSocialLinks();
    
    // Update Address
    if (siteConfig.address) {
        const addressEl = document.querySelector('.contact-item p');
        if (addressEl && siteConfig.address.street) {
            // Find address section and update
            document.querySelectorAll('.contact-item').forEach(item => {
                const icon = item.querySelector('.mdi-map-marker');
                if (icon) {
                    const textEl = item.querySelector('div:last-child p');
                    if (textEl) {
                        textEl.innerHTML = `${siteConfig.address.street}<br>${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.pincode}`;
                    }
                }
            });
        }
    }
    
    // Update Footer
    if (siteConfig.business?.description) {
        const footerDesc = document.querySelector('.footer-description');
        if (footerDesc) {
            footerDesc.textContent = `Crafting memorable culinary experiences since ${siteConfig.business.established || '2009'}. Your trusted partner for all catering needs.`;
        }
    }
}

// ---------- Update Contact Links (Phone, WhatsApp, Email) ----------
function updateContactLinks() {
    if (!siteConfig.contact) return;
    
    const phone = siteConfig.contact.phone;
    const phoneDisplay = siteConfig.contact.phoneDisplay;
    const whatsapp = siteConfig.contact.whatsapp;
    const whatsappMsg = encodeURIComponent(siteConfig.contact.whatsappMessage || "Hi! I'm interested in your catering services.");
    const email = siteConfig.contact.email;
    
    // Update mobile contact bar
    const mobileCall = document.getElementById('mobileCall');
    if (mobileCall && phone) {
        mobileCall.href = `tel:${phone}`;
    }
    
    const mobileWhatsapp = document.getElementById('mobileWhatsapp');
    if (mobileWhatsapp && whatsapp) {
        const cleanNumber = whatsapp.replace(/\+/g, '');
        mobileWhatsapp.href = `https://wa.me/${cleanNumber}?text=${whatsappMsg}`;
    }
    
    const mobileEmail = document.getElementById('mobileEmail');
    if (mobileEmail && email) {
        mobileEmail.href = `mailto:${email}`;
    }
    
    const mobileMap = document.getElementById('mobileMap');
    if (mobileMap && siteConfig.address?.googleMapsUrl) {
        mobileMap.href = siteConfig.address.googleMapsUrl;
    }
    
    // Update floating WhatsApp button
    const whatsappFloat = document.getElementById('whatsappFloat');
    if (whatsappFloat && whatsapp) {
        const cleanNumber = whatsapp.replace(/\+/g, '');
        whatsappFloat.href = `https://wa.me/${cleanNumber}?text=${whatsappMsg}`;
    }
    
    // Update phone numbers in contact section
    document.querySelectorAll('.contact-item').forEach(item => {
        const icon = item.querySelector('.mdi-phone');
        if (icon) {
            const textEl = item.querySelector('div:last-child p');
            if (textEl && phoneDisplay) {
                textEl.innerHTML = `<a href="tel:${phone}">${phoneDisplay}</a>`;
                if (siteConfig.contact.phone2Display) {
                    textEl.innerHTML += `<br><a href="tel:${siteConfig.contact.phone2}">${siteConfig.contact.phone2Display}</a>`;
                }
            }
        }
        
        const emailIcon = item.querySelector('.mdi-email');
        if (emailIcon) {
            const textEl = item.querySelector('div:last-child p');
            if (textEl && email) {
                textEl.innerHTML = `<a href="mailto:${email}">${email}</a>`;
                if (siteConfig.contact.bookingEmail) {
                    textEl.innerHTML += `<br><a href="mailto:${siteConfig.contact.bookingEmail}">${siteConfig.contact.bookingEmail}</a>`;
                }
            }
        }
    });
}

// ---------- Update Social Links ----------
function updateSocialLinks() {
    if (!siteConfig.social) return;
    
    const socialMappings = {
        'facebook': siteConfig.social.facebook,
        'instagram': siteConfig.social.instagram,
        'twitter': siteConfig.social.twitter,
        'youtube': siteConfig.social.youtube
    };
    
    document.querySelectorAll('.social-link, .footer-social a').forEach(link => {
        for (const [platform, url] of Object.entries(socialMappings)) {
            if (link.querySelector(`.mdi-${platform}`) && url) {
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        }
    });
}

// ---------- Format Phone for WhatsApp/Tel links ----------
function formatPhoneForLink(phone) {
    return phone.replace(/[\s\-\(\)]/g, '');
}
