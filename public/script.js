document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('background');
    const ctx = canvas.getContext('2d');
    resizeCanvas();

    const particles = [];

    class Particle {
        constructor() {
            this.initPosition();
            this.size = Math.random() * 5 + 1;
            const speedFactor = Math.min(canvas.width, canvas.height) / 800;
            this.speedX = (Math.random() * 3 - 1.5) * speedFactor / this.size;
            this.speedY = (Math.random() * 3 - 1.5) * speedFactor / this.size;
        }

        initPosition() {
            const contentRect = document.querySelector('.techno-container').getBoundingClientRect();
            do {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            } while (
                this.x > contentRect.left && this.x < contentRect.right &&
                this.y > contentRect.top && this.y < contentRect.bottom
            );
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.bounceOffEdges();
            this.bounceOffContent();
        }

        bounceOffEdges() {
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        bounceOffContent() {
            const contentRect = document.querySelector('.techno-container').getBoundingClientRect();
            if (this.x > contentRect.left && this.x < contentRect.right && this.y > contentRect.top && this.y < contentRect.bottom) {
                if (this.x > contentRect.left && this.x < contentRect.left + this.size) this.speedX *= -1;
                if (this.x < contentRect.right && this.x > contentRect.right - this.size) this.speedX *= -1;
                if (this.y > contentRect.top && this.y < contentRect.top + this.size) this.speedY *= -1;
                if (this.y < contentRect.bottom && this.y > contentRect.bottom - this.size) this.speedY *= -1;
            }
        }

        draw() {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
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

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    window.addEventListener('resize', resizeCanvas);

    initParticles();
    animateParticles();
});