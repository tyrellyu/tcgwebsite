import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCards = async (req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const cards = await prisma.cards.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        });
        res.json(cards)
    } catch(error) {
        res.status(500).json({ message: "Erroe retrieving products" });
    }
}

export const createCard = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { cardId, name, num, set, price, rarity, quantity} = req.body;
        const card = await prisma.cards.create({
            data: {
                cardId,
                name,
                num,
                set,
                price,
                rarity,
                quantity,
            }
        })
        res.status(201).json(card)
    } catch (error) {
        res.status(500).json({ message: "Error creating product" })
    }
}