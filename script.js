// ===== A. LOGIKA ANIMASI SELAMAT DATANG =====
window.addEventListener('load', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    
    // Mulai memudar setelah 2.5 detik
    setTimeout(() => {
        welcomeScreen.classList.remove('opacity-100');
        welcomeScreen.classList.add('opacity-0');
    }, 2500);
    
    // Hapus dari layar setelah transisi selesai (3.5 detik)
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
    }, 3500);
});

// ===== B. LOGIKA NAVBAR STICKY =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg', 'py-4');
        navbar.classList.remove('bg-transparent', 'py-6');
    } else {
        navbar.classList.add('bg-transparent', 'py-6');
        navbar.classList.remove('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg', 'py-4');
    }
});

// ===== C. LOGIKA TAB PORTOFOLIO =====
function openTab(tabId) {
    // Sembunyikan semua konten tab
    const allContents = document.querySelectorAll('.tab-content, .tab-content-software');
    allContents.forEach(content => {
        content.classList.remove('active');
    });

    // Matikan warna biru/teal di semua tombol
    const allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('bg-teal-500', 'text-white', 'shadow-lg', 'shadow-teal-500/30');
        btn.classList.add('bg-slate-800', 'text-slate-400');
    });

    // Aktifkan tab yang dipilih
    document.getElementById(`tab-${tabId}`).classList.add('active');
    
    // Aktifkan warna pada tombol yang di klik
    const clickedBtn = document.getElementById(`btn-${tabId}`);
    clickedBtn.classList.remove('bg-slate-800', 'text-slate-400');
    clickedBtn.classList.add('bg-teal-500', 'text-white', 'shadow-lg', 'shadow-teal-500/30');
}

// ===== D. LOGIKA MODAL (POP-UP) =====
const modal = document.getElementById('portfolioModal');
const modalContent = document.getElementById('modalContent');

function showModal(title, subtitle, year, summary, description) {
    // Isi data ke dalam modal
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-subtitle').innerText = subtitle;
    document.getElementById('modal-year').innerText = year;
    document.getElementById('modal-summary').innerText = summary;
    document.getElementById('modal-description').innerHTML = description;

    // Tampilkan Modal
    modal.classList.remove('hidden');
    
    // Sedikit delay agar animasi transisi scale up terlihat
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeModal() {
    // Animasikan mengecil dan memudar
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    // Sembunyikan setelah animasi selesai
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}
