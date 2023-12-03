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
