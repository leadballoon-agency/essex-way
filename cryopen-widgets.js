// CryoPen Interactive Widgets
// Assessment Widget, Before/After Slider, Floating CTA

// ========================================
// ASSESSMENT WIDGET
// ========================================

let currentStep = 1;
const assessmentData = {
    treatmentType: '',
    lesionCount: 1,
    urgency: '',
    name: '',
    email: '',
    phone: ''
};

// Initialize Assessment Widget
function initAssessmentWidget() {
    // Step 1: Treatment Type Selection
    const treatmentOptions = document.querySelectorAll('.treatment-option');
    treatmentOptions.forEach(option => {
        option.addEventListener('click', () => {
            assessmentData.treatmentType = option.dataset.value;
            nextStep();
        });
    });

    // Step 2: Lesion Count Selection
    const countOptions = document.querySelectorAll('.count-option');
    countOptions.forEach(option => {
        option.addEventListener('click', () => {
            assessmentData.lesionCount = parseInt(option.dataset.count);
            nextStep();
        });
    });

    // Step 3: Urgency Selection
    const urgencyOptions = document.querySelectorAll('.urgency-option');
    urgencyOptions.forEach(option => {
        option.addEventListener('click', () => {
            assessmentData.urgency = option.dataset.urgency;
            nextStep();
        });
    });

    // Step 4: Form Submission
    const assessmentForm = document.getElementById('assessmentForm');
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            assessmentData.name = document.getElementById('assessment-name').value;
            assessmentData.email = document.getElementById('assessment-email').value;
            assessmentData.phone = document.getElementById('assessment-phone').value;

            if (!assessmentData.name || (!assessmentData.email && !assessmentData.phone)) {
                alert('Please provide your name and either email or phone number');
                return;
            }

            submitAssessment();
        });
    }
}

function nextStep() {
    const currentStepEl = document.getElementById(`step${currentStep}`);
    currentStepEl.classList.remove('active');

    currentStep++;

    const nextStepEl = document.getElementById(`step${currentStep}`);
    if (nextStepEl) {
        nextStepEl.classList.add('active');
        updateProgress();
    }
}

function previousStep() {
    const currentStepEl = document.getElementById(`step${currentStep}`);
    currentStepEl.classList.remove('active');

    currentStep--;

    const prevStepEl = document.getElementById(`step${currentStep}`);
    if (prevStepEl) {
        prevStepEl.classList.add('active');
        updateProgress();
    }
}

function updateProgress() {
    document.getElementById('currentStep').textContent = currentStep;
    const progressPercentage = ((currentStep - 1) / 4) * 100;
    document.getElementById('progressBar').style.width = progressPercentage + '%';
}

function submitAssessment() {
    console.log('Assessment submitted:', assessmentData);

    // Show success message
    document.getElementById('step4').classList.remove('active');
    document.getElementById('stepSuccess').classList.add('active');

    // In a real implementation, you would send this data to your backend
    // For now, we'll just log it
    setTimeout(() => {
        // You could redirect or reset the form here
    }, 3000);
}

// ========================================
// BEFORE/AFTER SLIDER
// ========================================

const galleryData = [
    {
        condition: 'Skin Tags',
        description: 'Neck area - Single session',
        timeframe: '2 weeks healing',
        beforeImage: 'images/before-after/skin-tags-before.jpg',
        afterImage: 'images/before-after/skin-tags-after.jpg'
    },
    {
        condition: 'Warts',
        description: 'Plantar wart removal',
        timeframe: '4 weeks healing',
        beforeImage: 'images/before-after/warts-before.jpg',
        afterImage: 'images/before-after/warts-after.jpg'
    },
    {
        condition: 'Age Spots',
        description: 'Facial pigmentation',
        timeframe: '3 weeks healing',
        beforeImage: 'images/before-after/lentigo-before.jpg',
        afterImage: 'images/before-after/lentigo-after.jpg'
    },
    {
        condition: 'Seborrheic Keratosis',
        description: 'Raised lesion removal',
        timeframe: '3 weeks healing',
        beforeImage: 'images/before-after/seborrheic-keratosis-before.jpg',
        afterImage: 'images/before-after/seborrheic-keratosis-after.jpg'
    },
    {
        condition: 'Cherry Angiomas',
        description: 'Vascular lesion removal',
        timeframe: '2 weeks healing',
        beforeImage: 'images/before-after/hemangioma-before.jpg',
        afterImage: 'images/before-after/hemangioma-after.jpg'
    },
    {
        condition: 'Actinic Keratosis',
        description: 'Precancerous lesion',
        timeframe: '3 weeks healing',
        beforeImage: 'images/before-after/actinic-keratosis-before.jpg',
        afterImage: 'images/before-after/actinic-keratosis-after.jpg'
    }
];

