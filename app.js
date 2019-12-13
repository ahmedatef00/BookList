// Book Class: Represents a Book

"use strict";

// Book Class: Represents a Contact
var Contact = function Contact(name, Email, phone) {
    this.name = name;
    this.Email = Email;
    this.phone = phone;
}; // UI Class: Handle UI Tasks


var UI =
    /*#__PURE__*/
    function() {
        function UI() {}

        UI.displayContacts = function displayContacts() {
            var Contacts = Store.getContacts(); //replace the dummy daata

            Contacts.forEach(function(Contact) {
                return UI.addContactToList(Contact);
            });
        };

        UI.addContactToList = function addContactToList(Contact) {
            var list = document.querySelector("tbody");

            var row = document.createElement('tr');
            row.innerHTML = "\n        <td>" + Contact.name + "</td>\n        <td>" + Contact.Email + "</td>\n        <td>" + Contact.phone + "</td>\n        <td><a href=\"#\" class=\"btn btn-danger btn-sm delete\">X</a></td>\n      ";
            list.appendChild(row);
        };

        UI.deleteContact = function deleteContact(el) {
            if (el.classList.contains('delete')) {
                el.parentElement.parentElement.remove();
            }
        };

        UI.showAlert = function showAlert(message, className) {
            var div = document.createElement('div');
            div.className = "alert alert-" + className; // هتحط ال كلام اللى فى ال ديف اللى هيظهر او الكلام الل جوه اللديف وخلاص

            div.appendChild(document.createTextNode(message));
            var container = document.querySelector('.container');
            var form = document.querySelector('#contact-form'); //حط ال الايرت قبل الفورم 

            container.insertBefore(div, form); // Vanish in 3 seconds

            setTimeout(function() {
                return document.querySelector('.alert').remove();
            }, 3000);
        };

        UI.clearFields = function clearFields() {
            document.querySelector('#name').value = '';
            document.querySelector('#Email').value = '';
            document.querySelector('#phone').value = '';
        };

        return UI;
    }(); // Store Class: Handles Storage


var Store =
    /*#__PURE__*/
    function() {
        function Store() {}

        Store.getContacts = function getContacts() {
            var Contacts;

            if (localStorage.getItem('Contacts') === null) {
                Contacts = []; //there is no Contacts(array of objects)
            } else {
                //convert text into objects
                Contacts = JSON.parse(localStorage.getItem('Contacts'));
            }

            return Contacts;
        };

        Store.addContact = function addContact(Contact) {
            var Contacts = Store.getContacts();
            Contacts.push(Contact); //re-set it to localstorage 

            localStorage.setItem('Contacts', JSON.stringify(Contacts));
        };

        Store.removeContact = function removeContact(phone) {
            var Contacts = Store.getContacts();
            Contacts.forEach(function(Contact, index) {
                if (Contact.phone === phone) {
                    Contacts.splice(index, 1);
                }
            }); //re-set it to local storage

            localStorage.setItem('Contacts', JSON.stringify(Contacts));
        };

        return Store;
    }(); // Event: Display Conta
document.addEventListener('DOMContentLoaded', UI.displayContacts); // Event: Add a Contact
var el = document.querySelector('#contact-form');
if (el) {
    el.addEventListener('submit', function(e) {
        // Prevent actual submit
        e.preventDefault(); // Get form values

        var name = document.querySelector('#name').value;
        var Email = document.querySelector('#Email').value;
        var phone = document.querySelector('#phone').value; // Validate

        if (name === '' || Email === '' || phone === '') {
            UI.showAlert('Please fill in all fields', 'danger');
        } else {
            // Instatiate Contact
            var Contact = new Contact(name, Email, phone); // Add Contact to UI

            UI.addContactToList(Contact); // Add Contact to store

            Store.addContact(Contact); // لما بتعمل ريلود مفيش حجه بتروح ليه عشان احنا خزناها فى ال localstorage
            // Show success message

            UI.showAlert('Contact Added', 'success'); // Clear fields

            UI.clearFields();
        }
    });
} // Event: Remove a Contact

document.querySelector('#contact_table_body').addEventListener('click', function(e) {
    // Remove Contact from UI
    UI.deleteContact(e.target); // Remove Contact from store

    Store.removeContact(e.target.parentElement.previousElementSibling.textContent); // Show success message

    UI.showAlert('Contact Removed', 'success');
});
/*
class Contact {
    constructor(name, Email, phone) {
        this.name = name;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayContacts() {
        const Contacts = Store.getContacts(); //replace the dummy daata

        Contacts.forEach((Contact) => UI.addContactToList(Contact));
    }

    static addContactToList(Contact) {
        const list = document.querySelector('#Contact-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
        list.appendChild(row);

    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        // هتحط ال كلام اللى فى ال ديف اللى هيظهر او الكلام الل جوه اللديف وخلاص
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        //حط ال الايرت قبل الفورم 
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#Email').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []; //there is no books(array of objects)
        } else {
            //convert text into objects
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        //re-set it to localstorage 
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        //re-set it to local storage
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const name = document.querySelector('#name').value;
    const Email = document.querySelector('#Email').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if (name === '' || Email === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instatiate book
        const book = new Book(name, Email, isbn);

        // Add Book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book); // لما بتعمل ريلود مفيش حجه بتروح ليه عشان احنا خزناها فى ال localstorage

        // Show success message
        UI.showAlert('Book Added', 'success');

        // Clear fields
        UI.clearFields();
    }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show success message
    UI.showAlert('Book Removed', 'success');
});*/