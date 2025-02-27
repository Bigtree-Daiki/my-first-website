// auth.js - 管理者認証機能

document.addEventListener('DOMContentLoaded', function() {
  // DOM 要素
  const adminLink = document.getElementById('admin-link');
  const authModal = document.getElementById('auth-modal');
  const authForm = document.getElementById('auth-form');
  const authPassword = document.getElementById('auth-password');
  const authMessage = document.getElementById('auth-message');
  const authCancel = document.getElementById('auth-cancel');
  
  // 管理者パスワード - 本番環境ではより安全な方法で管理すること
  // この例では簡易的にadmin123としています
  const ADMIN_PASSWORD = 'admin123';
  
  // Adminリンククリック時の処理
  adminLink.addEventListener('click', function(e) {
    e.preventDefault();
    showAuthModal();
  });
  
  // キャンセルボタンクリック時の処理
  authCancel.addEventListener('click', function() {
    hideAuthModal();
  });
  
  // 認証フォーム送信時の処理
  authForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = authPassword.value.trim();
    
    if (password === ADMIN_PASSWORD) {
      // 認証成功
      hideAuthModal();
      redirectToAdmin();
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
  
  // モーダル外クリックで閉じる
  authModal.addEventListener('click', function(e) {
    if (e.target === authModal) {
      hideAuthModal();
    }
  });
  
  // ESCキーでモーダルを閉じる
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && authModal.style.display === 'flex') {
      hideAuthModal();
    }
  });
  
  // 認証モーダルを表示
  function showAuthModal() {
    authModal.style.display = 'flex';
    authPassword.value = '';
    authMessage.style.display = 'none';
    authPassword.focus();
  }
  
  // 認証モーダルを非表示
  function hideAuthModal() {
    authModal.style.display = 'none';
  }
  
  // 管理画面へリダイレクト
  function redirectToAdmin() {
    window.location.href = 'admin.html';
  }
  
  // 認証状態の確認（オプション: セッションストレージを使用）
  function checkAuthStatus() {
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    if (isAuthenticated === 'true') {
      // 既に認証済みの場合は直接管理画面に移動
      redirectToAdmin();
    }
  }
  
  // パスワード認証成功時に認証状態を保存（セッション中のみ有効）
  function setAuthStatus() {
    sessionStorage.setItem('isAdminAuthenticated', 'true');
  }
});
