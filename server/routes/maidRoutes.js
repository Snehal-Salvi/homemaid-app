import express from "express";
import { getMaidbyId, getMaids } from "../controllers/maidsController.js";

const router = express.Router();

// Route to get all maids
router.route("/").get(getMaids);

// Route to get maid by ID
router.route("/:id").get(getMaidbyId);

export default router;
