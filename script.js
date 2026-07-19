// Initialize Lucide icons
lucide.createIcons();

// Responsive Mobile Nav Stack
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
let isOpen = false;

menuToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
        mobileMenu.classList.remove('hidden');
        menuToggle.innerHTML = `<i data-lucide="x" class="w-6 h-6"></i>`;
    } else {
        mobileMenu.classList.add('hidden');
        menuToggle.innerHTML = `<i data-lucide="menu" class="w-6 h-6"></i>`;
    }
    lucide.createIcons();
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        isOpen = false;
        mobileMenu.classList.add('hidden');
        menuToggle.innerHTML = `<i data-lucide="menu" class="w-6 h-6"></i>`;
        lucide.createIcons();
    });
});

// Lightbox Expansion Logic
const lightbox = document.getElementById('lightbox-modal');
const lightboxContainer = document.getElementById('lightbox-container');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(imgSrc, captionText) {
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = captionText;

    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    lightbox.classList.remove('pointer-events-none');

    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
        lightboxContainer.classList.remove('opacity-0', 'scale-95');
        lightboxContainer.classList.add('scale-100');
    }, 20);

    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.add('opacity-0');
    lightbox.classList.add('pointer-events-none');
    lightboxContainer.classList.remove('scale-100');
    lightboxContainer.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
    }, 300);

    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Clipboard Helper Engine Loop
function copyContactDetail(textToCopy, elementBlock) {
    navigator.clipboard.writeText(textToCopy).then(() => {
        const textNode = elementBlock.querySelector('.badge-text');
        const badgeIcon = elementBlock.querySelector('.copy-badge i');

        textNode.textContent = 'Copied!';
        textNode.classList.add('text-emerald-400');
        elementBlock.querySelector('.copy-badge').classList.add('border-emerald-500/30');

        if (badgeIcon) {
            badgeIcon.setAttribute('data-lucide', 'check');
            lucide.createIcons();
        }

        setTimeout(() => {
            textNode.textContent = 'Copy';
            textNode.classList.remove('text-emerald-400');
            elementBlock.querySelector('.copy-badge').classList.remove('border-emerald-500/30');
            if (badgeIcon) {
                badgeIcon.setAttribute('data-lucide', 'copy');
                lucide.createIcons();
            }
        }, 2000);
    }).catch(err => {
        console.error('Could not copy context text: ', err);
    });
}

// Subtle 3D Tilt & Depth (profile hero image only)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.tilt-scene').forEach(scene => {
    const card = scene.querySelector('.tilt-card');
    if (!card || prefersReducedMotion) return;

    const MAX_TILT = 10; // degrees — subtle

    scene.addEventListener('mousemove', (e) => {
        const rect = scene.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;   // 0..1
        const py = (e.clientY - rect.top) / rect.height;   // 0..1
        const rotateY = (px - 0.5) * 2 * MAX_TILT;
        const rotateX = (0.5 - py) * 2 * MAX_TILT;
        card.classList.remove('is-resetting');
        card.style.transform =
            `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.04)`;
    });

    scene.addEventListener('mouseleave', () => {
        card.classList.add('is-resetting');
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
});
