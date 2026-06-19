const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');


    if (document.body.classList.contains('dark')) {
        themeIcon.classList.remove('ri-sun-fill');
        themeIcon.classList.add('ri-moon-fill');
        taskpro
    } else {
        themeIcon.classList.remove('ri-moon-fill');
        themeIcon.classList.add('ri-sun-fill');
    }
});