// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navMenu?.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger?.classList.remove('active');
            }
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .city-card, .payment-card, .vpn-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation for affiliate links
document.querySelectorAll('a[href*="trip.com"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Add loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Restore original text after a short delay
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
});

// Add copy functionality for contact information
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Add interactive features for payment methods
const paymentCards = document.querySelectorAll('.payment-card');
paymentCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Interactive Map Functionality
const cityMarkers = document.querySelectorAll('.marker');
const mapInfo = {
    beijing: {
        title: 'Beijing - The Capital',
        description: 'Home to the Great Wall, Forbidden City, and modern Olympic venues.',
        highlights: ['Great Wall at Mutianyu', 'Forbidden City', 'Temple of Heaven', '798 Art District'],
        transport: 'Excellent subway system, high-speed rail connections'
    },
    shanghai: {
        title: 'Shanghai - The Pearl of the Orient',
        description: 'China\'s financial hub with stunning skyline and colonial heritage.',
        highlights: ['The Bund', 'Oriental Pearl Tower', 'Yu Garden', 'French Concession'],
        transport: 'Maglev train from airport, extensive metro network'
    },
    guilin: {
        title: 'Guilin - Karst Landscape Paradise',
        description: 'Famous for its dramatic karst mountains and Li River scenery.',
        highlights: ['Li River Cruise', 'Elephant Trunk Hill', 'Reed Flute Cave', 'Yangshuo'],
        transport: 'Li River boats, buses to surrounding areas'
    },
    xian: {
        title: 'Xi\'an - Ancient Capital',
        description: 'Home to the Terracotta Army and ancient Silk Road history.',
        highlights: ['Terracotta Warriors', 'Ancient City Wall', 'Muslim Quarter', 'Big Wild Goose Pagoda'],
        transport: 'Metro system, high-speed rail from major cities'
    },
    chengdu: {
        title: 'Chengdu - Land of Abundance',
        description: 'Famous for pandas, spicy food, and laid-back lifestyle.',
        highlights: ['Giant Panda Base', 'Jinli Ancient Street', 'Wuhou Temple', 'Sichuan Opera'],
        transport: 'Metro system, buses to panda bases'
    }
};

cityMarkers.forEach(marker => {
    marker.addEventListener('click', function() {
        const city = this.dataset.city;
        const info = mapInfo[city];
        
        // Remove active class from all markers
        cityMarkers.forEach(m => m.classList.remove('active'));
        
        // Add active class to clicked marker
        this.classList.add('active');
        
        // Update map placeholder with city info
        const mapPlaceholder = document.querySelector('.map-placeholder');
        mapPlaceholder.innerHTML = `
            <div class="city-info">
                <h4>${info.title}</h4>
                <p>${info.description}</p>
                <div class="city-highlights">
                    <strong>Top Attractions:</strong>
                    <ul>
                        ${info.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                </div>
                <div class="transport-info">
                    <strong>Transport:</strong> ${info.transport}
                </div>
                <button class="book-city-btn" onclick="window.open('https://www.trip.com/?Allianceid=7659513&SID=286708661&trip_sub1=${city}&trip_sub3=D9560539', '_blank')">
                    Book ${city.charAt(0).toUpperCase() + city.slice(1)} Hotels
                </button>
            </div>
        `;
        
        // Add some animation
        mapPlaceholder.style.transform = 'scale(0.95)';
        setTimeout(() => {
            mapPlaceholder.style.transform = 'scale(1)';
        }, 100);
    });
});

// Add hover effects to markers
cityMarkers.forEach(marker => {
    marker.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.05)';
    });
    
    marker.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Auto-rotate through cities every 5 seconds
let currentCityIndex = 0;
let autoRotateInterval;

const autoRotateCities = () => {
    if (cityMarkers.length > 0) {
        cityMarkers[currentCityIndex].click();
        currentCityIndex = (currentCityIndex + 1) % cityMarkers.length;
    }
};

