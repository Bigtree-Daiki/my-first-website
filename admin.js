// 認証状態のチェック
function checkAdminAuth() {
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
  if (isAuthenticated !== 'true') {
    // 認証されていない場合はトップページにリダイレクト
    window.location.href = 'index.html';
  }
}

// ページ読み込み時に実行
checkAdminAuth();

// admin.js - 書籍管理画面のスクリプト

document.addEventListener('DOMContentLoaded', function() {
  // DOM要素
  const formTab = document.getElementById('form-tab');
  const previewTab = document.getElementById('preview-tab');
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  const bookForm = document.getElementById('book-form');
  const previewBtn = document.getElementById('preview-btn');
  const editBtn = document.getElementById('edit-btn');
  const saveBtn = document.getElementById('save-btn');
  
  const bookCover = document.getElementById('book-cover');
  const coverPreviewImg = document.getElementById('cover-preview-img');
  
  // プレビュー要素
  const previewCover = document.getElementById('preview-cover');
  const previewTitle = document.getElementById('preview-title');
  const previewAuthor = document.getElementById('preview-author');
  const previewCategory = document.getElementById('preview-category');
  const previewSummary = document.getElementById('preview-summary');
  const previewReview = document.getElementById('preview-review');
  
  // サンプルデータ（実際のアプリケーションではローカルストレージかデータベースを使用）
  let books = [
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
    }
  ];
  
  // 初期化
  initializeEvents();
  renderBookList();
  
  // イベントリスナーの初期化
  function initializeEvents() {
    // タブ切り替え
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // タブボタンのアクティブ状態の切り替え
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // タブコンテンツの表示切り替え
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // 書影（カバー画像）のプレビュー
    bookCover.addEventListener('change', function(e) {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          coverPreviewImg.src = e.target.result;
        };
        
        reader.readAsDataURL(this.files[0]);
      }
    });
    
    // プレビューボタン
    previewBtn.addEventListener('click', function() {
      updatePreview();
      
      // プレビュータブに切り替え
      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelector('[data-tab="preview-tab"]').classList.add('active');
      
      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
      previewTab.classList.add('active');
    });
    
    // 編集に戻るボタン
    editBtn.addEventListener('click', function() {
      // 入力フォームタブに切り替え
      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelector('[data-tab="form-tab"]').classList.add('active');
      
      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
      formTab.classList.add('active');
    });
    
    // 保存ボタン
    saveBtn.addEventListener('click', function() {
      saveBook();
    });
    
    // フォーム送信時の処理
    bookForm.addEventListener('submit', function(e) {
      e.preventDefault();
      saveBook();
    });
    
    // 編集ボタンのイベント委任
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('edit-btn')) {
        const bookId = parseInt(e.target.closest('tr').getAttribute('data-book-id'));
        editBook(bookId);
      }
    });
    
    // 削除ボタンのイベント委任
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-btn')) {
        const bookId = parseInt(e.target.closest('tr').getAttribute('data-book-id'));
        deleteBook(bookId);
      }
    });
  }
  
  // プレビューの更新
  function updatePreview() {
    const titleInput = document.getElementById('book-title');
    const authorInput = document.getElementById('book-author');
    const categorySelect = document.getElementById('book-category');
    const summaryInput = document.getElementById('book-summary');
    const reviewInput = document.getElementById('book-review');
    
    // 値をプレビューに反映
    previewTitle.textContent = titleInput.value || '-';
    previewAuthor.textContent = authorInput.value || '-';
    
    const categoryValue = categorySelect.value;
    if (categoryValue) {
      previewCategory.textContent = categorySelect.options[categorySelect.selectedIndex].text;
      previewCategory.className = 'category-tag ' + categoryValue;
    } else {
      previewCategory.textContent = '-';
      previewCategory.className = 'category-tag';
    }
    
    previewSummary.textContent = summaryInput.value || '-';
    previewReview.textContent = reviewInput.value || '-';
    
    // 書影のプレビュー
    if (bookCover.files && bookCover.files[0]) {
      previewCover.src = coverPreviewImg.src;
    } else {
      previewCover.src = 'placeholder-book.jpg';
    }
  }
  
  // 書籍の保存
  function saveBook() {
    const titleInput = document.getElementById('book-title');
    const authorInput = document.getElementById('book-author');
    const categorySelect = document.getElementById('book-category');
    const summaryInput = document.getElementById('book-summary');
    const reviewInput = document.getElementById('book-review');
    
    // 入力チェック
    if (!titleInput.value || !authorInput.value || !categorySelect.value || !summaryInput.value || !reviewInput.value) {
      alert('必須項目をすべて入力してください。');
      return;
    }
    
    // 書籍オブジェクトの作成
    const newBook = {
      id: Date.now(), // 簡易的なID生成
      title: titleInput.value,
      author: authorInput.value,
      category: categorySelect.value,
      categoryName: categorySelect.options[categorySelect.selectedIndex].text,
      summary: summaryInput.value,
      review: reviewInput.value
    };
    
    // 画像の処理（実際のアプリケーションではサーバーにアップロード）
    if (bookCover.files && bookCover.files[0]) {
      // この例ではFileReaderで読み込んだURLを使用（実際のアプリケーションでは適切なファイル保存処理が必要）
      newBook.cover = coverPreviewImg.src;
    } else {
      newBook.cover = 'placeholder-book.jpg';
    }
    
    // 既存データの編集か新規追加かを判断
    const editingId = bookForm.getAttribute('data-editing-id');
    
    if (editingId) {
      // 既存データの更新
      const index = books.findIndex(book => book.id === parseInt(editingId));
      if (index !== -1) {
        books[index] = { ...books[index], ...newBook };
      }
      
      // 編集モードを解除
      bookForm.removeAttribute('data-editing-id');
    } else {
      // 新規データの追加
      books.push(newBook);
    }
    
    // ローカルストレージに保存（実際のアプリケーションではデータベースに保存）
    localStorage.setItem('books', JSON.stringify(books));
    
    // 書籍一覧の再描画
    renderBookList();
    
    // フォームのリセット
    bookForm.reset();
    coverPreviewImg.src = 'placeholder-book.jpg';
    
    // 成功メッセージ
    alert('書籍情報が保存されました。');
    
    // 入力フォームタブに切り替え
    tabButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-tab="form-tab"]').classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    formTab.classList.add('active');
  }
  
  // 書籍一覧の描画
  function renderBookList() {
    const bookListBody = document.getElementById('book-list-body');
    bookListBody.innerHTML = '';
    
    if (books.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="4" style="text-align: center;">登録された書籍はありません</td>';
      bookListBody.appendChild(emptyRow);
      return;
    }
    
    books.forEach(book => {
      const row = document.createElement('tr');
      row.setAttribute('data-book-id', book.id);
      
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.categoryName}</td>
        <td>
          <button class="action-btn edit-btn">編集</button>
          <button class="action-btn delete-btn">削除</button>
        </td>
      `;
      
      bookListBody.appendChild(row);
    });
  }
  
  // 書籍の編集
  function editBook(bookId) {
    const book = books.find(b => b.id === bookId);
    
    if (!book) return;
    
    // フォームに値をセット
    document.getElementById('book-title').value = book.title;
    document.getElementById('book-author').value = book.author;
    document.getElementById('book-category').value = book.category;
    document.getElementById('book-summary').value = book.summary;
    document.getElementById('book-review').value = book.review;
    
    // 書影のプレビュー（実際のURLかBase64文字列）
    coverPreviewImg.src = book.cover;
    
    // 編集中のIDをフォームに記録
    bookForm.setAttribute('data-editing-id', bookId);
    
    // 入力フォームタブに切り替え
    tabButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-tab="form-tab"]').classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    formTab.classList.add('active');
    
    // フォームまでスクロール
    bookForm.scrollIntoView({ behavior: 'smooth' });
  }
  
  // 書籍の削除
  function deleteBook(bookId) {
    if (!confirm('この書籍を削除してもよろしいですか？')) return;
    
    // 配列から該当の書籍を削除
    books = books.filter(book => book.id !== bookId);
    
    // ローカルストレージの更新
    localStorage.setItem('books', JSON.stringify(books));
    
    // 書籍一覧の再描画
    renderBookList();
    
    alert('書籍が削除されました。');
  }
  
  // ローカルストレージからデータを読み込む
  function loadBooksFromStorage() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      try {
        books = JSON.parse(storedBooks);
        renderBookList();
      } catch (e) {
        console.error('保存されたデータの読み込みに失敗しました:', e);
      }
    }
  }
  
  // 保存されたデータがあれば読み込む
  loadBooksFromStorage();
});
