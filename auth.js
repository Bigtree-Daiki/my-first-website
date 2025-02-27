document.addEventListener('DOMContentLoaded', function() {
  const adminLink = document.getElementById('admin-link');
  const authModal = document.getElementById('auth-modal');
  
  adminLink.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Admin link clicked');
    authModal.style.display = 'flex';
  });
});