// Start auto-rotation only if city markers exist
if (cityMarkers.length > 0) {
    autoRotateInterval = setInterval(autoRotateCities, 5000);
}

// Stop auto-rotation when user interacts
const stopAutoRotate = () => {
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
    }
};

cityMarkers.forEach(marker => {
    marker.addEventListener('click', stopAutoRotate);
});

// Add CSS for active marker
const markerStyles = `
    .marker.active {
        transform: translateY(-10px) scale(1.1) !important;
        box-shadow: 0 15px 35px rgba(0,0,0,0.2) !important;
    }
    
    .city-info {
        text-align: center;
        padding: 1rem;
    }
    
    .city-info h4 {
        font-size: 1.5rem;
        color: #2d3748;
        margin-bottom: 1rem;
    }
    
    .city-info p {
        color: #718096;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    
    .city-highlights {
        margin: 1.5rem 0;
        text-align: left;
    }
    
    .city-highlights strong {
        color: #667eea;
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .city-highlights ul {
        list-style: none;
        padding-left: 0;
    }
    
    .city-highlights li {
        padding: 0.3rem 0;
        color: #4a5568;
        position: relative;
        padding-left: 1.2rem;
    }
    
    .city-highlights li::before {
        content: '🏛️';
        position: absolute;
        left: 0;
    }
    
    .transport-info {
        background: linear-gradient(45deg, #e6fffa, #f0fdfa);
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
        border-left: 4px solid #667eea;
    }
    
    .transport-info strong {
        color: #667eea;
    }
    
    .map-placeholder {
        transition: transform 0.3s ease;
    }
`;

const markerStyle = document.createElement('style');
markerStyle.textContent = markerStyles;
document.head.appendChild(markerStyle);

// Add click tracking for analytics (basic version)
function trackClick(element, category, label) {
    element.addEventListener('click', () => {
        // In a real implementation, you would send this to analytics
        console.log(`Click tracked: ${category} - ${label}`);
    });
}

// Track important clicks
document.querySelectorAll('.cta-button').forEach((btn, index) => {
    trackClick(btn, 'CTA', `Button ${index + 1}`);
});

document.querySelectorAll('.book-city-btn').forEach((btn, index) => {
    const city = btn.closest('.city-card').querySelector('h3').textContent;
    trackClick(btn, 'City Booking', city);
});

