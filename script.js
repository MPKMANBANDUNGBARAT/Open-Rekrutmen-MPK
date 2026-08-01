// Inisialisasi Ikon Lucide
lucide.createIcons();

// Endpoint Google Apps Script milikmu
const scriptURL = 'https://script.google.com/macros/s/AKfycbxNTPC16fHXVEq7q-Ni38SfUOzJHjvp7n2kglGiiyjeWU7XJyJxX3MnuwtJ076F1ZEOIw/exec'; 

// Fungsi Perpindahan Tab / Section
function switchTab(sectionId) {
    document.getElementById('main-menu').classList.add('hidden');
    
    // Sembunyikan semua seksi
    const sections = ['section-dokumen', 'section-materi', 'section-penilaian', 'section-form'];
    sections.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });

    // Tampilkan seksi yang dipilih
    document.getElementById(sectionId).classList.remove('hidden');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function backToMenu() {
    const sections = ['section-dokumen', 'section-materi', 'section-penilaian', 'section-form'];
    sections.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById('main-menu').classList.remove('hidden');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// LOGIK PENGIRIMAN FORM & MODAL
const form = document.getElementById('oprec-form');
const btn = document.getElementById('submit-btn');

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-circle-notch animate-spin mr-2"></i> Memproses...`;

    fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
    .then(() => {
        openModal();
        btn.disabled = false;
        btn.innerText = "Kirim Data Pendaftaran";
        form.reset();
        backToMenu();
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert("Gagal mengirim data. Silakan periksa koneksi internet Anda.");
        btn.disabled = false;
        btn.innerText = "Kirim Data Pendaftaran";
    });
});

function openModal() {
    const modal = document.getElementById('success-modal');
    const content = document.getElementById('modal-content');
    modal.classList.remove('hidden');
    setTimeout(() => {
        content.classList.remove('opacity-0', 'scale-90');
        content.classList.add('opacity-100', 'scale-100');
    }, 50);
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    const content = document.getElementById('modal-content');
    content.classList.remove('opacity-100', 'scale-100');
    content.classList.add('opacity-0', 'scale-90');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); 
}