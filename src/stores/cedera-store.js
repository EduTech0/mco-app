import { defineStore } from "pinia";
import { server } from "../boot/axios";

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "multipart/form-data",
};

export const useCederaStore = defineStore("cedera", {
  state: () => ({
    id: null,
    image: null,
    name: null,
    harga: null,
  }),

  getters: {},

  actions: {
    async allCedera() {
      try {
        return await server.get("api/cedera");
      } catch (error) {
        if (error) throw error;
      }
    },

    async showCedera() {
      try {
        return await server.get(`api/cedera/${id}`);
      } catch (error) {
        if (error) throw error;
      }
    },

    async createCedera(data) {
      try {
        return await server.post("api/cedera/create", data, { headers });
      } catch (error) {
        if (error) throw error;
      }
    },

    async editCedera(data) {
      try {
        return await server.put(`api/cedera/edit/${data.id}`, data, {
          headers,
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    async deleteCedera(id) {
      try {
        return await server.delete(`api/cedera/delete/${id}`, { headers });
      } catch (error) {
        if (error) throw error;
      }
    },
  },
});
