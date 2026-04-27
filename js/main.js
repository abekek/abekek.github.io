// Particle network canvas animation
(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.min(80, Math.floor(window.innerWidth / 15));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const connectionDistance = 150;
        const mouseDistance = 200;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const alpha = (1 - dist / connectionDistance) * 0.15;
                    ctx.strokeStyle = `rgba(194, 112, 62, ${alpha * 1.5})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        for (const p of particles) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseDistance) {
                const force = (1 - dist / mouseDistance) * 0.02;
                p.vx += dx * force;
                p.vy += dy * force;
            }

            p.x += p.vx;
            p.y += p.vy;

            p.vx *= 0.99;
            p.vy *= 0.99;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.fillStyle = 'rgba(194, 112, 62, 0.35)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
})();

// Typewriter effect
(function () {
    const roles = [
        'ML Engineer at Point72',
        'Previously SDE at AWS',
        'MS CS at UT Austin (4.0 GPA)',
        'Published at NeurIPS 2023',
        'From Kazakhstan, Based in NYC',
    ];

    const el = document.getElementById('typed-text');
    if (!el) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = roles[roleIndex];

        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 30 : 50;

        if (!isDeleting && charIndex === current.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 500;
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 1200);
})();

// Nav scroll effect
(function () {
    const nav = document.getElementById('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
})();

// Mobile nav toggle
(function () {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
        document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
})();

// Scroll reveal
(function () {
    const selectors = [
        '.section-title',
        '.about-grid',
        '.experience-card',
        '.project-card',
        '.research-card',
        '.education-card',
        '.skill-category',
        '.presentations-list',
        '.awards-grid',
        '.footer-content',
    ];

    const revealElements = document.querySelectorAll(selectors.join(', '));

    revealElements.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach((el) => observer.observe(el));
})();

// Collapsible sections
(function () {
    document.querySelectorAll('.collapsible-toggle').forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const contentId = toggle.id.replace('-toggle', '-content');
            const content = document.getElementById(contentId);
            if (!content) return;

            const isOpen = toggle.classList.contains('active');

            if (isOpen) {
                content.style.maxHeight = '0';
                content.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.querySelector('span').textContent = 'See more experience';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.classList.add('open');
                toggle.classList.add('active');
                toggle.setAttribute('aria-expanded', 'true');
                toggle.querySelector('span').textContent = 'Show less';
            }
        });
    });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
