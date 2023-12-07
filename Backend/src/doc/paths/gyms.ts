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
    parameters: [
      {
        schema: {
          type: "string",
        },
        in: "path",
        name: "gymId",
        required: true,
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              latitude: {
                type: "integer",
              },
              longitude: {
                type: "integer",
              },
            },
          },
          example: {
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
              id: "46e17fe2-cadb-46f5-afaf-0f6ade53362b",
              userId: "9c0683d0-c6e3-46ba-b327-2483422829c3",
              gymId: "96358db2-3e0a-4e3a-a093-4c14d3faec66",
              approved: false,
              createdAt: "2023-12-06T06:29:40.163Z",
              updatedAt: "2023-12-06T06:29:40.163Z",
            },
          },
        },
      },
      "400": {
        content: {
          "application/json": {
            example: [
              {
                message: "Gym not found!",
              },
              {
                message: "check-in limit reached",
              },
              {
                message: "check-in awaiting approval",
              },
              {
                message: "too far to check in",
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

export const approveCheckIn = {
  patch: {
    description: "Aprova um check-in (apenas admins)",
    summary: "Aprova um check-in (apenas admins)",
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
        in: "path",
        name: "checkInId",
        required: true,
      },
    ],
    responses: {
      "201": {
        content: {
          "application/json": {
            example: {
              id: "9b68af2f-810e-4766-b888-c30e9471e1f5",
              userId: "9c0683d0-c6e3-46ba-b327-2483422829c3",
              gymId: "6975a43c-cdcf-4702-8dea-392e960883f3",
              createdAt: "2023-12-06T09:37:01.105Z",
              updatedAt: "2023-12-06T09:37:12.281Z",
              approved: true,
            },
          },
        },
      },
      "400": {
        content: {
          "application/json": {
            example: [
              {
                message: "Check-in does not exists",
              },
              {
                message: "check-in is outside the approval range",
              },
              {
                message: "User isn't admin",
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

export const listCheckIns = {
  get: {
    description: "Lista todos os check-ins (apenas admins)",
    summary: "Lista todos os check-ins (apenas admins)",
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
                  id: "8924673e-499e-405c-afba-b53a211a2cf9",
                  userId: "9c0683d0-c6e3-46ba-b327-2483422829c3",
                  gymId: "6975a43c-cdcf-4702-8dea-392e960883f3",
                  createdAt: "2023-12-06T07:46:51.282Z",
                  updatedAt: "2023-12-06T07:46:51.282Z",
                  approved: true,
                  gym: {
                    id: "6975a43c-cdcf-4702-8dea-392e960883f3",
                    name: "central",
                    description: "teste",
                    phone: "48 998665532",
                    latitude: -28.46754,
                    longitude: -49.036143,
                    createdAt: "2023-12-05T02:37:51.756Z",
                    updatedAt: "2023-12-05T02:37:51.756Z",
                    active: true,
                  },
                  user: {
                    id: "9c0683d0-c6e3-46ba-b327-2483422829c3",
                    name: "Jhon Doe",
                    email: "jhondoe@gmail.com",
                    password:
                      "$2b$08$z7cRymqvBNq7LprDvnqYSuJ19hFRCQuT75PotbuL7Uv7H8jGrtAc2",
                    createdAt: "2023-12-04T06:49:30.399Z",
                    updatedAt: "2023-12-04T06:49:30.399Z",
                    active: true,
                    isAdmin: true,
                  },
                },
                {
                  id: "4d4a91f0-3145-48ce-9d65-7fd5a2068b73",
                  userId: "3417991b-d37c-4cb7-b5b7-401235c74c9f",
                  gymId: "6975a43c-cdcf-4702-8dea-392e960883f3",
                  createdAt: "2023-12-06T07:50:54.153Z",
                  updatedAt: "2023-12-06T07:50:54.153Z",
                  approved: false,
                  gym: {
                    id: "6975a43c-cdcf-4702-8dea-392e960883f3",
                    name: "central",
                    description: "teste",
                    phone: "48 998665532",
                    latitude: -28.46754,
                    longitude: -49.036143,
                    createdAt: "2023-12-05T02:37:51.756Z",
                    updatedAt: "2023-12-05T02:37:51.756Z",
                    active: true,
                  },
                  user: {
                    id: "3417991b-d37c-4cb7-b5b7-401235c74c9f",
                    name: "User John doe",
                    email: "userjhondoe@example.com",
                    password:
                      "$2b$08$YczaWm1rvXan3v7Tet5MjeV.RL839i1riUDO6iHKiXTznrhcbif1m",
                    createdAt: "2023-12-05T06:06:00.990Z",
                    updatedAt: "2023-12-05T06:06:00.990Z",
                    active: true,
                    isAdmin: false,
                  },
                },
              ],
              count: 2,
            },
          },
        },
      },
      "400": {
        content: {
          "application/json": {
            example: [
              {
                message: "User isn't admin",
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
