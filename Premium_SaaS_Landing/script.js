// --- 1. Initialize Lenis (Smooth Scroll) ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out equivalent
    wheelMultiplier: 1,
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// --- 2. GSAP & ScrollTrigger Setup ---
gsap.registerPlugin(ScrollTrigger);

// Helper function to split text into words for stagger
const splitText = (selector) => {
    const el = document.querySelector(selector);
    const text = el.innerText;
    el.innerHTML = text.split(' ').map(word => `<span>${word}</span>`).join(' ');
};

// --- 3. Hero Animations ---
const heroInit = () => {
    splitText('.hero-title');
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to('.navbar', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5
    })
    .from('.hero-title span', {
        y: 40,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
    }, "-=0.5")
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 1
    }, "-=0.7")
    .from('.hero-btns', {
        y: 20,
        opacity: 0,
        duration: 1
    }, "-=0.8")
    .from('.mockup-container', {
        rotateY: 0,
        rotateX: 0,
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
    }, "-=1");

    // Parallax on mockup
    gsap.to('.mockup-container', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        rotateX: 10,
        rotateY: 5
    });
};

// --- 4. Feature Animations ---
const featureAnimations = () => {
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    });
};

// --- 5. Workflow Animations ---
const workflowAnimations = () => {
    gsap.from('.step-item', {
        scrollTrigger: {
            trigger: '.workflow',
            start: 'top 70%',
        },
        x: -40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    });

    gsap.to('.workflow-visual', {
        scrollTrigger: {
            trigger: '.workflow',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        scale: 1.05,
        borderRadius: "100px"
    });
};

// --- 6. CTA Animations ---
const ctaAnimations = () => {
    gsap.from('.cta-inner', {
        scrollTrigger: {
            trigger: '.cta',
            start: 'top 85%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
    });
};

// --- Initialize All ---
window.addEventListener('DOMContentLoaded', () => {
    heroInit();
    featureAnimations();
    workflowAnimations();
    ctaAnimations();
});

// Update Lenis on ScrollTrigger refresh
ScrollTrigger.on("refresh", () => lenis.resize());
