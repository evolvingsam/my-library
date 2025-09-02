// i'll have a form, the form takes a book, a book must have at least a title, an author and a read status(T/F).
// the display should start with 2 default books. with False read status, which the user can change to true.
// There will be a + on the right side of the form to add more books.
// // Initial books
const myLibrary = [];
const container = document.querySelector(".container");


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function renderBook(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? "Yes" : "No"}</p>
        <button class="toggle-read-btn" data-id="${book.id}">Toggle Read Status</button>
        <button class="remove-book-btn" data-id="${book.id}">Remove Book</button>
    `;
    container.appendChild(bookCard);
}

function renderLibrary() {
    container.innerHTML = "";
    myLibrary.forEach(renderBook);
}

function addNewBook(add) {
    add.addEventListener("click", (event) => {
        event.preventDefault();
        const addDialog = document.createElement("dialog");
        addDialog.innerHTML = `
            <form method="dialog">
                <label for="title">Title:</label>
                <input type="text" placeholder="Enter book title" id="title" required>
                <label for="author">Author:</label>
                <input type="text" placeholder="Enter book author" id="author" required>
                <label for="pages">Pages:</label>
                <input type="number" placeholder="Enter number of pages" id="pages" required>
                <label for="read">Read:</label>
                <select id="read">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <button type="submit">Add Book</button>
            </form>
        `;
        document.body.appendChild(addDialog);
        addDialog.showModal();

        // addDialog.addEventListener("close", () => {
        //     document.body.removeChild(addDialog);
        // });

        addDialog.querySelector("form").addEventListener("submit", (event) => {
            event.preventDefault();
            const title = document.querySelector("#title").value;
            const author = document.querySelector("#author").value;
            const pages = document.querySelector("#pages").value;
            const read = document.querySelector("#read").checked;

            addBookToLibrary(title, author, pages, read);
            addDialog.close();
            renderLibrary();
        });
    });
}
const add = document.querySelector(".add-book-btn");
addNewBook(add);
addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 430, false);
addBookToLibrary("The Brothers Karamazov", "Fyodor Dostoevsky", 796, false);

renderLibrary();