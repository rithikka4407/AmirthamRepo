/* ========================================
   Admin Panel - JavaScript
   ======================================== */

let config = {};

// Load config on page load
document.addEventListener('DOMContentLoaded', function() {
    loadConfig();
    setupNavigation();
});

// Setup Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show section
            const sectionId = this.getAttribute('data-section');
            document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// Load Configuration
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        config = await response.json();
        populateForm();
        showToast('Configuration loaded successfully', 'success');
    } catch (error) {
        console.error('Error loading config:', error);
        showToast('Error loading configuration', 'error');
    }
}

// Populate Form with Config Data
function populateForm() {
    // Business Info
    document.getElementById('businessName').value = config.business?.name || '';
    document.getElementById('businessTagline').value = config.business?.tagline || '';
    document.getElementById('businessDescription').value = config.business?.description || '';
    document.getElementById('businessEstablished').value = config.business?.established || '';
    document.getElementById('businessYears').value = config.business?.yearsExperience || '';
    document.getElementById('businessRating').value = config.stats?.rating || '';
    
    // Stats
    document.getElementById('statsEvents').value = config.stats?.eventsCompleted || '';
    document.getElementById('statsMenuItems').value = config.stats?.menuItems || '';
    document.getElementById('statsClients').value = config.stats?.happyClients || '';
    document.getElementById('statsRating').value = config.stats?.rating || '';
    
    // Contact
    document.getElementById('contactPhone').value = config.contact?.phone || '';
    document.getElementById('contactPhoneDisplay').value = config.contact?.phoneDisplay || '';
    document.getElementById('contactPhone2').value = config.contact?.phone2 || '';
    document.getElementById('contactPhone2Display').value = config.contact?.phone2Display || '';
    document.getElementById('contactWhatsapp').value = config.contact?.whatsapp || '';
    document.getElementById('contactWhatsappMsg').value = config.contact?.whatsappMessage || '';
    document.getElementById('contactEmail').value = config.contact?.email || '';
    document.getElementById('contactBookingEmail').value = config.contact?.bookingEmail || '';
    
    // Address
    document.getElementById('addressStreet').value = config.address?.street || '';
    document.getElementById('addressCity').value = config.address?.city || '';
    document.getElementById('addressState').value = config.address?.state || '';
    document.getElementById('addressPincode').value = config.address?.pincode || '';
    document.getElementById('addressMapsUrl').value = config.address?.googleMapsUrl || '';
    
    // Hours
    document.getElementById('hoursWeekdays').value = config.hours?.weekdays || '';
    document.getElementById('hoursSaturday').value = config.hours?.saturday || '';
    document.getElementById('hoursSunday').value = config.hours?.sunday || '';
    
    // Social
    document.getElementById('socialFacebook').value = config.social?.facebook || '';
    document.getElementById('socialInstagram').value = config.social?.instagram || '';
    document.getElementById('socialTwitter').value = config.social?.twitter || '';
    document.getElementById('socialYoutube').value = config.social?.youtube || '';
    
    // Render dynamic sections
    renderServices();
    renderMenuItems();
    renderGallery();
    renderTestimonials();
}

