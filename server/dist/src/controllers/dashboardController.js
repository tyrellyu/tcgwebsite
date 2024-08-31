"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDashboardMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const popularCards = yield prisma.cards.findMany({
            take: 15,
            orderBy: {
                quantity: "desc",
            },
        });
        const soldCardSummary = yield prisma.soldCardSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });
        const boughtCardSummary = yield prisma.boughtCardSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });
        const collectionSummary = yield prisma.collectionSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });
        const collectionByCategoryRaw = yield prisma.collectionByCategory.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });
        const collectionByCategory = collectionByCategoryRaw.map((item) => (Object.assign(Object.assign({}, item), { amount: item.amount.toString() })));
        res.json({
            popularCards,
            soldCardSummary,
            boughtCardSummary,
            collectionSummary,
            collectionByCategory,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving dasboard metrics" });
    }
});
exports.getDashboardMetrics = getDashboardMetrics;
