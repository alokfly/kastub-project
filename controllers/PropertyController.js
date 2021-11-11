const Property = require("../models/Property");
var ObjectId = require("mongodb").ObjectID;

module.exports.addProperty = async (req, res) => {
  const { address, balance } = req.body;
  try {
    const addProperty = await Property.create({
      address,
      balance,
    });
    res.status(200).json({ msg: "Property added successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getproperty = async (req, res) => {
  try {
    const response = await Property.find();
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateproperty = async (req, res) => {
  let { address, balance } = req.body;
  try {
    const response = await Property.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      {
        address,
        balance,
      }
    );
    res.status(200).send({ msg: "Property successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteProperty = async (req, res) => {
  try {
    const response = await Property.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Property deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