let currentCase = 0;
let isDragging = false;

function initBeforeAfterSlider() {
    const slider = document.getElementById('beforeAfterSlider');
    const handle = document.getElementById('sliderHandle');
    const beforeContainer = document.getElementById('beforeContainer');

    if (!slider || !handle || !beforeContainer) return;

    // Mouse events
    handle.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    // Touch events
    handle.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDragging);

    // Gallery tabs
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    galleryTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            currentCase = parseInt(tab.dataset.case);
            switchCase(currentCase);

            galleryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

function startDragging(e) {
    isDragging = true;
    e.preventDefault();
}

function stopDragging() {
    isDragging = false;
}

function drag(e) {
    if (!isDragging) return;

    const slider = document.getElementById('beforeAfterSlider');
    const handle = document.getElementById('sliderHandle');
    const beforeContainer = document.getElementById('beforeContainer');

    if (!slider || !handle || !beforeContainer) return;

    const rect = slider.getBoundingClientRect();
    let x;

    if (e.type.includes('touch')) {
        x = e.touches[0].clientX - rect.left;
    } else {
        x = e.clientX - rect.left;
    }

    // Constrain x between 0 and slider width
    x = Math.max(0, Math.min(x, rect.width));

    const percentage = (x / rect.width) * 100;

    beforeContainer.style.width = percentage + '%';
    handle.style.left = percentage + '%';
}

function switchCase(index) {
    const caseData = galleryData[index];

    // Update images
    const beforeImg = document.querySelector('.before-image');
    const afterImg = document.querySelector('.after-image');

    beforeImg.src = caseData.beforeImage;
    afterImg.src = caseData.afterImage;

    // Update info
    document.getElementById('galleryTitle').textContent = caseData.condition;
    document.getElementById('galleryDescription').textContent = caseData.description;
    document.getElementById('galleryTimeframe').textContent = 'Healing time: ' + caseData.timeframe;

    // Reset slider position
    const beforeContainer = document.getElementById('beforeContainer');
    const handle = document.getElementById('sliderHandle');

    beforeContainer.style.width = '50%';
    handle.style.left = '50%';
}

// ========================================
// FLOATING CTA
// ========================================

function initFloatingCTA() {
    const floatingCTA = document.getElementById('floatingCTA');
    if (!floatingCTA) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateFloatingCTA(lastScrollY);
                ticking = false;
            });

            ticking = true;
        }
    });
}

function updateFloatingCTA(scrollY) {
    const floatingCTA = document.getElementById('floatingCTA');
    if (!floatingCTA) return;

    // Show CTA after scrolling 500px
    if (scrollY > 500) {
        floatingCTA.classList.add('visible');
    } else {
        floatingCTA.classList.remove('visible');
    }

    // Hide CTA when near footer
    const footer = document.querySelector('.footer');
    if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (footerTop < windowHeight + 100) {
            floatingCTA.classList.remove('visible');
        }
    }
}

// ========================================
// INITIALIZE ALL WIDGETS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initAssessmentWidget();
    initBeforeAfterSlider();
    initFloatingCTA();

    console.log('CryoPen widgets initialized');
});
