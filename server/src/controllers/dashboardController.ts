import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const popularCards = await prisma.cards.findMany({
            take: 20,
            orderBy: {
                price: "desc", 
            },
        });
        const soldCardSummary = await prisma.soldCardSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        })

        const boughtCardSummary = await prisma.boughtCardSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        })
        const collectionSummary = await prisma.collectionSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        })
            const collectionByCategoryRaw = await prisma.collectionByCategory.findMany({
                take: 5,
                orderBy: {
                    date: "desc",
                },
            })
            const collectionByCategory = collectionByCategoryRaw.map(
                (item) => ({
                    ...item,
                    amount: item.amount.toString()
                }));

                res.json({
                    popularCards,
                    soldCardSummary,
                    boughtCardSummary,
                    collectionSummary,
                    collectionByCategory,
                })
    } catch (error) {
        res.status(500).json({message: "Error retrieving dasboard metrics" })
    }

}