# Alexandria's World - Interactive Globe Prototype

## 🌍 About
This is a cartoon-style interactive globe where children can explore every country in the world!

## ✨ Features
- **Interactive 3D Globe** - Rotate and explore with your mouse
- **Country Highlighting** - Hover over countries to see them light up in bright colors
- **Click to Learn** - Click any country to open a modal (ready for your books!)
- **Auto-Rotation** - Globe spins automatically (can be paused)
- **Cartoon Style** - Bright, colorful, child-friendly design

## 🚀 How to Run

### Option 1: Using Python (Easiest)
```bash
cd alexandrias-world-website
python -m http.server 8000
```
Then open: http://localhost:8000

### Option 2: Using Node.js
```bash
cd alexandrias-world-website
npx http-server -p 8000
```
Then open: http://localhost:8000

### Option 3: Using Live Server (VS Code)
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎨 Customization

### Change Globe Colors
Edit `globe.js` line 47-50 to change country colors:
```javascript
const colors = ['#4ecdc4', '#ff6b6b', '#ffeaa7', '#a29bfe', '#fd79a8', '#fdcb6e', '#e17055', '#74b9ff'];
```

### Add More Countries
Edit the `countryData` object in `globe.js` to add information for more countries.

### Integrate Your Books
In `globe.js`, modify the `openBookModal()` function to load your PDF books or use a flipbook library like DearFlip.

## 📝 Next Steps
1. ✅ Test the prototype
2. Add your Alexandria's World logo
3. Integrate all 193 country books
4. Add book viewer (DearFlip or PDF.js)
5. Deploy to hosting

## 🛠️ Technical Details
- **Library**: Globe.GL (Three.js/WebGL)
- **Style**: Cartoon/Child-friendly
- **Responsive**: Works on mobile and desktop
- **Browser Support**: Chrome, Firefox, Safari, Edge

## 💡 Tips
- Use mouse/trackpad to rotate the globe
- Scroll to zoom in/out
- Hover over countries to see their information
- Click to open the book modal

Enjoy exploring Alexandria's World! 🌍📚
