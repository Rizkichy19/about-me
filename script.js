// Inisialisasi AOS (Animate On Scroll) library
// Pastikan baris ini sudah ada di <script> di akhir body HTML Anda:
// <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
// <script>AOS.init();</script>

document.addEventListener('DOMContentLoaded', function() {
    // 1. Menentukan Tahun Saat Ini di Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Active Link Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    function setActiveLink() {
        let currentActive = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset untuk header fixed
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentActive = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });
    }

    // Panggil saat load dan scroll
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Panggil sekali saat halaman dimuat untuk set posisi awal

    // Smooth scroll for navigation links (jika tidak menggunakan scroll-behavior: smooth di CSS)
    // navLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href').substring(1);
    //         const targetSection = document.getElementById(targetId);
    //         window.scrollTo({
    //             top: targetSection.offsetTop - 80, // Sesuaikan offset jika perlu
    //             behavior: 'smooth'
    //         });
    //     });
    // });


    // 3. Animasi Teks Neon di Hero Section (Opsional, lebih kompleks dengan GSAP/Typed.js)
    // Untuk animasi teks neon seperti typing effect atau glitch, biasanya memerlukan library seperti Typed.js atau GSAP.
    // Contoh sederhana typing effect tanpa library tambahan:
    const heroTitle = document.querySelector('.hero-content h1');
    const nameSpan = document.querySelector('.hero-content .neon-name');

    if (heroTitle && nameSpan) {
        const fullText = "Halo, saya Rizki Cahya Putra";
        const namePart = "Rizki Cahya Putra"; 
        const prefixPart = fullText.substring(0, fullText.indexOf(namePart));

        heroTitle.textContent = ''; // Kosongkan teks awal

        let charIndex = 0;
        function typeText() {
            if (charIndex < prefixPart.length) {
                heroTitle.textContent += prefixPart.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 70); // Kecepatan ketik
            } else if (charIndex - prefixPart.length < namePart.length) {
                // Tambahkan teks nama ke span yang sudah ada
                if (nameSpan.textContent.length < namePart.length) {
                    nameSpan.textContent += namePart.charAt(charIndex - prefixPart.length);
                    heroTitle.appendChild(nameSpan); // Pastikan span adalah child dari h1
                    charIndex++;
                    setTimeout(typeText, 100); // Kecepatan ketik nama bisa berbeda
                } else {
                    // Setelah nama selesai, mungkin tambahkan kursor berkedip atau efek lain
                }
            } else {
                 // Teks selesai, mungkin tambahkan animasi kursor berkedip
                 // Atau biarkan saja seperti ini
                 // Misalnya, tambahkan class untuk animasi CSS kursor
                heroTitle.classList.add('typing-done');
            }
        }
        // Mulai animasi setelah jeda singkat
        setTimeout(typeText, 500);
    }


    // 4. Efek Parallax Sederhana (untuk elemen latar belakang jika ada)
    // Ini membutuhkan elemen spesifik di HTML yang bisa digerakkan.
    // Misal, tambahkan div di hero section: <div class="parallax-bg"></div>
    const parallaxBg = document.querySelector('.parallax-bg'); // Buat elemen ini di HTML
    if (parallaxBg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            // Gerakkan background lebih lambat dari scroll
            parallaxBg.style.transform = 'translateY(' + scrollPosition * 0.4 + 'px)';
        });
    }

    // Contoh penambahan elemen background untuk parallax di Hero Section (bisa ditambahkan di HTML)
    /*
    <section id="hero" class="hero-section">
        <div class="hero-content">
            ...
        </div>
        <div class="parallax-element parallax-layer-1"></div> // Garis sirkuit
        <div class="parallax-element parallax-layer-2"></div> // Partikel
    </section>
    */
    // Dan tambahkan CSS untuk `.parallax-element`
    // Contoh CSS untuk parallax-element (tambahkan di style.css):
    /*
    .parallax-element {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        pointer-events: none; // Agar tidak mengganggu interaksi mouse
    }

    .parallax-layer-1 {
        background-image: url('path/to/your/circuit-pattern.png'); // Buat atau cari gambar pola sirkuit
        background-repeat: repeat;
        opacity: 0.1;
        transition: transform 0.1s ease-out; // Transisi untuk gerakan halus
    }

    .parallax-layer-2 {
        background-image: url('path/to/your/particles.png'); // Buat atau cari gambar partikel
        background-repeat: repeat;
        opacity: 0.05;
        transition: transform 0.1s ease-out;
    }
    */
    // Dan JavaScript untuk memanggil parallax-element:
    const parallaxLayers = document.querySelectorAll('.parallax-element');
    if (parallaxLayers.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            parallaxLayers.forEach((layer, index) => {
                const speed = 0.2 + (index * 0.1); // Layer yang berbeda bergerak dengan kecepatan berbeda
                layer.style.transform = 'translateY(' + scrollPosition * speed + 'px)';
            });
        });
    }

});