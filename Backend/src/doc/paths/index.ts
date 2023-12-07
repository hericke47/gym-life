import {
  createUser,
  showProfile,
  litsUserCheckIns,
  todayCheckIns,
} from "./users.swagger";
import { authenticateUser, refreshUserToken } from "./sessions.swagger";

export default {
  "/users": createUser,
  "/users/profile": showProfile,
  "/users/checkIns": litsUserCheckIns,
  "/users/todayCheckIn": todayCheckIns,
  "/sessions": authenticateUser,
  "/sessions/refreshToken": refreshUserToken,
};
