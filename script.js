/* ============================================================
   THEME TOGGLE — Đổi sáng/tối
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('neotes-theme') || 'dark';

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('neotes-theme', theme);
}

// Khôi phục theme đã lưu
setTheme(savedTheme);

// Nhấn nút để đổi theme
themeToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});


/* ============================================================
   SCROLL TO TOP — Nút cuộn lên đầu trang
   ============================================================ */
const scrollBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================================
   SMOOTH SCROLL — Cuộn mượt khi nhấn menu
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#' || !href.startsWith('#')) return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 70; // Chừa chỗ cho header
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});


/* ============================================================
   FAQ ACCORDION — Mở/đóng câu hỏi
   ============================================================ */
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        item.classList.toggle('open');
    });
});


/* ============================================================
   COPY BUTTON — Copy lệnh cài đặt
   ============================================================ */
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const text = btn.getAttribute('data-copy');
        try {
            await navigator.clipboard.writeText(text);
            btn.textContent = '✅ Đã copy';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = '📋 Copy';
                btn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            // Fallback cho trình duyệt cũ
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            btn.textContent = '✅ Đã copy';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = '📋 Copy';
                btn.classList.remove('copied');
            }, 2000);
        }
    });
});


/* ============================================================
   CONTACT FORM — Xử lý gửi form
   ============================================================ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const status = document.getElementById('formStatus');
        status.className = 'form-status success';
        status.textContent = '✅ Đã gửi! Cảm ơn bạn đã liên hệ. (Demo — chưa kết nối backend)';
        
        // Reset form sau 5 giây
        setTimeout(() => {
            contactForm.reset();
            status.className = 'form-status';
            status.textContent = '';
        }, 5000);
    });
}


/* ============================================================
   SCROLL REVEAL — Hiệu ứng xuất hiện khi cuộn
   ============================================================ */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.card, .version, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s, border-color 0.2s, box-shadow 0.25s';
    observer.observe(el);
});


/* ============================================================
   ACTIVE NAV LINK — Highlight menu khi cuộn
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--accent)';
        }
    });
});


/* ============================================================
   CONSOLE — Easter egg
   ============================================================ */
console.log(
    '%c🛡️ NeOTes Security Lab',
    'background: linear-gradient(135deg, #36a3ff, #55e391); color: white; padding: 10px 20px; border-radius: 8px; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cWeb Vulnerability Scanner v4.0.0',
    'color: #91a1b3; font-size: 13px; padding: 4px 20px;'
);
console.log(
    '%c⚠️ Chỉ sử dụng cho mục đích hợp pháp — kiểm thử web của chính bạn!',
    'color: #febc2e; font-size: 12px; padding: 4px 20px;'
);
