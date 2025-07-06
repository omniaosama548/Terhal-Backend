import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    location: String,
    address: String,

    //category: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    // coordinates: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },

    image: String,
    rating: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model("Place", placeSchema);

export default Place;
