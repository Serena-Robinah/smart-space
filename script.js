// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Sample land property data
const landProperties = [
    {
        id: 1,
        name: "Prime Agricultural Land",
        location: "Nyendo, Masaka",
        price: "UGX 150M",
        type: "agricultural",
        status: "For Sale",
        size: "5 Acres",
        features: [
            "Fertile Black Cotton Soil",
            "Natural Water Spring",
            "All-Weather Road Access",
            "3-Phase Power Connection",
            "Gentle Slope (5%)",
            "No Land Disputes",
            "Clean Title Deed",
            "Suitable for Mixed Farming"
        ],
        description: "Premium agricultural land with rich soil composition perfect for both crop farming and animal husbandry. Features natural water sources and excellent drainage. Recent soil tests confirm high fertility levels. Fully surveyed with beacons in place.",
        terrainType: "Gently Sloping",
        soilType: "Black Cotton",
        waterSources: ["Natural Spring", "Seasonal Stream"],
        image: "assets/land1.jpeg"
    },
    {
        id: 2,
        name: "Commercial Plot",
        location: "Masaka Town Center",
        price: "UGX 300M",
        type: "commercial",
        status: "For Sale",
        size: "0.5 Acres",
        features: [
            "Prime Corner Plot",
            "40m Main Road Frontage",
            "Commercial Zone Approved",
            "Water & Electricity Connected",
            "High Traffic Location",
            "Paved Access Road",
            "Ready Building Permits",
            "Suitable for Multi-story"
        ],
        description: "Strategic commercial plot in Masaka's prime business district. Approved for commercial development up to 4 floors. All utilities connected and building permits pre-approved. Perfect for retail, office space, or mixed-use development.",
        zoning: "C1 Commercial",
        roadFrontage: "40 meters",
        buildingRestrictions: "Up to 4 floors",
        image: "assets/land2.jpg"
    },
    {
        id: 3,
        name: "Residential Development Land",
        location: "Kyabakuza",
        price: "UGX 200M",
        type: "residential",
        status: "For Development",
        size: "2 Acres",
        features: [
            "Gated Community",
            "Residential Zoning",
            "Schools Within 1KM",
            "Underground Utilities",
            "Perimeter Wall Ready",
            "Flat Terrain",
            "Ready for Construction",
            "Security Post"
        ],
        description: "Premium residential plot in an upcoming gated community. Perfect for luxury home development. All infrastructure work completed including underground power lines and water connections. Security features in place.",
        plotRatio: "40% maximum coverage",
        soilBearing: "Good for foundations",
        securityFeatures: ["Perimeter Wall", "Guard House"],
        image: "assets/WhatsApp Image 2025-07-30 at 10.48.28_6a5236ef.jpg"
    },
    {
        id: 4,
        name: "Industrial Land Plot",
        location: "Kijjabwemi Industrial Area",
        price: "UGX 450M",
        type: "industrial",
        status: "For Sale",
        size: "3 Acres",
        features: [
            "Industrial Zone Approved",
            "Heavy-Duty Power Line",
            "Large Water Storage",
            "Waste Management System",
            "Loading Bays Area",
            "Staff Housing Provision",
            "Environmental Clearance",
            "Truck Access Route"
        ],
        description: "Strategic industrial plot with all necessary approvals and infrastructure for immediate factory setup. Features include heavy-duty power connection, waste management systems, and excellent logistics access.",
        zoning: "Industrial Zone",
        powerSupply: "100KVA Dedicated",
        environmentalClearance: "Approved",
        image: "assets/WhatsApp Image 2025-07-30 at 10.52.36_6cdc40c4.jpg"
    },
    {
        id: 5,
        name: "Mixed-Use Development Land",
        location: "Kimaanya",
        price: "UGX 280M",
        type: "commercial",
        status: "For Development",
        size: "1.5 Acres",
        features: [
            "Mixed-Use Zoning",
            "Corner Position",
            "Two Road Access",
            "High Population Density",
            "Public Transport Hub",
            "Market Proximity",
            "Development Ready",
            "Multiple Entry Points"
        ],
        description: "Versatile plot suitable for mixed-use development combining commercial and residential spaces. Located in a rapidly developing area with high foot traffic and excellent connectivity.",
        zoning: "Mixed Commercial-Residential",
        accessibility: "Dual Road Access",
        marketPotential: "High Growth Area",
        image: "assets/WhatsApp Image 2025-07-30 at 10.56.02_edcb7ec3.jpg"
    }
];

