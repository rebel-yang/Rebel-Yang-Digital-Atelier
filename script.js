document.addEventListener('DOMContentLoaded', () => {
    // 语言切换
    const btn = document.getElementById('langToggle');
    if(localStorage.getItem('lang') === 'en') document.body.classList.add('en-mode');
    
    if(btn) {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('en-mode');
            localStorage.setItem('lang', document.body.classList.contains('en-mode') ? 'en' : 'cn');
        });
    }
});