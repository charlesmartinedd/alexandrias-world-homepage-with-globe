// Create a simple bright blue ocean texture as a data URL
function createBlueOceanTexture() {
    // Create a canvas
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Fill with Dodger Blue - rich, bright, energetic! (#1E90FF)
    ctx.fillStyle = '#1E90FF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Return as data URL
    return canvas.toDataURL('image/png');
}

// Export for use
window.createBlueOceanTexture = createBlueOceanTexture;
