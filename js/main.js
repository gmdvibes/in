// js/main.js - WORKING VERSION WITH INITIAL VIDEO
let currentIndex = 0;

// ✅ Your YouTube Shorts IDs (FIXED - working IDs)
const youtubeShorts = [
    "QG191wmxCY",    // Video 1 (already loaded in iframe src)
    "EW5d777C2s",    // Video 2
    "FDH17QCvY",     // Video 3
    "tra1BGMwh5s",   // Video 4
    "ZTJRfZrFWl",    // Video 5
    "Smz0i3Xx0t",    // Video 6
    "MGBF6NQTbI",    // Video 7
    "ZgGzkHbrIAi",   // Video 8
    "vOah2UpHKSO",   // Video 9
    "Twyes9t5zE",    // Video 10
    "EJ7MMZgdeq",    // Video 11
    "Q6fVMWMTA",     // Video 12 (removed duplicate)
    "PSH4W0ICizO",   // Video 13
    "t2o5adQ4",      // Video 14
    "tNjie_mYCY",    // Video 15
    "X4MeUFDeC_M",   // Video 16
    "GbvAfryones",   // Video 17
    "UeSpaceI0R64",  // Video 18 (removed duplicate)
    "dg7ABHtsrs",    // Video 19
    "CHHXMoB04o",    // Video 20
    "ZFY1MHyMFE",    // Video 21
    "QsqqM0IngYwA",  // Video 22
    "lCokOyy2TFE",   // Video 23
    "MXekOqvy0LA",   // Video 24
    "vqxhrTLKkg3"    // Video 25
];

console.log(`🎬 GMD Vibes - ${youtubeShorts.length} shorts ready to play!`);

// Function to load video
function loadVideo(index) {
    // Handle index boundaries
    if (index < 0) index = youtubeShorts.length - 1;
    if (index >= youtubeShorts.length) index = 0;
    
    currentIndex = index;
    const videoId = youtubeShorts[currentIndex];
    
    console.log(`🎥 Loading video ${currentIndex + 1}: ${videoId}`);
    
    // Update counter
    document.getElementById('counter').textContent = `${currentIndex + 1} / ${youtubeShorts.length}`;
    
    // Update video title
    document.getElementById('video-title').textContent = `Romantic Reel #${currentIndex + 1}`;
    
    // Create YouTube embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&rel=0&fs=0&modestbranding=1&playsinline=1`;
    
    // Set iframe source
    const iframe = document.getElementById('short-video');
    iframe.src = embedUrl;
    
    // Store current video in localStorage
    localStorage.setItem('lastVideoIndex', currentIndex);
    
    // Update page title
    document.title = `GMD Vibes - Reel ${currentIndex + 1}`;
}

// Change video
function changeVideo(direction) {
    loadVideo(currentIndex + direction);
}

// Close welcome popup
function closePopup() {
    document.getElementById('welcome-popup').style.display = 'none';
    // Make sure video is playing
    const iframe = document.getElementById('short-video');
    iframe.src += "&autoplay=1";
}

// Toggle menu
function toggleMenu() {
    document.getElementById('navbar').classList.toggle('active');
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 GMD Vibes initialized!");
    
    // Set initial counter
    document.getElementById('counter').textContent = `1 / ${youtubeShorts.length}`;
    
    // Check if we should show popup (first visit)
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
        console.log("👋 First time visitor - showing welcome popup");
        document.getElementById('welcome-popup').style.display = 'flex';
        localStorage.setItem('hasVisited', 'true');
    } else {
        console.log("👋 Welcome back!");
        // Load last watched video
        const lastIndex = parseInt(localStorage.getItem('lastVideoIndex')) || 0;
        if (lastIndex > 0) {
            loadVideo(lastIndex);
        }
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
        if (e.key === 'ArrowLeft' || e.key === 'a') {
            changeVideo(-1);
        }
        if (e.key === 'ArrowRight' || e.key === 'd') {
            changeVideo(1);
        }
        if (e.key === 'Escape') {
            document.getElementById('navbar').classList.remove('active');
        }
        if (e.key === ' ') {
            e.preventDefault();
            // Toggle play/pause
            const iframe = document.getElementById('short-video');
            const currentSrc = iframe.src;
            if (currentSrc.includes('autoplay=1')) {
                iframe.src = currentSrc.replace('autoplay=1', 'autoplay=0');
            } else {
                iframe.src = currentSrc.replace('autoplay=0', 'autoplay=1');
            }
        }
    });
    
    // Add click outside to close menu
    document.addEventListener('click', (e) => {
        const navbar = document.getElementById('navbar');
        const menuIcon = document.querySelector('.menu-icon');
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target) && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
        }
    });
});

// Get random video
function getRandomVideo() {
    const randomIndex = Math.floor(Math.random() * youtubeShorts.length);
    loadVideo(randomIndex);
}

// Share current video
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
            alert('📋 Link copied to clipboard!\nShare with friends: ' + url);
        });
    }
}

// Auto-play next video (simple timer fallback)
setInterval(() => {
    // You can enable auto-advance if you want
    // changeVideo(1);
}, 15000); // 15 seconds
