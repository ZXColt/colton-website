document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('background');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
        constructor() {
            const contentDiv = document.querySelector('.techno-container');
            const contentRect = contentDiv.getBoundingClientRect();

            // Ensure particles are not spawned within the content div
            do {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            } while (
                this.x > contentRect.left && this.x < contentRect.right &&
                this.y > contentRect.top && this.y < contentRect.bottom
            );

            this.size = Math.random() * 5 + 1;
            const speedFactor = Math.min(canvas.width, canvas.height) / 2000;
            this.speedX = (Math.random() * 3 - 1.5) * speedFactor;
            this.speedY = (Math.random() * 3 - 1.5) * speedFactor;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off the edges of the canvas
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Bounce off the content div
            const contentDiv = document.querySelector('.techno-container');
            const contentRect = contentDiv.getBoundingClientRect();
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

    function init() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles.length = 0;
        init();
    });
});