// Add search functionality (basic)
function addSearchFeature() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search cities...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 15px;
        border: none;
        border-radius: 25px;
        background: rgba(255,255,255,0.9);
        backdrop-filter: blur(10px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        z-index: 1001;
        width: 200px;
        transition: all 0.3s ease;
    `;
    
    searchInput.addEventListener('focus', () => {
        searchInput.style.width = '250px';
        searchInput.style.background = 'white';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.style.width = '200px';
        searchInput.style.background = 'rgba(255,255,255,0.9)';
    });
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cityCards = document.querySelectorAll('.city-card');
        
        cityCards.forEach(card => {
            const cityName = card.querySelector('h3').textContent.toLowerCase();
            const cityDescription = card.querySelector('p').textContent.toLowerCase();
            
            if (cityName.includes(searchTerm) || cityDescription.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.opacity = searchTerm ? '0.3' : '1';
            }
        });
    });
    
    document.body.appendChild(searchInput);
}

// Initialize search feature
document.addEventListener('DOMContentLoaded', () => {
    addSearchFeature();
});

// Add language switcher (basic)
function addLanguageSwitcher() {
    const languageSwitcher = document.createElement('div');
    languageSwitcher.className = 'language-switcher';
    languageSwitcher.innerHTML = `
        <select id="language-select" style="
            position: fixed;
            top: 20px;
            left: 20px;
            padding: 8px 12px;
            border: none;
            border-radius: 20px;
            background: rgba(255,255,255,0.9);
            backdrop-filter: blur(10px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            z-index: 1001;
            font-size: 14px;
        ">
            <option value="en">🇺🇸 English</option>
            <option value="zh">🇨🇳 中文</option>
        </select>
    `;
    
    document.body.appendChild(languageSwitcher);
    
    // Add language switching logic here
    const select = document.getElementById('language-select');
    select.addEventListener('change', (e) => {
        console.log(`Language switched to: ${e.target.value}`);
        // In a real implementation, you would switch the language here
    });
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
    addLanguageSwitcher();
});

// Add scroll to top button
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(100px)';
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', () => {
    addScrollToTop();
    initializeVideoSystem();
});

// YouTube Video System
const videoData = {
    // Fallback data when YouTube API is not available
    fallbackVideos: [
        {
            id: 'dA0X0x5fhdU',
            title: 'China Travel Guide - 10 Things You NEED to Know',
            description: 'Essential tips for traveling to China including visa, payments, and internet access.',
            thumbnail: 'https://img.youtube.com/vi/dA0X0x5fhdU/maxresdefault.jpg',
            category: 'guide',
            duration: '12:34',
            views: '1.2M views',
            channel: 'Lost LeBlanc',
            tags: ['china', 'travel', 'guide', 'tips']
        },
        {
            id: 'Qq_8Y1z5h8w',
            title: 'Beijing Travel Guide - The BEST Things to Do in Beijing',
            description: 'Complete guide to Beijing including Forbidden City, Great Wall, and local food.',
            thumbnail: 'https://img.youtube.com/vi/Qq_8Y1z5h8w/maxresdefault.jpg',
            category: 'beijing',
            duration: '15:20',
            views: '890K views',
            channel: 'Gabriel Traveler',
            tags: ['beijing', 'china', 'forbidden city', 'great wall']
        },
        {
            id: 'mT8yXh9qVvE',
            title: 'Shanghai Travel Guide - What to Do in 48 Hours',
            description: 'Perfect Shanghai itinerary for first-time visitors.',
            thumbnail: 'https://img.youtube.com/vi/mT8yXh9qVvE/maxresdefault.jpg',
            category: 'shanghai',
            duration: '18:45',
            views: '650K views',
            channel: 'Eva Zu Beck',
            tags: ['shanghai', 'china', 'bund', 'skyline']
        },
        {
            id: 'rK8xP8z7NnM',
            title: 'Guilin & Li River Cruise - China\'s Most Beautiful Scenery',
            description: 'Exploring the stunning karst landscapes of Guilin and Yangshuo.',
            thumbnail: 'https://img.youtube.com/vi/rK8xP8z7NnM/maxresdefault.jpg',
            category: 'guilin',
            duration: '20:15',
            views: '430K views',
            channel: 'Kara and Nate',
            tags: ['guilin', 'li river', 'karst', 'yangshuo']
        },
        {
            id: 'sL9wX4k8PpQ',
            title: 'Chinese Street Food Tour - What to Eat in China',
            description: 'Amazing street food experiences across different Chinese cities.',
            thumbnail: 'https://img.youtube.com/vi/sL9wX4k8PpQ/maxresdefault.jpg',
            category: 'food',
            duration: '25:30',
            views: '980K views',
            channel: 'The Food Ranger',
            tags: ['food', 'street food', 'china', 'local cuisine']
        },
        {
            id: 'tN3wY6m9KkL',
            title: 'Chinese Culture Shock - What Surprised Me Most',
            description: 'Cultural differences and surprises when visiting China.',
            thumbnail: 'https://img.youtube.com/vi/tN3wY6m9KkL/maxresdefault.jpg',
            category: 'culture',
            duration: '14:22',
            views: '750K views',
            channel: 'Drew Binsky',
            tags: ['culture', 'china', 'travel', 'differences']
        },
        {
            id: 'vM8YqBm8HhN',
            title: 'First Time in China - What You Need to Know',
            description: 'Essential tips for first-time visitors to China including cultural differences.',
            thumbnail: 'https://img.youtube.com/vi/vM8YqBm8HhN/maxresdefault.jpg',
            category: 'guide',
            duration: '16:45',
            views: '520K views',
            channel: 'Yes Theory',
            tags: ['china', 'first time', 'travel tips', 'culture']
        },
        {
            id: 'wP9xH7j4QrT',
            title: 'Shanghai Nightlife - Best Bars and Clubs',
            description: 'Exploring Shanghai\'s vibrant nightlife scene from rooftop bars to local clubs.',
            thumbnail: 'https://img.youtube.com/vi/wP9xH7j4QrT/maxresdefault.jpg',
            category: 'shanghai',
            duration: '22:30',
            views: '380K views',
            channel: 'Nathaniel Rich',
            tags: ['shanghai', 'nightlife', 'bars', 'clubs']
        },
        {
            id: 'xK5mN2p8SsW',
            title: 'Beijing Hutong Food Tour - Hidden Gems',
            description: 'Discovering authentic Beijing cuisine in traditional hutong neighborhoods.',
            thumbnail: 'https://img.youtube.com/vi/xK5mN2p8SsW/maxresdefault.jpg',
            category: 'beijing',
            duration: '19:15',
            views: '610K views',
            channel: 'Mark Wiens',
            tags: ['beijing', 'food', 'hutong', 'street food']
        },
        {
            id: 'yL7zQ3r9TtU',
            title: 'Great Wall of China - Mutianyu vs Badaling',
            description: 'Comparing the two most popular sections of the Great Wall for tourists.',
            thumbnail: 'https://img.youtube.com/vi/yL7zQ3r9TtU/maxresdefault.jpg',
            category: 'beijing',
            duration: '17:40',
            views: '340K views',
            channel: 'Adventures of the Baileys',
            tags: ['great wall', 'beijing', 'mutianyu', 'badaling']
        },
        {
            id: 'zN8mP5w2QqR',
            title: 'Chinese Tea Culture - Traditional Tea House Experience',
            description: 'Exploring traditional Chinese tea culture and ceremonies.',
            thumbnail: 'https://img.youtube.com/vi/zN8mP5w2QqR/maxresdefault.jpg',
            category: 'culture',
            duration: '13:55',
            views: '280K views',
            channel: 'Tea House Ghost',
            tags: ['tea', 'culture', 'china', 'traditional']
        }
    ],
    
    // Bookmarks functionality
    bookmarks: JSON.parse(localStorage.getItem('chinaTravelBookmarks') || '[]'),
    
    // Current filter
    currentFilter: 'all',
    
    // Search term
    searchTerm: ''
};

// Initialize video system
function initializeVideoSystem() {
    const videoGrid = document.getElementById('videoGrid');
    const searchInput = document.getElementById('videoSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (!videoGrid) return;
    
    // Add refresh button
    addRefreshButton();
    
    // Load videos
    loadVideos();
    
    // Add search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            videoData.searchTerm = e.target.value.toLowerCase();
            loadVideos();
        }, 300));
    }
    
    // Add filter functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            videoData.currentFilter = btn.dataset.category;
            loadVideos();
        });
    });
    
    // Try to fetch real YouTube data
    fetchYouTubeVideos();
}

// Add refresh button for video section
function addRefreshButton() {
    const videoSection = document.getElementById('videos');
    if (!videoSection) return;
    
    const refreshBtn = document.createElement('button');
    refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Videos';
    refreshBtn.className = 'refresh-videos-btn';
    refreshBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 10px 15px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        z-index: 10;
    `;
    
    refreshBtn.addEventListener('click', () => {
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        refreshBtn.disabled = true;
        
        setTimeout(() => {
            fetchYouTubeVideos();
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Videos';
            refreshBtn.disabled = false;
            showNotification('Videos refreshed!', 'success');
        }, 1500);
    });
    
    // Add position relative to video section
    videoSection.style.position = 'relative';
    videoSection.appendChild(refreshBtn);
}

// Load videos into the grid
function loadVideos() {
    const videoGrid = document.getElementById('videoGrid');
    if (!videoGrid) return;
    
    let videos = videoData.fallbackVideos;
    
    // Apply filters
    if (videoData.currentFilter !== 'all') {
        videos = videos.filter(video => video.category === videoData.currentFilter);
    }
    
    // Apply search
    if (videoData.searchTerm) {
        videos = videos.filter(video => 
            video.title.toLowerCase().includes(videoData.searchTerm) ||
            video.description.toLowerCase().includes(videoData.searchTerm) ||
            video.tags.some(tag => tag.toLowerCase().includes(videoData.searchTerm))
        );
    }
    
    // Clear grid
    videoGrid.innerHTML = '';
    
    // Add videos
    videos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoGrid.appendChild(videoCard);
    });
    
    // Show no results message if needed
    if (videos.length === 0) {
        videoGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-video-slash"></i>
                <h3>No videos found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
    }
}

