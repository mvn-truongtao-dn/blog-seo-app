import { api } from "../api";
import { ENDPOINTS } from "../endpoints";

export const apiUserGetList = () => {
  return api.get(ENDPOINTS.users);
};
export const apiUserPost = (data) => {
  return api.post(ENDPOINTS.users, data);
};
export const apiUserDetails = (id) => {
  return api.get(`${ENDPOINTS.users}/${id}`);
};
export const apiUserUpdate = (id,data) => {
  return api.put(`${ENDPOINTS.users}/${parseInt(id)}`,data);
};
export const apiUserDelete = (id) => {
  return api.delete(`${ENDPOINTS.users}/${id}`);
}
export const apiUserSearch = (params) => {
  return api.get(`${ENDPOINTS.users}?Firstname=${params}`);
}
