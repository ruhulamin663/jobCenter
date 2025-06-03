

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // GSAP Animations
    
    // Hero section animations
    gsap.to('.hero-text h1', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.to('.hero-text p', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.to('.hero-btns', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.to('.hero-image', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.7,
        ease: 'power3.out'
    });
    
    // Job box animations with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    const jobBoxes = document.querySelectorAll('.job-box');
    jobBoxes.forEach((box, index) => {
        gsap.to(box, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: box,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Stats animations
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.stats-section',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // CTA section animation
    gsap.to('.cta-content', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    // Number counter animation for stats
    const statsSection = document.querySelector('.stats-section');
    let animated = false;
    
    function animateNumbers() {
        if (animated) return;
        
        const statNumbers = document.querySelectorAll('.stat-item h3');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50; // Divide by steps
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    stat.textContent = target.toString() + '+';
                } else {
                    stat.textContent = Math.floor(current).toString() + '+';
                }
            }, 30);
        });
        
        animated = true;
    }
    
    // Trigger animation when stats section is visible
    ScrollTrigger.create({
        trigger: statsSection,
        start: 'top 70%',
        onEnter: animateNumbers
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.7rem 5%';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 5%';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Change active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});
// Add after your existing JavaScript code

// Job filter functionality
document.addEventListener("DOMContentLoaded", function() {
    // Initialize job listing animations and functionality only if the elements exist
    if (document.querySelector('.job-filter-nav')) {
        initJobListings();
    }
});

function initJobListings() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const jobItems = document.querySelectorAll(".job-item");
    
    // Show all job items initially
    jobItems.forEach(item => {
        item.style.display = "flex";
    });
    
    // Filter button click event
    filterBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove("active"));
            
            // Add active class to clicked button
            this.classList.add("active");
            
            // Get filter value
            const filterValue = this.getAttribute("data-filter");
            
            // Filter job items
            jobItems.forEach(item => {
                if (filterValue === "all") {
                    gsapShowItem(item);
                } else if (item.getAttribute("data-category") === filterValue) {
                    gsapShowItem(item);
                } else {
                    gsapHideItem(item);
                }
            });
        });
    });
    
    // Job item hover effect
    jobItems.forEach(item => {
        item.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-5px)";
            this.style.boxShadow = "0 10px 20px rgba(41, 3, 139, 0.1)";
        });
        
        item.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
            this.style.boxShadow = "var(--shadow)";
        });
    });
    
    // Animate job items on scroll
    animateJobItems();
}

function gsapShowItem(item) {
    gsap.to(item, {
        display: "flex",
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out"
    });
}

function gsapHideItem(item) {
    gsap.to(item, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power3.out",
        onComplete: function() {
            item.style.display = "none";
        }
    });
}

function animateJobItems() {
    const jobItems = document.querySelectorAll(".job-item");
    
    jobItems.forEach((item, index) => {
        gsap.set(item, {
            opacity: 0,
            y: 30
        });
        
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate dream job section
    const dreamJobSection = document.querySelector(".dream-job-section");
    if (dreamJobSection) {
        gsap.from(".dream-job-content", {
            opacity: 0,
            x: -50,
            duration: 0.8,
            scrollTrigger: {
                trigger: ".dream-job-section",
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });
        
        gsap.from(".dream-job-image", {
            opacity: 0,
            x: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: ".dream-job-section",
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });
    }
}