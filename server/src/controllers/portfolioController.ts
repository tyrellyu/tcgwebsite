import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPortfolioByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const collectionByCategorySummaryRaw = await prisma.collectionByCategory.findMany(
      {
        orderBy: {
          date: "desc",
        },
      }
    );
    const expenseByCategorySummary = collectionByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      })
    );

    res.json(expenseByCategorySummary);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};