
const searchFiled = document.getElementById('search-filed');
const searchButton = document.getElementById('search-button');

// Fetching Data When Search Button Clicked.
searchButton.addEventListener('click', function () {
    toggleSpinner('block');
    const url = `https://openlibrary.org/search.json?q=${searchFiled.value}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayBooks(data))
});

// Display Book and Details
const displayBooks = bookDetails => {
    defaultDesign('none');
    // Error Checking 
    if (searchFiled.value === '') {
        defaultDesign('none');
        emptyErrorMessage('block');
        error404Message('none');
        toggleSpinner("none");
        searchFiled.value = '';
    } else if (bookDetails.numFound === 0 && bookDetails.q !== '') {
        defaultDesign('none');
        error404Message('block');
        emptyErrorMessage('none');
        toggleSpinner("none");
        searchFiled.value = '';
    }
    else {
        emptyErrorMessage('none');
        error404Message('none');
    }

    // Total Search Result & Clean Container in Every Search
    const bookContainer = document.getElementById('books-container');
    bookContainer.innerHTML = '';
    const books = bookDetails.docs;
    document.getElementById('shown-result').innerText = `Search Result: ${bookDetails.numFound} Results`;

    // Getting Single Book Info and Set in Card Design
    books.forEach(book => {
        const newBook = document.createElement('div');
        newBook.innerHTML = `
        <div class="col h-100">
            <div class="p-2  bg-white text-center h-100 custom-shadow">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="rounded-top" width="100%" height="300px" alt="${book.title} Cover Photo">
                <h6 class="m-0 fw-bold">${book.title}</h6>
                <p class="m-0">${book.author_name[0]}</p>
                <p class="m-0 fst-italic"> First Published In: ${book.first_publish_year}</p>
            </div>
        </div>
        `;
        bookContainer.appendChild(newBook);
        searchFiled.value = '';
        toggleSpinner('none');
    });
}

// Function for Spinner, Default Design and Error Messgae
const toggleSpinner = spinner => {
    document.getElementById('spinner-id').style.display = spinner;
}
const defaultDesign = homeDesign => {
    document.getElementById('default-design').style.display = homeDesign;
}
const emptyErrorMessage = emptyError => {
    document.getElementById('empty-message').style.display = emptyError;
}
const error404Message = error404 => {
    document.getElementById('error-404-message').style.display = error404;
}

