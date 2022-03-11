import axios from "axios";
// const BASE_URL = "https://zliu-node-on-heroku.herokuapp.com/api";
const BASE_URL = "http://localhost:4000/api";
const USERS_API = `${BASE_URL}/users`;
const LOGIN_API = `${BASE_URL}/login`;


export const createUser = (user) =>
  axios.post("http://localhost:4000/api/users", user)
    .then(response => response.data);

export const findAllUsers = () =>
    axios.get("http://localhost:4000/api/users")
        .then(response => response.data);

export const findUserById = (uid) =>
    axios.get(`${USERS_API}/${uid}`)
        .then(response => response.data);

export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (username) =>
  axios.delete(`${USERS_API}/username/${username}`)
    .then(response => response.data);

export const findUserByCredentials = (credentials) =>
  axios.post(`${LOGIN_API}`, credentials)
    .then(response => response.data);

const service = {
  findAllUsers
}

export default service;