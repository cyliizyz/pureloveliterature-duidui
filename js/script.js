document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');

    // Create hearts on click
    document.addEventListener('click', (e) => {
        if (!welcomeScreen.classList.contains('hidden')) {
            createHeart(e.clientX, e.clientY);
        }
    });

    // Welcome screen click handler
    welcomeScreen.addEventListener('click', () => {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
        }, 1000);
    });

    function createHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        
        // Random end position for floating effect
        const xEnd = (Math.random() - 0.5) * 100;
        const yEnd = -100 - (Math.random() * 50);
        heart.style.setProperty('--x-end', `${xEnd}px`);
        heart.style.setProperty('--y-end', `${yEnd}px`);
        
        document.body.appendChild(heart);
        
        // Remove heart element after animation
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }

    // Photo gallery animation
    const observerOptions = {
        threshold: 0.2
    };

    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const gallery = entry.target;
                gallery.classList.add('active');
                
                // Animate each photo card
                const cards = gallery.querySelectorAll('.photo-card');
                cards.forEach(card => {
                    card.classList.add('active');
                });
                
                // Unobserve after animation
                galleryObserver.unobserve(gallery);
            }
        });
    }, observerOptions);

    // Observe the gallery container
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryObserver.observe(galleryContainer);
    }
}); 