<!-- admin.html - Enhanced Version -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin - Add Shorts</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .admin-container {
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background-color: #222;
      border-radius: 10px;
    }
    
    .admin-container h2 {
      color: #42e3f5;
      text-align: center;
      margin-bottom: 20px;
    }
    
    .admin-panel {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    
    .add-section, .manage-section {
      flex: 1;
      min-width: 300px;
      padding: 20px;
      background-color: #111;
      border-radius: 8px;
    }
    
    .add-section h3, .manage-section h3 {
      color: #ff5722;
      margin-bottom: 15px;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      color: #ccc;
    }
    
    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #444;
      border-radius: 5px;
      background-color: #333;
      color: white;
      font-size: 16px;
    }
    
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-right: 10px;
    }
    
    .btn-primary {
      background-color: purple;
      color: white;
    }
    
    .btn-primary:hover {
      background-color: #6a2a99;
    }
    
    .btn-success {
      background-color: #2ecc71;
      color: white;
    }
    
    .btn-danger {
      background-color: #e74c3c;
      color: white;
    }
    
    .btn-secondary {
      background-color: #3498db;
      color: white;
    }
    
    .btn-warning {
      background-color: #f39c12;
      color: white;
    }
    
    #shorts-list {
      max-height: 400px;
      overflow-y: auto;
      margin-top: 15px;
    }
    
    .short-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      margin-bottom: 8px;
      background-color: #222;
      border-radius: 5px;
      border-left: 4px solid #42e3f5;
    }
    
    .short-info {
      flex: 1;
    }
    
    .short-url {
      color: #42e3f5;
      word-break: break-all;
      font-size: 14px;
    }
    
    .short-id {
      color: #999;
      font-size: 12px;
    }
    
    .short-actions {
      display: flex;
      gap: 5px;
    }
    
    .action-btn {
      padding: 5px 10px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
    }
    
    .delete-btn {
      background-color: #e74c3c;
      color: white;
    }
    
    .preview-btn {
      background-color: #3498db;
      color: white;
    }
    
    .copy-btn {
      background-color: #9b59b6;
      color: white;
    }
    
    #message {
      margin: 15px 0;
      padding: 10px;
      border-radius: 5px;
      display: none;
    }
    
    .success { 
      background-color: rgba(46, 204, 113, 0.2); 
      color: #2ecc71;
      border: 1px solid #2ecc71;
    }
    
    .error { 
      background-color: rgba(231, 76, 60, 0.2); 
      color: #e74c3c;
      border: 1px solid #e74c3c;
    }
    
    .info { 
      background-color: rgba(52, 152, 219, 0.2); 
      color: #3498db;
      border: 1px solid #3498db;
    }
    
    .instructions {
      background-color: rgba(243, 156, 18, 0.1);
      border: 1px solid #f39c12;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
      color: #f39c12;
    }
    
    .instructions h4 {
      margin-top: 0;
      color: #f39c12;
    }
    
    .instructions ol {
      padding-left: 20px;
      margin: 10px 0;
    }
    
    .instructions li {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="admin-container">
    <h2>📱 GMD Vibes - Admin Panel</h2>
    
    <div class="admin-panel">
      <div class="add-section">
        <h3>➕ Add New Shorts</h3>
        <div class="form-group">
          <label for="video_url">YouTube Shorts URL:</label>
          <input type="text" id="video_url" placeholder="https://youtube.com/shorts/VIDEO_ID">
        </div>
        
        <button class="btn btn-primary" onclick="addShorts()">Add Shorts</button>
        <button class="btn btn-secondary" onclick="addMultipleShorts()">Add Multiple (Paste List)</button>
        
        <div id="message"></div>
        
        <div class="instructions">
          <h4>📝 How to Update on GitHub Pages:</h4>
          <ol>
            <li>Add/Delete shorts using buttons above</li>
            <li>Click "Download JSON File"</li>
            <li>Go to your GitHub repository</li>
            <li>Upload the JSON file to <code>data/shorts.json</code></li>
            <li>Your site will update automatically</li>
          </ol>
        </div>
      </div>
      
      <div class="manage-section">
        <h3>📊 Manage Shorts (<span id="count">0</span> total)</h3>
        
        <div class="short-actions">
          <button class="btn btn-success" onclick="downloadJSON()">💾 Download JSON File</button>
          <button class="btn btn-warning" onclick="uploadJSON()">📤 Upload JSON File</button>
          <button class="btn btn-danger" onclick="clearAll()">🗑️ Clear All</button>
        </div>
        
        <div id="shorts-list">
          <!-- Shorts will appear here -->
        </div>
        
        <div style="margin-top: 15px; text-align: center;">
          <a href="index.html" style="color: #42e3f5; text-decoration: none; font-size: 14px;">
            ← Back to Main Site
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Hidden file input for JSON upload -->
  <input type="file" id="json-upload" accept=".json" style="display: none;">
  
  <script src="js/admin.js"></script>
</body>
</html>
