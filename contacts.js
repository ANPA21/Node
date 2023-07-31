const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((cont) => cont.id === contactId);
    return contact || null;
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((cont) => cont.id === contactId);
    console.log("contact index: ", contactIndex);
    if (contactIndex === -1) {
      return null;
    }
    const removedContact = contacts.splice(contactIndex, 1);
    await updateContacts(contacts);
    return removedContact;
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