// Function to create property card HTML
function createPropertyCard(property) {
    // Get the first 4 features to display on the card
    const displayFeatures = property.features.slice(0, 4);
    
    return `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.name}" loading="lazy">
                <div class="property-status">${property.status}</div>
            </div>
            <div class="property-info">
                <h3>${property.name}</h3>
                <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <p class="property-price">${property.price}</p>
                <div class="property-key-details">
                    <span><i class="fas fa-ruler-combined"></i> ${property.size}</span>
                    <span><i class="fas fa-map"></i> ${property.type}</span>
                </div>
                <div class="property-features">
                    ${displayFeatures.map(feature => `
                        <span><i class="fas fa-check"></i> ${feature}</span>
                    `).join('')}
                </div>
                <button class="view-details-btn">View Details</button>
            </div>
        </div>
    `;
}

// Function to populate featured properties
function populateFeaturedProperties() {
    const featuredContainer = document.getElementById('featuredProperties');
    const allPropertiesGrid = document.getElementById('allPropertiesGrid');
    
    if (featuredContainer) {
        // Create property cards for featured properties
        featuredContainer.innerHTML = landProperties
            .map(property => createPropertyCard(property))
            .join('');
    }

    // Also populate all properties grid if it exists
    if (allPropertiesGrid) {
        allPropertiesGrid.innerHTML = landProperties
            .map(property => createPropertyCard(property))
            .join('');
    }

    // Add event listeners for filters
    const typeFilter = document.getElementById('typeFilter');
    const statusFilter = document.getElementById('statusFilter');
    const locationFilter = document.getElementById('locationFilter');
    const searchInput = document.getElementById('searchInput');
    const viewAllBtn = document.getElementById('viewAllBtn');

    function filterProperties() {
        const typeValue = typeFilter.value.toLowerCase();
        const statusValue = statusFilter.value.toLowerCase();
        const locationValue = locationFilter.value.toLowerCase();
        const searchValue = searchInput.value.toLowerCase();

        const filteredProperties = landProperties.filter(property => {
            const matchesType = !typeValue || property.type.toLowerCase() === typeValue;
            const matchesStatus = !statusValue || property.status.toLowerCase().includes(statusValue);
            const matchesLocation = !locationValue || property.location.toLowerCase().includes(locationValue.replace('_', ' '));
            const matchesSearch = !searchValue || 
                property.name.toLowerCase().includes(searchValue) ||
                property.description.toLowerCase().includes(searchValue) ||
                property.location.toLowerCase().includes(searchValue);

            return matchesType && matchesStatus && matchesLocation && matchesSearch;
        });

        // Update featured properties
        featuredContainer.innerHTML = filteredProperties
            .map(property => createPropertyCard(property))
            .join('');
    }

    // Add event listeners for filters
    typeFilter.addEventListener('change', filterProperties);
    statusFilter.addEventListener('change', filterProperties);
    locationFilter.addEventListener('change', filterProperties);
    searchInput.addEventListener('input', filterProperties);

    // View All button functionality
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            const modal = document.getElementById('allPropertiesModal');
            if (modal) {
                modal.style.display = 'block';
            }
        });
    }
}

