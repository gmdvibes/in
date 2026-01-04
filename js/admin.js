// js/admin.js
let shorts = [];

// Load existing shorts
async function loadShorts() {
  try {
    const response = await fetch('data/shorts.json');
    const data = await response.json();
    shorts = data.shorts || [];
    displayShorts();
  } catch (error) {
    console.error("Error loading shorts:", error);
    shorts = [];
    displayShorts();
  }
}

// Display shorts in admin panel
function displayShorts() {
  const container = document.getElementById('shorts-container');
  const countElement = document.getElementById('count');
  
  if (shorts.length === 0) {
    container.innerHTML = '<p style="color: #777; text-align: center;">No shorts added yet.</p>';
    countElement.textContent = '0';
    return;
  }
  
  countElement.textContent = shorts.length;
  container.innerHTML = '';
  
  shorts.forEach((url, index) => {
    const div = document.createElement('div');
    div.className = 'short-item';
    
    const videoId = getYouTubeVideoId(url);
    const thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    
    div.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="${thumbnail}" alt="Thumbnail" style="width: 60px; height: 45px; border-radius: 3px;">
        <div>
          <a href="${url}" target="_blank" style="color: #42e3f5; text-decoration: none;">
            ${videoId || 'Invalid URL'}
          </a>
          <div style="font-size: 12px; color: #999;">${url}</div>
        </div>
      </div>
      <button class="delete-btn" onclick="deleteShort(${index})">Delete</button>
    `;
    
    container.appendChild(div);
  });
}

// Add new shorts
async function addShorts() {
  const urlInput = document.getElementById('video_url');
  const url = urlInput.value.trim();
  
  if (!url) {
    showMessage('Please enter a URL', 'error');
    return;
  }
  
  // Validate YouTube Shorts URL
  if (!isValidYouTubeShortsUrl(url)) {
    showMessage('Invalid YouTube Shorts URL. Must be like: https://youtube.com/shorts/VIDEO_ID', 'error');
    return;
  }
  
  // Check for duplicates
  if (shorts.includes(url)) {
    showMessage('This URL already exists!', 'error');
    return;
  }
  
  shorts.push(url);
  
  // Save to JSON file (GitHub Pages workaround)
  await saveShorts();
  
  urlInput.value = '';
  showMessage('Shorts added successfully!', 'success');
  displayShorts();
}

// Delete shorts
async function deleteShort(index) {
  if (confirm('Are you sure you want to delete this shorts?')) {
    shorts.splice(index, 1);
    await saveShorts();
    showMessage('Shorts deleted successfully!', 'success');
    displayShorts();
  }
}

// Save shorts to JSON (using localStorage as GitHub Pages can't write files)
async function saveShorts() {
  try {
    // Create JSON data
    const data = {
      shorts: shorts,
      lastUpdated: new Date().toISOString()
    };
    
    // Save to localStorage (temporary solution)
    localStorage.setItem('gmd_shorts_backup', JSON.stringify(data));
    
    // For GitHub Pages, we need a different approach:
    // Method 1: Use GitHub API (requires authentication)
    // Method 2: Use a third-party service like JSONbin or Firebase
    // Method 3: Use GitHub Gists API (free, requires token)
    
    // Here's a simple localStorage fallback with download option
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create download link for manual upload
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'shorts.json';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    showMessage('Shorts saved! Download the JSON file and replace data/shorts.json', 'success');
    
  } catch (error) {
    console.error("Error saving shorts:", error);
    showMessage('Error saving shorts. Please try again.', 'error');
  }
}

// Helper functions
function isValidYouTubeShortsUrl(url) {
  const pattern = /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[a-zA-Z0-9_-]+$/;
  return pattern.test(url);
}

function getYouTubeVideoId(url) {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function showMessage(text, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = text;
  messageDiv.className = type;
  messageDiv.style.display = 'block';
  
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

// Initialize
document.addEventListener('DOMContentLoaded', loadShorts);
