const Support = require("../models/Support");

module.exports.addSupport = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const support = await Support.create({
      name,
      email,
      subject,
      message,
    });
    return res.status(200).send({ msg: "Support added successfully" });
  } catch (error) {
    console.log(error);
  }
};
