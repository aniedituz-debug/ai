// Load and Display Statistics
function loadStatistics() {
    // Use default values for offline functionality
    animateCounter('stat-users', 15000, '+', 2000);
    animateCounter('stat-uptime', 99.9, '%', 2000);

    // Support is 24/7 text
    const supportEl = document.getElementById('stat-support');
    if (supportEl) {
        supportEl.textContent = '24/7';
    }
}

// Animate counter function
function animateCounter(elementId, endValue, suffix, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let startValue = 0;
    const increment = endValue / (duration / 16); // 16ms per frame
    const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= endValue) {
            clearInterval(timer);
            startValue = endValue;
        }
        // Format number with commas for thousands
        element.textContent = Math.floor(startValue).toLocaleString() + suffix;
    }, 16);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to allow UI to render
    setTimeout(loadStatistics, 500);
});