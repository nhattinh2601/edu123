import axiosClient from './axiosClient';

const UserAPI = {
  getMyUserInfor: () => {
    const url = '/app-user';
    return axiosClient.get(url);
  },

  register: (params) => {
    const url = '/auth/register';
    return axiosClient.post(url, params);
  },

  login: (params) => {
    const url = '/auth/login';
    return axiosClient.post(url, { email: params.email, password: params.password });
  },

  changePassword: (params) => {
    const url = '/auth/change-password';
    return axiosClient.patch(url, params);
  },
};

export default UserAPI;
