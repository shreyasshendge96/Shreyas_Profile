document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // HERO SECTION ANIMATION
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
    });

    heroTl.to(".hero-bg", { scale: 1, opacity: 0.6 }, 0);
    heroTl.to(".hero-content", { y: -100, opacity: 0 }, 0);

    // FADE REVEALS FOR ALL SECTIONS
    gsap.utils.toArray('.reveal').forEach((elem) => {
        gsap.fromTo(elem,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // PROJECT SECTION ANIMATIONS
    gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                scrub: 1,
                end: "top 50%",
            },
            scale: 0.9,
            opacity: 0,
            y: 100,
        });
    });

    // SMOOTH ZOOM REVEAL FOR IMAGES
    gsap.utils.toArray('.bg-image:not(.hero-bg)').forEach((img) => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: "top bottom",
                scrub: true,
            },
            scale: 1.3,
            filter: "brightness(0)",
        });
    });
    // BACKGROUND VIDEO AUTO-CHANGER (Home Page)
    const videos = document.querySelectorAll('.bg-layer');
    if (videos.length > 0) {
        let currentVidIndex = 0;

        function switchVideo() {
            // Remove active class from current video
            videos[currentVidIndex].classList.remove('active');

            // Move to next video
            currentVidIndex = (currentVidIndex + 1) % videos.length;

            // Start playing the next video before fading in
            const nextVid = videos[currentVidIndex];
            nextVid.play().then(() => {
                nextVid.classList.add('active');
            });
        }

        // Switch every 12 seconds
        setInterval(switchVideo, 12000);

        // Ensure first video plays
        videos[0].play();
    }

    // PROFILE MODAL LOGIC
    const openBtn = document.getElementById('open-profile');
    const closeBtn = document.getElementById('close-profile');
    const modal = document.getElementById('profile-modal');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
            lenis.stop(); // Stop scrolling while modal is open
        });
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            lenis.start();
        });
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                lenis.start();
            }
        });
    }

    // ROTATING HUB LOGIC (Slow Motion Infinite Loop)
    const track = document.getElementById('rotating-track');
    if (track) {
        const items = gsap.utils.toArray('.carousel-item');
        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
            x: -totalWidth,
            duration: 40,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
            }
        });

        // Pause on hover
        track.addEventListener('mouseenter', () => gsap.globalTimeline.pause());
        track.addEventListener('mouseleave', () => gsap.globalTimeline.play());
    }
});
