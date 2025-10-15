// EatWise - Clean JavaScript with Real Twilio OTP Integration
// DOM Elements
const loginPage = document.getElementById('login-page');
const landingPage = document.getElementById('landing-page');
const dashboardPage = document.getElementById('dashboard-page');
const inventoryPage = document.getElementById('inventory-page');
const recipesPage = document.getElementById('recipes-page');
const infoPage = document.getElementById('info-page');
const qrPage = document.getElementById('qr-page');

// Navigation Elements
const allNavElements = {
    home: ['nav-home', 'nav-home-info', 'nav-home-qr', 'nav-home-inventory', 'nav-home-recipes'],
    dashboard: ['nav-dashboard', 'nav-dashboard-info', 'nav-dashboard-qr', 'nav-dashboard-inventory', 'nav-dashboard-recipes'],
    inventory: ['nav-inventory', 'nav-inventory-dash', 'nav-inventory-info', 'nav-inventory-qr', 'nav-inventory-recipes'],
    recipes: ['nav-recipes', 'nav-recipes-dash', 'nav-recipes-info', 'nav-recipes-qr', 'nav-recipes-inventory']
};

// Login Elements
const usernameLoginTab = document.getElementById('username-login-tab');
const phoneLoginTab = document.getElementById('phone-login-tab');
const usernameLoginForm = document.getElementById('username-login-form');
const phoneLoginForm = document.getElementById('phone-login-form');
const loginBtn = document.getElementById('login-btn');
const sendOtpBtn = document.getElementById('send-otp-btn');
const verifyOtpBtn = document.getElementById('verify-otp-btn');
const resendOtpBtn = document.getElementById('resend-otp-btn');
const otpVerification = document.getElementById('otp-verification');

// Form Inputs
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const phoneNumberInput = document.getElementById('phone-number');
const otpCodeInput = document.getElementById('otp-code');

// User greeting elements
const userGreetings = [
    'user-greeting', 'landing-user-greeting', 'info-user-greeting', 
    'qr-user-greeting', 'inventory-user-greeting', 'recipes-user-greeting'
];

// Logout buttons
const logoutButtons = [
    'logout-btn', 'landing-logout-btn', 'info-logout-btn', 
    'qr-logout-btn', 'inventory-logout-btn', 'recipes-logout-btn'
];

// Dashboard and other buttons
const goToDashboardBtn = document.getElementById('go-to-dashboard-btn');
const cashierBtn = document.getElementById('cashier-btn');
const cashierBtnCta = document.getElementById('cashier-btn-cta');
const cashierCard = document.getElementById('cashier-card');

// Dashboard Cards
const infoCard = document.getElementById('info-card');
const qrCard = document.getElementById('qr-card');

// Back buttons
const backButtons = [
    'back-btn-info', 'back-btn-qr', 'back-btn-inventory', 'back-btn-recipes'
];

// Loading and Notifications
const loadingOverlay = document.getElementById('loading-overlay');
const toastContainer = document.getElementById('toast-container');
const modalBackdrop = document.getElementById('modal-backdrop');

// Inventory Elements
const inventoryGrid = document.getElementById('inventory-grid');
const addItemBtn = document.getElementById('add-item-btn');
const addItemModal = document.getElementById('add-item-modal');
const closeAddModal = document.getElementById('close-add-modal');
const cancelAddItem = document.getElementById('cancel-add-item');
const addItemForm = document.getElementById('add-item-form');

