# Smart Space App - Masaka District Implementation Plan

This document outlines the changes needed to update the Smart Space app to focus on land and property evaluation in Masaka district instead of Makerere Kikoni.

## 1. HTML Changes

### Location References
Update all references to "Makerere Kikoni" to "Masaka district" in the HTML file:

- **Hero Section (line 40)**: 
  - From: "Expert valuation services in Makerere Kikoni and surrounding areas"
  - To: "Expert valuation services in Masaka district and surrounding areas"

- **About Section (line 54)**:
  - From: "Smart Space is a leading property evaluation company based in Makerere Kikoni, Uganda."
  - To: "Smart Space is a leading property evaluation company based in Masaka district, Uganda."

- **Contact Section (line 299)**:
  - From: "Makerere Kikoni, Kampala, Uganda"
  - To: "Masaka Town, Masaka district, Uganda"

- **Footer (line 360)**:
  - From: "Professional land and property evaluation services in Makerere Kikoni."
  - To: "Professional land and property evaluation services in Masaka district."

- **Footer (line 389)**:
  - From: "Makerere Kikoni, Kampala"
  - To: "Masaka Town, Masaka district"

### Property Type Filter
Add "agricultural" as a new property type option in the typeFilter dropdown (line 189):

```html
<select id="typeFilter">
    <option value="">All Types</option>
    <option value="house">Houses</option>
    <option value="apartment">Apartments</option>
    <option value="commercial">Commercial</option>
    <option value="land">Land</option>
    <option value="agricultural">Agricultural Land</option>
</select>
```

### Location Filter Options
Update the location filter options (lines 202-205) to include Masaka areas:

```html
<select id="locationFilter">
    <option value="">All Locations</option>
    <option value="masaka_town">Masaka Town</option>
    <option value="nyendo">Nyendo</option>
    <option value="kyabakuza">Kyabakuza</option>
    <option value="kijjabwemi">Kijjabwemi</option>
    <option value="kimaanya">Kimaanya</option>
</select>
```

## 2. JavaScript Changes

### Property Data
Update the property data array in script.js to include properties in Masaka district with accurate coordinates:

