

let grid = document.getElementById('grid');
let filters = document.getElementById('filters');


//? EVENTOS DA APLICAÇÃO
filters.addEventListener('click', filterEvents, false);

//Listeners

function filterEvents(e){
    let el=e.target;

    if (el.id === 'allBtn') {
        showBooks(getBooks());
        
    }

    if (el.id === 'readBtn') {
        showBooks(getReadBooks());
        
    }

    if (el.id === 'notReadBtn') {
        showBooks(getNotReadBooks());
        
    }

}


// Business Logic

//console.log(livros);

showBooks(getBooks());

function showBooks(arrayBooks){

    grid.innerHTML = '';
    
    arrayBooks.map( book => {
        grid.innerHTML += `
            <article>
                <h1>${book.title}</h1>
                <h2>${book.author}</h2>
                <img src="livros/${book.imageUrl}" alt="${book.title}}">
                <p>Already read: ${book.alreadyRead ? '✅' : '❌' }  </p>
                <button class= 'btn' data-idbook=${book.id}> Delete </button>
                <button class= 'btn' data-idbook=${book.id}> Edit </button>
             </article>
        `;
    })
}