// Function to show property details
function showPropertyDetails(property) {
    const modal = document.getElementById('propertyDetailModal');
    const title = document.getElementById('propertyDetailTitle');
    const img = document.getElementById('propertyDetailImg');
    const status = document.getElementById('propertyDetailStatus');
    const name = document.getElementById('propertyDetailName');
    const location = document.getElementById('propertyDetailLocation');
    const price = document.getElementById('propertyDetailPrice');
    const features = document.getElementById('propertyDetailFeatures');
    const description = document.getElementById('propertyDetailDescription');

    title.textContent = property.name;
    img.src = property.image;
    status.textContent = property.status;
    name.textContent = property.name;
    location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${property.location}`;
    price.textContent = property.price;
    
    features.innerHTML = property.features
        .map(feature => `<span><i class="fas fa-check"></i> ${feature}</span>`)
        .join('');
    
    description.innerHTML = `<h4>Description</h4><p>${property.description}</p>`;
    
    modal.style.display = 'block';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Populate featured properties
    populateFeaturedProperties();
    
    // Property card click handlers
    document.getElementById('featuredProperties').addEventListener('click', function(e) {
        const propertyCard = e.target.closest('.property-card');
        if (propertyCard) {
            const propertyId = parseInt(propertyCard.dataset.id);
            const property = landProperties.find(p => p.id === propertyId);
            if (property) {
                showPropertyDetails(property);
            }
        }
    });

    // Close modal handlers
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#FFFFFF';
        navbar.style.backdropFilter = 'none';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.3,
    rootMargin: '-70px 0px -70px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current link
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !service || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you! Your message has been sent. We will contact you soon.', 'success');
    contactForm.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .nav-link.active {
        color: #FFD700 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature, .service-card, .property-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Property card hover effects
const propertyCards = document.querySelectorAll('.property-card');
propertyCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card click effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('h3').textContent;
        showNotification(`Contact us for ${serviceName} services!`, 'success');
    });
});

// Lazy loading simulation for property images
const propertyImages = document.querySelectorAll('.property-image');
propertyImages.forEach((img, index) => {
    setTimeout(() => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, index * 200);
});

// Property Data
const properties = [
    {
        id: 1,
        name: "Prime Agricultural Land",
        location: "Nyendo, Masaka district",
        price: "UGX 150M",
        status: "sale",
        type: "agricultural",
        area: "nyendo",
        image: "assets/land1.jpeg",
        gallery: [
            "assets/land1.jpeg"
        ],
        features: [
            "5 Acres",
            "Fertile Black Cotton Soil",
            "Natural Water Spring",
            "All-Weather Road Access"
        ],
        description: "Premium agricultural land with rich soil composition perfect for both crop farming and animal husbandry. Features natural water sources and excellent drainage. Recent soil tests confirm high fertility levels.",
        coords: { lat: -0.3333, lng: 31.7333 },
        featured: true
    },
    {
        id: 2,
        name: "Commercial Plot",
        location: "Masaka Town Center",
        price: "UGX 300M",
        status: "sale",
        type: "commercial",
        area: "masaka_town",
        image: "assets/land2.jpg",
        gallery: [
            "assets/land2.jpg"
        ],
        features: [
            "0.5 Acres",
            "Prime Corner Plot",
            "40m Main Road Frontage",
            "Commercial Zone Approved"
        ],
        description: "Strategic commercial plot in Masaka's prime business district. Approved for commercial development up to 4 floors. All utilities connected and building permits pre-approved.",
        coords: { lat: -0.3450, lng: 31.7200 },
        featured: true
    },
    {
        id: 3,
        name: "Residential Development Land",
        location: "Kyabakuza, Masaka district",
        price: "UGX 200M",
        status: "development",
        type: "residential",
        area: "kyabakuza",
        image: "assets/a1.jpg",
        gallery: [
            "assets/a1.jpg"
        ],
        features: [
            "2 Acres",
            "Residential Zoning",
            "Schools Within 1KM",
            "Underground Utilities"
        ],
        description: "Premium residential plot in an upcoming gated community. Perfect for luxury home development. All infrastructure work completed including underground power lines.",
        coords: { lat: -0.3250, lng: 31.7500 },
        featured: true
    },
    {
        id: 4,
        name: "Industrial Land Plot",
        location: "Kijjabwemi Industrial Area",
        price: "UGX 450M",
        status: "sale",
        type: "industrial",
        area: "kijjabwemi",
        image: "assets/land2.jpg",
        gallery: [
            "assets/land2.jpg"
        ],
        features: [
            "3 Acres",
            "Industrial Zone Approved",
            "Heavy-Duty Power Line",
            "Waste Management System"
        ],
        description: "Strategic industrial plot with all necessary approvals and infrastructure for immediate factory setup. Features include heavy-duty power connection.",
        coords: { lat: -0.3340, lng: 31.7350 },
        featured: false
    },
    {
        id: 5,
        name: "Mixed-Use Development Land",
        location: "Kimaanya",
        price: "UGX 280M",
        status: "development",
        type: "commercial",
        area: "kimaanya",
        image: "assets/land1.jpeg",
        gallery: [
            "assets/land1.jpeg"
        ],
        features: [
            "1.5 Acres",
            "Mixed-Use Zoning",
            "Two Road Access",
            "High Population Area"
        ],
        description: "Versatile plot suitable for mixed-use development combining commercial and residential spaces. Located in a rapidly developing area with high foot traffic.",
        coords: { lat: -0.3150, lng: 31.7400 },
        featured: false
    }
];

let currentProperty = null;
let propertyMap = null;

// Load Featured Properties
function loadFeaturedProperties() {
    const featuredContainer = document.getElementById('featuredProperties');
    const featuredProps = properties.filter(p => p.featured);
    
    featuredContainer.innerHTML = featuredProps.map(property => createPropertyCard(property)).join('');
}

// Load All Properties
function loadAllProperties() {
    const allContainer = document.getElementById('allPropertiesGrid');
    allContainer.innerHTML = properties.map(property => createPropertyCard(property)).join('');
}

// Create Property Card HTML
function createPropertyCard(property) {
    return `
        <div class="property-card" onclick="openPropertyDetail(${property.id})">
            <div class="property-image">
                <img src="${property.image}" alt="${property.name}" loading="lazy">
                <div class="property-status">${property.status === 'sale' ? 'For Sale' : 'For Rent'}</div>
            </div>
            <div class="property-info">
                <h3>${property.name}</h3>
                <p class="property-location" onclick="showLocationMap(${property.id}, event)" style="cursor: pointer;"><i class="fas fa-map-marker-alt"></i> ${property.location} <span style="font-size: 0.8em; color: #FFD700;">(tap to view map)</span></p>
                <p class="property-price">${property.price}</p>
                <div class="property-features">
                    ${property.features.slice(0, 3).map(feature => 
                        `<span><i class="fas fa-${getFeatureIcon(feature)}"></i> ${feature}</span>`
                    ).join('')}
                </div>
            </div>
            <button class="view-details-btn">View Details</button>
        </div>
    `;
}

// Get Feature Icon
function getFeatureIcon(feature) {
    if (feature.includes('Bed')) return 'bed';
    if (feature.includes('Bath')) return 'bath';
    if (feature.includes('Parking')) return 'car';
    if (feature.includes('sqm') || feature.includes('ft')) return 'expand';
    if (feature.includes('Wi-Fi') || feature.includes('Internet')) return 'wifi';
    if (feature.includes('Security')) return 'shield-alt';
    if (feature.includes('Garden')) return 'tree';
    if (feature.includes('Pool')) return 'swimming-pool';
    if (feature.includes('Acres')) return 'mountain';
    if (feature.includes('Fertile') || feature.includes('Soil')) return 'seedling';
    if (feature.includes('Water')) return 'tint';
    if (feature.includes('Coffee')) return 'mug-hot';
    return 'check';
}

// Open Property Detail Modal
function openPropertyDetail(propertyId) {
    currentProperty = properties.find(p => p.id === propertyId);
    if (!currentProperty) return;
    
    // Populate modal content
    document.getElementById('propertyDetailTitle').textContent = currentProperty.name;
    document.getElementById('propertyDetailImg').src = currentProperty.gallery[0];
    document.getElementById('propertyDetailImg').alt = currentProperty.name;
    document.getElementById('propertyDetailStatus').textContent = 
        currentProperty.status === 'sale' ? 'For Sale' : 'For Rent';
    document.getElementById('propertyDetailName').textContent = currentProperty.name;
    document.getElementById('propertyDetailLocation').innerHTML =
        `<i class="fas fa-map-marker-alt"></i> <span onclick="showLocationMap(${currentProperty.id}, event)" style="cursor: pointer;">${currentProperty.location} <span style="font-size: 0.8em; color: #FFD700;">(tap to view map)</span></span>`;
    document.getElementById('propertyDetailPrice').textContent = currentProperty.price;
    
    // Features
    document.getElementById('propertyDetailFeatures').innerHTML = 
        currentProperty.features.map(feature => 
            `<span><i class="fas fa-${getFeatureIcon(feature)}"></i> ${feature}</span>`
        ).join('');
    
    // Description
    document.getElementById('propertyDetailDescription').innerHTML = `
        <h4>Description</h4>
        <p>${currentProperty.description}</p>
    `;
    
    // Gallery
    const gallery = document.getElementById('propertyGallery');
    gallery.innerHTML = currentProperty.gallery.map((img, index) => `
        <div class="gallery-image ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
            <img src="${img}" alt="Property Image">
        </div>
    `).join('');
    
    // Show modal
    document.getElementById('propertyDetailModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Load map
    setTimeout(() => initPropertyMap(), 300);
}

// Change Main Image
function changeMainImage(imageSrc, element) {
    document.getElementById('propertyDetailImg').src = imageSrc;
    document.querySelectorAll('.gallery-image').forEach(img => img.classList.remove('active'));
    element.classList.add('active');
}

// Initialize Property Map
function initPropertyMap() {
    if (!currentProperty || !currentProperty.coords) return;
    
    const mapElement = document.getElementById('propertyMap');
    if (!mapElement) return;
    
    propertyMap = new google.maps.Map(mapElement, {
        center: currentProperty.coords,
        zoom: 15,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
    
    new google.maps.Marker({
        position: currentProperty.coords,
        map: propertyMap,
        title: currentProperty.name,
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#FFD700">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 40)
        }
    });
}

// Property Actions
function handleBuyProperty() {
    showNotification(`Purchase inquiry sent for ${currentProperty.name}. Our team will contact you within 24 hours.`, 'success');
    closePropertyDetail();
}

function handleContactAgent() {
    showNotification(`Agent contact request sent for ${currentProperty.name}. You will be contacted shortly.`, 'success');
    closePropertyDetail();
}

function handleScheduleViewing() {
    showNotification(`Viewing request submitted for ${currentProperty.name}. We'll call to schedule your visit.`, 'success');
    closePropertyDetail();
}

