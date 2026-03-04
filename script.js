document.addEventListener('DOMContentLoaded', () => {
    // 1. 语言切换
    const langBtn = document.getElementById('langToggle');
    if(localStorage.getItem('lang') === 'en') document.body.classList.add('en-mode');
    
    if(langBtn) {
        langBtn.addEventListener('click', () => {
            document.body.classList.toggle('en-mode');
            localStorage.setItem('lang', document.body.classList.contains('en-mode') ? 'en' : 'cn');
        });
    }

    // 2. 马列维奇背景生成器 (随机几何)
    const bgContainer = document.createElement('div');
    bgContainer.id = 'canvas-container';
    document.body.prepend(bgContainer);

    const colors = ['var(--c-red)', 'var(--c-yellow)', 'var(--c-blue)', 'var(--c-black)'];
    const shapes = ['geo-rect', 'geo-circle', 'geo-line'];

    // 生成 12 个随机漂浮物体
    for (let i = 0; i < 12; i++) {
        const el = document.createElement('div');
        const size = Math.random() * 100 + 20; // 20px - 120px
        const shapeClass = shapes[Math.floor(Math.random() * shapes.length)];
        
        el.classList.add('float-geo', shapeClass);
        
        // 随机样式
        if(shapeClass !== 'geo-line') {
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        } else {
            el.style.width = `${Math.random() * 200 + 50}px`;
            el.style.height = '4px';
        }

        // 随机位置
        el.style.left = `${Math.random() * 90}%`;
        el.style.top = `${Math.random() * 90}%`;
        el.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // 视差系数
        el.dataset.speed = Math.random() * 0.5 + 0.1;

        bgContainer.appendChild(el);
    }

    // 3. 鼠标视差效果
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2);
        const y = (e.clientY - window.innerHeight / 2);

        document.querySelectorAll('.float-geo').forEach(el => {
            const speed = parseFloat(el.dataset.speed);
            el.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${el.style.transform.match(/rotate\((.*?)deg\)/)?.[1] || 0}deg)`;
        });
    });
});