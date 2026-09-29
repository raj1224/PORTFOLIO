import type { Request, Response } from "express";

import Skill from "../models/skill.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create skill - Admin
export const createSkill = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, category, icon, order, isVisible } = req.body;

    const existingSkill = await Skill.findOne({ name });

    if (existingSkill) {
      throw new ApiError(409, "A skill with this name already exists");
    }

    const skill = await Skill.create({
      name,
      category,
      icon,
      order,
      isVisible,
    });

    res.status(201).json(
      new ApiResponse(
        201,
        skill,
        "Skill created successfully"
      )
    );
  }
);

// Get visible skills - Public
export const getVisibleSkills = asyncHandler(
  async (_req: Request, res: Response) => {
    const skills = await Skill.find({
      isVisible: true,
    }).sort({
      order: 1,
      createdAt: -1,
    }).lean();

    res.status(200).json(
      new ApiResponse(
        200,
        skills,
        "Skills fetched successfully"
      )
    );
  }
);

// Get all skills - Admin
export const getAllSkills = asyncHandler(
  async (_req: Request, res: Response) => {
    const skills = await Skill.find().sort({
      order: 1,
      createdAt: -1,
    }).lean();

    res.status(200).json(
      new ApiResponse(
        200,
        skills,
        "All skills fetched successfully"
      )
    );
  }
);

// Update skill - Admin
export const updateSkill = asyncHandler(
  async (req: Request, res: Response) => {
    const { skillId } = req.params;

    const skill = await Skill.findByIdAndUpdate(
      skillId,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!skill) {
      throw new ApiError(404, "Skill not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        skill,
        "Skill updated successfully"
      )
    );
  }
);

// Delete skill - Admin
export const deleteSkill = asyncHandler(
  async (req: Request, res: Response) => {
    const { skillId } = req.params;

    const skill = await Skill.findByIdAndDelete(skillId);

    if (!skill) {
      throw new ApiError(404, "Skill not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Skill deleted successfully"
      )
    );
  }
);