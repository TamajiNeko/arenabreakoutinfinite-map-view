const zoomSlider = document.getElementById('zoom-slider'); 
const map = document.getElementById('map');

zoomSlider.addEventListener('input', zoomMap);

document.getElementById('fs-p1').addEventListener('click', function() {
    this.style.color = '#c54324'; 
    document.getElementById('fs-p2').style.color = '#a0a0a0';
});

document.getElementById('fs-p2').addEventListener('click', function() {
    this.style.color = '#c54324'; 
    document.getElementById('fs-p1').style.color = '#a0a0a0';
});

function toggleSidebar() {
    let sidebar = document.getElementById("top-side");
    let icon = document.getElementById("toggle-btn")
    sidebar.classList.toggle("active");
    icon.classList.toggle("ro-180")
}

function zoomMap() {
    const scaleValue = zoomSlider.value;
    map.style.scale = `${scaleValue}`;
}

window.addEventListener('wheel', function(event) {
    let change = event.deltaY < 0 ? 0.1 : -0.1;
    let newValue = parseFloat(zoomSlider.value) + change;
    newValue = Math.min(Math.max(newValue, zoomSlider.min), zoomSlider.max);
    zoomSlider.value = newValue;
    zoomMap();
});

let isDragging = false;
let startX, startY, currentX = 0, currentY = 0;

map.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    map.style.cursor = "grabbing";
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    let scaleFactor = parseFloat(zoomSlider.value) || 1; // Get the current zoom level
    let dragSpeed = 1 / scaleFactor; // Reduce drag speed as zoom increases

    currentX += (e.movementX * dragSpeed);
    currentY += (e.movementY * dragSpeed);
    
    map.style.transform = `translate(${currentX}px, ${currentY}px)`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    map.style.cursor = "grab";
});

document.addEventListener('dragstart', (e) => e.preventDefault());