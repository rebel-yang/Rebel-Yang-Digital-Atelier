document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langToggle');
    if(localStorage.getItem('lang') === 'en') {
        document.body.classList.add('en-mode');
    }
    if(langBtn) {
        langBtn.addEventListener('click', () => {
            document.body.classList.toggle('en-mode');
            localStorage.setItem('lang', document.body.classList.contains('en-mode') ? 'en' : 'cn');
        });
    }
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        shapes.forEach((s, i) => {
            s.style.transform = `translate(${x * (i+1) * 10}px, ${y * (i+1) * 10}px)`;
        });
    });
});