// スクロール時のアニメーション効果を追加するスクリプト
document.addEventListener('DOMContentLoaded', function() {
  // スクロール時に要素をフェードインさせる関数
  function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
      // 要素の位置を取得
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      // 画面内に要素が入ったらクラスを追加
      if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
        element.classList.add('visible');
      }
    });
  }
  
  // スクロールイベントにリスナーを追加
  window.addEventListener('scroll', fadeInOnScroll);
  
  // 初期表示時にも実行
  fadeInOnScroll();
  
  // ナビゲーションのスムーズスクロール
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // リンクの参照先が#で始まるものだけ処理
      const href = this.getAttribute('href');
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // 対象要素の位置に滑らかにスクロール
          window.scrollTo({
            top: targetElement.offsetTop - 80, // ヘッダーの高さ分を調整
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
