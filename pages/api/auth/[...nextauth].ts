import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
      accessToken?: string;
    }
    interface User {
        id?: string
        _id: string
    }
};

const url = 'http://localhost:3001/api/auth/login'

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
      // ...add more providers here
      Credentials({
        name: "Custom Login",
        credentials: {
          email: { label: "Correo", type: "email", placeholder: "correo@correo.com" },
          password: { label: "Contraseña", type: "password", placeholder: "Contraseña" },
        },
        async authorize(credentials){
          console.log({credentials})
  
          // return { _id: "1", name: "Joel camargo", email: "correo@correo123.com" }

          try {
              const { data } =  await axios.post(url, {
                    email: credentials!.email,
                    password: credentials!.password
            })

            // console.log(data)

            return data
              
          } catch (error) {
            console.log('fallo ', error)
            return null
          }
        }
      }),
    ],
  
    // Custom-pages
    pages: {
      signIn: '/auth/login',
      newUser: '/auth/register'
    },
  
    // session: {
    //   maxAge: 2_592_000,
    //   strategy: 'jwt',
    //   updateAge: 86_400
    // },
  
    //callbacks
    callbacks: {
      async jwt({ token, account, user }) {
        console.log('callbakcs')
        // console.log({ token, account, user })
  
        token.user = user

        console.log(token)
  
        return token
      },
  
      async session({ session, token, user }){
        console.log('session')
        console.log({ session, token, user })
  
        session.accessToken = token.token as any
        session.user = token.user as any
  
        return session
      }
    }
  };
  
  export default NextAuth(authOptions);
  