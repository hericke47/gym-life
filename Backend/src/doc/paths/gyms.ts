export const createGym = {
  post: {
    description: "Cria uma academia (apenas admins)",
    summary: "Cria uma academia (apenas admins)",
    tags: ["Academias"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              description: {
                type: "string",
              },
              phone: {
                type: "string",
              },
              latitude: {
                type: "integer",
              },
              longitude: {
                type: "integer",
              },
            },
          },
          example: {
            name: "central",
            description: "teste",
            phone: "48 998665532",
            latitude: -28.46754,
            longitude: -49.036143,
          },
        },
      },
    },
    responses: {
      "201": {
        content: {
          "application/json": {
            example: {
              id: "6975a43c-cdcf-4702-8dea-392e960883f3",
              name: "central",
              description: "teste",
              phone: "48 998665532",
              latitude: -28.46754,
              longitude: -49.036143,
              active: true,
              createdAt: "2023-12-05T02:37:51.756Z",
              updatedAt: "2023-12-05T02:37:51.756Z",
            },
          },
        },
      },
      "400": {
        content: {
          "application/json": {
            example: {
              message: "User isn't admin",
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

export const searchGymsByName = {
  get: {
    description: "Busca academias pelo nome",
    summary: "Busca academias pelo nome",
    tags: ["Academias"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        schema: {
          type: "string",
        },
        in: "query",
        name: "name",
        required: true,
      },
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
              gyms: [
                {
                  id: "2a815f19-ea4c-4fcf-8ff0-1d8970eff680",
                  name: "central",
                  description: "teste",
                  phone: "48 998665532",
                  latitude: -28.46754,
                  longitude: -49.036143,
                  createdAt: "2023-12-07T13:55:04.826Z",
                  updatedAt: "2023-12-07T13:55:04.826Z",
                  active: true,
                },
              ],
              count: 1,
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

export const nearbyGyms = {
  get: {
    description: "Busca academias próximas",
    summary: "Busca academias próximas",
    tags: ["Academias"],
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
        name: "latitude",
        required: true,
      },
      {
        schema: {
          type: "integer",
        },
        in: "query",
        name: "longitude",
        required: true,
        default: 10,
      },
    ],
    responses: {
      "200": {
        content: {
          "application/json": {
            example: [
              {
                id: "685d6a8f-10f7-4ccd-bbb5-f341b433d513",
                name: "academia 2",
                description: "teste",
                phone: "48 998665532",
                latitude: -33.8688,
                longitude: 151.2093,
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

export const createCheckIn = {
  post: {
    description: "Realiza o check-in na academia",
    summary: "Realiza o check-in na academia",
    tags: ["Academias"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              description: {
                type: "string",
              },
              phone: {
                type: "string",
              },
              latitude: {
                type: "integer",
              },
              longitude: {
                type: "integer",
              },
            },
          },
          example: {
            name: "central",
            description: "teste",
            phone: "48 998665532",
            latitude: -28.46754,
            longitude: -49.036143,
          },
        },
      },
    },
    responses: {
      "201": {
        content: {
          "application/json": {
            example: {
              id: "6975a43c-cdcf-4702-8dea-392e960883f3",
              name: "central",
              description: "teste",
              phone: "48 998665532",
              latitude: -28.46754,
              longitude: -49.036143,
              active: true,
              createdAt: "2023-12-05T02:37:51.756Z",
              updatedAt: "2023-12-05T02:37:51.756Z",
            },
          },
        },
      },
      "400": {
        content: {
          "application/json": {
            example: {
              message: "User isn't admin",
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
