// =========================================================================
// ===== A. LOGIKA ANIMASI SELAMAT DATANG (WELCOME SCREEN) =================
// =========================================================================
window.addEventListener('load', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    
    if (welcomeScreen) {
        // Mengubah opacity menjadi 0 setelah 2.5 detik
        setTimeout(() => {
            welcomeScreen.classList.remove('opacity-100');
            welcomeScreen.classList.add('opacity-0');
        }, 2500);
        
        // Menghilangkan elemen dari display setelah animasi selesai (3.5 detik)
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
        }, 3500);
    }
});

// =========================================================================
// ===== B. LOGIKA NAVBAR STICKY & BLUR EFFECT =============================
// =========================================================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg', 'py-4');
            navbar.classList.remove('bg-transparent', 'py-6');
        } else {
            navbar.classList.add('bg-transparent', 'py-6');
            navbar.classList.remove('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg', 'py-4');
        }
    }
});

// =========================================================================
// ===== C. LOGIKA MOBILE MENU NAVIGATION ==================================
// =========================================================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
    });
}

function closeMobileMenu() {
    if (mobileNav) {
        mobileNav.classList.add('hidden');
    }
}

// Menambahkan event listener ke setiap link navigasi mobile agar menu menutup saat diklik
document.querySelectorAll('#mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// =========================================================================
// ===== D. LOGIKA TAB SWITCHING PORTOFOLIO ================================
// =========================================================================
function openTab(tabId) {
    // Menyembunyikan semua konten tab terlebih dahulu
    const allContents = document.querySelectorAll('.tab-content, .tab-content-software');
    allContents.forEach(content => {
        content.classList.remove('active');
    });

    // Mereset semua gaya tombol tab menjadi tidak aktif
    const allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('bg-teal-500', 'text-white', 'shadow-lg', 'shadow-teal-500/30');
        btn.classList.add('bg-slate-800', 'text-slate-400');
    });

    // Menampilkan konten tab yang dipilih
    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');
    
    // Mengubah gaya tombol tab yang sedang aktif
    const clickedBtn = document.getElementById(`btn-${tabId}`);
    if (clickedBtn) {
        clickedBtn.classList.remove('bg-slate-800', 'text-slate-400');
        clickedBtn.classList.add('bg-teal-500', 'text-white', 'shadow-lg', 'shadow-teal-500/30');

        // Otomatis scroll tombol ke tengah jika dibuka di handphone (layar kecil)
        if (window.innerWidth < 768) {
            const tabButtons = document.querySelector('.overflow-x-auto');
            if (tabButtons) {
                setTimeout(() => {
                    clickedBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }, 100);
            }
        }
    }
}

// =========================================================================
// ===== E. DATA & LOGIKA MODAL SLIDER PRESTASI & SERTIFIKASI =============
// =========================================================================
const prestSliderData = {
    'prest-item-1': {
        title: 'Juara 1 Poster Ilmiah',
        description: 'Penghargaan atas pencapaian tertinggi dalam kompetisi poster ilmiah tingkat nasional tahun 2025.',
        slides: [
            { type: 'image', src: 'https://raw.githubusercontent.com/isroni010/Portofolio/main/sertif/poster1.jfif' },
            { type: 'image', src: 'https://raw.githubusercontent.com/isroni010/Portofolio/main/sertif/poster2.jpeg' }
        ]
    },
    'prest-item-2': {
        title: 'Sertifikasi Data Analyst - Special Skill',
        description: 'Sertifikasi profesional dalam analisis data dan pengembangan skill khusus di bidang data science.',
        slides: [
            { type: 'image', src: 'https://raw.githubusercontent.com/isroni010/Portofolio/main/sertif/dataanalyst1.jfif' },
            { type: 'image', src: 'https://raw.githubusercontent.com/isroni010/Portofolio/main/sertif/dataanalyst2.jfif' }
        ]
    },
    'prest-item-5': {
        title: 'Juara 2 SDGs Content Litera',
        description: 'Penghargaan atas kreativitas dalam membuat konten edukatif tentang Sustainable Development Goals.',
        slides: [
            { type: 'image', src: 'https://raw.githubusercontent.com/isroni010/Portofolio/main/sertif/sdgs2023.jfif' },
            { type: 'video', src: 'https://youtu.be/NaPGw-DoqA8?si=hHmCp-ZNn2Coc273' }
        ]
    },
    'prest-item-8': {
        title: 'Sertifikasi LKMM TD II',
        description: 'Sertifikasi Latihan Keterampilan Manajemen Mahasiswa tingkat Dua (TD II) untuk pengembangan kepemimpinan.',
        slides: [
            { type: 'image', src: 'https://raw.githubusercontent.com/isroni010/Portofolio/main/sertif/lkmm2022a.jpeg' },
            { type: 'image', src: 'https://raw.githubusercontent.com/isroni010/Portofolio/main/sertif/lkmm2022b.jpeg' }
        ]
    }
};

function openPrestSlider(itemId) {
    const data = prestSliderData[itemId];
    if (!data) return;

    const modal = document.getElementById('prestSliderModal');
    const content = document.getElementById('prestSliderContent');
    if (!modal || !content) return;
    
    let sliderHTML = `
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">${data.title}</h2>
        <p class="text-slate-400 mb-6 text-sm sm:text-base">${data.description}</p>
        <div class="swiper prest-modal-swiper mb-6" id="prest-swiper-${itemId}">
            <div class="swiper-wrapper">
    `;
    
    data.slides.forEach((slide, idx) => {
        if (slide.type === 'image') {
            sliderHTML += `
                <div class="swiper-slide">
                    <img src="${slide.src}" alt="Slide ${idx + 1}" class="w-full h-auto max-h-96 object-contain rounded-lg">
                </div>
            `;
        } else if (slide.type === 'video') {
            const videoId = extractYoutubeId(slide.src);
            sliderHTML += `
                <div class="swiper-slide">
                    <div class="w-full bg-slate-900 rounded-lg overflow-hidden">
                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" 
                                title="YouTube video player" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                        </iframe>
                    </div>
                </div>
            `;
        }
    });
    
    sliderHTML += `
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    `;
    
    content.innerHTML = sliderHTML;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Kunci scroll background saat modal aktif
    
    setTimeout(() => {
        if (typeof Swiper !== 'undefined') {
            new Swiper(`#prest-swiper-${itemId}`, {
                loop: true,
                pagination: {
                    el: `#prest-swiper-${itemId} .swiper-pagination`,
                    clickable: true,
                },
                navigation: {
                    nextEl: `#prest-swiper-${itemId} .swiper-button-next`,
                    prevEl: `#prest-swiper-${itemId} .swiper-button-prev`,
                },
                autoplay: false, // Nonaktifkan autoplay sesuai instruksi manual scroll
                spaceBetween: 30,
            });
        }
    }, 100);
}

function extractYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
}

function closePrestSliderModal() {
    const modal = document.getElementById('prestSliderModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Kembalikan scroll background
    }
}

// =========================================================================
// ===== G. GLOBAL EVENT LISTENERS (TOMBOL ESCAPE) =========================
// =========================================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal && !modal.classList.contains('hidden')) {
            closeModal();
        } else if (document.getElementById('prestSliderModal') && !document.getElementById('prestSliderModal').classList.contains('hidden')) {
            closePrestSliderModal();
        }
    }
});