// Recipe Elements
const recipesGrid = document.getElementById('recipes-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const recipeModal = document.getElementById('recipe-modal');
const closeRecipeModal = document.getElementById('close-recipe-modal');

// QR Elements
const scanQrBtn = document.getElementById('scan-qr-btn');
const uploadQrBtn = document.getElementById('upload-qr-btn');
const qrFileInput = document.getElementById('qr-file-input');
const qrResultContainer = document.getElementById('qr-result-container');
const qrInstructions = document.getElementById('qr-instructions');
const inventoryTableBody = document.getElementById('inventory-table-body');
const downloadQrBtn = document.getElementById('download-qr-btn');
const useSampleQrBtn = document.getElementById('use-sample-qr-btn');

// OTP Timer Elements
const otpTimer = document.getElementById('otp-timer');
const timerCount = document.getElementById('timer-count');

// Global State
let currentUser = null;
let otpSessionData = null;
let inventory = [];
let currentFilter = 'all';
let resendTimer = null;
let resendTimeLeft = 0;

// API Configuration
const API_BASE_URL = window.location.origin;

// Sample Inventory Data
const sampleInventoryData = [
    {
        id: 'ehs2dcm8r',
        name: 'Milk',
        category: 'dairy',
        manufacturingDate: '2025-04-10',
        expiryDate: '2025-05-10',
        price: 2.50,
        quantity: 3
    },
    {
        id: 'ub07cot57',
        name: 'Butter',
        category: 'dairy',
        manufacturingDate: '2025-04-10',
        expiryDate: '2025-05-10',
        price: 3.20,
        quantity: 1
    },
    {
        id: 'cw8f2htv4',
        name: 'Yogurt',
        category: 'dairy',
        manufacturingDate: '2025-04-10',
        expiryDate: '2025-05-10',
        price: 1.75,
        quantity: 4
    },
    {
        id: '5wq149y9e',
        name: 'Apples',
        category: 'fruits',
        manufacturingDate: '2025-04-10',
        expiryDate: '2025-05-10',
        price: 3.00,
        quantity: 6
    },
    {
        id: 'x5qxu0oal',
        name: 'Bread',
        category: 'grains',
        manufacturingDate: '2025-04-10',
        expiryDate: '2025-05-10',
        price: 2.25,
        quantity: 1
    },
    {
        id: 'iu65bpef7',
        name: 'Cheese',
        category: 'dairy',
        manufacturingDate: '2025-04-10',
        expiryDate: '2025-05-10',
        price: 4.50,
        quantity: 2
    },
    {
        id: 'as7xgwlxh',
        name: 'Tomatoes',
        category: 'vegetables',
        manufacturingDate: '2025-04-10',
        expiryDate: '2025-05-10',
        price: 2.80,
        quantity: 5
    },
    {
        id: 'k9vka0et2',
        name: 'Eggs',
        category: 'dairy',
        manufacturingDate: '2025-04-10',
        expiryDate: '2025-05-10',
        price: 3.10,
        quantity: 12
    },
    {
        id: 'q1zsiznvp',
        name: 'Orange Juice',
        category: 'beverages',
        manufacturingDate: '2025-04-10',
        expiryDate: '2025-05-10',
        price: 3.75,
        quantity: 1
    },
    {
        id: '0aagczqn2',
        name: 'Cereal',
        category: 'grains',
        manufacturingDate: '2025-04-10',
        expiryDate: '2025-05-10',
        price: 4.20,
        quantity: 1
    }
];

// Sample Recipes Data
const recipesData = [
    {
        id: 1,
        title: 'Mediterranean Breakfast Bowl',
        category: 'breakfast',
        difficulty: 'easy',
        time: 15,
        calories: 380,
        servings: 2,
        description: 'A nutritious and colorful breakfast bowl with Greek yogurt, fresh fruits, and nuts.',
        image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=320&h=200&fit=crop&crop=center',
        ingredients: [
            '1 cup Greek yogurt',
            '1/2 cup mixed berries',
            '1 sliced banana',
            '2 tbsp honey',
            '1/4 cup granola',
            '2 tbsp chopped almonds'
        ],
        instructions: [
            'Divide Greek yogurt between two bowls.',
            'Top with mixed berries and sliced banana.',
            'Drizzle with honey.',
            'Sprinkle granola and chopped almonds on top.',
            'Serve immediately and enjoy!'
        ],
        ingredientsPreview: 'Greek yogurt, berries, banana, honey...'
    },
    {
        id: 2,
        title: 'Grilled Chicken Salad',
        category: 'lunch',
        difficulty: 'medium',
        time: 25,
        calories: 420,
        servings: 2,
        description: 'A protein-packed salad with grilled chicken, mixed greens, and a tangy vinaigrette.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=320&h=200&fit=crop&crop=center',
        ingredients: [
            '2 chicken breasts',
            '4 cups mixed greens',
            '1 cucumber, diced',
            '1 cup cherry tomatoes',
            '1/4 red onion, sliced',
            '2 tbsp olive oil',
            '1 tbsp balsamic vinegar',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Season chicken breasts with salt and pepper.',
            'Grill chicken for 6-7 minutes per side until cooked through.',
            'Let chicken rest for 5 minutes, then slice.',
            'In a large bowl, combine mixed greens, cucumber, tomatoes, and onion.',
            'Whisk together olive oil and balsamic vinegar.',
            'Top salad with sliced chicken and drizzle with dressing.',
            'Serve immediately.'
        ],
        ingredientsPreview: 'Chicken breast, mixed greens, cucumber...'
    },
    {
        id: 3,
        title: 'Vegetable Stir-Fry',
        category: 'dinner',
        difficulty: 'easy',
        time: 20,
        calories: 320,
        servings: 4,
        description: 'A colorful and nutritious stir-fry with fresh vegetables and aromatic Asian flavors.',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=320&h=200&fit=crop&crop=center',
        ingredients: [
            '2 tbsp vegetable oil',
            '1 bell pepper, sliced',
            '1 cup broccoli florets',
            '1 carrot, julienned',
            '1 cup snap peas',
            '2 cloves garlic, minced',
            '2 tbsp soy sauce',
            '1 tbsp sesame oil',
            '1 tsp ginger, grated'
        ],
        instructions: [
            'Heat vegetable oil in a large wok or skillet over high heat.',
            'Add garlic and ginger, stir-fry for 30 seconds.',
            'Add bell pepper and carrot, stir-fry for 2 minutes.',
            'Add broccoli and snap peas, stir-fry for 3-4 minutes.',
            'Add soy sauce and sesame oil, toss to combine.',
            'Cook for another minute until vegetables are crisp-tender.',
            'Serve hot over rice or noodles.'
        ],
        ingredientsPreview: 'Bell pepper, broccoli, carrots, snap peas...'
    },
    {
        id: 4,
        title: 'Energy Balls',
        category: 'snacks',
        difficulty: 'easy',
        time: 15,
        calories: 150,
        servings: 8,
        description: 'No-bake energy balls packed with nuts, dates, and coconut for a healthy snack.',
        image: 'https://images.unsplash.com/photo-1434824579151-ce617a3d9cd5?w=320&h=200&fit=crop&crop=center',
        ingredients: [
            '1 cup pitted dates',
            '1/2 cup almonds',
            '1/4 cup rolled oats',
            '2 tbsp chia seeds',
            '2 tbsp coconut flakes',
            '1 tbsp almond butter',
            '1 tsp vanilla extract'
        ],
        instructions: [
            'Process dates in a food processor until they form a paste.',
            'Add almonds and pulse until roughly chopped.',
            'Add oats, chia seeds, and coconut flakes. Pulse to combine.',
            'Add almond butter and vanilla, process until mixture holds together.',
            'Roll mixture into 16 small balls.',
            'Refrigerate for at least 30 minutes before serving.',
            'Store in refrigerator for up to 1 week.'
        ],
        ingredientsPreview: 'Dates, almonds, oats, chia seeds...'
    },
    {
        id: 5,
        title: 'Chocolate Avocado Mousse',
        category: 'dessert',
        difficulty: 'easy',
        time: 10,
        calories: 220,
        servings: 4,
        description: 'A rich and creamy chocolate mousse made with healthy avocados and no dairy.',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=320&h=200&fit=crop&crop=center',
        ingredients: [
            '2 ripe avocados',
            '1/4 cup cocoa powder',
            '1/4 cup maple syrup',
            '2 tbsp almond milk',
            '1 tsp vanilla extract',
            'Pinch of salt',
            'Fresh berries for garnish'
        ],
        instructions: [
            'Cut avocados in half and remove pits.',
            'Scoop avocado flesh into a food processor.',
            'Add cocoa powder, maple syrup, almond milk, vanilla, and salt.',
            'Process until smooth and creamy, about 2 minutes.',
            'Taste and adjust sweetness if needed.',
            'Divide among 4 serving glasses.',
            'Refrigerate for at least 1 hour before serving.',
            'Garnish with fresh berries.'
        ],
        ingredientsPreview: 'Avocados, cocoa powder, maple syrup...'
    },
    {
        id: 6,
        title: 'Quinoa Buddha Bowl',
        category: 'lunch',
        difficulty: 'medium',
        time: 35,
        calories: 450,
        servings: 2,
        description: 'A nourishing bowl with quinoa, roasted vegetables, and tahini dressing.',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=320&h=200&fit=crop&crop=center',
        ingredients: [
            '1 cup quinoa',
            '1 sweet potato, cubed',
            '1 zucchini, sliced',
            '1 cup chickpeas',
            '2 cups spinach',
            '2 tbsp tahini',
            '1 lemon, juiced',
            '2 tbsp olive oil',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Preheat oven to 400°F (200°C).',
            'Cook quinoa according to package instructions.',
            'Toss sweet potato and zucchini with olive oil, salt, and pepper.',
            'Roast vegetables for 25 minutes until tender.',
            'Rinse and drain chickpeas.',
            'Whisk together tahini, lemon juice, and a splash of water.',
            'Divide quinoa between bowls.',
            'Top with roasted vegetables, chickpeas, and spinach.',
            'Drizzle with tahini dressing and serve.'
        ],
        ingredientsPreview: 'Quinoa, sweet potato, zucchini, chickpeas...'
    }
];

// Helper Functions
function formatDate(date) {
    if (typeof date === 'string') return date;
    return date.toISOString().split('T')[0];
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function showLoading() {
    if (loadingOverlay) loadingOverlay.classList.remove('hidden');
}

function hideLoading() {
    if (loadingOverlay) loadingOverlay.classList.add('hidden');
}

function showModal(modal) {
    if (!modal || !modalBackdrop) return;
    modal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
    modalBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function hideModal(modal) {
    if (!modal || !modalBackdrop) return;
    modal.classList.remove('show');
    modalBackdrop.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(() => {
        modal.classList.add('hidden');
        modalBackdrop.classList.add('hidden');
    }, 300);
}

function showToast(type, title, message, duration = 3000) {
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconMap = {
        success: 'check',
        error: 'exclamation',
        warning: 'exclamation-triangle',
        info: 'info'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${iconMap[type] || 'info'}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Phone Number Utilities
function formatPhoneNumber(phone) {
    let cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
        if (cleaned.startsWith('6') || cleaned.startsWith('7') || 
            cleaned.startsWith('8') || cleaned.startsWith('9')) {
            cleaned = '+91' + cleaned;
        } else {
            cleaned = '+1' + cleaned;
        }
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
        cleaned = '+' + cleaned;
    } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
        cleaned = '+' + cleaned;
    } else if (!cleaned.startsWith('+')) {
        cleaned = '+' + cleaned;
    }
    
    return cleaned;
}

function isValidPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
        return true;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
        return true;
    } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
        return true;
    } else if (cleaned.length === 13 && cleaned.startsWith('91')) {
        return true;
    } else if (cleaned.length >= 10 && cleaned.length <= 15) {
        return true;
    }
    
    return false;
}

