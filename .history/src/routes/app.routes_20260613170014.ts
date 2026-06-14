import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the RGPI Institute Management API!" });
});



export default const appRouter = router;