import { sql } from "@vercel/postgres";
import { compare } from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"



export const authConfig: AuthOptions = ({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {

                const response = await sql`
                SELECT * FROM users WHERE email=${credentials?.email}`;

                const user = response.rows[0];
                console.log(user.name)

                const passwordCorrect = await compare(credentials?.password || '', user?.password);

                console.log({ passwordCorrect })

                if (passwordCorrect) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    }
                }
                return null
            }
        })
    ]

})
