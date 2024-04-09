const transcationModel = require("../models/transcationModel");
const moment = require("moment");
const getAlltranscation = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transcation = await transcationModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userId: req.body.userId,
      ...(type !== "all" && {
        type,
      }),
    });
    res.status(200).json(transcation);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const addTranscation = async (req, res) => {
  try {
    const newTranscation = new transcationModel(req.body);
    await newTranscation.save();
    res.status(201).send("transcation created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const editTranscation = async (req, res) => {
  try {
    await transcationModel.findOneAndUpdate(
      { _id: req.body.transcationId },
      req.body.payload
    );

    res.status(201).send("EDIT SUCCESSFULLY");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const deleteTranscation = async (req, res) => {
  try {
    await transcationModel.findOneAndDelete({ _id: req.body.transcationId });

    res.status(200).send("Delete SUCCESSFULLY");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = {
  getAlltranscation,
  addTranscation,
  editTranscation,
  deleteTranscation,
};
