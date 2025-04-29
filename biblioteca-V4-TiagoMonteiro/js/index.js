//? definicao das variaveis locais
let grid = document.getElementById('grid');
let filters = document.getElementById('filters');
let popup = document.getElementById('popup');
let toggleBtn = document.getElementById('toggleFormBtn');
let addBookForm = document.getElementById('addBookForm');

let editBookSection = document.querySelector('.editBookSection');
let editBookForm = document.getElementById('editBookForm');
let currentEditingId = null;

//? EVENTOS DA APLICACAO
filters.addEventListener('click', filterEvents, false);
filters.addEventListener('input', filterEvents, false);
grid.addEventListener('click', gridEvents, false);
popup.addEventListener('click', closePopup, false);
toggleBtn.addEventListener('click', () => {
    addBookForm.style.display = (addBookForm.style.display === 'none') ? 'flex' : 'none';
});
addBookForm.addEventListener('submit', addNewBook);
editBookForm.addEventListener('submit', saveEditedBook);

//? FUNCTIONS

function filterEvents(e){
    let el = e.target;
    
    if (el.id === 'allBtn') {
        showBooks(getBooks());
    }

    if (el.id === 'readBtn') {
        showBooks(getReadBooks());
    }

    if (el.id === 'notReadBtn') {
        showBooks(getNotReadBooks());
    }

    if ((el.id === 'searchTxt') && (e.type === 'input')){
        let text = el.value.toLowerCase();
        showBooks(getBooksByAuthorTitle(text));
    }
}

function gridEvents(e){
    if ((e.target.nodeName === 'P') && (e.target.textContent.search('✅') > -1)){
        showBooks(getReadBooks());
    }

    if ((e.target.nodeName === 'P') && (e.target.textContent.search('❌') > -1)){
        showBooks(getNotReadBooks());
    }

    if (e.target.dataset.type === 'deleteBtn'){
        showBooks(deleteBook(e.target.dataset.idbook));
    }

    if (e.target.dataset.type === 'thumbnail'){
        showPopup(e.target.dataset.popup);
    }

    if (e.target.dataset.type === 'editBtn') {
        let id = e.target.dataset.idbook;
        let bookToEdit = livros.find(livro => livro.id == id);
    
        if (bookToEdit) {
            currentEditingId = id;

            document.getElementById('editBookTitle').value = bookToEdit.title;
            document.getElementById('editBookAuthor').value = bookToEdit.author;
            document.getElementById('editBookThumb').value = bookToEdit.imageUrl;
            document.getElementById('editBookPopup').value = bookToEdit.imageUrlGr;
            document.getElementById('editBookRead').checked = bookToEdit.alreadyRead;

            editBookSection.classList.add('open');
            window.scrollTo({ top: editBookSection.offsetTop, behavior: 'smooth' });
        }
    }
}

function addNewBook(e) {
    e.preventDefault();

    const newBook = {
        id: livros.length ? Math.max(...livros.map(l => l.id)) + 1 : 0,
        title: document.getElementById('bookTitle').value.trim(),
        author: document.getElementById('bookAuthor').value.trim(),
        imageUrl: document.getElementById('bookThumb').value.trim(),
        imageUrlGr: document.getElementById('bookPopup').value.trim(),
        alreadyRead: document.getElementById('bookRead').checked
    };

    livros.push(newBook);
    showBooks(getBooks());

    addBookForm.reset();
    addBookForm.style.display = 'none';
}

function saveEditedBook(e) {
    e.preventDefault();

    let bookIndex = livros.findIndex(livro => livro.id == currentEditingId);

    if (bookIndex !== -1) {
        livros[bookIndex].title = document.getElementById('editBookTitle').value.trim();
        livros[bookIndex].author = document.getElementById('editBookAuthor').value.trim();
        livros[bookIndex].imageUrl = document.getElementById('editBookThumb').value.trim();
        livros[bookIndex].imageUrlGr = document.getElementById('editBookPopup').value.trim();
        livros[bookIndex].alreadyRead = document.getElementById('editBookRead').checked;

        showBooks(getBooks());
        editBookForm.reset();
        editBookSection.classList.remove('open');
    }
}

loadFromLocalStorage();
showBooks(getBooks());

function showBooks(arrayBooks){
    grid.innerHTML = '';

    arrayBooks.map(book => {
        grid.innerHTML += `
            <article>
                <h1>${book.title}</h1>
                <h2>${book.author}</h2>
                <img src="livros/${book.imageUrl}" 
                     alt="${book.title}" 
                     data-type='thumbnail' 
                     data-popup='livros/${book.imageUrlGr}'
                     class='thumbnail'
                >
                <p>Already read: ${book.alreadyRead ? '✅' : '❌'}</p>
                <button class='btn' data-type='deleteBtn' data-idbook=${book.id}> Delete </button>
                <button class='btn' data-type='editBtn' data-idbook=${book.id}> Edit </button>
            </article>
        `;
    });
}

function saveToLocalStorage() {
    localStorage.setItem('livros', JSON.stringify(livros));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('livros');
    if (data) {
        livros = JSON.parse(data);
    }
}
