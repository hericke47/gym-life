import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';

let isRefreshing = false;
let failedRequestsQueue: { onSuccess: (token: string) => void; onFailure: (err: AxiosError<any>) => void; }[] = [];

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: `http://localhost:3003`,
    headers: {
      Authorization: `Bearer ${cookies['innova.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if(error.response.status === 401) {
      if(error.response.data?.code === 'token.expired') {
        // renovar token
        cookies = parseCookies(ctx);

        const { 'innova.refresh_token': refreshToken } = cookies;
        const originalConfig = error.config;

        if(!isRefreshing) {
          isRefreshing = true;

          api.post('sessions/refresh-token', {
            token: refreshToken
          }).then(response => {
            const { token } = response.data;
            setCookie(ctx, 'innova.token', token, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            })

            setCookie(ctx, 'innova.refresh_token', response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            failedRequestsQueue.forEach(request => request.onSuccess(token))
            failedRequestsQueue = []
          }).catch(err => {
            failedRequestsQueue.forEach(request => request.onFailure(err))
            failedRequestsQueue = []

            if(process.browser) {
              signOut()
            }
          }).finally(() => {
            isRefreshing = false;
          })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            }
          })
        })

      } else {
        // deslogar o usuario
        if(process.browser) {
          signOut()
        }
      }
    }

    return Promise.reject(error)
  })

  return api
}
