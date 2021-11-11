const Contact = require("../models/Contact");

module.exports.addContact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const support = await Support.create({
      name,
      email,
      message,
    });
    return res.status(200).send({ msg: "Contact added successfully" });
  } catch (error) {
    console.log(error);
  }
};
