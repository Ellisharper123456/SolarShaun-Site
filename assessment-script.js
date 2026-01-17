// Smooth scroll to form
function scrollToForm() {
    document.getElementById('assessment-form').scrollIntoView({
        behavior: 'smooth'
    });
}

// Form handling
let currentStep = 1;
const totalSteps = 8;

// Show specific step
function showStep(step) {
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(s => s.classList.remove('active'));
    
    const activeStep = document.querySelector(`[data-step="${step}"]`);
    if (activeStep) {
        activeStep.classList.add('active');
    }
    
    updateProgress();
    updateNavButtons();
}

// Update progress bar
function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    const progressFill = document.querySelector('.progress-fill');
    const currentStepText = document.querySelector('.current-step');
    
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
    
    if (currentStepText) {
        currentStepText.textContent = currentStep;
    }
}

// Update navigation buttons
function updateNavButtons() {
    const btnBack = document.querySelector('.btn-back');
    
    if (btnBack) {
        btnBack.style.display = currentStep > 1 && currentStep < 8 ? 'block' : 'none';
    }
}

// Go to next step
function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

// Go to previous step
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// Auto-advance on radio selection (steps 1-7)
document.addEventListener('DOMContentLoaded', function() {
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    
    radioInputs.forEach(radio => {
        radio.addEventListener('change', function() {
            if (currentStep < 8) {
                setTimeout(() => {
                    nextStep();
                }, 400);
            }
        });
    });
    
    // Back button
    const btnBack = document.querySelector('.btn-back');
    if (btnBack) {
        btnBack.addEventListener('click', prevStep);
    }
    
    // Skip button
    const btnSkip = document.querySelector('.btn-skip');
    if (btnSkip) {
        btnSkip.addEventListener('click', nextStep);
    }
    
    // Form submission
    const form = document.getElementById('solarQuiz');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const postcode = document.getElementById('postcode');
            const consent = document.querySelector('input[name="consent"]');
            
            // Sanitize inputs
            if (fullName) fullName.value = fullName.value.trim();
            if (email) email.value = email.value.trim().toLowerCase();
            if (phone) phone.value = phone.value.trim();
            if (postcode) postcode.value = postcode.value.trim().toUpperCase();
            
            // Validate consent
            if (!consent || !consent.checked) {
                alert('Please agree to be contacted by installers.');
                return;
            }
            
            // Collect form data
            const formData = new FormData(form);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                // Basic XSS prevention - strip HTML tags
                if (typeof value === 'string') {
                    data[key] = value.replace(/<[^>]*>/g, '');
                } else {
                    data[key] = value;
                }
            }
            
            console.log('Form submitted:', data);
            
            // Redirect to thank you page
            window.location.href = 'thank-you.html';
        });
    }
    
    // Initialize
    showStep(1);
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
            // Change icon
            if (navMenu.classList.contains('mobile-open')) {
                mobileMenuToggle.innerHTML = '✕';
            } else {
                mobileMenuToggle.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link, .nav-cta');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('mobile-open');
                mobileMenuToggle.innerHTML = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('mobile-open');
                mobileMenuToggle.innerHTML = '☰';
            }
        });
    }
});

