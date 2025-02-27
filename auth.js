window.addEventListener('load', function() {
  const adminLink = document.getElementById('admin-link');
  const authModal = document.getElementById('auth-modal');
  const authForm = document.getElementById('auth-form');
  const authPassword = document.getElementById('auth-password');
  const authMessage = document.getElementById('auth-message');
  const authCancel = document.getElementById('auth-cancel');
  
  // 管理者パスワード
  const ADMIN_PASSWORD = 'admin124';
  
  // Adminリンククリック時の処理
  if (adminLink && authModal) {
    adminLink.addEventListener('click', function(e) {
      e.preventDefault();
      authModal.style.display = 'flex';
      if (authPassword) {
        authPassword.value = '';
        authPassword.focus();
      }
    });
  }
  
  // キャンセルボタンクリック時の処理
  if (authCancel && authModal) {
    authCancel.addEventListener('click', function() {
      authModal.style.display = 'none';
    });
  }
  
  // 認証フォーム送信時の処理
  if (authForm) {
    authForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const password = authPassword.value.trim();
      
      if (password === ADMIN_PASSWORD) {
        // 認証成功
        authModal.style.display = 'none';
        // 認証状態を保存
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        window.location.href = 'admin.html';
      } else {
        // 認証失敗
        authMessage.style.display = 'block';
        authPassword.value = '';
        authPassword.focus();
        
        // 3秒後にエラーメッセージを非表示
        setTimeout(() => {
          authMessage.style.display = 'none';
        }, 3000);
      }
    });
  }
  
  // モーダル外クリックで閉じる
  if (authModal) {
    authModal.addEventListener('click', function(e) {
      if (e.target === authModal) {
        authModal.style.display = 'none';
      }
    });
  }
  
  // ESCキーでモーダルを閉じる
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && authModal && authModal.style.display === 'flex') {
      authModal.style.display = 'none';
    }
  });
});
