import Router from "next/dist/client/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/apiClient";
import axios from "axios";

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
  userLatitude: number;
  userLongitude: number;
  userAddress: {
    country: string;
    country_code: string;
    municipality: string;
    postcode: string;
    region: string;
    road: string;
    state: string;
    suburb: string;
    town: string;
    city: string;
  };
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
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [userAddress, setUserAddress] = useState();
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

  useEffect(() => {
    const { 'innova.token': token } = parseCookies();

    navigator.geolocation.watchPosition(location => {
      const userLatitude = location.coords.latitude
      const userLongitude = location.coords.longitude

      setUserLatitude(userLatitude)
      setUserLongitude(userLongitude)

      axios.get(`https://geocode.maps.co/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}`).then(response => {
        setUserAddress(response.data.address)
      })
    }, () => {
      if(token && user) {
        alert('Ative a sua localização para poder utilizar a plataforma')

        signOut()
      }
    })
  }, [user])

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
    <AuthContext.Provider value={{ user, signIn, isAuthenticated, signOut, userAddress, userLatitude, userLongitude}}>
      {children}
    </AuthContext.Provider>
  )
}