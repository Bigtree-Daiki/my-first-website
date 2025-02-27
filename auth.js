// auth.js - 管理者認証機能

// ページの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', function() {
  console.log('Auth.js loaded');
  
  // DOM 要素の取得
  const adminLink = document.getElementById('admin-link');
  const authModal = document.getElementById('auth-modal');
  const authForm = document.getElementById('auth-form');
  const authPassword = document.getElementById('auth-password');
  const authMessage = document.getElementById('auth-message');
  const authCancel = document.getElementById('auth-cancel');
  
  // DOM要素が正しく取得できたか確認
  console.log('Admin Link Element:', adminLink);
  console.log('Auth Modal Element:', authModal);
  
  // 管理者パスワード - 本番環境ではより安全な方法で管理すること
  const ADMIN_PASSWORD = 'admin123';
  
  // Adminリンククリック時の処理
  if (adminLink) {
    adminLink.addEventListener('click', function(e) {
      console.log('Admin link clicked');
      e.preventDefault();
      showAuthModal();
    });
  } else {
    console.error('Admin link element not found');
  }
  
  // キャンセルボタンクリック時の処理
  if (authCancel) {
    authCancel.addEventListener('click', function() {
      hideAuthModal();
    });
  }
  
  // 認証フォーム送信時の処理
  if (authForm) {
    authForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const password = authPassword.value.trim();
      
      if (password === ADMIN_PASSWORD) {
        // 認証成功
        hideAuthModal();
        // 認証状態を保存
        setAuthStatus();
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
  }
  
  // モーダル外クリックで閉じる
  if (authModal) {
    authModal.addEventListener('click', function(e) {
      if (e.target === authModal) {
        hideAuthModal();
      }
    });
  }
  
  // ESCキーでモーダルを閉じる
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && authModal && authModal.style.display === 'flex') {
      hideAuthModal();
    }
  });
  
  // 認証モーダルを表示
  function showAuthModal() {
    console.log('Showing auth modal');
    if (authModal) {
      authModal.style.display = 'flex';
      if (authPassword) {
        authPassword.value = '';
        authPassword.focus();
      }
      if (authMessage) {
        authMessage.style.display = 'none';
      }
    } else {
      console.error('Auth modal element not found');
    }
  }
  
  // 認証モーダルを非表示
  function hideAuthModal() {
    if (authModal) {
      authModal.style.display = 'none';
    }
  }
  
  // 管理画面へリダイレクト
  function redirectToAdmin() {
    window.location.href = 'admin.html';
  }
  
  // 認証状態を保存（セッション中のみ有効）
  function setAuthStatus() {
    sessionStorage.setItem('isAdminAuthenticated', 'true');
  }
});

// 即時実行関数でも対応
(function() {
  // ページがすでに読み込まれている場合の対応
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    const adminLink = document.getElementById('admin-link');
    if (adminLink) {
      adminLink.onclick = function(e) {
        console.log('Admin link clicked (direct)');
        e.preventDefault();
        const authModal = document.getElementById('auth-modal');
        if (authModal) {
          authModal.style.display = 'flex';
        }
      };
    }
  }
})();