function formatPhoneDisplay(phone) {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
        return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
        return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
        if (cleaned.startsWith('6') || cleaned.startsWith('7') || 
            cleaned.startsWith('8') || cleaned.startsWith('9')) {
            return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
        } else {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
    }
    
    return phone;
}

// OTP Timer Functions
function startResendTimer(seconds = 60) {
    if (resendTimer) {
        clearInterval(resendTimer);
    }
    
    resendTimeLeft = seconds;
    updateResendButton();
    
    resendTimer = setInterval(() => {
        resendTimeLeft--;
        updateResendButton();
        
        if (resendTimeLeft <= 0) {
            clearInterval(resendTimer);
            resendTimer = null;
        }
    }, 1000);
}

function updateResendButton() {
    if (!resendOtpBtn || !timerCount) return;
    
    if (resendTimeLeft > 0) {
        resendOtpBtn.disabled = true;
        resendOtpBtn.innerHTML = `<span>Resend OTP (${resendTimeLeft}s)</span>`;
        resendOtpBtn.classList.add('disabled');
        if (timerCount) {
            timerCount.textContent = resendTimeLeft;
        }
    } else {
        resendOtpBtn.disabled = false;
        resendOtpBtn.innerHTML = '<span>Resend OTP</span>';
        resendOtpBtn.classList.remove('disabled');
        if (otpTimer) {
            otpTimer.classList.add('hidden');
        }
    }
}

function stopResendTimer() {
    if (resendTimer) {
        clearInterval(resendTimer);
        resendTimer = null;
    }
    resendTimeLeft = 0;
    updateResendButton();
}

// API Functions
async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
        
        return data;
    } catch (error) {
        console.error(`API call failed for ${endpoint}:`, error);
        throw error;
    }
}

