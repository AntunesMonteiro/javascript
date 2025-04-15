

let grid = document.getElementById('grid');
let filters = document.getElementById('filters');
let filtroAtual = 'all'; // valores possíveis: 'all', 'read', 'not-read'



//? EVENTOS DA APLICAÇÃO
filters.addEventListener('click', filterEvents, false);

//Listeners

function filterEvents(e) {
    const el = e.target;

    // atualizar filtro atual
    if (el.id === 'allBtn') filtroAtual = 'all';
    if (el.id === 'readBtn') filtroAtual = 'read';
    if (el.id === 'notReadBtn') filtroAtual = 'not-read';

    document.querySelectorAll('#filters .btn')
        .forEach(btn => {
            btn.classList.remove('ativo');
        });

    // adicionar classe 'ativo' ao botão clicado
    el.classList.add('ativo');

    aplicarFiltros();
}



// Business Logic

//console.log(livros);

showBooks(getBooks());

function showBooks(arrayBooks) {
    grid.innerHTML = ''; // Limpa o conteúdo atual
  
    // Gera os cartões de livro
    arrayBooks.forEach(book => {
      grid.innerHTML += `
        <article>
          <h1>${book.title}</h1>
          <h2>${book.author}</h2>
          <img src="livros/${book.imageUrl}" alt="${book.title}">
          <p>Already read: ${book.alreadyRead ? '✅' : '❌'}</p>
          <button class="btn delete" data-idbook="${book.id}">Delete</button>
          <button class="btn edit" data-idbook="${book.id}">Edit</button>
        </article>
      `;
    });
  
    // Agora que os botões existem no DOM, associamos os eventos
    const botoesDelete = document.querySelectorAll('.btn.delete');
  
    botoesDelete.forEach(botao => {
      botao.addEventListener('click', (e) => {
        const artigo = e.target.closest('article');
        artigo.remove();
      });
    });
  }

const searchTxt = document.querySelector('#searchTxt');

searchTxt.addEventListener('input', aplicarFiltros, false);

function aplicarFiltros() {
    const texto = searchTxt.value.toLowerCase();

    let livrosFiltrados = livros;

    // aplicar filtro de leitura
    if (filtroAtual === 'read') {
        livrosFiltrados = livrosFiltrados.filter(l => l.alreadyRead);
    } else if (filtroAtual === 'not-read') {
        livrosFiltrados = livrosFiltrados.filter(l => !l.alreadyRead);
    }

    // aplicar filtro de texto
    livrosFiltrados = livrosFiltrados.filter(livro =>
        livro.title.toLowerCase().includes(texto) ||
        livro.author.toLowerCase().includes(texto)
    );

    showBooks(livrosFiltrados);
}


