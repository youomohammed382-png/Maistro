// ==================== WhatsApp Form Integration ====================
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        area: document.getElementById('area').value,
        floor: document.getElementById('floor').value,
        apartment: document.getElementById('apartment').value,
        designType: document.getElementById('designType').value,
        floorType: document.getElementById('floor-type').value,
        electricity: document.getElementById('electricity').value,
        plumbing: document.getElementById('plumbing').value,
        customerLocation: document.getElementById('customer-location').value
    };

    // Build the message
    const message = `
*📋 استبيان تصميم جديد من لمسة ذهبية*

👤 *الاسم:* ${formData.name}
📱 *الهاتف:* ${formData.phone}
🏢 *نوع المكان:* ${formData.location}
🗺️ *المنطقة:* ${formData.area}
🔢 *الدور:* ${formData.floor}
🏠 *نوع الشقة:* ${formData.apartment}
🎨 *نوع التصميم:* ${formData.designType}
⬜ *الأرضية:* ${formData.floorType}
⚡ *الكهرباء:* ${formData.electricity}
💧 *السباكة:* ${formData.plumbing}
🌍 *مكان الإقامة:* ${formData.customerLocation}

شكراً لك! سيتم التواصل معك قريباً 🙏
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/201125933005?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    
    // Reset the form
    this.reset();
});

// ==================== Category Gallery Data ====================
const categoryData = {
    'reception': {
        folder: 'images/images_reception',
        count: 10
    },
    'master-bedroom': {
        folder: 'images/images_master_bedroom',
        count: 10
    },
    'boys-room': {
        folder: 'images/images_boys_room',
        count: 10
    },
    'girls-room': {
        folder: 'images/images_girls_room',
        count: 10
    },
    'small-bathroom': {
        folder: 'images/images_small_bathroom',
        count: 10
    },
    'large-bathroom': {
        folder: 'images/images_large_bathroom',
        count: 10
    },
    'kitchen': {
        folder: 'images/images_kitchen',
        count: 10
    }
};

function loadCategory(category) {
    const gallery = document.getElementById('categoryGallery');
    gallery.innerHTML = '';
    
    const categoryInfo = categoryData[category];
    if (!categoryInfo) return;

    // Create image paths
    for (let i = 1; i <= categoryInfo.count; i++) {
        const imagePath = `${categoryInfo.folder}/${i}.jpg`;
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = ((i - 1) * 0.1) + 's';
        item.innerHTML = `<img src="${imagePath}" alt="${category} - صورة ${i}" onerror="this.src='https://via.placeholder.com/250x200?text=صورة+${i}'">`
        gallery.appendChild(item);
    }
}

// Initialize with first category
loadCategory('reception');

// Category button listeners
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        loadCategory(this.dataset.category);
    });
});

// ==================== Portfolio Section ====================
function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    // Load 6 portfolio images from reception folder
    for (let i = 1; i <= 6; i++) {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.style.animationDelay = ((i - 1) * 0.1) + 's';
        portfolioItem.innerHTML = `<img src="images/images_reception/${i}.jpg" alt="تصميم حديث ${i}" onerror="this.src='https://via.placeholder.com/400x300?text=تصميم+${i}'">`
        portfolioGrid.appendChild(portfolioItem);
    }
}

// Load portfolio on page load
document.addEventListener('DOMContentLoaded', loadPortfolio);

// ==================== Testimonials Section ====================
function loadTestimonials() {
    const testimonialsSlider = document.getElementById('testimonialsSlider');
    testimonialsSlider.innerHTML = '';
    
    // Load testimonial images
    for (let i = 1; i <= 5; i++) {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = 'testimonial-item';
        testimonialItem.innerHTML = `<img src="images/images_testimonials/${i}.jpg" alt="عميل ${i}" onerror="this.src='https://via.placeholder.com/250x250?text=عميل+${i}'">`
        testimonialsSlider.appendChild(testimonialItem);
    }
}

// Load testimonials on page load
document.addEventListener('DOMContentLoaded', loadTestimonials);

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe elements when they're created
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.portfolio-item, .gallery-item, .testimonial-item').forEach(el => {
        observer.observe(el);
    });
});