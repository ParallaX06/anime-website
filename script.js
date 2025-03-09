document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in animation for sections
    gsap.utils.toArray(".section").forEach(section => {
        gsap.fromTo(section, 
            { opacity: 0, y: 100 }, 
            { opacity: 1, y: 0, duration: 1.5, scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }}
        );
    });

    // Particle Effect
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    class Particle {
        constructor(x, y, size, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = "rgba(255, 0, 255, 0.7)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            let size = Math.random() * 5 + 2;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let speedX = (Math.random() - 0.5) * 2;
            let speedY = (Math.random() - 0.5) * 2;
            particles.push(new Particle(x, y, size, speedX, speedY));
        }
    }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
});
