// Initialize the globe
let globe;
let autoRotate = true;
let countries = [];
let hoveredCountry = null;

// Classroom map style colors - vibrant and distinct like wall maps!
const classroomColors = [
    '#FF6B9D',  // Pink
    '#4ECDC4',  // Turquoise
    '#FFE66D',  // Yellow
    '#95E1D3',  // Mint
    '#F38181',  // Coral
    '#AA96DA',  // Lavender
    '#FCBAD3',  // Light Pink
    '#A8E6CF',  // Seafoam
    '#FFD3B6',  // Peach
    '#FFAAA5',  // Salmon
    '#FF8B94',  // Rose
    '#A8DADC',  // Sky Blue
    '#C7CEEA',  // Periwinkle
    '#FFDAB9',  // Tan
    '#B4E7CE',  // Mint Green
    '#DDA15E',  // Caramel
    '#FAEDCD',  // Cream
    '#E0AFA0',  // Dusty Rose
    '#BCB8B1',  // Gray
    '#8CB369'   // Olive Green
];

// Country data - sample of countries with capital cities
const countryData = {
    'United States': { capital: 'Washington, D.C.', continent: 'North America', flag: '🇺🇸' },
    'Canada': { capital: 'Ottawa', continent: 'North America', flag: '🇨🇦' },
    'Mexico': { capital: 'Mexico City', continent: 'North America', flag: '🇲🇽' },
    'Brazil': { capital: 'Brasília', continent: 'South America', flag: '🇧🇷' },
    'Argentina': { capital: 'Buenos Aires', continent: 'South America', flag: '🇦🇷' },
    'United Kingdom': { capital: 'London', continent: 'Europe', flag: '🇬🇧' },
    'France': { capital: 'Paris', continent: 'Europe', flag: '🇫🇷' },
    'Germany': { capital: 'Berlin', continent: 'Europe', flag: '🇩🇪' },
    'Italy': { capital: 'Rome', continent: 'Europe', flag: '🇮🇹' },
    'Spain': { capital: 'Madrid', continent: 'Europe', flag: '🇪🇸' },
    'China': { capital: 'Beijing', continent: 'Asia', flag: '🇨🇳' },
    'Japan': { capital: 'Tokyo', continent: 'Asia', flag: '🇯🇵' },
    'India': { capital: 'New Delhi', continent: 'Asia', flag: '🇮🇳' },
    'Australia': { capital: 'Canberra', continent: 'Oceania', flag: '🇦🇺' },
    'South Africa': { capital: 'Pretoria', continent: 'Africa', flag: '🇿🇦' },
    'Egypt': { capital: 'Cairo', continent: 'Africa', flag: '🇪🇬' },
    'Nigeria': { capital: 'Abuja', continent: 'Africa', flag: '🇳🇬' },
    'Russia': { capital: 'Moscow', continent: 'Europe/Asia', flag: '🇷🇺' },
    'South Korea': { capital: 'Seoul', continent: 'Asia', flag: '🇰🇷' },
    'Thailand': { capital: 'Bangkok', continent: 'Asia', flag: '🇹🇭' }
};

// Initialize globe when page loads
window.addEventListener('load', initGlobe);