// Create video card element
function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
            <div class="video-duration">${video.duration}</div>
            <div class="video-overlay">
                <button class="play-btn" onclick="playVideo('${video.id}')">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        </div>
        <div class="video-info">
            <h3 class="video-title">${video.title}</h3>
            <p class="video-description">${video.description}</p>
            <div class="video-meta">
                <span class="video-views">${video.views}</span>
                <span class="video-channel">${video.channel}</span>
            </div>
            <div class="video-actions">
                <button class="bookmark-btn ${videoData.bookmarks.includes(video.id) ? 'bookmarked' : ''}" 
                        onclick="toggleBookmark('${video.id}')" 
                        title="${videoData.bookmarks.includes(video.id) ? 'Remove from bookmarks' : 'Add to bookmarks'}">
                    <i class="fas fa-bookmark"></i>
                </button>
                <button class="share-btn" onclick="shareVideo('${video.id}', '${video.title}')" title="Share video">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>
        </div>
    `;
    return card;
}

// Play video (inline modal iframe)
function ensureYouTubeModal() {
    if (document.getElementById('yt-modal')) return;
    // create styles
    const css = `
        #yt-modal { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.75); align-items: center; justify-content: center; z-index: 10000; }
        #yt-modal .yt-container { width: 90%; max-width: 960px; background: transparent; position: relative; padding-top: 56.25%; }
        #yt-modal iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; background: #000; }
        #yt-modal .yt-close { position: absolute; right: 10px; top: 10px; z-index: 10001; background: rgba(255,255,255,0.9); border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; }
    `;
    const s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);

    const modal = document.createElement('div');
    modal.id = 'yt-modal';
    modal.innerHTML = `
        <div class="yt-container">
            <iframe id="yt-iframe" src="" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
            <button id="yt-close" class="yt-close">Close</button>
        </div>
    `;

    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeYouTubeModal();
    });

    document.body.appendChild(modal);

    document.getElementById('yt-close').addEventListener('click', closeYouTubeModal);

    document.addEventListener('keydown', function(e){
        if (e.key === 'Escape') closeYouTubeModal();
    });
}

function playVideo(videoId) {
    ensureYouTubeModal();
    const iframe = document.getElementById('yt-iframe');
    // use privacy-enhanced domain and autoplay
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(videoId) + '?rel=0&autoplay=1';
    document.getElementById('yt-modal').style.display = 'flex';
    // Stop auto-rotation while video plays
    stopAutoRotate();
}

function closeYouTubeModal(){
    const iframe = document.getElementById('yt-iframe');
    if (iframe) iframe.src = '';
    const modal = document.getElementById('yt-modal');
    if (modal) modal.style.display = 'none';
}

// Toggle bookmark
function toggleBookmark(videoId) {
    const index = videoData.bookmarks.indexOf(videoId);
    if (index > -1) {
        videoData.bookmarks.splice(index, 1);
    } else {
        videoData.bookmarks.push(videoId);
    }
    
    localStorage.setItem('chinaTravelBookmarks', JSON.stringify(videoData.bookmarks));
    
    // Update UI
    const bookmarkBtn = event.currentTarget.closest('.bookmark-btn');
    bookmarkBtn.classList.toggle('bookmarked');
    bookmarkBtn.title = videoData.bookmarks.includes(videoId) ? 'Remove from bookmarks' : 'Add to bookmarks';
    
    // Show notification
    showNotification(
        videoData.bookmarks.includes(videoId) ? 'Added to bookmarks!' : 'Removed from bookmarks!',
        'success'
    );
}

// Share video
function shareVideo(videoId, title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Check out this amazing China travel video!',
            url: `https://www.youtube.com/watch?v=${videoId}`
        });
    } else {
        // Fallback: copy to clipboard
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Video link copied to clipboard!', 'success');
        });
    }
}

