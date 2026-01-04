// js/main.js - Updated with your URLs
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
    // Fallback to your actual URLs
    shorts = [
      "https://youtube.com/shorts/QG191wmxCY?si=0DjhK__",
      "https://youtube.com/shorts/EW5d777C2s?si=SL0E1aK__",
      "https://youtube.com/shorts/FDH17QCvY?si=LGaMZJG__",
      "https://youtube.com/shorts/tra1BGMwh5s?si=y4kUZP__",
      "https://youtube.com/shorts/ZTJRfZrFWlTai-SzzenMQZ__",
      "https://youtube.com/shorts/Smz0i3Xx0t?si=9VqUMp66__",
      "https://youtube.com/shorts/MGBF6NQTbIFcTs+2eWDbaS__",
      "https://youtube.com/shorts/ZgGzkHbrIAi?si=EFQ6WZGH__",
      "https://youtube.com/shorts/vOah2UpHKSO?si=EgZNGQLU__",
      "https://youtube.com/shorts/Twyes9t5zErS+Z7BQ97IP__",
      "https://youtube.com/shorts/EJ7MMZgdeq?si=dfTeqh6u__",
      "https://youtube.com/shorts/EJ7MMZgdeq?si=dfTeqh6u__",
      "https://youtube.com/shorts/Q6fVMWMTA?si=Q6ByXFut__",
      "https://youtube.com/shorts/PSH4W0ICizO?si=MINcMXpu__",
      "https://youtube.com/shorts/t%2o5adQ4?si=SwemY1ag__",
      "https://youtube.com/shorts/tNjie_mYCY?si=UCJSYXQp__",
      "https://youtube.com/shorts/X4MeUFDeC_M?si=X7RWKB4__",
      "https://youtube.com/shorts/GbvAfryones?si=nFeXOKT__",
      "https://youtube.com/shorts/GbvAfryones?si=WS3W4DrN__",
      "https://youtube.com/shorts/UeSpaceI0R64?si=ijF2Ninie__",
      "https://youtube.com/shorts/dg7ABHtsrs?si=kof88oM3__",
      "https://youtube.com/shorts/CHHXMoB04o?si=Wbg3wkn__",
      "https://youtube.com/shorts/ZFY1MHyMFE?si=dds5DzHQ__",
      "https://youtube.com/shorts/QsqqM0IngYwA?si=6MYE68DX__",
      "https://youtube.com/shorts/lCokOyy2TFE?si=SOUJSyLS__",
      "https://youtube.com/shorts/MXekOqvy0LA?si=BEADGFTS__",
      "https://youtube.com/shorts/vqxhrTLKkg3?si=9KZTzgE__"
    ];
    if (shorts.length > 0) {
      loadVideo(currentIndex);
    }
  }
}

function loadVideo(index) {
  if (shorts.length === 0) return;
  
  const videoUrl = shorts[index];
  // Extract clean video ID (remove query parameters)
  const cleanUrl = videoUrl.split('?')[0];
  const embedUrl = cleanUrl.replace('youtube.com/shorts', 'youtube.com/embed');
  const videoId = getYouTubeVideoId(cleanUrl);
  
  if (!videoId) {
    console.error("Invalid video URL:", videoUrl);
    // Skip to next video
    changeVideo(1);
    return;
  }
  
  // Create autoplay URL with playlist for loop effect
  const fullUrl = `${embedUrl}?autoplay=1&mute=0&controls=0&rel=0&fs=0&loop=1&playlist=${videoId}`;
  
  document.getElementById('short-video').src = fullUrl;
  console.log(`Playing video ${index + 1}/${shorts.length}: ${videoId}`);
}

function changeVideo(direction) {
  if (shorts.length === 0) return;
  
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = shorts.length - 1;
  if (currentIndex >= shorts.length) currentIndex = 0;
  
  loadVideo(currentIndex);
}

function getYouTubeVideoId(url) {
  // Extract video ID from various YouTube URL formats
  const patterns = [
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

function closePopup() {
  document.getElementById('welcome-popup').style.display = 'none';
  // Start playing first video after popup is closed
  if (shorts.length > 0 && currentIndex === 0) {
    loadVideo(0);
  }
}

function toggleMenu() {
  document.getElementById('navbar').classList.toggle('active');
}

// Video controls with better error handling
function playVideo() {
  const iframe = document.getElementById('short-video');
  iframe.src += "&autoplay=1";
}

function pauseVideo() {
  const iframe = document.getElementById('short-video');
  iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
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
    if (e.key === ' ') {
      e.preventDefault();
      // Toggle play/pause on spacebar
      const iframe = document.getElementById('short-video');
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  });
  
  // Auto-play next video when current ends
  const iframe = document.getElementById('short-video');
  iframe.addEventListener('load', () => {
    iframe.contentWindow.postMessage('{"event":"listening","id":"player"}', '*');
  });
  
  // Listen for video end events
  window.addEventListener('message', (event) => {
    if (event.data === 'ended') {
      changeVideo(1);
    }
  });
});
