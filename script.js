// ===== МОБИЛЬНОЕ МЕНЮ =====
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ===== ПЛАВНАЯ ПРОКРУТКА =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Закрываем мобильное меню
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// ===== ОБНОВЛЕНИЕ СУММЫ ПРИ ВЫБОРЕ ТАРИФА =====
document.addEventListener('DOMContentLoaded', function() {
    const planRadios = document.querySelectorAll('input[name="plan"]');
    const totalElement = document.getElementById('totalAmount');
    
    const prices = {
        'monthly': '199 ₽',
        'annual': '1 788 ₽',
        'lifetime': '2 999 ₽'
    };
    
    planRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const plan = this.value;
            totalElement.textContent = prices[plan] || '0 ₽';
        });
    });
});

// ===== ОБРАБОТКА ФОРМЫ ПРОДЛЕНИЯ =====
function handleRenew(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const plan = document.querySelector('input[name="plan"]:checked');
    const payment = document.querySelector('input[name="payment"]:checked');
    
    if (!email || !plan || !payment) {
        alert('⚠️ Пожалуйста, заполните все поля!');
        return false;
    }
    
    const planNames = {
        'monthly': '📆 Месячный (199 ₽)',
        'annual': '📅 Годовой (1 788 ₽)',
        'lifetime': '♾️ Пожизненный (2 999 ₽)'
    };
    
    const paymentNames = {
        'card': '💳 Карта',
        'crypto': '🪙 Криптовалюта',
        'qiwi': '📱 Qiwi',
        'sbp': '🏦 СБП'
    };
    
    const button = document.querySelector('#renewForm .btn');
    const originalText = button.textContent;
    button.textContent = '⏳ Обработка...';
    button.disabled = true;
    
    setTimeout(() => {
        alert(
            '✅ Запрос на продление отправлен!\n\n' +
            '📧 Email: ' + email + '\n' +
            '💎 Тариф: ' + planNames[plan.value] + '\n' +
            '💳 Оплата: ' + paymentNames[payment.value] + '\n\n' +
            '📨 Ссылка для оплаты отправлена на ' + email + '\n' +
            '⏱ Ссылка действительна 24 часа.'
        );
        
        button.textContent = originalText;
        button.disabled = false;
        
        document.getElementById('renewForm').reset();
        document.getElementById('totalAmount').textContent = '1 788 ₽';
        
    }, 1500);
    
    return false;
}

// ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .pricing-card, .plan-option').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});