// Fetch YouTube videos (limited by CORS and API restrictions)
async function fetchYouTubeVideos() {
    // This is a simplified version that works within browser limitations
    // In a real implementation, you'd need a backend proxy
    
    try {
        // Try to fetch from a public API or RSS feed
        const searchTerms = ['china travel guide', 'beijing travel', 'shanghai travel', 'guilin travel', 'china street food'];
        const allVideos = [];
        
        // Simulate API calls with timeout
        for (const term of searchTerms) {
            try {
                // This would normally be an API call
                // For now, we'll enhance our fallback data
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // In a real implementation with backend support:
                // const response = await fetch(`/api/youtube-search?q=${encodeURIComponent(term)}`);
                // const data = await response.json();
                // allVideos.push(...data.items);
                
            } catch (error) {
                console.warn(`Failed to fetch videos for term: ${term}`, error);
            }
        }
        
        // Enhance fallback data with more videos
        enhanceVideoData();
        
    } catch (error) {
        console.warn('YouTube API unavailable, using fallback data');
        // Fallback data is already loaded
    }
}

// Enhance video data with more entries
function enhanceVideoData() {
    const additionalVideos = [
        {
            id: 'vM8YqBm8HhN',
            title: 'First Time in China - What You Need to Know',
            description: 'Essential tips for first-time visitors to China including cultural differences.',
            thumbnail: 'https://img.youtube.com/vi/vM8YqBm8HhN/maxresdefault.jpg',
            category: 'guide',
            duration: '16:45',
            views: '520K views',
            channel: 'Yes Theory',
            tags: ['china', 'first time', 'travel tips', 'culture']
        },
        {
            id: 'wP9xH7j4QrT',
            title: 'Shanghai Nightlife - Best Bars and Clubs',
            description: 'Exploring Shanghai\'s vibrant nightlife scene from rooftop bars to local clubs.',
            thumbnail: 'https://img.youtube.com/vi/wP9xH7j4QrT/maxresdefault.jpg',
            category: 'shanghai',
            duration: '22:30',
            views: '380K views',
            channel: 'Nathaniel Rich',
            tags: ['shanghai', 'nightlife', 'bars', 'clubs']
        },
        {
            id: 'xK5mN2p8SsW',
            title: 'Beijing Hutong Food Tour - Hidden Gems',
            description: 'Discovering authentic Beijing cuisine in traditional hutong neighborhoods.',
            thumbnail: 'https://img.youtube.com/vi/xK5mN2p8SsW/maxresdefault.jpg',
            category: 'beijing',
            duration: '19:15',
            views: '610K views',
            channel: 'Mark Wiens',
            tags: ['beijing', 'food', 'hutong', 'street food']
        }
    ];
    
    // Add new videos to fallback data
    videoData.fallbackVideos = [...videoData.fallbackVideos, ...additionalVideos];
    
    // Reload videos to show new content
    loadVideos();
    
    showNotification('New videos loaded successfully!', 'success');
}

// Utility function: debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add mobile menu styles
const mobileStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0,0,0,0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-link {
            display: block;
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .search-input {
            position: static !important;
            width: 100% !important;
            margin: 1rem 0;
        }
        
        .language-switcher select {
            position: static !important;
            margin: 1rem 0;
        }
    }
`;

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = mobileStyles;
document.head.appendChild(style);
