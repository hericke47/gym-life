import Router from "next/dist/client/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/apiClient";

type User = {
  name: string;
  email: string;
  role: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
  signOut(): void;
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  destroyCookie(undefined, 'innova.token')
  destroyCookie(undefined, 'innova.refresh_token')

  Router.push('/');
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() =>{
    const { 'innova.token': token } = parseCookies();

    // if(token) {
    //     api.get('/profile').then( response => {
    //         const { email, name } = response.data;

    //         setUser({ email, name })
    //     })
    //     .catch(() => {
    //       signOut()
    //     })
    // };

  },[])

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('sessions', {
      email,
      password
    })

    const { role, token, refreshToken, user: {name} } = response.data;

    setCookie(undefined, 'innova.token', token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    })
    setCookie(undefined, 'innova.refresh_token', refreshToken, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser({
      email,
      role,
      name
    })
  }

  return (
    <AuthContext.Provider value={{ user, signIn, isAuthenticated, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}