import { Request, Response } from "express";
import Task from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { title } = req.body;

  const task = await Task.create({ title, user: userId });
  res.json(task);
};

export const getTasks = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const tasks = await Task.find({ user: userId });
  res.json(tasks);
};

export const toggleTask = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Not found" });

  task.completed = !task.completed;
  await task.save();

  res.json(task);
};
// UPDATE TASK TITLE
export const updateTask = async (req: any, res: any) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title: req.body.title },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
// DELETE TASK
export const deleteTask = async (req: any, res: any) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
