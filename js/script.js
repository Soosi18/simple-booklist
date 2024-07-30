let bookList = [];
let dialogState = false;

function Book(title, author, numPages, status){
    this.id = "B" + Math.round((1000 * Math.random(1)))
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.status = status;
}

Book.prototype.changeStatus = function(){
    this.status = !this.status;
}

let addBook = (title, author, numPages, status) => {
    bookList.push(new Book(title, author, numPages, Boolean(status)));
}

let removeBook = id => {
    bookList = bookList.filter(book => book["id"] != id);
}

let createAddBookButton = () => {
    const addBookBtn = document.createElement("button");
    addBookBtn.id = "big-add-btn";
    addBookBtn.innerHTML = '<img src="img/plus-thick.SVG" id="big-add-img">';
    return addBookBtn;
    
}

let createCard = book => {
    let card = document.createElement("div");
    let id = book["id"];
    card.classList.add("card");

    const img = document.createElement("img");
    const info = document.createElement("div");
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    img.classList.add("book-img");
    info.classList.add("info");
    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    img.src = `img/1.JPG`;
    title.innerText = book["title"];
    author.innerText = book["author"];
    pages.innerText = `${book["numPages"]} pages`;
    info.append(title, author, pages);

    const buttons = document.createElement("div");
    const statusBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    buttons.classList.add("buttons");
    statusBtn.classList.add("status-btn");
    delBtn.classList.add("del-btn");
    statusBtn.textContent = "Unread";
    delBtn.textContent = "Delete";
    if(book["status"]){
        statusBtn.textContent = "Read";
        statusBtn.classList.toggle("status-read");
    }

    statusBtn.addEventListener("click", () => {
        book.changeStatus();
        statusBtn.classList.toggle("status-read");
        if (book["status"] === true){
            statusBtn.textContent = "Read";
        }
        else {
            statusBtn.textContent = "Unread";
        } 
    });

    delBtn.addEventListener("click", () => {
        removeBook(id);
        displayBooks();
    });

    buttons.append(statusBtn, delBtn);    
    card.append(img, info, buttons);
    return card;
}

let displayBooks = () => {
    let content = document.querySelector(".content");
    content.innerHTML = "";
    content.appendChild(createAddBookButton());
    for(b of bookList){
        const card = createCard(b);
        content.appendChild(card);
    }
}

let toggleDialog = () => {
    const dialog = document.querySelector("dialog");
    dialogState ? dialog.close() : dialog.showModal();
    dialogState = !dialogState;
}

let validateInput = (title, author, pages) => {
    if (title === "" || author === "" || (pages > 9999 || pages < 1)){
        return 0;
    }
    return 1;
}

let addListeners = () => {
    const addBtn = document.querySelector("#add-btn");
    const addBookBtn = document.querySelector("#big-add-btn");
    const submitBtn = document.querySelector("#submit-btn");
    const cancelBtn = document.querySelector("#cancel-btn");
    const dialog = document.querySelector("dialog");

    addBtn.addEventListener("click", toggleDialog);
    addBookBtn.addEventListener("click", toggleDialog);
    cancelBtn.addEventListener("click", toggleDialog);

    dialog.addEventListener("cancel", e => {
        dialogState = !dialogState;
    });

    submitBtn.addEventListener("click", e => {
        e.preventDefault();
        let newBook = new FormData(document.querySelector("form"));
        let title = newBook.get('title');
        let author = newBook.get('author');
        let pages = newBook.get('pages');
        let status = newBook.get('status');

        if(validateInput(title, author, pages)){
            addBook(title, author, pages, status === "on" ? 1 : 0);
            displayBooks();
            toggleDialog();
        }
        else {
            alert("Please fill in blank fields. \nNote: Number of Pages must be between 1 and 9999");
        }
    });
}

window.addEventListener("load", () => {
    displayBooks();
    addListeners();
})

addBook("To Kill A Mockingbird", "Harper Lee", 376, false);
addBook("To Kill A Mockingbird", "Harper Lee", 376, true);
addBook("To Kill A Mockingbird", "Harper Lee", 376, true);
addBook("To Kill A Mockingbird", "Harper Lee", 376, false);