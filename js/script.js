function showArticle(articleId) {
    // Hide all articles first
    const articles = document.querySelectorAll('.article');
    articles.forEach(article => article.style.display = 'none');

    // Show the selected article
    const selectedArticle = document.getElementById(articleId);
    if (selectedArticle) {
        selectedArticle.style.display = 'block';
    }
}

// Function to close the displayed article
function closeArticle(articleId) {
    const article = document.getElementById(articleId);
    if (article) {
        article.style.display = 'none';
    }
}
