export const createUser = {
  post: {
    description: "Cria um usuário",
    summary: "Criação de um usuário",
    tags: ["Usuários"],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              email: {
                type: "string",
              },
              password: {
                type: "string",
              },
            },
          },
          example: {
            name: "User John doe",
            email: "userjhondoe@example.com",
            password: "123456",
          },
        },
      },
    },
    responses: {
      "201": {
        content: {
          "application/json": {
            example: {
              id: "uuid",
              name: "User John doe",
              email: "userjhondoe@example.com",
              password: "hashed-password",
              active: true,
              created_at: "2023-07-02T02:06:14.860Z",
              updated_at: "2023-07-02T02:06:14.860Z",
            },
          },
        },
      },
      "400": {
        content: {
          "application/json": {
            example: {
              message: "Email address already used.",
            },
          },
        },
      },
    },
  },
};

export const showProfile = {
  get: {
    description: "Mostra dados de perfil do usuárrio logado",
    summary: "Perfil",
    tags: ["Usuários"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        content: {
          "application/json": {
            example: [
              {
                id: "9c0683d0-c6e3-46ba-b327-2483422829c3",
                email: "jhondoe@gmail.com",
                name: "Jhon Doe",
                active: true,
                createdAt: "2023-12-04T06:49:30.399Z",
                isAdmin: false,
              },
            ],
          },
        },
      },
      "400": {
        content: {
          "application/json": {
            example: [
              {
                message: "User not found",
              },
            ],
          },
        },
      },
      "401": {
        content: {
          "application/json": {
            example: [
              {
                error: true,
                code: "token.expired",
                message: "Token invalid.",
              },
              {
                error: true,
                code: "token.invalid",
                message: "Token not present.",
              },
            ],
          },
        },
      },
    },
  },
};

export const litsUserCheckIns = {
  get: {
    description: "Lista check-ins do usuário logado",
    summary: "Lista check-ins do usuário logado",
    tags: ["Usuários"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        schema: {
          type: "integer",
        },
        in: "query",
        name: "skip",
        required: true,
        default: 0,
      },
      {
        schema: {
          type: "integer",
        },
        in: "query",
        name: "take",
        required: true,
        default: 10,
      },
    ],
    responses: {
      "200": {
        content: {
          "application/json": {
            example: {
              checkIns: [
                {
                  id: "edb1aab7-cff8-485e-9645-78b893b5f85b",
                  userId: "9c0683d0-c6e3-46ba-b327-2483422829c3",
                  gymId: "30749049-189e-4597-8d58-01eee8b4d3b2",
                  createdAt: "2023-12-07T06:33:20.606Z",
                  updatedAt: "2023-12-07T06:33:20.606Z",
                  approved: false,
                  gym: {
                    id: "30749049-189e-4597-8d58-01eee8b4d3b2",
                    name: "academia 1",
                    description: "teste",
                    phone: "48 998665532",
                    latitude: -28.4295168,
                    longitude: -48.955392,
                    createdAt: "2023-12-04T10:05:53.899Z",
                    updatedAt: "2023-12-04T10:05:53.899Z",
                    active: true,
                  },
                },
                {
                  id: "4a0ce1fb-1424-4d58-8aa7-dac61cc959bd",
                  userId: "9c0683d0-c6e3-46ba-b327-2483422829c3",
                  gymId: "96358db2-3e0a-4e3a-a093-4c14d3faec66",
                  createdAt: "2023-12-06T20:12:49.011Z",
                  updatedAt: "2023-12-06T20:12:55.292Z",
                  approved: true,
                  gym: {
                    id: "96358db2-3e0a-4e3a-a093-4c14d3faec66",
                    name: "academia 3",
                    description: "asdasd",
                    phone: "48 998665532",
                    latitude: -28.475928,
                    longitude: -49.006181,
                    createdAt: "2023-12-04T10:07:21.436Z",
                    updatedAt: "2023-12-04T10:07:21.436Z",
                    active: true,
                  },
                },
                {
                  id: "d098551e-3c2a-486e-bc49-72d8479bad6d",
                  userId: "9c0683d0-c6e3-46ba-b327-2483422829c3",
                  gymId: "30749049-189e-4597-8d58-01eee8b4d3b2",
                  createdAt: "2023-12-05T19:35:12.552Z",
                  updatedAt: "2023-12-06T19:35:12.552Z",
                  approved: false,
                  gym: {
                    id: "30749049-189e-4597-8d58-01eee8b4d3b2",
                    name: "academia 1",
                    description: "teste",
                    phone: "48 998665532",
                    latitude: -28.4295168,
                    longitude: -48.955392,
                    createdAt: "2023-12-04T10:05:53.899Z",
                    updatedAt: "2023-12-04T10:05:53.899Z",
                    active: true,
                  },
                },
              ],
              count: 3,
            },
          },
        },
      },
      "401": {
        content: {
          "application/json": {
            example: [
              {
                error: true,
                code: "token.expired",
                message: "Token invalid.",
              },
              {
                error: true,
                code: "token.invalid",
                message: "Token not present.",
              },
            ],
          },
        },
      },
    },
  },
};

export const todayCheckIns = {
  get: {
    description: "Lista check-ins de hoje do usuário logado",
    summary: "Lista check-ins de hoje do usuário logado",
    tags: ["Usuários"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        content: {
          "application/json": {
            example: [
              {
                id: "edb1aab7-cff8-485e-9645-78b893b5f85b",
                userId: "9c0683d0-c6e3-46ba-b327-2483422829c3",
                gymId: "30749049-189e-4597-8d58-01eee8b4d3b2",
                createdAt: "2023-12-07T06:33:20.606Z",
                updatedAt: "2023-12-07T06:33:20.606Z",
                approved: false,
              },
            ],
          },
        },
      },
      "401": {
        content: {
          "application/json": {
            example: [
              {
                error: true,
                code: "token.expired",
                message: "Token invalid.",
              },
              {
                error: true,
                code: "token.invalid",
                message: "Token not present.",
              },
            ],
          },
        },
      },
    },
  },
};
