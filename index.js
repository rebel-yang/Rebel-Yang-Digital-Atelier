document.addEventListener('DOMContentLoaded', () => {
    // 1. 语言切换
    const langBtn = document.getElementById('langToggle');
    // 检查本地存储
    if(localStorage.getItem('lang') === 'en') {
        document.body.classList.add('en-mode');
    }
    if(langBtn) {
        langBtn.addEventListener('click', () => {
            document.body.classList.toggle('en-mode');
            localStorage.setItem('lang', document.body.classList.contains('en-mode') ? 'en' : 'cn');
        });
    }

    // 2. 简单的鼠标移动视差效果 (增加艺术感)
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        shapes.forEach((s, i) => {
            const factor = (i + 1) * 10;
            s.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });
});