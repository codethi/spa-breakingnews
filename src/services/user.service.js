import axios from "axios";

const baseURL = "http://localhost:3001";

export function singupService(body) {
  const resp = axios.post(`${baseURL}/user/create`, body).catch((error) => {
    return error.resp;
  });
  return resp;
}

export function singinService(body) {
  const resp = axios.post(`${BASE_URL}/auth/login`, body).catch((error) => {
    return error.resp;
  });
  return resp;
}

export function getUserByIdService(id, jwt) {
  const response = axios.get(`${baseURL}/user/findById/${id}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return response;
}

export function getUserLoggedService(jwt) {
  const response = axios.get(`${baseURL}/user/findById/`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return response;
}

export function editUserService(body, id, jwt) {
  const response = axios.post(`${baseURL}/user/update/${id}`, body, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return response;
}
