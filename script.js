// When "Yes" button is clicked
document.getElementById("yes-btn").addEventListener("click", function() {
    document.getElementById("popup").classList.remove("hidden");
    document.querySelector(".buttons").style.display = "none";
    launchFireworks(); // Start fireworks animation
});

// When "No" button is clicked
document.getElementById("no-btn").addEventListener("click", function() {
    document.getElementById("popup-no").classList.remove("hidden");
    document.getElementById("no-btn").style.display = "none";
});

// Function to launch fireworks animation
function launchFireworks() {
    const canvas = document.getElementById("fireworks");
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const fireworks = [];
    let particles = [];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createFirework(x, y) {
        const hue = random(0, 360);
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(x, y, hue));
        }
    }

    function Particle(x, y, hue) {
        this.x = x;
        this.y = y;
        this.color = `hsl(${hue}, 100%, 50%)`;
        this.radius = random(2, 4);
        this.alpha = 1;
        this.velocity = {
            x: random(-5, 5),
            y: random(-5, 5)
        };
    }

    Particle.prototype.update = function() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.02;
    };

    Particle.prototype.draw = function() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    };

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(particle => particle.alpha > 0);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        if (particles.length === 0 && fireworks.length === 0) {
            createFirework(random(0, canvas.width), random(0, canvas.height));
        }
        requestAnimationFrame(loop);
    }

    loop();
}
