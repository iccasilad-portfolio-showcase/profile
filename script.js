// Interactive Hover Script for Featured Works
document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
    const previewImg = document.getElementById('preview-img');
    const previewCategory = document.getElementById('preview-category');
    const previewTitle = document.getElementById('preview-title');

    if (!previewImg) return;

    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const newImg = item.getAttribute('data-img');
            const newCategory = item.getAttribute('data-category');
            const newTitle = item.getAttribute('data-title');

            previewImg.style.opacity = '0';
            setTimeout(() => {
                previewImg.src = newImg;
                previewCategory.textContent = newCategory;
                previewTitle.textContent = newTitle;
                previewImg.style.opacity = '1';
            }, 150);
        });
    });
});