// Close Property Detail Modal
function closePropertyDetail() {
    document.getElementById('propertyDetailModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentProperty = null;
    if (propertyMap) {
        propertyMap = null;
    }
}

// Property Filtering
function filterProperties() {
    const typeFilter = document.getElementById('typeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    let filteredProperties = properties.filter(property => {
        const matchesType = !typeFilter || property.type === typeFilter;
        const matchesStatus = !statusFilter || property.status === statusFilter;
        const matchesLocation = !locationFilter || property.area === locationFilter;
        const matchesSearch = !searchInput || 
            property.name.toLowerCase().includes(searchInput) ||
            property.location.toLowerCase().includes(searchInput) ||
            property.description.toLowerCase().includes(searchInput);
        
        return matchesType && matchesStatus && matchesLocation && matchesSearch;
    });
    
    const allContainer = document.getElementById('allPropertiesGrid');
    if (filteredProperties.length === 0) {
        allContainer.innerHTML = '<p class="no-results">No properties found matching your criteria.</p>';
    } else {
        allContainer.innerHTML = filteredProperties.map(property => createPropertyCard(property)).join('');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Load properties
    loadFeaturedProperties();
    loadAllProperties();
    
    // Modal event listeners
    document.getElementById('viewAllBtn').addEventListener('click', () => {
        document.getElementById('allPropertiesModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('allPropertiesModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    document.getElementById('closePropertyDetail').addEventListener('click', closePropertyDetail);
    
    // Property action buttons
    document.getElementById('buyPropertyBtn').addEventListener('click', handleBuyProperty);
    document.getElementById('contactPropertyBtn').addEventListener('click', handleContactAgent);
    document.getElementById('scheduleViewingBtn').addEventListener('click', handleScheduleViewing);
    
    // Filter event listeners
    document.getElementById('typeFilter').addEventListener('change', filterProperties);
    document.getElementById('statusFilter').addEventListener('change', filterProperties);
    document.getElementById('locationFilter').addEventListener('change', filterProperties);
    document.getElementById('searchInput').addEventListener('input', filterProperties);
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const allModal = document.getElementById('allPropertiesModal');
        const detailModal = document.getElementById('propertyDetailModal');
        
        if (e.target === allModal) {
            allModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === detailModal) {
            closePropertyDetail();
        }
    });
    
    // Add initial animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in');
        }
    }, 300);
    
    // Initialize scroll animations
    animateOnScroll();
    
    console.log('Smart Space website loaded successfully!');
    
    // Create map modal
    createMapModal();
    
    // Add CSS for map modal
    const mapModalStyle = document.createElement('style');
    mapModalStyle.textContent = `
        #mapModal {
            display: none;
            position: fixed;
            z-index: 10001;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            animation: fadeIn 0.3s ease;
        }
        
        #mapModal .modal-content {
            background-color: var(--white);
            margin: 5% auto;
            padding: 0;
            border-radius: 15px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
        }
        
        #mapModal .modal-header {
            background: var(--primary-gold);
            color: var(--white);
            padding: 1.5rem 2rem;
            border-radius: 15px 15px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        #mapModal .modal-body {
            padding: 2rem;
        }
        
        #locationMap {
            height: 400px;
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
        }
    `;
    document.head.appendChild(mapModalStyle);
});

