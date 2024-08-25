  
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
   
    accessToken?: string;
    
  }

  interface Session {
    user: { 
      id: string;
      firstName:string;
      email:string;
      accessToken?: string;
      refreshToken:string;
      profilePic:string
     
    } 
  }

      

  interface JWT {
    accessToken?: string;
  }
}

 
