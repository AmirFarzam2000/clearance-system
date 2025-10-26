import api from "./Api";

export const userApi = {

    getUsers: async () => {
        const response = await api.get('/Users');
        return response.data;
      },
}