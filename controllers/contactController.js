const Contact = require("../models/Content");

// Create a new contact entry
exports.createContact = async (req, res) => {
  const { title, gmail, fullName, description } = req.body;
  try {
    const newContact = new Contact({ title, gmail, fullName, description });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
