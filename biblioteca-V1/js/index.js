
console.log(livros);

//let grid = document.querySelector('section.grid');
let grid = document.getElementById('grid');

//showBooks(livros);

showBooks(getBooks());
//showBooks(getReadBooks());
//showBooks(getNotReadBooks());

function showBooks(arrayBooks){
    arrayBooks.map( book => {
        grid.innerHTML += `
            <article>
                <h1>${book.title}</h1>
                <h2>${book.author}</h2>
                <img src="livros/${book.imageUrl}" alt="${book.title}}">
                <p>Already read: ${book.alreadyRead ? '✅' : '❌' }  </p>
            </article>
        `;
    })
}

