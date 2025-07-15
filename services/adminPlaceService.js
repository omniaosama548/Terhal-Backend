// services/placeService.js
import Place from "../models/Place.js";




// Service function to create a new place
export const createPlace = async (placeData) => {
  const place = new Place(placeData);
  return await place.save();
};

// Service function to update an existing place by ID
export const updatePlace = async (id, updateData) => {
  const place = await Place.findByIdAndUpdate(id, updateData, { new: true });
  return place;
};

// Service function to toggle the visibility of a place by ID
export const togglePlaceVisibility = async (id) => {
  const place = await Place.findById(id);
  if (!place) return null;

  place.visible = !place.visible;
  await place.save();
  return place;
};
