// js/main.js
let currentIndex = 0;
let shorts = [];

// Fetch shorts from JSON file
async function loadShorts() {
  try {
    const response = await fetch('data/shorts.json');
    const data = await response.json();
    shorts = data.shorts;
    
    // Load first video if available
    if (shorts.length > 0) {
      loadVideo(currentIndex);
    } else {
      document.getElementById('short-video').src = '';
      console.log("No shorts available");
    }
  } catch (error) {
    console.error("Error loading shorts:", error);
    // Fallback to default shorts
    shorts = [
      "https://www.youtube.com/shorts/VIDEO_ID_1",
      "https://www.youtube.com/shorts/VIDEO_ID_2"
    ];
    if (shorts.length > 0) {
      loadVideo(currentIndex);
    }
  }
}

function loadVideo(index) {
  if (shorts.length === 0) return;
  
  const videoUrl = shorts[index];
  const embedUrl = videoUrl.replace('youtube.com/shorts', 'youtube.com/embed');
  const videoId = getYouTubeVideoId(videoUrl);
  
  // Create autoplay URL with playlist for loop effect
  const fullUrl = `${embedUrl}?autoplay=1&mute=0&controls=0&rel=0&fs=0&loop=1&playlist=${videoId}`;
  
  document.getElementById('short-video').src = fullUrl;
}

function changeVideo(direction) {
  if (shorts.length === 0) return;
  
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = shorts.length - 1;
  if (currentIndex >= shorts.length) currentIndex = 0;
  
  loadVideo(currentIndex);
}

function getYouTubeVideoId(url) {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function closePopup() {
  document.getElementById('welcome-popup').style.display = 'none';
}

function toggleMenu() {
  document.getElementById('navbar').classList.toggle('active');
}

// Close menu when nav link is clicked
document.addEventListener("DOMContentLoaded", () => {
  loadShorts();
  
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
  });
});
