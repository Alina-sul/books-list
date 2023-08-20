function searchBooks() {
    console.trace("searchBooks() called");
    const searchInput = document.getElementById("search-input");
    const searchTerm = searchInput.value;
    const booksListDiv = document.querySelector(".books-list");
    booksListDiv.setAttribute("hx-get", `/api/books-htmx/?search=${searchTerm}`);
    htmx.trigger(booksListDiv, 'htmx:send');
}
