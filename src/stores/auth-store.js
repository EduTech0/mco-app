import { defineStore } from "pinia";
import { server } from "../boot/axios";

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    id: null,
    name: null,
    email: null,
    password: null,
    tanggal_lahir: null,
    jenis_kelamin: null,
    role: null,
    address: null,
  }),

  getters: {},

  actions: {
    async register(name, email, password, repassword) {
      try {
        return await server.post("api/auth/register", {
          name,
          email,
          password,
          repassword,
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    async login(email, password) {
      try {
        return await server.post("api/auth/login", { email, password });
      } catch (error) {
        if (error) throw error;
      }
    },

    async logout() {
      try {
        return localStorage.removeItem("token");
      } catch (error) {
        if (error) throw error;
      }
    },

    async profile() {
      try {
        return await server.get("api/profile", { headers });
      } catch (error) {
        if (error) throw error;
      }
    },
  },
});
