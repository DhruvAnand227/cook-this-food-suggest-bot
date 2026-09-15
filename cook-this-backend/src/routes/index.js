import express from "express";

import registerRouter from "./auth/register.js";
import loginRouter from "./auth/login.js";

const router = express.Router();

router.use("/register", registerRouter);
router.use("/login", loginRouter);

export default router;