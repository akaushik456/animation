let carousel = document.querySelector(".carousel");
let images = document.querySelectorAll(".carousel img");
let body = document.body;

function changeBackground(image) {
    body.style.backgroundImage = `url(${image.src})`;
    images.forEach(img => img.classList.remove("active"));
    image.classList.add("active");
}

// Auto change background every 3 seconds
let index = 0;
setInterval(() => {
    changeBackground(images[index]);
    index = (index + 1) % images.length;
}, 3000);

// Cursor Follower with Dragon Tail Effect
const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle(x, y) {
    const colors = ["#ff0000", "#ff8000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    particles.push({
        x,
        y,
        size: Math.random() * 8 + 4,
        opacity: 1,
        color: randomColor,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: (Math.random() - 0.5) * 2
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.opacity})`;
        ctx.fill();

        p.x += p.velocityX;
        p.y += p.velocityY;
        p.opacity -= 0.02;
        p.size -= 0.1;

        if (p.opacity <= 0 || p.size <= 0) {
            particles.splice(index, 1);
        }
    });
}

function animateParticles() {
    drawParticles();
    requestAnimationFrame(animateParticles);
}

document.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 3; i++) {
        createParticle(e.clientX, e.clientY);
    }
});

animateParticles();

// Convert HEX to RGB
function hexToRgb(hex) {
    let bigint = parseInt(hex.slice(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}

// Resize canvas on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});



// eyes-mouse

const eyes = document.querySelectorAll(".eye");
const pupils = document.querySelectorAll(".pupil");
const eyebrows = document.querySelectorAll(".eyebrow");
const mouth = document.querySelector(".mouth");

// Eye & Pupil movement
document.addEventListener("mousemove", (e) => {
    eyes.forEach((eye, index) => {
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;
        
        const angle = Math.atan2(deltaY, deltaX);
        
        const maxMove = 15;
        const moveX = Math.cos(angle) * maxMove;
        const moveY = Math.sin(angle) * maxMove;

        pupils[index].style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Eyebrow reaction
    const centerX = window.innerWidth / 2;
    const moveOffset = ((e.clientX - centerX) / centerX) * 15;
    eyebrows[0].style.transform = `translateY(${moveOffset}px) rotate(-10deg)`;
    eyebrows[1].style.transform = `translateY(${moveOffset}px) rotate(10deg)`;

    // Mouth reaction
    if (e.clientY < window.innerHeight / 2) {
        mouth.classList.add("open");
    } else {
        mouth.classList.remove("open");
    }
});

// Blinking effect
function blink() {
    document.body.classList.add("blink");
    setTimeout(() => {
        document.body.classList.remove("blink");
    }, 200);
    setTimeout(blink, Math.random() * 5000 + 2000);
}

blink();

// Generate Stars
function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");

    // Random position (left or right corner)
    const isLeft = Math.random() > 0.5;
    const startX = isLeft ? 10 : window.innerWidth - 10;
    const startY = Math.random() * 100;

    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;
    star.style.animationDuration = `${Math.random() * 2 + 2}s`;
    star.style.opacity = Math.random();

    document.querySelector(".galaxy").appendChild(star);

    // Remove the star after falling
    setTimeout(() => {
        star.remove();
    }, 3000);
}

// Generate stars at intervals
setInterval(createStar, 500);