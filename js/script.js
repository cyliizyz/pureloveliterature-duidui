document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');

    const photoUrls = [
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        'images/chuanyu_duidui.jpg',
        // Add more photo URLs as needed
    ];

    function initializePhotoGallery() {
        const galleryContainer = document.querySelector('.gallery-container');
        galleryContainer.innerHTML = '';
        
        // Create rows for the looping animation
        const numberOfRows = 4; // Adjust as needed
        const photosPerRow = 5;
        
        for (let row = 0; row < numberOfRows; row++) {
            const rowContainer = document.createElement('div');
            rowContainer.className = 'photo-row';
            rowContainer.classList.add(row % 2 === 0 ? 'move-right' : 'move-left');
            
            // Set different speeds for each row
            const speed = 30 + (row * 5); // Base speed + variation
            rowContainer.style.setProperty('--scroll-speed', `${speed}s`);
            
            // Create two sets of photos for seamless looping
            const rowPhotos = createPhotoSet(photosPerRow, row);
            const duplicatePhotos = createPhotoSet(photosPerRow, row);
            
            rowContainer.append(...rowPhotos, ...duplicatePhotos);
            galleryContainer.appendChild(rowContainer);
        }
    }

    function createPhotoSet(count, rowIndex) {
        const photos = [];
        for (let i = 0; i < count; i++) {
            const photoIndex = (rowIndex * count + i) % photoUrls.length;
            const card = document.createElement('div');
            card.className = 'photo-card';
            
            const img = document.createElement('img');
            img.src = photoUrls[photoIndex];
            img.alt = `Memory ${photoIndex + 1}`;
            
            card.appendChild(img);
            photos.push(card);
        }
        return photos;
    }

    function createTransitionPhoto(url, index, total) {
        const photo = document.createElement('div');
        photo.className = 'transition-photo';
        photo.style.backgroundImage = `url(${url})`;
        photo.style.backgroundSize = 'cover';
        photo.style.backgroundPosition = 'center';
        
        // Calculate random end position
        const angle = (index / total) * 2 * Math.PI;
        const distance = 300 + Math.random() * 200;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        // Set initial position at center
        photo.style.left = '50%';
        photo.style.top = '50%';
        photo.style.transform = 'translate(-50%, -50%) scale(0.1)';
        
        // Animate
        requestAnimationFrame(() => {
            photo.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            photo.style.transform = `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(0)`;
            photo.style.opacity = '0';
        });
        
        return photo;
    }

    // Create hearts on click
    document.addEventListener('click', (e) => {
        createHeart(e.clientX, e.clientY, false);
    });

    // Welcome screen click handler
    welcomeScreen.addEventListener('click', () => {
        welcomeScreen.style.opacity = '0';
        
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            initializeNavigation();
            initializeReflection();
        }, 1000);
    });

    function createHeart(x, y, isMouseMove = false) {
        // Adjust number of hearts based on interaction type
        const heartCount = isMouseMove ? 1 : 3;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            
            // More varied animations for click vs mousemove
            const size = isMouseMove ? 
                (10 + Math.random() * 10) : // Smaller hearts for mousemove
                (15 + Math.random() * 20);  // Larger hearts for clicks
            
            const rotation = (Math.random() - 0.5) * (isMouseMove ? 30 : 40);
            const duration = isMouseMove ?
                (600 + Math.random() * 400) : // Faster for mousemove
                (800 + Math.random() * 700);  // Slower for clicks
            
            const delay = i * (isMouseMove ? 50 : 80);
            
            // Adjusted movement range based on interaction
            const xMove = (Math.random() - 0.5) * (isMouseMove ? 50 : 100);
            const yMove = isMouseMove ?
                (-50 - Math.random() * 30) :  // Shorter float for mousemove
                (-100 - Math.random() * 50);  // Higher float for clicks
            
            // Set heart styles
            heart.style.setProperty('--x-end', `${xMove}px`);
            heart.style.setProperty('--y-end', `${yMove}px`);
            heart.style.setProperty('--rotation', `${rotation}deg`);
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.fontSize = `${size}px`;
            heart.style.animationDuration = `${duration}ms`;
            heart.style.animationDelay = `${delay}ms`;
            
            // Enhanced color palette with opacity variation
            const colors = [
                '#ff6b6b', '#ff8787', '#ffa5a5', '#ff4d4d',
                '#ff9999', '#ff7777', '#ff3366', '#ff99cc'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const opacity = isMouseMove ? 
                (0.5 + Math.random() * 0.3) : // More transparent for mousemove
                (0.8 + Math.random() * 0.2);  // More opaque for clicks
            
            heart.style.color = color;
            heart.style.opacity = opacity;
            
            heart.innerHTML = '❤';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, duration + delay);
        }
    }

    // Enhanced mouse movement tracking
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastHeartCreation = 0;
    let mouseSpeed = 0;
    let isMoving = false;
    let moveTimeout;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        const timeDiff = now - lastHeartCreation;
        
        // Calculate mouse speed
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        mouseSpeed = Math.sqrt(dx * dx + dy * dy) / timeDiff;
        
        // Clear existing timeout
        clearTimeout(moveTimeout);
        isMoving = true;
        
        // Set timeout to detect when mouse stops
        moveTimeout = setTimeout(() => {
            isMoving = false;
            mouseSpeed = 0;
        }, 50);
        
        // Create hearts based on speed and time
        if (timeDiff > 50 && isMoving) { // Base threshold
            const speedThreshold = mouseSpeed * 10; // Adjust this multiplier to tune sensitivity
            const chance = Math.min(speedThreshold / 100, 0.3); // Cap at 30% chance
            
            if (Math.random() < chance) {
                const offsetX = (Math.random() - 0.5) * 10;
                const offsetY = (Math.random() - 0.5) * 10;
                createHeart(
                    e.clientX + offsetX,
                    e.clientY + offsetY,
                    true
                );
                lastHeartCreation = now;
            }
        }
        
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

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

    // Memory Entry Management
    document.addEventListener('DOMContentLoaded', () => {
        const addMemoryBtn = document.getElementById('addMemory');
        const memoryEntries = document.getElementById('memoryEntries');
        
        if (addMemoryBtn) {
            addMemoryBtn.addEventListener('click', addNewMemory);
        }

        // Load existing memories
        loadMemories();
    });

    function addNewMemory() {
        const textarea = document.getElementById('newMemory');
        const dateInput = document.getElementById('memoryDate');
        const content = textarea.value.trim();
        const date = dateInput.value || new Date().toISOString().split('T')[0];

        if (content) {
            const memory = {
                id: Date.now(),
                content,
                date,
                timestamp: new Date().getTime()
            };

            // Save to localStorage
            const memories = getMemories();
            memories.unshift(memory);
            localStorage.setItem('memories', JSON.stringify(memories));

            // Add to DOM
            addMemoryToDOM(memory);

            // Clear form
            textarea.value = '';
            dateInput.value = '';
        }
    }

    function addMemoryToDOM(memory) {
        const memoryEntries = document.getElementById('memoryEntries');
        const entry = document.createElement('div');
        entry.className = 'memory-entry';
        entry.style.animation = 'slideIn 0.5s ease-out forwards';

        const formattedDate = new Date(memory.date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        entry.innerHTML = `
            <div class="memory-date">${formattedDate}</div>
            <div class="memory-content">${memory.content}</div>
        `;

        memoryEntries.insertBefore(entry, memoryEntries.firstChild);
    }

    function loadMemories() {
        const memories = getMemories();
        const memoryEntries = document.getElementById('memoryEntries');
        
        if (memoryEntries) {
            memoryEntries.innerHTML = '';
            memories.forEach(memory => addMemoryToDOM(memory));
        }
    }

    function getMemories() {
        return JSON.parse(localStorage.getItem('memories') || '[]');
    }

    // Section Navigation
    function initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('.section');
        
        // Hide all sections initially except the first one
        sections.forEach((section, index) => {
            if (index !== 0) section.style.display = 'none';
        });

        // Add click handlers to navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-section');
                
                // Hide all sections
                sections.forEach(section => {
                    section.style.display = 'none';
                    section.classList.remove('active');
                });
                
                // Show target section
                const targetSection = document.getElementById(targetId);
                targetSection.style.display = 'block';
                
                // Trigger animation
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 50);
                
                // Update active nav link
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                link.classList.add('active');
                
                // Initialize section-specific content if needed
                if (targetId === 'photos') {
                    initializePhotoGallery();
                }
            });
        });
    }

    // Add reflection functionality
    function initializeReflection() {
        const addReflectionBtn = document.getElementById('addReflection');
        if (addReflectionBtn) {
            addReflectionBtn.addEventListener('click', addNewReflection);
        }
        loadReflections();
    }

    function addNewReflection() {
        const textarea = document.getElementById('newReflection');
        const dateInput = document.getElementById('reflectionDate');
        const typeSelect = document.getElementById('reflectionType');
        const content = textarea.value.trim();
        const date = dateInput.value || new Date().toISOString().split('T')[0];
        const type = typeSelect.value;

        if (content) {
            const reflection = {
                id: Date.now(),
                content,
                date,
                type,
                timestamp: new Date().getTime()
            };

            const reflections = getReflections();
            reflections.unshift(reflection);
            localStorage.setItem('reflections', JSON.stringify(reflections));

            addReflectionToDOM(reflection);

            textarea.value = '';
            dateInput.value = '';
        }
    }

    function addReflectionToDOM(reflection) {
        const container = document.getElementById('reflectionEntries');
        const entry = document.createElement('div');
        entry.className = `reflection-entry ${reflection.type}`;
        entry.style.animation = 'slideIn 0.5s ease-out forwards';

        const formattedDate = new Date(reflection.date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const typeLabels = {
            growth: '个人成长',
            relationship: '感情思考',
            future: '未来展望'
        };

        entry.innerHTML = `
            <div class="reflection-header">
                <span class="reflection-date">${formattedDate}</span>
                <span class="reflection-type">${typeLabels[reflection.type]}</span>
            </div>
            <div class="reflection-content">${reflection.content}</div>
        `;

        container.insertBefore(entry, container.firstChild);
    }

    function getReflections() {
        return JSON.parse(localStorage.getItem('reflections') || '[]');
    }

    function loadReflections() {
        const reflections = getReflections();
        const container = document.getElementById('reflectionEntries');
        
        if (container) {
            container.innerHTML = '';
            reflections.forEach(reflection => addReflectionToDOM(reflection));
        }
    }
}); 