// Navigation Functions
function navigateTo(targetPage) {
    console.log('Navigating to:', targetPage?.id || 'unknown page');
    
    if (!targetPage) {
        console.error('Target page is null');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        try {
            // Hide all pages
            const allPages = [
                loginPage, landingPage, dashboardPage, 
                inventoryPage, recipesPage, infoPage, qrPage
            ].filter(page => page != null);
            
            allPages.forEach(page => {
                if (page && page.classList) {
                    page.classList.add('hidden');
                }
            });
            
            // Show target page
            if (targetPage && targetPage.classList) {
                targetPage.classList.remove('hidden');
                console.log('Successfully navigated to:', targetPage.id);
            }
            
            // Load page-specific data
            if (targetPage === inventoryPage) {
                renderInventory();
            } else if (targetPage === recipesPage) {
                renderRecipes();
            }
            
            // Reset QR page if navigating to it
            if (targetPage === qrPage && qrResultContainer && qrInstructions) {
                qrResultContainer.classList.add('hidden');
                qrInstructions.classList.remove('hidden');
            }
            
            // Update active navigation link
            setActiveNavLink(targetPage);
            
            // Scroll to top
            window.scrollTo(0, 0);
            
        } catch (error) {
            console.error('Navigation error:', error);
            showToast('error', 'Navigation Error', 'Failed to navigate to page');
        } finally {
            hideLoading();
        }
    }, 300);
}

function setActiveNavLink(currentPage) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    let activeNavText = '';
    if (currentPage === landingPage) {
        activeNavText = 'Home';
    } else if (currentPage === dashboardPage) {
        activeNavText = 'Dashboard';
    } else if (currentPage === inventoryPage) {
        activeNavText = 'Inventory';
    } else if (currentPage === recipesPage) {
        activeNavText = 'Recipes';
    }
    
    if (activeNavText) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.textContent.trim() === activeNavText) {
                link.classList.add('active');
            }
        });
    }
}

// Event Listeners Setup
document.addEventListener('DOMContentLoaded', () => {
    console.log('EatWise application starting...');
    
    // Initialize inventory with sample data
    inventory = [...sampleInventoryData];
    
    // Setup all event handlers
    setupLoginHandlers();
    setupNavigationHandlers();
    setupDashboardHandlers();
    setupInventoryHandlers();
    setupRecipeHandlers();
    setupQRHandlers();
    setupCashierHandlers();
    setupModalHandlers();
    
    // Update summary counts
    updateInventorySummary();
    
    console.log('EatWise application ready!');
});