async function initGlobe() {
    // Show loading message
    console.log('🌍 Starting to load globe...');

    // Fetch country data from LOCAL file
    try {
        console.log('📡 Fetching countries.geojson...');
        const response = await fetch('countries.geojson');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('✅ GeoJSON loaded, parsing...');
        const data = await response.json();
        countries = data.features;
        console.log(`✅ Found ${countries.length} countries`);

        // Create the globe - CLASSROOM MAP STYLE with BRIGHT BLUE OCEANS!
        console.log('🎨 Creating globe visualization...');

        // Create bright blue ocean texture
        const blueOceanTexture = createBlueOceanTexture();

        globe = Globe()
            (document.getElementById('globeViz'))
            .globeImageUrl(blueOceanTexture) // BRIGHT KID-FRIENDLY OCEAN BLUE!
            .backgroundColor('#FFFFFF') // Pure white background
            .showGlobe(true)
            .showAtmosphere(false) // Disable atmosphere for cleaner classroom look
            .polygonsData(countries)
            .polygonAltitude(d => d === hoveredCountry ? 0.03 : 0.005) // Very flat! Pop up on hover
            .polygonCapColor(d => {
                // If this country is hovered, make it bright gold
                if (d === hoveredCountry) {
                    return '#FFD700'; // Gold highlight!
                }
                // Otherwise use classroom map colors
                const colorIndex = Math.abs(hashCode(d.properties.NAME || d.properties.ADMIN)) % classroomColors.length;
                return classroomColors[colorIndex];
            })
            .polygonSideColor(() => 'rgba(100, 100, 100, 0.15)') // Less visible sides for flat look
            .polygonStrokeColor(() => '#2C3E50') // Dark borders like classroom maps
            .polygonLabel(d => {
                const name = d.properties.NAME || d.properties.ADMIN;
                const info = countryData[name];
                if (info) {
                    return `
                        <div style="background: white; padding: 15px; border-radius: 10px; border: 3px solid #4ecdc4; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
                            <h3 style="color: #667eea; margin: 0 0 10px 0; font-family: 'Comic Sans MS';">${info.flag} ${name}</h3>
                            <p style="margin: 5px 0; color: #555;"><strong>Capital:</strong> ${info.capital}</p>
                            <p style="margin: 5px 0; color: #555;"><strong>Continent:</strong> ${info.continent}</p>
                            <p style="margin: 10px 0 0 0; color: #ff6b6b; font-weight: bold;">Click to read the book!</p>
                        </div>
                    `;
                }
                return `<div style="background: white; padding: 10px; border-radius: 10px;"><strong>${name}</strong><br>Click to explore!</div>`;
            })
            .onPolygonHover(hoverD => {
                // Store the hovered country and update globe
                hoveredCountry = hoverD;
                globe.polygonsData(countries); // Refresh to show hover effect

                // Change cursor on hover
                document.getElementById('globeViz').style.cursor = hoverD ? 'pointer' : 'grab';

                // Log hover for debugging (info panel removed)
                if (hoverD) {
                    const name = hoverD.properties.NAME || hoverD.properties.ADMIN;
                    console.log('🌍 Hovering over:', name);
                }
            })
            .onPolygonClick(d => {
                const name = d.properties.NAME || d.properties.ADMIN;
                console.log('🌍 Clicked country:', name);
                // Modal removed - ready for your book integration!
            });

        // Set initial point of view
        console.log('📍 Setting initial view...');
        globe.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });

        // Enable controls
        console.log('🎮 Setting up controls...');
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.5;
        globe.controls().enableZoom = true;

        console.log('✅ Globe fully loaded and ready!');

        // Note: Custom THREE.js lighting removed to avoid reference errors
        // Globe.GL handles lighting internally
        console.log('🎨 Globe styling applied - classroom map colors active!');

    } catch (error) {
        console.error('❌ Error loading globe data:', error);
        console.error('Error details:', error.message, error.stack);
        document.getElementById('globeViz').innerHTML = `
            <div class="loading" style="color: white; padding: 40px; text-align: center;">
                <h2>Error Loading Globe</h2>
                <p>${error.message}</p>
                <p style="font-size: 0.9em; margin-top: 20px;">Check browser console for details</p>
            </div>
        `;
    }
}

// Hash function for consistent color assignment
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}

// Controls removed - clean interface ready for book integration!

// Responsive handling
window.addEventListener('resize', () => {
    if (globe) {
        globe.width(document.getElementById('globeViz').offsetWidth);
        globe.height(document.getElementById('globeViz').offsetHeight);
    }
});
