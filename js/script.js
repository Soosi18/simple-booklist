let bookList = [];
let dialogState = false;

function Book(title, author, numPages, status){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.status = status;
}

Book.prototype.changeStatus = function(){
    this.status = !this.status;
}

let addBook = (title, author, numPages, status) => {
    bookList.push(new Book(title, author, numPages, status));
}

let displayBooks = () => {
    let content = document.querySelector(".content");
    for(b of bookList){
        let card = document.createElement("div");
        card.classList.add("card");

        let img = document.createElement("img");
        img.src = "../img/test.jpg";
        card.appendChild(img);

        for(let i = 0; i < (Object.keys(b).length); i++) {
            let label = document.createElement("h2");
            label.textContent = Object.keys(b)[i];
            card.appendChild(label);
            let info = document.createTextNode(b[Object.keys(b)[i]]);
            card.appendChild(info);
        }

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
        console.log("test");
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