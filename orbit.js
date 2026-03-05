/* orbit.js - The Galactic Engine */

document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initOrbitSystem();
    initLanguage();
});

// 1. 星空背景逻辑
function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, stars = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5 + 0.1
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#FFFFFF';
        stars.forEach(star => {
            star.y -= star.speed;
            if (star.y < 0) star.y = height;
            ctx.globalAlpha = Math.random() * 0.5 + 0.5;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
}

// 2. 核心：卡牌轨道与展开逻辑
function initOrbitSystem() {
    const container = document.querySelector('.orbit-container');
    if (!container) return; // 只在首页运行

    const cards = document.querySelectorAll('.tarot-card');
    const radiusX = 300; // 椭圆轨道长轴
    const radiusY = 100; // 椭圆轨道短轴
    let angle = 0;
    let isHovered = false;
    let animationFrame;

    // 公转动画
    function animateOrbit() {
        if (!isHovered) {
            angle += 0.005; // 公转速度
            cards.forEach((card, index) => {
                // 计算每张卡的相位 (120度间隔)
                const offset = (index * 2 * Math.PI) / 3;
                const currentAngle = angle + offset;

                // 3D 轨道公式
                const x = Math.cos(currentAngle) * radiusX;
                const z = Math.sin(currentAngle) * radiusY; // 深度
                const scale = (z + 200) / 200; // 近大远小
                const opacity = (z + 150) / 250; // 远处的暗淡

                // 应用样式：公转状态
                card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${z}px, ${z}px) scale(${scale * 0.6})`;
                card.style.zIndex = Math.floor(z);
                card.style.opacity = Math.max(0.2, opacity);
                card.style.filter = `blur(${Math.max(0, -z/30)}px)`; // 远处模糊
            });
        }
        animationFrame = requestAnimationFrame(animateOrbit);
    }

    // 扇形展开 (悬停时)
    function spreadCards() {
        isHovered = true;
        cards.forEach((card, index) => {
            // 停止公转，强制设定到扇形位置
            // index 0: 左, 1: 中, 2: 右
            const spreadX = (index - 1) * 260; // 间距
            const rotate = (index - 1) * 10;   // 角度微倾
            
            card.style.transform = `translate(-50%, -50%) translate3d(${spreadX}px, 0, 0) rotate(${rotate}deg) scale(1)`;
            card.style.zIndex = 100;
            card.style.opacity = 1;
            card.style.filter = 'blur(0)';
            card.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.4)';
        });
    }

    // 事件监听
    const triggerZone = document.querySelector('.interaction-zone');
    
    triggerZone.addEventListener('mouseenter', spreadCards);
    
    triggerZone.addEventListener('mouseleave', () => {
        isHovered = false;
        // 鼠标移开，卡牌会平滑回到轨道计算的位置
    });

    animateOrbit();
}

// 3. 语言切换
function initLanguage() {
    const btn = document.getElementById('langToggle');
    if(localStorage.getItem('lang') === 'en') document.body.classList.add('en-mode');
    
    if(btn) {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('en-mode');
            localStorage.setItem('lang', document.body.classList.contains('en-mode') ? 'en' : 'cn');
        });
    }
}