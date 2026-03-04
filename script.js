document.addEventListener('DOMContentLoaded', () => {
    // 语言切换
    const langBtn = document.getElementById('langToggle');
    if(localStorage.getItem('lang') === 'en') document.body.classList.add('en-mode');
    
    if(langBtn) {
        langBtn.addEventListener('click', () => {
            document.body.classList.toggle('en-mode');
            localStorage.setItem('lang', document.body.classList.contains('en-mode') ? 'en' : 'cn');
        });
    }

    // 马列维奇漂浮视差 (鼠标移动，几何体反向移动)
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = (window.innerWidth - e.pageX) / 20;
        const y = (window.innerHeight - e.pageY) / 20;
        
        shapes.forEach((s, i) => {
            const speed = (i + 1) * 0.5;
            s.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${x}deg)`;
        });
    });
});