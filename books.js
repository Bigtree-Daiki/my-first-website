// Books.js - 書籍紹介ページの機能を管理するスクリプト

document.addEventListener('DOMContentLoaded', function() {
  // 書籍のデータ（実際のアプリケーションではAPIやデータベースから取得）
  const books = [
    {
      id: 1,
      title: "ビジネス思考力を鍛える",
      author: "佐藤一郎",
      category: "business",
      categoryName: "ビジネス",
      cover: "book1.jpg",
      summary: "ビジネスの現場で必要とされる論理的思考力とその鍛え方について解説した一冊です。",
      review: "ビジネスシーンで活用できる思考法が体系的にまとめられており、特に「構造化思考」の章は実務で即活用できる内容でした。プロジェクト管理や問題解決のアプローチ方法が変わり、チームでの意思決定がスムーズになりました。"
    },
    {
      id: 2,
      title: "自己啓発書のタイトル",
      author: "山田太郎",
      category: "self-help",
      categoryName: "自己啓発",
      cover: "book2.jpg",
      summary: "この本は自分らしい生き方や考え方を発見するための実践的なアプローチを提案する一冊です。",
      review: "この本から学んだことや印象に残ったポイント、自分の生活や仕事にどう活かせるかなど、読書体験を通じて得られた気づきが多かった。特に習慣化のセクションは日常生活に取り入れやすい実践的なアドバイスが満載でした。"
    },
    {
      id: 3,
      title: "小説のタイトル",
      author: "鈴木花子",
      category: "novel",
      categoryName: "小説",
      cover: "book3.jpg",
      summary: "架空の世界を舞台にした冒険と成長の物語。主人公の内面の変化と社会との関わりを描いています。",
      review: "読み始めると止まらなくなる展開と、登場人物の心理描写の繊細さに引き込まれました。特に主人公の葛藤と成長のプロセスは、自分自身の人生を振り返るきっかけになりました。"
    },
    {
      id: 4,
      title: "マーケティングの基本",
      author: "高橋誠",
      category: "business",
      categoryName: "ビジネス",
      cover: "book4.jpg",
      summary: "マーケティングの基本概念から最新のデジタルマーケティング手法まで幅広く解説しています。",
      review: "理論と実践例のバランスが良く、マーケティングの全体像を把握するのに役立ちました。特にデジタルマーケティングの章は最新の事例が豊富で、すぐに業務に活かせる内容でした。"
    },
    {
      id: 5,
      title: "毎日が輝く習慣術",
      author: "伊藤静",
      category: "self-help",
      categoryName: "自己啓発",
      cover: "book5.jpg",
      summary: "日々の小さな習慣が人生を大きく変える方法を提案し、持続可能な自己成長の方法を解説します。",
      review: "「小さな一歩の積み重ね」という考え方が印象的でした。本書で紹介されているモーニングルーティンを取り入れたところ、一日の生産性が大きく向上し、心にも余裕ができました。"
    },
    {
      id: 6,
      title: "雲の向こうの世界",
      author: "中村洋介",
      category: "novel",
      categoryName: "小説",
      cover: "book6.jpg",
      summary: "現実と幻想が交錯する不思議な物語。主人公が偶然見つけた秘密の扉の向こうに広がる世界とは？",
      review: "現実世界と幻想世界の巧みな描写が素晴らしく、読後も長く余韻が残りました。人間の想像力と現実認識についての問いかけは、日常の見方を変えるきっかけになりました。"
    }
  ];

  // DOM要素
  const bookGrid = document.querySelector('.book-grid');
  const categoryButtons = document.querySelectorAll('.category-btn');
  const modal = document.getElementById('book-modal');
  const closeButton = document.querySelector('.close-modal');
  
  // モーダル内の要素
  const modalCover = document.getElementById('modal-cover');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalCategory = document.getElementById('modal-category');
  const modalSummary = document.getElementById('modal-summary');
  const modalReview = document.getElementById('modal-review');

  // カテゴリーフィルター機能
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // アクティブクラスの切り替え
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const selectedCategory = this.getAttribute('data-category');
      
      // 書籍カードのフィルタリング
      const bookCards = document.querySelectorAll('.book-card');
      bookCards.forEach(card => {
        if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 書籍カードクリック時のモーダル表示
  document.querySelectorAll('.book-card').forEach((card, index) => {
    card.addEventListener('click', function() {
      const bookId = index + 1; // カードのインデックス+1をIDとして使用
      const book = books.find(b => b.id === bookId);
      
      if (book) {
        // モーダルに書籍情報をセット
        modalCover.src = book.cover;
        modalCover.onerror = function() {
          this.src = 'placeholder-book.jpg';
        };
        modalTitle.textContent = book.title;
        modalAuthor.textContent = book.author;
        modalCategory.textContent = book.categoryName;
        modalCategory.className = 'category-tag ' + book.category;
        modalSummary.textContent = book.summary;
        modalReview.textContent = book.review;
        
        // モーダルを表示
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // スクロール防止
      }
    });
  });

  // モーダルを閉じる
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escキーでもモーダルを閉じられるようにする
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // スクロール再開
  }

  // スクロール時のフェードイン効果（既存のスクリプトとの連携）
  function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
        element.classList.add('visible');
      }
    });
  }
  
  // 初期表示時にも実行
  fadeInOnScroll();
});
