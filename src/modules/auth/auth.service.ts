import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";
import { env } from "../../config/env.js";
import type {
  LoginInput,
  AuthResponse,
  RegisterInput,
} from "./auth.interface.js";

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

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn as jwt.SignOptions["expiresIn"] },
    );

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

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn as jwt.SignOptions["expiresIn"] },
    );

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

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
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
