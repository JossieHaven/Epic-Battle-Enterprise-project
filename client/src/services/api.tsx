import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/users";

export const fetchUserProfile = async (userId: string) => {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data;
};

export const updateUserProfile = async (userId: string, profileData: any) => {
    return axios.put(`${API_BASE_URL}/${userId}`, profileData);
};

export const fetchUserFavorites = async (userId: string) => {
    const response = await axios.get(`${API_BASE_URL}/${userId}/favorites`);
    return response.data;
};

export const fetchUserBattles = async (userId: string) => {
    const response = await axios.get(`${API_BASE_URL}/${userId}/battles`);
    return response.data;
};
