// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
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
        name: "Modern Villa - Makerere",
        location: "Makerere Hill, Kampala",
        price: "UGX 850,000,000",
        status: "sale",
        type: "house",
        area: "makerere",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
        ],
        features: ["4 Beds", "3 Baths", "2 Parking", "Garden", "Swimming Pool"],
        description: "Luxurious modern villa located in the prestigious Makerere Hill area. Features contemporary design with high-end finishes, spacious rooms, and beautiful garden views. Perfect for families seeking comfort and elegance.",
        coords: { lat: 0.3362, lng: 32.5665 },
        featured: true
    },
    {
        id: 2,
        name: "Commercial Building - Kikoni",
        location: "Kikoni, Kampala",
        price: "UGX 5,000,000/month",
        status: "rent",
        type: "commercial",
        area: "kikoni",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop"
        ],
        features: ["500 sqm", "Office Space", "Internet Ready", "Parking", "Security"],
        description: "Prime commercial building in Kikoni business district. Ideal for offices, retail stores, or mixed-use purposes. Excellent visibility and accessibility with modern amenities.",
        coords: { lat: 0.3476, lng: 32.5726 },
        featured: true
    },
    {
        id: 3,
        name: "Prime Land - Makerere",
        location: "Makerere University Area",
        price: "UGX 300,000,000",
        status: "sale",
        type: "land",
        area: "makerere",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
        ],
        features: ["50x100 ft", "Title Ready", "Tarmac Access", "Utilities Available"],
        description: "Excellent investment opportunity near Makerere University. Perfect for residential or commercial development. Clear title deed and all necessary approvals in place.",
        coords: { lat: 0.3315, lng: 32.5669 },
        featured: true
    },
    {
        id: 4,
        name: "Luxury Apartment - Wandegeya",
        location: "Wandegeya, Kampala",
        price: "UGX 2,500,000/month",
        status: "rent",
        type: "apartment",
        area: "wandegeya",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
        ],
        features: ["3 Beds", "2 Baths", "Balcony", "Furnished", "Security"],
        description: "Modern fully furnished apartment in Wandegeya. Close to universities and business centers. Features contemporary design and all modern amenities.",
        coords: { lat: 0.3410, lng: 32.5720 },
        featured: false
    },
    {
        id: 5,
        name: "Family Home - Mulago",
        location: "Mulago, Kampala",
        price: "UGX 650,000,000",
        status: "sale",
        type: "house",
        area: "mulago",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
        ],
        features: ["5 Beds", "3 Baths", "2 Parking", "Large Compound"],
        description: "Spacious family home in quiet Mulago neighborhood. Perfect for large families with ample space and privacy. Close to Mulago Hospital and schools.",
        coords: { lat: 0.3365, lng: 32.5835 },
        featured: false
    },
    {
        id: 6,
        name: "Student Hostel - Makerere",
        location: "Makerere, Kampala",
        price: "UGX 800,000/month",
        status: "rent",
        type: "apartment",
        area: "makerere",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop"
        ],
        features: ["1 Bed", "1 Bath", "Study Area", "Wi-Fi", "Security"],
        description: "Affordable student accommodation near Makerere University. Perfect for students with study areas and high-speed internet connectivity.",
        coords: { lat: 0.3290, lng: 32.5664 },
        featured: false
    },
    {
        id: 7,
        name: "Office Complex - Kikoni",
        location: "Kikoni Business District",
        price: "UGX 1,200,000,000",
        status: "sale",
        type: "commercial",
        area: "kikoni",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
        ],
        features: ["1000 sqm", "Modern Design", "Elevator", "Parking", "Generator"],
        description: "State-of-the-art office complex in prime Kikoni location. Features modern architecture, advanced facilities, and excellent accessibility.",
        coords: { lat: 0.3485, lng: 32.5730 },
        featured: false
    },
    {
        id: 8,
        name: "Residential Plot - Wandegeya",
        location: "Wandegeya Road",
        price: "UGX 180,000,000",
        status: "sale",
        type: "land",
        area: "wandegeya",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"
        ],
        features: ["25x50 ft", "Residential Zone", "Road Access", "Power Available"],
        description: "Perfect residential plot for building your dream home. Located in developing Wandegeya area with good infrastructure and growth potential.",
        coords: { lat: 0.3420, lng: 32.5715 },
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
                <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
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
        `<i class="fas fa-map-marker-alt"></i> ${currentProperty.location}`;
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
});

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
