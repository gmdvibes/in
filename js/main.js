// js/main.js - SIMPLE & WORKING VERSION
let currentIndex = 0;

// ✅ Your YouTube Shorts IDs (extracted from your database)
const youtubeShorts = [
    "QG191wmxCY",
    "EW5d777C2s",
    "FDH17QCvY",
    "tra1BGMwh5s",
    "ZTJRfZrFWl",
    "Smz0i3Xx0t",
    "MGBF6NQTbI",
    "ZgGzkHbrIAi",
    "vOah2UpHKSO",
    "Twyes9t5zE",
    "EJ7MMZgdeq",
    "EJ7MMZgdeq",  // Duplicate in your database
    "Q6fVMWMTA",
    "PSH4W0ICizO",
    "t2o5adQ4",
    "tNjie_mYCY",
    "X4MeUFDeC_M",
    "GbvAfryones",
    "GbvAfryones",  // Duplicate in your database
    "UeSpaceI0R64",
    "dg7ABHtsrs",
    "CHHXMoB04o",
    "ZFY1MHyMFE",
    "QsqqM0IngYwA",
    "lCokOyy2TFE",
    "MXekOqvy0LA",
    "vqxhrTLKkg3"
];

// Function to load video
function loadVideo(index) {
    if (index < 0) index = youtubeShorts.length - 1;
    if (index >= youtubeShorts.length) index = 0;
    
    currentIndex = index;
    const videoId = youtubeShorts[currentIndex];
    
    // Update counter
    document.getElementById('counter').textContent = `${currentIndex + 1} / ${youtubeShorts.length}`;
    
    // Create YouTube embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&rel=0&fs=0&loop=1&playlist=${videoId}&modestbranding=1`;
    
    // Set iframe source
    const iframe = document.getElementById('short-video');
    iframe.src = embedUrl;
    
    // Store current video in localStorage
    localStorage.setItem('lastVideoIndex', currentIndex);
}

// Change video
function changeVideo(direction) {
    loadVideo(currentIndex + direction);
}

// Close welcome popup
function closePopup() {
    document.getElementById('welcome-popup').style.display = 'none';
    // Start playing the video
    loadVideo(currentIndex);
}

// Toggle menu
function toggleMenu() {
    document.getElementById('navbar').classList.toggle('active');
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
    console.log(`GMD Vibes - ${youtubeShorts.length} shorts loaded`);
    
    // Check if we should show popup (first visit)
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
        // Show popup on first visit
        document.getElementById('welcome-popup').style.display = 'flex';
        localStorage.setItem('hasVisited', 'true');
    } else {
        // Load last watched video or start from beginning
        const lastIndex = parseInt(localStorage.getItem('lastVideoIndex')) || 0;
        loadVideo(lastIndex);
        document.getElementById('welcome-popup').style.display = 'none';
    }
    
    // Close menu when nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navbar').classList.remove('active');
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') changeVideo(-1);
        if (e.key === 'ArrowRight') changeVideo(1);
        if (e.key === 'Escape') {
            document.getElementById('navbar').classList.remove('active');
        }
    });
    
    // Auto-play next video when current ends (YouTube API)
    window.addEventListener('message', (event) => {
        if (event.data === 'ended') {
            changeVideo(1);
        }
    });
    
    // Try to listen to YouTube player events
    const iframe = document.getElementById('short-video');
    iframe.addEventListener('load', () => {
        // Post message to start listening
        iframe.contentWindow.postMessage('{"event":"listening","id":"player"}', '*');
    });
});

// Function to get random video
function getRandomVideo() {
    const randomIndex = Math.floor(Math.random() * youtubeShorts.length);
    loadVideo(randomIndex);
}

// Function to share current video
function shareVideo() {
    const videoId = youtubeShorts[currentIndex];
    const url = `https://youtube.com/shorts/${videoId}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'GMD Vibes - Romantic Reels',
            text: 'Check out this romantic reel from GMD Vibes! ❤️',
            url: url
        });
    } else {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}