// Render Services
function renderServices() {
    const container = document.getElementById('servicesContainer');
    container.innerHTML = '';
    
    config.services?.forEach((service, index) => {
        container.innerHTML += `
            <div class="card mb-3 p-3" id="service-${index}">
                <div class="row g-3">
                    <div class="col-md-6">
                        <input type="text" class="form-control" value="${service.title}" 
                               onchange="updateService(${index}, 'title', this.value)" placeholder="Service Title">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" value="${service.icon}" 
                               onchange="updateService(${index}, 'icon', this.value)" placeholder="Icon (mdi name)">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-outline-danger w-100" onclick="removeService(${index})">
                            <span class="mdi mdi-delete"></span>
                        </button>
                    </div>
                    <div class="col-12">
                        <textarea class="form-control" rows="2" 
                                  onchange="updateService(${index}, 'description', this.value)" 
                                  placeholder="Description">${service.description}</textarea>
                    </div>
                    <div class="col-md-10">
                        <input type="text" class="form-control" value="${service.features?.join(', ')}" 
                               onchange="updateServiceFeatures(${index}, this.value)" placeholder="Features (comma separated)">
                    </div>
                    <div class="col-md-2">
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="checkbox" ${service.featured ? 'checked' : ''} 
                                   onchange="updateService(${index}, 'featured', this.checked)">
                            <label class="form-check-label">Featured</label>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

function updateService(index, field, value) {
    config.services[index][field] = value;
}

function updateServiceFeatures(index, value) {
    config.services[index].features = value.split(',').map(f => f.trim());
}

function addService() {
    config.services.push({
        id: config.services.length + 1,
        title: 'New Service',
        description: 'Service description',
        icon: 'star',
        features: ['Feature 1', 'Feature 2'],
        featured: false
    });
    renderServices();
}

function removeService(index) {
    config.services.splice(index, 1);
    renderServices();
}

// Render Menu Items
function renderMenuItems() {
    const container = document.getElementById('menuContainer');
    container.innerHTML = '';
    
    config.menu?.forEach((item, index) => {
        container.innerHTML += `
            <div class="card mb-3 p-3" id="menu-${index}">
                <div class="row g-3 align-items-center">
                    <div class="col-md-3">
                        <input type="text" class="form-control" value="${item.name}" 
                               onchange="updateMenuItem(${index}, 'name', this.value)" placeholder="Item Name">
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control" value="${item.price}" 
                               onchange="updateMenuItem(${index}, 'price', parseInt(this.value))" placeholder="Price">
                    </div>
                    <div class="col-md-2">
                        <select class="form-select" onchange="updateMenuItem(${index}, 'category', this.value)">
                            <option value="starters" ${item.category === 'starters' ? 'selected' : ''}>Starters</option>
                            <option value="main" ${item.category === 'main' ? 'selected' : ''}>Main Course</option>
                            <option value="desserts" ${item.category === 'desserts' ? 'selected' : ''}>Desserts</option>
                            <option value="beverages" ${item.category === 'beverages' ? 'selected' : ''}>Beverages</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <input type="url" class="form-control" value="${item.image}" 
                               onchange="updateMenuItem(${index}, 'image', this.value)" placeholder="Image URL">
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-outline-danger" onclick="removeMenuItem(${index})">
                            <span class="mdi mdi-delete"></span>
                        </button>
                    </div>
                    <div class="col-12">
                        <input type="text" class="form-control" value="${item.description}" 
                               onchange="updateMenuItem(${index}, 'description', this.value)" placeholder="Description">
                    </div>
                </div>
            </div>
        `;
    });
}

function updateMenuItem(index, field, value) {
    config.menu[index][field] = value;
}

function addMenuItem() {
    config.menu.push({
        id: config.menu.length + 1,
        name: 'New Item',
        description: 'Item description',
        price: 0,
        category: 'main',
        image: 'https://via.placeholder.com/300'
    });
    renderMenuItems();
}

function removeMenuItem(index) {
    config.menu.splice(index, 1);
    renderMenuItems();
}

// Render Gallery
function renderGallery() {
    const container = document.getElementById('galleryContainer');
    container.innerHTML = '';
    
    config.gallery?.forEach((item, index) => {
        container.innerHTML += `
            <div class="card mb-3 p-3" id="gallery-${index}">
                <div class="row g-3 align-items-center">
                    <div class="col-md-3">
                        <input type="text" class="form-control" value="${item.title}" 
                               onchange="updateGallery(${index}, 'title', this.value)" placeholder="Image Title">
                    </div>
                    <div class="col-md-5">
                        <input type="url" class="form-control" value="${item.image}" 
                               onchange="updateGallery(${index}, 'image', this.value)" placeholder="Image URL">
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" onchange="updateGallery(${index}, 'size', this.value)">
                            <option value="normal" ${item.size === 'normal' ? 'selected' : ''}>Normal</option>
                            <option value="large" ${item.size === 'large' ? 'selected' : ''}>Large</option>
                            <option value="tall" ${item.size === 'tall' ? 'selected' : ''}>Tall</option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-outline-danger" onclick="removeGallery(${index})">
                            <span class="mdi mdi-delete"></span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function updateGallery(index, field, value) {
    config.gallery[index][field] = value;
}

function addGalleryItem() {
    config.gallery.push({
        id: config.gallery.length + 1,
        title: 'New Image',
        image: 'https://via.placeholder.com/400',
        size: 'normal'
    });
    renderGallery();
}

function removeGallery(index) {
    config.gallery.splice(index, 1);
    renderGallery();
}

// Render Testimonials
function renderTestimonials() {
    const container = document.getElementById('testimonialsContainer');
    container.innerHTML = '';
    
    config.testimonials?.forEach((item, index) => {
        container.innerHTML += `
            <div class="card mb-3 p-3" id="testimonial-${index}">
                <div class="row g-3">
                    <div class="col-md-4">
                        <input type="text" class="form-control" value="${item.name}" 
                               onchange="updateTestimonial(${index}, 'name', this.value)" placeholder="Customer Name">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" value="${item.event}" 
                               onchange="updateTestimonial(${index}, 'event', this.value)" placeholder="Event Type">
                    </div>
                    <div class="col-md-3">
                        <input type="number" class="form-control" value="${item.rating}" step="0.5" max="5"
                               onchange="updateTestimonial(${index}, 'rating', parseFloat(this.value))" placeholder="Rating">
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-outline-danger" onclick="removeTestimonial(${index})">
                            <span class="mdi mdi-delete"></span>
                        </button>
                    </div>
                    <div class="col-md-8">
                        <textarea class="form-control" rows="2" 
                                  onchange="updateTestimonial(${index}, 'text', this.value)" 
                                  placeholder="Review text">${item.text}</textarea>
                    </div>
                    <div class="col-md-4">
                        <input type="url" class="form-control" value="${item.image}" 
                               onchange="updateTestimonial(${index}, 'image', this.value)" placeholder="Photo URL">
                    </div>
                </div>
            </div>
        `;
    });
}

function updateTestimonial(index, field, value) {
    config.testimonials[index][field] = value;
}

function addTestimonial() {
    config.testimonials.push({
        id: config.testimonials.length + 1,
        name: 'New Customer',
        event: 'Event Type, 2024',
        rating: 5,
        text: 'Customer review text...',
        image: 'https://via.placeholder.com/100'
    });
    renderTestimonials();
}

function removeTestimonial(index) {
    config.testimonials.splice(index, 1);
    renderTestimonials();
}

// Save Configuration
function saveConfig() {
    // Update config from form
    config.business = {
        name: document.getElementById('businessName').value,
        tagline: document.getElementById('businessTagline').value,
        description: document.getElementById('businessDescription').value,
        established: document.getElementById('businessEstablished').value,
        yearsExperience: parseInt(document.getElementById('businessYears').value) || 0
    };
    
    config.stats = {
        eventsCompleted: parseInt(document.getElementById('statsEvents').value) || 0,
        menuItems: parseInt(document.getElementById('statsMenuItems').value) || 0,
        happyClients: parseInt(document.getElementById('statsClients').value) || 0,
        rating: parseFloat(document.getElementById('statsRating').value) || 0
    };
    
    config.contact = {
        phone: document.getElementById('contactPhone').value,
        phoneDisplay: document.getElementById('contactPhoneDisplay').value,
        phone2: document.getElementById('contactPhone2').value,
        phone2Display: document.getElementById('contactPhone2Display').value,
        whatsapp: document.getElementById('contactWhatsapp').value,
        whatsappMessage: document.getElementById('contactWhatsappMsg').value,
        email: document.getElementById('contactEmail').value,
        bookingEmail: document.getElementById('contactBookingEmail').value
    };
    
    config.address = {
        street: document.getElementById('addressStreet').value,
        city: document.getElementById('addressCity').value,
        state: document.getElementById('addressState').value,
        pincode: document.getElementById('addressPincode').value,
        country: 'India',
        googleMapsUrl: document.getElementById('addressMapsUrl').value
    };
    
    config.hours = {
        weekdays: document.getElementById('hoursWeekdays').value,
        saturday: document.getElementById('hoursSaturday').value,
        sunday: document.getElementById('hoursSunday').value
    };
    
    config.social = {
        facebook: document.getElementById('socialFacebook').value,
        instagram: document.getElementById('socialInstagram').value,
        twitter: document.getElementById('socialTwitter').value,
        youtube: document.getElementById('socialYoutube').value
    };
    
    // For static hosting, download as file
    downloadConfig();
    
    showToast('Configuration saved! Upload config.json to your server.', 'success');
}

// Download config as JSON file
function downloadConfig() {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'config.json');
    linkElement.click();
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const container = document.querySelector('.toast-container');
    const toastId = 'toast-' + Date.now();
    
    const bgClass = type === 'success' ? 'bg-success' : 'bg-danger';
    const icon = type === 'success' ? 'check-circle' : 'alert-circle';
    
    container.innerHTML += `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <span class="mdi mdi-${icon} me-2"></span>${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
    
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}
