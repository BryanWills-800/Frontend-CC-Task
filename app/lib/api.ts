import axios from "axios";

export const authApi = axios.create({
    baseURL: "/api/auth",
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export const issApi = axios.create({
    baseURL: "https://api.wheretheiss.at",
    headers: {
        Accept: "application/json",
    },
});

// export const userApi = axios.create({
//     baseURL: "/api/user",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//     },
// });
