const mongoose = require("mongoose");

const transcationSchema = new mongoose.Schema(
  {
    userId:{
      type:String,
      require:true,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is Required"],
    },
  },
  { timestamps: true }
);

const transcationModel = mongoose.model("transcations", transcationSchema);
module.exports = transcationModel