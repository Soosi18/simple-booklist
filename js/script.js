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
    imgNum = Math.round(Math.random(1) * 6);
    img.src = `../img/${imgNum}.jpg`;
    title.innerText = book["title"];
    author.innerText = book["author"];
    pages.innerText = book["numPages"];
    info.append(title, author, pages);

    const buttons = document.createElement("div");
    const statusBtn = document.createElement('button');
    //const likeBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    statusBtn.classList.add("status-btn");
    //likeBtn.classList.add("like-btn");
    delBtn.classList.add("del-btn");
    statusBtn.textContent = "Unread";
    delBtn.textContent = "delete";
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

let addListeners = () => {
    const addBtn = document.querySelector("#addBtn");
    const submitBtn = document.querySelector("#submitBtn");
    const cancelBtn = document.querySelector("#cancelBtn");
    const dialog = document.querySelector("dialog");

    addBtn.addEventListener("click", toggleDialog);
    cancelBtn.addEventListener("click", toggleDialog);

    dialog.addEventListener("cancel", e => {
        dialogState = !dialogState;
    });

    submitBtn.addEventListener("click", e => {
        e.preventDefault();
        let newBook = new FormData(document.querySelector("form"));
        console.log(newBook.get('status'));
        addBook(newBook.get('title'), newBook.get('author'), newBook.get('pages'), (newBook.get('status') === "on" ? 1 : 0));
        displayBooks();
        toggleDialog();
    });
}

window.addEventListener("load", () => {
    displayBooks();
    addListeners();
})

addBook("test", "test", 222, false);
addBook("test", "test", 222, false);
addBook("test", "test", 222, false);
addBook("test", "test", 222, false);
addBook("test", "test", 222, false);
addBook("test", "test", 222, false);