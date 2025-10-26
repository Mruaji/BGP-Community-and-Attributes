// Presentation state
let currentSlideIndex = 1;
const totalSlides = 11;

// Get DOM elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');
const progressFill = document.getElementById('progressFill');

// Initialize
function init() {
    totalSlidesSpan.textContent = totalSlides;
    updateSlide();
}

// Update slide display
function updateSlide() {
    // Remove all active and prev classes
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });

    // Set current slide as active
    const currentSlide = document.querySelector(`[data-slide="${currentSlideIndex}"]`);
    if (currentSlide) {
        currentSlide.classList.add('active');
    }

    // Update counter
    currentSlideSpan.textContent = currentSlideIndex;

    // Update progress bar
    const progress = (currentSlideIndex / totalSlides) * 100;
    progressFill.style.width = progress + '%';

    // Update button states
    prevBtn.disabled = currentSlideIndex === 1;
    nextBtn.disabled = currentSlideIndex === totalSlides;
}

// Navigate to specific slide
function goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides) return;
    
    const direction = slideNumber > currentSlideIndex ? 'next' : 'prev';
    const oldSlide = document.querySelector(`[data-slide="${currentSlideIndex}"]`);
    
    if (oldSlide && direction === 'prev') {
        oldSlide.classList.add('prev');
    }
    
    currentSlideIndex = slideNumber;
    updateSlide();
}

// Next slide
function nextSlide() {
    if (currentSlideIndex < totalSlides) {
        goToSlide(currentSlideIndex + 1);
    }
}

// Previous slide
function prevSlide() {
    if (currentSlideIndex > 1) {
        goToSlide(currentSlideIndex - 1);
    }
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Space bar
            e.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            prevSlide();
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(1);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(totalSlides);
            break;
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const presentationContainer = document.querySelector('.presentation-container');

presentationContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

presentationContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - next slide
            nextSlide();
        } else {
            // Swiped right - previous slide
            prevSlide();
        }
    }
}

// Initialize presentation
init();