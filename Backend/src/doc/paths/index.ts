import {
  createUser,
  showProfile,
  litsUserCheckIns,
  todayCheckIns,
} from "./users.swagger";
import { authenticateUser, refreshUserToken } from "./sessions.swagger";
import { createGym, searchGymsByName } from "./gyms";

export default {
  "/sessions": authenticateUser,
  "/sessions/refreshToken": refreshUserToken,
  "/users": createUser,
  "/users/profile": showProfile,
  "/users/checkIns": litsUserCheckIns,
  "/users/todayCheckIn": todayCheckIns,
  "/gyms": createGym,
  "/gyms/search": searchGymsByName,
};
