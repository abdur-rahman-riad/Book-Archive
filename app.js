const searchFiled = document.getElementById('search-filed');
const searchButton = document.getElementById('search-button');
// const searchValue = searchFiled.value;

searchButton.addEventListener('click', function () {
    const url = `https://openlibrary.org/search.json?q=${searchFiled.value}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displayBooks(data))
});

const displayBooks = bookDetails => {
    // Error Checking 
    if (bookDetails.q === '') {
        console.log("Empty Error Message");
        document.getElementById('empty-message').style.display = 'block';
        searchFiled.value = '';
    } else {
        document.getElementById('empty-message').style.display = 'none';
    }
    const bookContainer = document.getElementById('books-container');
    bookContainer.innerHTML = '';
    const allBooks = bookDetails.docs;
    // Total Result Found & Show
    console.log("Result Found: ", allBooks.length);
    const books = allBooks.slice(0, 50);
    console.log("Showing: ", books.length);
    document.getElementById('shown-result').innerText = `Showing ${books.length} Result out of ${allBooks.length}`;
    // Getting Single Book Info
    for (const book of books) {
        const newBook = document.createElement('div');
        newBook.innerHTML = `
        <div class="col h-100">
            <div class="p-2  bg-white text-center h-100 custom-shadow">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="rounded-top" width="100%" height="300px" alt="Book Cover">
                <h6 class="m-0 fw-bold">${book.title}</h6>
                <p class="m-0">${book.author_name[0]}</p>
                <p class="m-0 fst-italic"> First Published In: ${book.first_publish_year}</p>
            </div>
        </div>
        `;
        bookContainer.appendChild(newBook);

        // Showing in Console
        console.log("Book Name: ", book.title);
        console.log("Author Name: ", book.author_name[0]);
        console.log("First Published : ", book.first_publish_year);

        searchFiled.value = '';
    }

}

