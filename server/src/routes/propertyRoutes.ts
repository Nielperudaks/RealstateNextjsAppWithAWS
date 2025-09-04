import express from "express";
import {
    getProperties,
    getProperty,
    createProperty,
    deleteProperty,
} from "../controllers/propertyControllers"
import { getPropertyLeases, getPropertyPayments } from "../controllers/leaseControllers";
import { authMiddleware } from "../middleware/middleware";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const router = express.Router();
router.get("/", getProperties);
router.get("/:id", getProperty);
router.get("/:id/leases", authMiddleware(["manager", "tenant"]), getPropertyLeases);
router.get("/:id/payments", authMiddleware(["manager", "tenant"]), getPropertyPayments);
router.post("/", authMiddleware(["manager"]), upload.array("photos"), createProperty);
router.delete("/:id", authMiddleware(["manager"]), deleteProperty);


export default router;