// Create Map Modal
function createMapModal() {
    // Check if modal already exists
    if (document.getElementById('mapModal')) return;
    
    const mapModal = document.createElement('div');
    mapModal.id = 'mapModal';
    mapModal.className = 'modal';
    mapModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="mapModalTitle">Location Map</h2>
                <span class="close" id="closeMapModal">&times;</span>
            </div>
            <div class="modal-body">
                <div id="locationMap" style="height: 400px; width: 100%;"></div>
            </div>
        </div>
    `;
    document.body.appendChild(mapModal);
    
    // Close map modal
    document.getElementById('closeMapModal').addEventListener('click', () => {
        document.getElementById('mapModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close on outside click
    window.addEventListener('click', (e) => {
        const mapModal = document.getElementById('mapModal');
        if (e.target === mapModal) {
            mapModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Show Location Map
function showLocationMap(propertyId, event) {
    // Prevent the click from bubbling up to the property card
    if (event) {
        event.stopPropagation();
    }
    
    console.log('showLocationMap called for property ID:', propertyId);
    
    // Find the property
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.coords) {
        console.error('Property not found or missing coordinates:', propertyId);
        return;
    }
    
    console.log('Property found:', property.name, 'with coords:', property.coords);
    
    // Create map modal if it doesn't exist
    if (!document.getElementById('mapModal')) {
        console.log('Creating new map modal');
        createMapModal();
    }
    
    // Set the modal title
    document.getElementById('mapModalTitle').textContent = `Location: ${property.location}`;
    
    // Show the modal
    const mapModal = document.getElementById('mapModal');
    mapModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    console.log('Map modal displayed');
    
    // Initialize the map with a slight delay to ensure the modal is visible
    setTimeout(() => {
        const mapElement = document.getElementById('locationMap');
        if (!mapElement) {
            console.error('Map element not found');
            return;
        }
        
        console.log('Initializing map in element:', mapElement);
        
        try {
            const locationMap = new google.maps.Map(mapElement, {
                center: property.coords,
                zoom: 15,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }
                ]
            });
            
            // Create marker
            new google.maps.Marker({
                position: property.coords,
                map: locationMap,
                title: property.name,
                icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#FFD700">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                    `),
                    scaledSize: new google.maps.Size(40, 40)
                }
            });
            
            console.log('Map initialized successfully');
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    }, 500); // Increased timeout to ensure modal is fully visible
}

// Performance optimization: Throttle scroll events
let ticking = false;
function throttleScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            animateOnScroll();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('DOMContentLoaded', () => {
  createMapModal(); // Ensures the modal is available before any button is clicked
});


window.addEventListener('scroll', throttleScroll);

// Button click animations
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
