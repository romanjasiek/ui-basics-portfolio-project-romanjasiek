"use strict";

// Creating an empty object which will take username, email and message
let fields = {};

// Get the script to be notified about the loading of the webpage so further actions can be done (like getting element id's)
document.addEventListener("DOMContentLoaded", function() {
    fields.userName = document.getElementById('userName');
    fields.email = document.getElementById('email');
    fields.message = document.getElementById('message');
   });

// Check if a field (in this case userName und email) is empty
const isNotEmpty = (value) => {
    if (value == null || typeof value == 'undefined' ) return false;
    return (value.length > 0);
};

// Check if the email is a valid email adress
const isEmail = (email) => {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
};


const fieldValidation = (field, validationFunction) => {
    if (field == null) return false;
   
    let isFieldValid = validationFunction(field.value)
    if (!isFieldValid) {
    field.className = 'placeholderRed';
    } else {
    field.className = '';
    }
   
    return isFieldValid;
};

const isValid = () => {
    let valid = true;
    
    valid &= fieldValidation(fields.userName, isNotEmpty);
    valid &= fieldValidation(fields.email, isEmail);
    valid &= fieldValidation(fields.message, isNotEmpty);
   
    return valid;
};

// Creating a User class basing on the values of the contact formular
class User {
    constructor(userName, email, message) {
    this.userName = userName;
    this.email = email;
    this.message = message;
    }
};


// Send the informations which are entered into the contact formular
// Further work needs to be done (like connect to SMTP functionality of a real webserver)
// I also have to find out why the fields for userName and email are smaller after sending the message

const sendContact = () => {
    if (isValid()) {
    let usr = new User(userName.value,email.value,message.value);
    
    alert(`Danke für Deine Nachricht, ${usr.userName}!`)
    } else {
    alert(`Sorry, da hat etwas nicht geklappt.`);
    }
}