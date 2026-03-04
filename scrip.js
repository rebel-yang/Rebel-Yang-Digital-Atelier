document.addEventListener('DOMContentLoaded', () => {
    // 1. 语言切换
    const btn = document.getElementById('langToggle');
    if(localStorage.getItem('lang') === 'en') document.body.classList.add('en-mode');
    
    if(btn) {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('en-mode');
            localStorage.setItem('lang', document.body.classList.contains('en-mode') ? 'en' : 'cn');
        });
    }

    // 2. 简单的视差背景 (鼠标移动)
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.float-shape');
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        shapes.forEach((s, i) => {
            const factor = (i + 1) * 0.5;
            s.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });

    // 3. 滚动入场动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    });
    
    // 页面元素默认暂停，滚动到才播放
    document.querySelectorAll('.fade-in-up').forEach(el => {
        // el.style.animationPlayState = 'paused'; // 可选：如果希望一开始就动，注释掉这行
        // observer.observe(el);
    });
});