"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
require("dotenv/config");
const client_1 = require("@prisma/client");
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
// singleton in dev to prevent connection storms
const prisma = globalThis.prisma || new client_1.PrismaClient({ log: ["warn", "error"] });
if (process.env.NODE_ENV !== "production")
    globalThis.prisma = prisma;
exports.auth = (0, better_auth_1.betterAuth)({
    secret: process.env.BETTER_AUTH_SECRET, // required
    baseURL: (_a = process.env.BETTER_AUTH_URL) !== null && _a !== void 0 ? _a : "http://localhost:3000",
    emailAndPassword: { enabled: true },
    database: (0, prisma_1.prismaAdapter)(prisma, { provider: "postgresql" }),
});
