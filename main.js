document.addEventListener('DOMContentLoaded', function() {
    // Animate fact cards on scroll
    const factCards = document.querySelectorAll('.fact-card');
    
    const animateOnScroll = () => {
        factCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    };
    
    // Set initial state
    factCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Animate on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Action items hover effect
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('img').style.transform = 'scale(1.1)';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('img').style.transform = 'scale(1)';
        });
    });
});