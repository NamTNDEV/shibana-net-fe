import { z } from "zod"

const clientSchema = z.object({
    NEXT_PUBLIC_CLIENT_BASE_URL: z.url(),
    NEXT_PUBLIC_API_BASE_URL: z.url(),
})
const serverSchema = z.object({
    API_SECRET_KEY: z.string(),
})

const processEnv = {
    NEXT_PUBLIC_CLIENT_BASE_URL: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    API_SECRET_KEY: process.env.API_SECRET_KEY,
}

const mergedSchema = z.object({
    ...clientSchema.shape,
    ...serverSchema.shape,
})

const isServer = typeof window === "undefined"

console.log("Is server", isServer)

const processEnvParsed = isServer
    ? mergedSchema.safeParse(processEnv)
    : clientSchema.safeParse(processEnv)

if (!processEnvParsed.success) {
    console.error(
        "❌ Invalid environment variables:",
        processEnvParsed.error.issues.map((issue) => issue.message).join(", ")
    );
    throw new Error("Invalid environment variables");
}

const envConfig = processEnvParsed.data

export default envConfig