import { createUser } from "./users.swagger";
import { authenticateUser, refreshUserToken } from "./sessions.swagger";

export default {
  "/users": createUser,
  "/sessions": authenticateUser,
  "/sessions/refreshToken": refreshUserToken,
};
