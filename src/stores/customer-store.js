import { defineStore } from "pinia";
import { server } from "../boot/axios";

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "multipart/form-data",
};

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    id: null,
    image: null,
    name: null,
    harga: null,
  }),

  getters: {},

  actions: {
    async profile() {
      try {
        return await server.get("api/profile", { headers });
      } catch (error) {
        if (error) throw error;
      }
    },

    async editProfile() {
      try {
        return await server.post("api/profile/edit", { headers });
      } catch (error) {
        if (error) throw error;
      }
    },

    async allCustomer() {
      try {
        return await server.get("api/customer");
      } catch (error) {
        if (error) throw error;
      }
    },

    async createCustomer(data) {
      try {
        return await server.post("api/customer/create", data, { headers });
      } catch (error) {
        if (error) throw error;
      }
    },

    async editCustomer(data) {
      try {
        return await server.put(`api/customer/edit/${data.id}`, data, {
          headers,
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    async deleteCustomer(id) {
      try {
        return await server.delete(`api/customer/delete/${id}`, { headers });
      } catch (error) {
        if (error) throw error;
      }
    },
  },
});
