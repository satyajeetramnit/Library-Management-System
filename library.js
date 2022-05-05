//This is our DB
let lib = [
    {
        id: "1",
        book: "Book1",
        author: "Author1",
        lender: "UserC",
        borrower: "UserB",
        action: "-"
    },
    {
        id: "2",
        book: "Book2",
        author: "Author2",
        lender: "UserC",
        borrower: "-",
        action: "-"
    },
    {
        id: "3",
        book: "Book3",
        author: "Author3",
        lender: "UserD",
        borrower: "UserC",
        action: "-"
    },
    {
        id: "4",
        book: "Book4",
        author: "Author4",
        lender: "UserA",
        borrower: "-",
        action: "-"
    },
    {
        id: "5",
        book: "Book5",
        author: "Author5",
        lender: "UserA",
        borrower: "-",
        action: "-"
    },
    {
        id: "6",
        book: "Book6",
        author: "Author6",
        lender: "UserB",
        borrower: "UserA",
        action: "-"
    }
] //data will be stored here


const table = document.getElementById("info-table");


// function to add rows to table in DOM
const addRow = (ele) => {
    const row = document.createElement("tr")
    row.className = "element"
    row.setAttribute("id", `row-${ele.id}`)
    row.innerHTML = `
    <td id="id-${ele.id}">${ele.id}</td>
    <td id="book-${ele.id}">${ele.book}</td>
    <td id="author-${ele.id}">${ele.author}</td>
    <td id="lender-${ele.id}">${ele.lender}</td>
    <td id="borrower-${ele.id}">${ele.borrower}</td>
    <td  id="action-${ele.id}">${ele.action}</td>
    `
    table.appendChild(row)
}

// Function to render the table #DB
const renderTable = () => {
    lib.forEach(ele => {
        addRow(ele, "element")
    })
   document.getElementById("logged-in-user-name").innerText = "No user logged in"
}


renderTable()   //calling the function to render


let isLoggedIn = false
let loggedInUser = ""


// Function to login/change user
const changeLoggedInUser = () => {
    const user = document.getElementById("logged-user")
    const userName = document.getElementById("logged-in-user-name")

    // if user is already logged in then log him out
    if (isLoggedIn) {
        logoutOldUser(userName)
    }

    lib.forEach(ele => {
        if (ele.lender == user.value) {
            userName.innerText = `Logged in user: ${user.value}`
            isLoggedIn = true
            loggedInUser = user.value
        }
    })

    if (isLoggedIn)
        displayLoggedInFeatures()
    else {      //if user not logged in (i.e. user not present in DB)
        alert("User not found. Please try again.")
        window.location.reload()    //then refresh
    }   
}


// to logout exiting user
const logoutOldUser = (userName) => {
    userName.innerText = "No user logged in"
    isLoggedIn = false
    loggedInUser = ""
    const lastRow = document.getElementById(`row-${lib.length+1}`)
    lastRow.remove()
}


// Function to display features once the user is logged in
const displayLoggedInFeatures = () => {
    addBookFeature()
    returnBookFeature()
    borrowBookFeature()
}


// Function for last row of table #form to add new book
const addBookFeature = () => {
    const ele = {
        id: lib.length + 1,
        book: `<input type="text" id="newBook" placeholder="Title"></input>`,
        author: `<input type="text" id="newAuthor" placeholder="Author"></input>`,
        lender: loggedInUser,
        borrower: "-",
        action: `<button onClick="addBook()">Add Book</button>` //the addBook() is invoked from here
    }
    addRow(ele)
}

// Function to add new book in table and last row as the addBookFeature()
const addBook = () => {
    const lastRow = document.getElementById(`row-${lib.length + 1}`)
    
    if(document.getElementById("newBook").value==="" || document.getElementById("newAuthor").value===""){
        alert("Please provide both title and author's name.")
    }  //edge case of entering no data and hitting add
    
    else{
        const ele = {
            id: lib.length + 1,
            book: document.getElementById("newBook").value,
            author: document.getElementById("newAuthor").value,
            lender: loggedInUser,
            borrower: "-",
            action: "-"
        }
        lastRow.remove();
        lib.push(ele);
        addRow(ele);
        addBookFeature();   //addBookFeature is placed again at last
        }    
}


// Function implementing return book functionality
const returnBookFeature = () => {
    lib.forEach((ele) => {
        let action = document.getElementById(`action-${ele.id}`)
        if (ele.borrower == loggedInUser) {
            action.innerHTML = `<button id=return-button-${ele.id} onClick="returnBook(${ele.id})">
                Return
            </button>`
        }
        else{
            action.innerHTML="-"
        }
    })
}

// function to implement return book onClick
const returnBook = (id) => {
    const borrower = document.getElementById(`borrower-${id}`)
    const action = document.getElementById(`action-${id}`)
    borrower.innerText = "-"
    lib[id - 1].borrower = "-"
    action.innerHTML = `<button id=borrow-button-${id} onClick="borrowBook(${id})">
        Borrow
    </button>`
}


// Function implementing borrow book functionality
const borrowBookFeature = () => {
    lib.forEach((ele) => {
        if (ele.borrower == "-" && ele.lender != loggedInUser) {
            let action = document.getElementById(`action-${ele.id}`)
            action.innerHTML = `<button id=borrow-button-${ele.id} onClick="borrowBook(${ele.id})">
                Borrow
            </button>`
        }
    })
}

// function to implement borrow book onClick
const borrowBook = (id) => {
    const borrower = document.getElementById(`borrower-${id}`)
    const action = document.getElementById(`action-${id}`)
    borrower.innerText = loggedInUser
    lib[id - 1].borrower = loggedInUser
    action.innerHTML = `<button id=borrow-button-${id} onClick="returnBook(${id})">
        Return
    </button>`
}