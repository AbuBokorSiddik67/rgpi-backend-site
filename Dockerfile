# --- Stage 1: Build Stage ---
FROM node:20-alpine AS builder

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependency definition files
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install all dependencies (including devDependencies needed for build)
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
RUN npx prisma generate

COPY . .

# Build the project
RUN pnpm build


# --- Stage 2: Production Stage ---
FROM node:20-alpine

# Enable pnpm in production stage as well
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install ONLY production dependencies to keep the image small
RUN pnpm install --prod --frozen-lockfile

# Copy built dist directory from builder stage
COPY --from=builder /app/dist ./dist
# Copy generated Prisma Client if it outputs outside node_modules
COPY --from=builder /app/generated ./generated

EXPOSE 5000

CMD ["pnpm", "start"]
