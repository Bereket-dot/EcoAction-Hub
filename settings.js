document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.settings-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.settings-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tab = button.getAttribute('data-tab');
            document.getElementById(tab).classList.add('active');
        });
    });
    
    // Avatar upload preview
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('avatar-preview');
    
    avatarUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.addEventListener('load', function() {
                avatarPreview.style.backgroundImage = `url(${this.result})`;
            });
            
            reader.readAsDataURL(file);
        }
    });
    
    // Form submissions
    const accountForm = document.getElementById('account-form');
    const notificationsForm = document.getElementById('notifications-form');
    const privacyForm = document.getElementById('privacy-form');
    const goalsForm = document.getElementById('goals-form');
    
    accountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Account settings saved successfully!');
    });
    
    notificationsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Notification preferences saved successfully!');
    });
    
    privacyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Privacy settings saved successfully!');
    });
    
    goalsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Climate goals saved successfully!');
    });
    
    // Delete account modal
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const deleteAccountModal = document.querySelector('.delete-account-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const confirmDeleteBtn = document.querySelector('.confirm-delete-btn');
    
    deleteAccountBtn.addEventListener('click', () => {
        deleteAccountModal.classList.add('active');
    });
    
    cancelBtn.addEventListener('click', () => {
        deleteAccountModal.classList.remove('active');
    });
    
    confirmDeleteBtn.addEventListener('click', () => {
        alert('In a complete implementation, this would delete your account and all associated data.');
        deleteAccountModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    deleteAccountModal.addEventListener('click', (e) => {
        if (e.target === deleteAccountModal) {
            deleteAccountModal.classList.remove('active');
        }
    });
    
    // Load saved settings (simulated)
    function loadSavedSettings() {
        // In a real app, these would come from a database
        document.getElementById('email').value = 'user@example.com';
        document.getElementById('location').value = 'San Francisco, CA';
        
        // Notifications
        document.getElementById('email-notifications').checked = true;
        document.getElementById('notification-frequency').value = 'weekly';
        
        // Privacy
        document.querySelector('input[name="profile-visibility"][value="public"]').checked = true;
        document.getElementById('share-anonymized').checked = true;
        
        // Goals
        document.getElementById('main-goal').value = 'reduce-footprint';
        document.getElementById('goal-intensity').value = 'moderate';
        document.getElementById('weekly-hours').value = '3';
    }
    
    // Initialize
    loadSavedSettings();
});