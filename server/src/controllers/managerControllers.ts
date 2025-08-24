import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getManager = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    
    if (!cognitoId) {
      res.status(400).json({ message: "cognitoId is required" });
      return;
    }

    const manager = await prisma.manager.findUnique({
      where: { cognitoId },
 
    });

    if (manager) {
      res.json(manager);
    } else {
      res.status(404).json({ message: "Manager not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `error retrieving manager${error.message}` });
  }
};

export const createManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;

    const manager = await prisma.manager.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });

    res.status(201).json(manager);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `error creating manager${error.message}` });
  }
};

export const updateManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, phoneNumber } = req.body;

    const { cognitoId } = req.params;

    if (!cognitoId) {
      res.status(400).json({ message: "cognitoId is required" });
      return;
    }

    const updatemanager = await prisma.manager.update({
      where: { cognitoId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.json(updatemanager);
  } catch (error: any) {
    res.status(500).json({ message: `error updating manager${error.message}` });
  }
};
