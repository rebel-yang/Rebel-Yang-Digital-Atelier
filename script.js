document.addEventListener('DOMContentLoaded', () => {
    // 1. 生成星空背景 (Procedural Star Generation)
    const starContainer = document.createElement('div');
    starContainer.className = 'stars-container';
    document.body.appendChild(starContainer);

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        // 随机位置
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        // 随机大小
        const size = Math.random() * 2 + 1;
        // 随机延迟动画
        const delay = Math.random() * 5;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        
        starContainer.appendChild(star);
    }

    // 2. 语言切换
    const btn = document.getElementById('langToggle');
    // 读取缓存
    if(localStorage.getItem('lang') === 'en') {
        document.body.classList.add('en-mode');
    }
    
    if(btn) {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('en-mode');
            localStorage.setItem('lang', document.body.classList.contains('en-mode') ? 'en' : 'cn');
        });
    }
});