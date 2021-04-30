# ADDRESS BOOK - a web application for storing and managing your contacts

## FUNCTIONALITY

This web application for contact management was implemented using React, Semantic UI React and Npm.

The guidelines and caveats are as follows:

### Application login (/)

To login in, any valid e-mail adress and password is accepted. For validation, npm package semantic-ui-react-form-validator is used. Password validations was done using RegExp.
LocalStorage is used to save your contact data, but keeps no track of login and authentication.

### Contact list (/addressBook)

On this view you can see all your contacts with basic information. To see all the details, you can click on the ellipsis button (edit), and also toggle the star symbol - which enables you to select your favorite contacts.
On the bottom of the page you can find the random contact generator. This was implemented using npm package faker, and you can use to generate as many random contacts as needed.
You can sort contacts by Last name by clicking on the 'Last name' in the header. By clicking you toggle the ascending, descending and 'no sort' mode.
You can also use the search field to search contacty by name, last name or e-mail.

### Add new contact (/contact)

Here you can find the form to enter new contact. Keep in mind that you need to enter all of the contact type information (mobile phone, fixed, e-mail and pager) in order to be able to add it to the contact list.

### Have fun!