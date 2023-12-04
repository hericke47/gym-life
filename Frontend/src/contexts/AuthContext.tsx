import Router from "next/dist/client/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/apiClient";

type User = {
  name: string;
  email: string;
  active: boolean;
  isAdmin: boolean;
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

    if(token) {
        api.get('/users/profile').then( response => {
            const { email, name, active, isAdmin } = response.data;

            setUser({ email, name, active, isAdmin })
        })
        .catch(() => {
          signOut()
        })
    };

  },[])

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('sessions', {
      email,
      password
    })

    const { token, refreshToken, user: { name, isAdmin, active } } = response.data;

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
      name,
      isAdmin,
      active
    })
  }

  return (
    <AuthContext.Provider value={{ user, signIn, isAuthenticated, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}