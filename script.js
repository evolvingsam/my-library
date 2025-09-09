const container = document.querySelector(".container");
const add = document.querySelector(".add-book-btn");
const myLibrary = [];

addNewBook(add);
class Book {
    constructor(title, author, pages, read) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    addBookToLibrary() {
        myLibrary.push(this);
    }
}
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
book1.addBookToLibrary();
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);
book2.addBookToLibrary();
const book3 = new Book("1984", "George Orwell", 328, true);
book3.addBookToLibrary();

renderLibrary();


// function addBookToLibrary(title, author, pages, read) {
//     const newBook = new Book(title, author, pages, read);
//     myLibrary.push(newBook);
// }


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
                <input type="checkbox" id="read">
                <button type="submit">Add Book</button>
            </form>
        `;
        document.body.appendChild(addDialog);
        addDialog.showModal();
        
        addDialog.addEventListener("close", () => {
                document.body.removeChild(addDialog);
            });
            
            addDialog.querySelector("form").addEventListener("submit", (event) => {
                event.preventDefault();
                const title = document.querySelector("#title").value;
                const author = document.querySelector("#author").value;
                const pages = document.querySelector("#pages").value;
                const read = document.querySelector("#read").checked;
                
                const newBook = new Book(title, author, pages, read);
                newBook.addBookToLibrary();
                addDialog.close();
                renderLibrary();
            });
    });
}

function renderBook(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? "Yes" : "No"}</p>
        <input type="checkbox" data-id="${book.id}" ${book.read ? "checked" : ""} onclick="toggleReadStatus(this)">
        <button class="remove-book-btn" onclick="removeBook(this)" data-id="${book.id}">Remove Book</button>
    `;
    container.appendChild(bookCard);
}

function renderLibrary() {
    container.innerHTML = "";
    myLibrary.forEach(renderBook);
}

function removeBook(button) {
  const id = button.dataset.id;
  const index = myLibrary.findIndex(book => book.id === id);
  if (index > -1) {
    myLibrary.splice(index, 1);
  }
  renderLibrary();
}

function toggleReadStatus(checkbox) {
  const id = checkbox.dataset.id; 
  const book = myLibrary.find(b => b.id === id);

  if (book) {
    book.read = checkbox.checked; 
  }

  renderLibrary();
}
