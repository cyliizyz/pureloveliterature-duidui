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
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        document.body.appendChild(heart);

        // Remove heart element after animation
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}); 