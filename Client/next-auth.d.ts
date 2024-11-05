// next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      userId: string;
      role: string;
      name: string;
      email: string;
      image?: string;
    };
  }

  interface User {
    id: string;
    userId: string;
    role: string;
    name: string;
  }
}

