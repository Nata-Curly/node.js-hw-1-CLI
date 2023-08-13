const { Command } = require('commander');
const contacts = require("./db/contacts.js");

const program = new Command();

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user mane')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const allContacts = await contacts.listContacts();
            return console.table(allContacts);
        case 'get':
            const contact = await contacts.getContactById(id);
            return contact;
        case 'add':
            const newContact = await contacts.addContact({name, email, phone});
            return newContact;
        case 'remove':
            const removeContact = await contacts.removeContact(id);
            return removeContact;
        default: 
            console.warn('\x1B[31m Unknown action type!');
    };
};

invokeAction(argv).then((data)=>console.log(data)).catch((err)=>console.error(err));
