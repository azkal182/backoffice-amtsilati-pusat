import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import bcrypt from 'bcryptjs';
import { signInSchema } from "./schemas/login";
import { db } from "./lib/db";

export default {
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            //    @ts-ignore
            authorize: async (credentials) => {
                let user = null

                const { username, password } = await signInSchema.parseAsync(credentials)

                // logic to verify if the user exists
                user = await db.user.findUnique({
                    where: {
                        username
                    }
                })
                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    throw new Error("User not found.")
                }

                const compare = await bcrypt.compare(password, user.password)
                if (!compare) {
                    throw new Error("invalid credentials.")
                }

                // return user object with their profile data
                return user
            },
        }),
    ]
} satisfies NextAuthConfig
