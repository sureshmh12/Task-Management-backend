import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import {
  createTask,
  getTasks,
  toggleTask,
} from "../controllers/taskController";
import { updateTask, deleteTask } from "../controllers/taskController";

const router = Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.patch("/:id", auth, toggleTask);

router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
