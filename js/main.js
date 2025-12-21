/**
 * ImpressionAssist Website JavaScript
 * Handles navigation, smooth scrolling, and form functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');

    // Mobile Navigation Toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Navbar scroll effect
    if (navbar) {
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = navbar ? navbar.offsetHeight : 0;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.pageYOffset;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');

                navLinks.querySelectorAll('a').forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection();

    // Contact Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                practice: document.getElementById('practice').value,
                message: document.getElementById('message').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(formData.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission (replace with actual form handling)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate API call delay
            setTimeout(function() {
                // In production, you would send this to your backend or a form service
                // For now, we'll create a mailto link as a fallback
                const subject = encodeURIComponent('ImpressionAssist Inquiry from ' + formData.name);
                const body = encodeURIComponent(
                    'Name: ' + formData.name + '\n' +
                    'Email: ' + formData.email + '\n' +
                    'Practice: ' + (formData.practice || 'Not specified') + '\n\n' +
                    'Message:\n' + formData.message
                );

                // Show success message
                showFormMessage('Thank you for your message! We will get back to you soon.', 'success');

                // Reset form
                contactForm.reset();

                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;

                // Optionally open email client as backup
                // window.location.href = 'mailto:support@impressionassist.com?subject=' + subject + '&body=' + body;
            }, 1000);
        });
    }

    // Form message helper
    function showFormMessage(message, type) {
        // Remove existing message if any
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = 'form-message';
        messageEl.style.cssText = type === 'success'
            ? 'background-color: #ecfdf5; border: 1px solid #00BCD4; color: #0097A7; padding: 16px; border-radius: 8px; margin-bottom: 20px;'
            : 'background-color: #fef2f2; border: 1px solid #f87171; color: #dc2626; padding: 16px; border-radius: 8px; margin-bottom: 20px;';
        messageEl.textContent = message;

        // Insert at top of form
        contactForm.insertBefore(messageEl, contactForm.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(function() {
            messageEl.remove();
        }, 5000);
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Intersection Observer for fade-in animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe feature cards and pricing cards
        document.querySelectorAll('.feature-card, .pricing-card, .stat').forEach(function(el) {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Download button click tracking (placeholder for analytics)
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // In production, you would track this event
            console.log('Download button clicked');

            // If no href is set, show a message
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('The installer download link will be available soon. Please contact us for early access.');
            }
        });
    }
});

// Preload critical images
window.addEventListener('load', function() {
    // Add any image preloading logic here if needed
});
