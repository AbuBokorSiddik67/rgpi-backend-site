import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { prisma } from "../../lib/prisma.js";
import { env } from "../../config/env.js";
import type {
  LoginInput,
  AuthResponse,
  RegisterInput,
} from "./auth.interface.js";

function signToken(user: { id: string | number; role: string; email: string }) {
  const jti = randomUUID();
  const token = jwt.sign(
    { userId: user.id, role: user.role, email: user.email, jti },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn as jwt.SignOptions["expiresIn"] },
  );
  return token;
}

export const authService = {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw Object.assign(new Error("Email already in use"), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        role: "STUDENT", // default role
      },
    });

    const token = signToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      token,
    } as unknown as AuthResponse & { token: string };
  },

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw Object.assign(new Error("Invalid email or password"), {
        status: 401,
      });
    }

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) {
      throw Object.assign(new Error("Invalid email or password"), {
        status: 401,
      });
    }

    const token = signToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      token,
    } as unknown as AuthResponse & { token: string };
  },

  // Logout With Token Revocation
  async revokeToken(token: string) {
    const decoded = jwt.decode(token) as { jti?: string; exp?: number } | null;

    if (!decoded?.jti || !decoded?.exp) {
      // malformed/old token without a jti — nothing to revoke, just no-op
      return;
    }

    await prisma.revokedToken.upsert({
      where: { jti: decoded.jti },
      update: {},
      create: {
        jti: decoded.jti,
        expiresAt: new Date(decoded.exp * 1000),
      },
    });
  },

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        phone: true,
      },
    });

    if (!user) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }

    return user;
  },
};