```javascript
const properties = [
    {
        id: 1,
        name: "Modern Villa - Masaka Town",
        location: "Masaka Town, Masaka district",
        price: "UGX 750,000,000",
        status: "sale",
        type: "house",
        area: "masaka_town",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
        ],
        features: ["4 Beds", "3 Baths", "2 Parking", "Garden", "Swimming Pool"],
        description: "Luxurious modern villa located in the heart of Masaka Town. Features contemporary design with high-end finishes, spacious rooms, and beautiful garden views. Perfect for families seeking comfort and elegance.",
        coords: { lat: -0.3333, lng: 31.7333 },
        featured: true
    },
    {
        id: 2,
        name: "Commercial Building - Nyendo",
        location: "Nyendo, Masaka district",
        price: "UGX 4,500,000/month",
        status: "rent",
        type: "commercial",
        area: "nyendo",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop"
        ],
        features: ["500 sqm", "Office Space", "Internet Ready", "Parking", "Security"],
        description: "Prime commercial building in Nyendo business district. Ideal for offices, retail stores, or mixed-use purposes. Excellent visibility and accessibility with modern amenities.",
        coords: { lat: -0.3450, lng: 31.7200 },
        featured: true
    },
    {
        id: 3,
        name: "Prime Land - Kyabakuza",
        location: "Kyabakuza, Masaka district",
        price: "UGX 250,000,000",
        status: "sale",
        type: "land",
        area: "kyabakuza",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
        ],
        features: ["50x100 ft", "Title Ready", "Tarmac Access", "Utilities Available"],
        description: "Excellent investment opportunity in the developing Kyabakuza area. Perfect for residential or commercial development. Clear title deed and all necessary approvals in place.",
        coords: { lat: -0.3250, lng: 31.7500 },
        featured: true
    },
    {
        id: 4,
        name: "Luxury Apartment - Masaka Town",
        location: "Masaka Town, Masaka district",
        price: "UGX 2,000,000/month",
        status: "rent",
        type: "apartment",
        area: "masaka_town",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
        ],
        features: ["3 Beds", "2 Baths", "Balcony", "Furnished", "Security"],
        description: "Modern fully furnished apartment in Masaka Town. Close to shopping centers and business districts. Features contemporary design and all modern amenities.",
        coords: { lat: -0.3340, lng: 31.7350 },
        featured: false
    },
    {
        id: 5,
        name: "Family Home - Kijjabwemi",
        location: "Kijjabwemi, Masaka district",
        price: "UGX 550,000,000",
        status: "sale",
        type: "house",
        area: "kijjabwemi",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
        ],
        features: ["5 Beds", "3 Baths", "2 Parking", "Large Compound"],
        description: "Spacious family home in quiet Kijjabwemi neighborhood. Perfect for large families with ample space and privacy. Close to schools and local amenities.",
        coords: { lat: -0.3150, lng: 31.7400 },
        featured: false
    },
    {
        id: 6,
        name: "Agricultural Land - Nyendo",
        location: "Nyendo, Masaka district",
        price: "UGX 120,000,000",
        status: "sale",
        type: "agricultural",
        area: "nyendo",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
        ],
        features: ["5 Acres", "Fertile Soil", "Water Source", "Road Access"],
        description: "Fertile agricultural land perfect for farming in Nyendo. The land has good access to water sources and is suitable for various crops including coffee, maize, and vegetables.",
        coords: { lat: -0.3470, lng: 31.7180 },
        featured: true
    },
    {
        id: 7,
        name: "Office Complex - Masaka Town",
        location: "Masaka Town Business District",
        price: "UGX 1,000,000,000",
        status: "sale",
        type: "commercial",
        area: "masaka_town",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
        ],
        features: ["1000 sqm", "Modern Design", "Elevator", "Parking", "Generator"],
        description: "State-of-the-art office complex in prime Masaka Town location. Features modern architecture, advanced facilities, and excellent accessibility.",
        coords: { lat: -0.3320, lng: 31.7340 },
        featured: false
    },
    {
        id: 8,
        name: "Residential Plot - Kimaanya",
        location: "Kimaanya, Masaka district",
        price: "UGX 150,000,000",
        status: "sale",
        type: "land",
        area: "kimaanya",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"
        ],
        features: ["25x50 ft", "Residential Zone", "Road Access", "Power Available"],
        description: "Perfect residential plot for building your dream home. Located in developing Kimaanya area with good infrastructure and growth potential.",
        coords: { lat: -0.3400, lng: 31.7450 },
        featured: false
    },
    {
        id: 9,
        name: "Coffee Plantation - Kyabakuza",
        location: "Kyabakuza, Masaka district",
        price: "UGX 350,000,000",
        status: "sale",
        type: "agricultural",
        area: "kyabakuza",
        image: "https://images.unsplash.com/photo-1559629819-638a8f0a4303?w=400&h=250&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1559629819-638a8f0a4303?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&h=600&fit=crop"
        ],
        features: ["10 Acres", "Mature Coffee Trees", "Processing Facility", "Caretaker House"],
        description: "Established coffee plantation with mature Robusta coffee trees. Includes a small processing facility and caretaker's house. Great investment opportunity in Uganda's coffee sector.",
        coords: { lat: -0.3260, lng: 31.7520 },
        featured: true
    }
];
```

### Feature Icon Function
Update the getFeatureIcon function to handle agricultural features:

```javascript
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
```

## 3. Google Maps Integration

The Google Maps integration is already implemented in the code. The property coordinates have been updated to reflect locations in Masaka district.

## 4. Testing

After implementing these changes, the application should be tested to ensure:

1. All location references have been updated correctly
2. The property data displays correctly with the new Masaka district locations
3. The location filter works properly with the new Masaka areas
4. The agricultural property type is displayed correctly
5. The Google Maps integration works correctly with the new coordinates

## Implementation Steps

1. Update the HTML file with the location reference changes
2. Add the agricultural property type to the typeFilter dropdown
3. Update the location filter options to include Masaka areas
4. Replace the property data array in script.js with the new Masaka district properties
5. Update the getFeatureIcon function to handle agricultural features
6. Test the application to ensure all features work correctly