// Login Handlers
function setupLoginHandlers() {
    // Login tab switching
    if (usernameLoginTab && phoneLoginTab) {
        usernameLoginTab.addEventListener('click', () => switchLoginMethod('username'));
        phoneLoginTab.addEventListener('click', () => switchLoginMethod('phone'));
    }
    
    // Username login
    if (loginBtn) loginBtn.addEventListener('click', handleUsernameLogin);
    
    // Phone login
    if (sendOtpBtn) sendOtpBtn.addEventListener('click', handleSendOtp);
    if (verifyOtpBtn) verifyOtpBtn.addEventListener('click', handleVerifyOtp);
    if (resendOtpBtn) resendOtpBtn.addEventListener('click', handleResendOtp);
    
    // Logout buttons
    logoutButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) btn.addEventListener('click', handleLogout);
    });
    
    // Enter key handling
    if (passwordInput) {
        passwordInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                loginBtn.click();
            }
        });
    }
    
    if (otpCodeInput) {
        otpCodeInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                verifyOtpBtn.click();
            }
        });
        
        // Auto-format OTP input
        otpCodeInput.addEventListener('input', function(event) {
            let value = event.target.value.replace(/\D/g, '');
            if (value.length > 6) {
                value = value.substring(0, 6);
            }
            event.target.value = value;
            
            // Auto-verify when 6 digits are entered
            if (value.length === 6) {
                setTimeout(() => {
                    verifyOtpBtn.click();
                }, 100);
            }
        });
    }
    
    // Phone number formatting
    if (phoneNumberInput) {
        phoneNumberInput.addEventListener('input', function(event) {
            let value = event.target.value;
            let cleaned = value.replace(/\D/g, '');
            
            if (value.startsWith('+')) {
                return;
            }
            
            if (cleaned.length <= 10) {
                if (cleaned.length > 0 && (cleaned.startsWith('6') || cleaned.startsWith('7') || 
                    cleaned.startsWith('8') || cleaned.startsWith('9'))) {
                    if (cleaned.length >= 5) {
                        event.target.value = `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
                    } else {
                        event.target.value = `+91 ${cleaned}`;
                    }
                } else {
                    if (cleaned.length >= 6) {
                        event.target.value = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
                    } else if (cleaned.length >= 3) {
                        event.target.value = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
                    } else {
                        event.target.value = cleaned;
                    }
                }
            }
        });
        
        phoneNumberInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                sendOtpBtn.click();
            }
        });
    }
}

function switchLoginMethod(method) {
    stopResendTimer();
    otpSessionData = null;
    
    if (method === 'username') {
        usernameLoginTab.classList.add('active');
        phoneLoginTab.classList.remove('active');
        usernameLoginForm.classList.remove('hidden');
        phoneLoginForm.classList.add('hidden');
        otpVerification.classList.add('hidden');
        if (otpTimer) otpTimer.classList.add('hidden');
    } else {
        phoneLoginTab.classList.add('active');
        usernameLoginTab.classList.remove('active');
        phoneLoginForm.classList.remove('hidden');
        usernameLoginForm.classList.add('hidden');
        otpVerification.classList.add('hidden');
        if (otpTimer) otpTimer.classList.add('hidden');
    }
}

function handleUsernameLogin() {
    const username = usernameInput.value.trim();
    
    if (username === '') {
        showToast('error', 'Login Failed', 'Please enter a username');
        usernameInput.focus();
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        const displayName = capitalizeFirstLetter(username);
        loginUser(displayName, 'username');
        
        usernameInput.value = '';
        if (passwordInput) passwordInput.value = '';
        
        hideLoading();
        showToast('success', 'Welcome', `Successfully logged in as ${displayName}`);
    }, 1000);
}

async function handleSendOtp() {
    const phoneNumber = phoneNumberInput.value.trim();
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    
    if (!phoneNumber || cleanedPhone.length < 10) {
        showToast('error', 'Invalid Phone', 'Please enter a valid phone number with at least 10 digits');
        phoneNumberInput.focus();
        return;
    }
    
    if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
        showToast('error', 'Invalid Phone', `Phone number should be 10-15 digits. You entered ${cleanedPhone.length} digits.`);
        phoneNumberInput.focus();
        return;
    }
    
    showLoading();
    sendOtpBtn.disabled = true;
    
    try {
        const formattedPhone = formatPhoneNumber(phoneNumber);
        
        const response = await apiCall('/api/send-otp', {
            method: 'POST',
            body: JSON.stringify({ phoneNumber: formattedPhone })
        });
        
        otpSessionData = {
            phoneNumber: formattedPhone,
            displayNumber: formatPhoneDisplay(phoneNumber),
            expiresIn: response.expiresIn || 300
        };
        
        hideLoading();
        otpVerification.classList.remove('hidden');
        if (otpTimer) otpTimer.classList.remove('hidden');
        
        startResendTimer(60);
        
        showToast('success', 'OTP Sent', `Verification code sent to ${otpSessionData.displayNumber}`);
        otpCodeInput.focus();
        
    } catch (error) {
        hideLoading();
        
        let errorMessage = error.message;
        if (error.message.includes('Invalid phone number')) {
            errorMessage = `Phone number not accepted by Twilio. Please ensure ${cleanedPhone} is verified in your Twilio Console.`;
        } else if (error.message.includes('Permission denied')) {
            errorMessage = `This phone number is not verified. Please add ${formattedPhone} to your Twilio verified caller IDs.`;
        } else if (error.message.includes('unverified')) {
            errorMessage = `Phone number ${formattedPhone} needs to be verified in Twilio Console first.`;
        }
        
        showToast('error', 'Send Failed', errorMessage);
    } finally {
        sendOtpBtn.disabled = false;
    }
}

async function handleVerifyOtp() {
    if (!otpSessionData) {
        showToast('error', 'Session Error', 'Please request a new OTP');
        return;
    }
    
    const enteredOtp = otpCodeInput.value.trim();
    
    if (!enteredOtp || enteredOtp.length !== 6) {
        showToast('error', 'Invalid OTP', 'Please enter the 6-digit verification code');
        otpCodeInput.focus();
        return;
    }
    
    showLoading();
    verifyOtpBtn.disabled = true;
    
    try {
        const response = await apiCall('/api/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ 
                phoneNumber: otpSessionData.phoneNumber,
                otp: enteredOtp 
            })
        });
        
        // Stop timer and clear session
        stopResendTimer();
        
        const displayName = `User ${otpSessionData.phoneNumber.slice(-4)}`;
        
        // Set current user data
        currentUser = { 
            name: displayName, 
            method: 'phone',
            phoneNumber: otpSessionData.phoneNumber,
            loginTime: new Date().toISOString()
        };
        
        // Update user information on all pages
        userGreetings.forEach(greetingId => {
            const element = document.getElementById(greetingId);
            if (element) {
                element.textContent = displayName;
            }
        });
        
        // Update avatar initials
        const initials = getInitials(displayName);
        const avatarElements = document.querySelectorAll('.user-avatar span');
        avatarElements.forEach(span => {
            span.textContent = initials;
        });
        
        // Clear form data
        phoneNumberInput.value = '';
        otpCodeInput.value = '';
        otpVerification.classList.add('hidden');
        if (otpTimer) otpTimer.classList.add('hidden');
        otpSessionData = null;
        
        hideLoading();
        showToast('success', 'Welcome', 'Successfully verified and logged in');
        
        // Navigate to landing page
        setTimeout(() => {
            navigateTo(landingPage);
        }, 500);
        
    } catch (error) {
        hideLoading();
        showToast('error', 'Verification Failed', error.message);
        otpCodeInput.value = '';
        otpCodeInput.focus();
    } finally {
        verifyOtpBtn.disabled = false;
    }
}

async function handleResendOtp() {
    if (!otpSessionData) {
        showToast('error', 'Session Error', 'Please enter your phone number again');
        return;
    }
    
    if (resendTimeLeft > 0) {
        showToast('warning', 'Please Wait', `Please wait ${resendTimeLeft} seconds before requesting a new code`);
        return;
    }
    
    showLoading();
    resendOtpBtn.disabled = true;
    
    try {
        const response = await apiCall('/api/resend-otp', {
            method: 'POST',
            body: JSON.stringify({ phoneNumber: otpSessionData.phoneNumber })
        });
        
        hideLoading();
        
        startResendTimer(60);
        
        showToast('success', 'OTP Resent', `New verification code sent to ${otpSessionData.displayNumber}`);
        otpCodeInput.value = '';
        otpCodeInput.focus();
        
    } catch (error) {
        hideLoading();
        showToast('error', 'Resend Failed', error.message);
    } finally {
        resendOtpBtn.disabled = false;
    }
}

function loginUser(displayName, method, phoneNumber = null) {
    currentUser = { 
        name: displayName, 
        method: method,
        phoneNumber: phoneNumber,
        loginTime: new Date().toISOString()
    };
    
    // Update user information on all pages
    userGreetings.forEach(greetingId => {
        const element = document.getElementById(greetingId);
        if (element) element.textContent = displayName;
    });
    
    // Update avatar initials
    const initials = getInitials(displayName);
    const avatarElements = document.querySelectorAll('.user-avatar span');
    avatarElements.forEach(span => {
        span.textContent = initials;
    });
    
    navigateTo(landingPage);
}

function handleLogout() {
    showLoading();
    
    setTimeout(() => {
        // Clear session data
        currentUser = null;
        otpSessionData = null;
        stopResendTimer();
        
        // Reset forms
        if (usernameInput) usernameInput.value = '';
        if (passwordInput) passwordInput.value = '';
        if (phoneNumberInput) phoneNumberInput.value = '';
        if (otpCodeInput) otpCodeInput.value = '';
        if (otpVerification) otpVerification.classList.add('hidden');
        if (otpTimer) otpTimer.classList.add('hidden');
        
        navigateTo(loginPage);
        hideLoading();
        showToast('success', 'Logged Out', 'You have been successfully logged out');
    }, 800);
}

// Navigation Handlers
function setupNavigationHandlers() {
    // Home navigation
    allNavElements.home.forEach(navId => {
        const element = document.getElementById(navId);
        if (element) element.addEventListener('click', () => navigateTo(landingPage));
    });
    
    // Dashboard navigation
    allNavElements.dashboard.forEach(navId => {
        const element = document.getElementById(navId);
        if (element) element.addEventListener('click', () => navigateTo(dashboardPage));
    });
    
    // Inventory navigation
    allNavElements.inventory.forEach(navId => {
        const element = document.getElementById(navId);
        if (element) element.addEventListener('click', () => navigateTo(inventoryPage));
    });
    
    // Recipes navigation
    allNavElements.recipes.forEach(navId => {
        const element = document.getElementById(navId);
        if (element) element.addEventListener('click', () => navigateTo(recipesPage));
    });
    
    // Back buttons
    backButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) btn.addEventListener('click', () => navigateTo(dashboardPage));
    });
    
    // Main navigation buttons
    if (goToDashboardBtn) goToDashboardBtn.addEventListener('click', () => navigateTo(dashboardPage));
}

// Dashboard Handlers
function setupDashboardHandlers() {
    if (infoCard) infoCard.addEventListener('click', () => navigateTo(infoPage));
    if (qrCard) qrCard.addEventListener('click', () => navigateTo(qrPage));
}

// Inventory Handlers
function setupInventoryHandlers() {
    if (addItemBtn) addItemBtn.addEventListener('click', () => showModal(addItemModal));
    if (addItemForm) addItemForm.addEventListener('submit', handleAddItem);
}

function renderInventory() {
    if (!inventoryGrid) return;
    
    inventoryGrid.innerHTML = '';
    
    inventory.forEach(item => {
        const itemElement = createInventoryItemElement(item);
        inventoryGrid.appendChild(itemElement);
    });
    
    updateInventorySummary();
}

function createInventoryItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'inventory-item';
    
    const status = getItemStatus(item.expiryDate);
    const statusClass = status === 'fresh' ? 'status-fresh' : 
                       status === 'expiring' ? 'status-expiring' : 'status-expired';
    
    itemDiv.innerHTML = `
        <div class="inventory-item-header">
            <div class="inventory-item-info">
                <h3>${item.name}</h3>
                <span class="inventory-item-category">${item.category}</span>
            </div>
            <div class="inventory-item-actions">
                <button class="edit-btn" onclick="editInventoryItem('${item.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteInventoryItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="inventory-item-details">
            <div class="inventory-detail">
                <span class="inventory-detail-label">Quantity</span>
                <span class="inventory-detail-value">${item.quantity}</span>
            </div>
            <div class="inventory-detail">
                <span class="inventory-detail-label">Price</span>
                <span class="inventory-detail-value">$${item.price.toFixed(2)}</span>
            </div>
            <div class="inventory-detail">
                <span class="inventory-detail-label">Manufacturing</span>
                <span class="inventory-detail-value">${formatDate(item.manufacturingDate)}</span>
            </div>
            <div class="inventory-detail">
                <span class="inventory-detail-label">Expiry</span>
                <span class="inventory-detail-value">${formatDate(item.expiryDate)}</span>
            </div>
        </div>
        <div class="inventory-item-status ${statusClass}">
            ${status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
    `;
    
    return itemDiv;
}

function getItemStatus(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'expired';
    if (diffDays <= 3) return 'expiring';
    return 'fresh';
}

function handleAddItem(event) {
    event.preventDefault();
    
    const newItem = {
        id: generateId(),
        name: document.getElementById('item-name').value,
        category: document.getElementById('item-category').value,
        quantity: parseInt(document.getElementById('item-quantity').value),
        price: parseFloat(document.getElementById('item-price').value),
        manufacturingDate: document.getElementById('manufacturing-date').value,
        expiryDate: document.getElementById('expiry-date').value
    };
    
    inventory.push(newItem);
    hideModal(addItemModal);
    showToast('success', 'Item Added', `${newItem.name} has been added to your inventory`);
    
    // Reset form
    event.target.reset();
    
    // Re-render inventory if on inventory page
    if (!inventoryPage.classList.contains('hidden')) {
        renderInventory();
    }
    
    updateInventorySummary();
}

function editInventoryItem(id) {
    const item = inventory.find(i => i.id === id);
    if (!item) return;
    
    // Populate form with item data
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-category').value = item.category;
    document.getElementById('item-quantity').value = item.quantity;
    document.getElementById('item-price').value = item.price;
    document.getElementById('manufacturing-date').value = item.manufacturingDate;
    document.getElementById('expiry-date').value = item.expiryDate;
    
    // Change form handler to update instead of add
    addItemForm.onsubmit = function(event) {
        event.preventDefault();
        
        item.name = document.getElementById('item-name').value;
        item.category = document.getElementById('item-category').value;
        item.quantity = parseInt(document.getElementById('item-quantity').value);
        item.price = parseFloat(document.getElementById('item-price').value);
        item.manufacturingDate = document.getElementById('manufacturing-date').value;
        item.expiryDate = document.getElementById('expiry-date').value;
        
        hideModal(addItemModal);
        showToast('success', 'Item Updated', `${item.name} has been updated`);
        
        // Reset form handler
        addItemForm.onsubmit = handleAddItem;
        event.target.reset();
        
        renderInventory();
        updateInventorySummary();
    };
    
    showModal(addItemModal);
}

function deleteInventoryItem(id) {
    const itemIndex = inventory.findIndex(i => i.id === id);
    if (itemIndex === -1) return;
    
    const item = inventory[itemIndex];
    
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        inventory.splice(itemIndex, 1);
        showToast('success', 'Item Deleted', `${item.name} has been removed from your inventory`);
        renderInventory();
        updateInventorySummary();
    }
}

function updateInventorySummary() {
    const totalCount = inventory.length;
    const expiringCount = inventory.filter(item => getItemStatus(item.expiryDate) === 'expiring').length;
    const healthyCount = inventory.filter(item => ['fruits', 'vegetables'].includes(item.category)).length;
    
    // Update landing page summary
    const totalElement = document.getElementById('total-count');
    const expiringElement = document.getElementById('expiring-count');
    const healthyElement = document.getElementById('healthy-count');
    
    if (totalElement) totalElement.textContent = totalCount;
    if (expiringElement) expiringElement.textContent = expiringCount;
    if (healthyElement) healthyElement.textContent = healthyCount;
}

// Recipe Handlers
function setupRecipeHandlers() {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            setActiveFilter(category);
            filterRecipes(category);
        });
    });
}

function renderRecipes() {
    if (!recipesGrid) return;
    
    recipesGrid.innerHTML = '';
    
    const filteredRecipes = currentFilter === 'all' 
        ? recipesData 
        : recipesData.filter(recipe => recipe.category === currentFilter);
    
    filteredRecipes.forEach(recipe => {
        const recipeElement = createRecipeElement(recipe);
        recipesGrid.appendChild(recipeElement);
    });
}

function createRecipeElement(recipe) {
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe-card';
    recipeDiv.onclick = () => showRecipeModal(recipe);
    
    recipeDiv.innerHTML = `
        <div class="recipe-image">
            <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
            <span class="recipe-category-badge">${recipe.category}</span>
        </div>
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.title}</h3>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-meta">
                <span><i class="fas fa-clock"></i> ${recipe.time} min</span>
                <span><i class="fas fa-fire"></i> ${recipe.calories} cal</span>
                <span><i class="fas fa-users"></i> ${recipe.servings} servings</span>
            </div>
            <p class="recipe-ingredients-preview">${recipe.ingredientsPreview}</p>
            <span class="recipe-difficulty difficulty-${recipe.difficulty}">${recipe.difficulty}</span>
        </div>
    `;
    
    return recipeDiv;
}

function setActiveFilter(category) {
    currentFilter = category;
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
}

function filterRecipes(category) {
    renderRecipes();
}

function showRecipeModal(recipe) {
    // Populate modal with recipe data
    document.getElementById('recipe-modal-title').textContent = recipe.title;
    document.getElementById('recipe-modal-image').src = recipe.image;
    document.getElementById('recipe-modal-image').alt = recipe.title;
    
    // Update meta information
    document.querySelector('#recipe-modal-time .time-text').textContent = `${recipe.time} min`;
    document.querySelector('#recipe-modal-calories .calories-text').textContent = `${recipe.calories} cal`;
    document.querySelector('#recipe-modal-servings .servings-text').textContent = `${recipe.servings} servings`;
    
    // Populate ingredients
    const ingredientsList = document.getElementById('recipe-modal-ingredients');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    
    // Populate instructions
    const instructionsList = document.getElementById('recipe-modal-instructions');
    instructionsList.innerHTML = '';
    recipe.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });
    
    showModal(recipeModal);
}

// QR Handlers
function setupQRHandlers() {
    if (uploadQrBtn) uploadQrBtn.addEventListener('click', () => qrFileInput.click());
    if (qrFileInput) qrFileInput.addEventListener('change', handleQrUpload);
    if (downloadQrBtn) downloadQrBtn.addEventListener('click', downloadQrCode);
    if (useSampleQrBtn) useSampleQrBtn.addEventListener('click', useSampleQr);
}

function handleQrUpload(event) {
    const file = event.target.files[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        showToast('error', 'Invalid File', 'Please select an image file');
        return;
    }
    
    showLoading();
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        setTimeout(() => {
            processInventoryData(sampleInventoryData);
            hideLoading();
        }, 1500);
    };
    
    reader.onerror = function() {
        hideLoading();
        showToast('error', 'File Error', 'Error reading the file');
    };
    
    reader.readAsDataURL(file);
}

function processInventoryData(data) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        showToast('error', 'Invalid Data', 'Invalid QR code data');
        return;
    }
    
    inventoryTableBody.innerHTML = '';
    
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.style.animation = `fadeIn 0.3s ease-out ${index * 0.05}s forwards`;
        row.style.opacity = '0';
        
        ['id', 'name', 'manufacturingDate', 'expiryDate', 'price', 'quantity'].forEach(key => {
            const cell = document.createElement('td');
            if (key === 'price') {
                cell.textContent = `$${item[key]}`;
            } else {
                cell.textContent = item[key] || '';
            }
            row.appendChild(cell);
        });
        
        inventoryTableBody.appendChild(row);
    });
    
    qrResultContainer.classList.remove('hidden');
    qrInstructions.classList.add('hidden');
    
    safeGenerateQrCode(data);
    
    showToast('success', 'QR Processed', 'QR code processed successfully!');
}

function safeGenerateQrCode(data) {
    if (typeof QRCode === 'undefined') {
        showToast('error', 'QR Generation Failed', 'QR code library not available');
        return;
    }
    
    const qrcodeElement = document.getElementById('qrcode');
    if (!qrcodeElement) return;
    
    qrcodeElement.innerHTML = '';
    
    try {
        let qrText = JSON.stringify(data);
        
        if (qrText.length > 1000) {
            const limitedData = data.slice(0, 3);
            qrText = JSON.stringify(limitedData);
            showToast('warning', 'QR Data Truncated', 'Data was too large, showing first 3 items only');
        }
        
        new QRCode(qrcodeElement, {
            text: qrText,
            width: 200,
            height: 200,
            colorDark: "#2D9A58",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
    } catch(err) {
        console.error('Error generating QR code:', err);
        qrcodeElement.innerHTML = '<div style="width:200px;height:200px;display:flex;align-items:center;justify-content:center;border:1px solid #e2e8f0;background:#f8fafc;"><p>QR Generation Failed</p></div>';
        showToast('error', 'QR Generation Failed', 'Could not generate QR code');
    }
}

function downloadQrCode() {
    const qrCanvas = document.querySelector('#qrcode canvas');
    
    if (!qrCanvas) {
        showToast('error', 'Download Failed', 'No QR code available to download');
        return;
    }
    
    try {
        showLoading();
        
        setTimeout(() => {
            try {
                const link = document.createElement('a');
                link.download = 'eatwise-qrcode.png';
                link.href = qrCanvas.toDataURL('image/png');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                hideLoading();
                showToast('success', 'Download Started', 'QR code download initiated');
            } catch(err) {
                hideLoading();
                showToast('error', 'Download Failed', 'Could not download QR code');
            }
        }, 800);
    } catch(err) {
        hideLoading();
        showToast('error', 'Download Failed', 'Could not prepare QR code for download');
    }
}

function useSampleQr() {
    showLoading();
    
    setTimeout(() => {
        processInventoryData(sampleInventoryData);
        hideLoading();
    }, 800);
}

// Cashier Handlers
function setupCashierHandlers() {
    if (cashierBtn) cashierBtn.addEventListener('click', handleCashier);
    if (cashierBtnCta) cashierBtnCta.addEventListener('click', handleCashier);
    if (cashierCard) cashierCard.addEventListener('click', handleCashier);
}

function handleCashier() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        const newTab = window.open('', '_blank');
        if (newTab) {
            newTab.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>EatWise Cashier</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { 
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            min-height: 100vh;
                            display: flex;
                            flex-direction: column;
                        }
                        .header {
                            background: rgba(255,255,255,0.1);
                            backdrop-filter: blur(10px);
                            padding: 1rem 2rem;
                            border-bottom: 1px solid rgba(255,255,255,0.2);
                        }
                        .header-content {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            max-width: 1200px;
                            margin: 0 auto;
                        }
                        .logo {
                            color: white;
                            font-size: 1.5rem;
                            font-weight: bold;
                        }
                        .back-btn {
                            background: rgba(255,255,255,0.2);
                            color: white;
                            border: none;
                            padding: 0.75rem 1.5rem;
                            border-radius: 50px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            font-weight: 500;
                        }
                        .back-btn:hover {
                            background: rgba(255,255,255,0.3);
                            transform: translateY(-2px);
                        }
                        .main {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 2rem;
                        }
                        .cashier-container {
                            background: rgba(255,255,255,0.95);
                            backdrop-filter: blur(20px);
                            border-radius: 20px;
                            padding: 3rem;
                            text-align: center;
                            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                            max-width: 600px;
                            width: 100%;
                        }
                        .cashier-icon {
                            font-size: 4rem;
                            color: #FF7250;
                            margin-bottom: 2rem;
                        }
                        .cashier-title {
                            font-size: 2.5rem;
                            color: #333;
                            margin-bottom: 1rem;
                        }
                        .cashier-description {
                            font-size: 1.1rem;
                            color: #666;
                            margin-bottom: 2rem;
                            line-height: 1.6;
                        }
                        .external-btn {
                            background: linear-gradient(45deg, #FF7250, #FF9A7B);
                            color: white;
                            border: none;
                            padding: 1rem 2rem;
                            border-radius: 50px;
                            font-size: 1.1rem;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            text-decoration: none;
                            display: inline-flex;
                            align-items: center;
                            gap: 0.5rem;
                        }
                        .external-btn:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 10px 25px rgba(255,114,80,0.3);
                        }
                    </style>
                </head>
                <body>
                    <header class="header">
                        <div class="header-content">
                            <div class="logo">
                                <i class="fas fa-leaf"></i> EatWise Cashier
                            </div>
                            <button class="back-btn" onclick="handleBackToDashboard()">
                                <i class="fas fa-arrow-left"></i> Back to Dashboard
                            </button>
                        </div>
                    </header>
                    <main class="main">
                        <div class="cashier-container">
                            <div class="cashier-icon">
                                <i class="fas fa-cash-register"></i>
                            </div>
                            <h1 class="cashier-title">EatWise Cashier</h1>
                            <p class="cashier-description">
                                Welcome to the EatWise Cashier System! This powerful tool helps you scan items, 
                                manage purchases, and automatically update your food inventory. Connect to our 
                                advanced backend system for seamless inventory management.
                            </p>
                            <a href="https://lovable.dev/projects/e0f3fea0-b6a6-4fb5-b94a-7c08c86715be" 
                               target="_blank" 
                               class="external-btn">
                                <i class="fas fa-external-link-alt"></i>
                                Open Cashier System
                            </a>
                        </div>
                    </main>
                    <script>
                        function handleBackToDashboard() {
                            if (window.opener) {
                                window.opener.focus();
                            }
                            window.close();
                        }
                    </script>
                </body>
                </html>
            `);
            newTab.document.close();
        } else {
            showToast('warning', 'Opening Cashier', 'Redirecting to cashier system...');
            setTimeout(() => {
                window.open('https://lovable.dev/projects/e0f3fea0-b6a6-4fb5-b94a-7c08c86715be', '_blank');
            }, 1000);
        }
    }, 800);
}

// Modal Handlers
function setupModalHandlers() {
    // Add item modal
    if (closeAddModal) closeAddModal.addEventListener('click', () => hideModal(addItemModal));
    if (cancelAddItem) cancelAddItem.addEventListener('click', () => hideModal(addItemModal));
    
    // Recipe modal
    if (closeRecipeModal) closeRecipeModal.addEventListener('click', () => hideModal(recipeModal));
    
    // Modal backdrop click
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', () => {
            const openModals = document.querySelectorAll('.modal:not(.hidden)');
            openModals.forEach(modal => hideModal(modal));
        });
    }
    
    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal:not(.hidden)');
            openModals.forEach(modal => hideModal(modal));
        }
    });
}

// Utility Functions
function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getInitials(name) {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length > 1) {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

// Make functions available globally for onclick handlers
window.editInventoryItem = editInventoryItem;
window.deleteInventoryItem = deleteInventoryItem;
window.showRecipeModal = showRecipeModal;