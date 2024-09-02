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
exports.createCard = exports.getCards = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString();
        const cards = yield prisma.cards.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        });
        res.json(cards);
    }
    catch (error) {
        res.status(500).json({ message: "Erroe retrieving products" });
    }
});
exports.getCards = getCards;
const createCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardId, name, num, set, price, rarity, quantity } = req.body;
        const card = yield prisma.cards.create({
            data: {
                cardId,
                name,
                num,
                set,
                price,
                rarity,
                quantity,
            }
        });
        res.status(201).json(card);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
});
exports.createCard = createCard;
