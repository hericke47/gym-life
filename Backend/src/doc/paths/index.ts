import {
  createUser,
  showProfile,
  litsUserCheckIns,
  todayCheckIns,
} from "./users.swagger";
import { authenticateUser, refreshUserToken } from "./sessions.swagger";
import {
  createCheckIn,
  createGym,
  searchGymsByName,
  approveCheckIn,
  listCheckIns,
} from "./gyms";

export default {
  "/sessions": authenticateUser,
  "/sessions/refreshToken": refreshUserToken,
  "/users": createUser,
  "/users/profile": showProfile,
  "/users/checkIns": litsUserCheckIns,
  "/users/todayCheckIn": todayCheckIns,
  "/gyms": createGym,
  "/gyms/search": searchGymsByName,
  "/gyms/checkIn/{gymId}": createCheckIn,
  "/gyms/checkIn/{checkInId}": approveCheckIn,
  "/gyms/checkIns": listCheckIns,
};
