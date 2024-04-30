import Maid from "../models/maidModel.js";
import asyncHandler from "express-async-handler";

// Handler function to get all maids
const getMaids = asyncHandler(async (req, res) => {
  // Find all maids in the database
  const maids = await Maid.find({});
  // Send JSON response with the array of maids
  res.json(maids);
});

// Handler function to get a maid by ID
const getMaidbyId = asyncHandler(async (req, res) => {
  // Find a maid by ID in the database
  const maid = await Maid.findById(req.params.id);
  // If maid is found, send JSON response with maid details
  if (maid) {
    res.json(maid);
  } else {
    // If maid is not found, send 404 error response
    res.status(404);
    throw new Error("Maid not found");
  }
});

// Export the handler functions
export { getMaids, getMaidbyId };
