import { defineStore } from "pinia";
import { server } from "../boot/axios";

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const usePembayaranStore = defineStore("pembayaran", {
  state: () => ({
    order_id: null,
    pendaftaran_id: null,
    total: null,
    status: null,
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    async createPembayaran(data) {
      try {
        return await server.post(`api/pembayaran/checkout/${data.id}`, data, {
          headers,
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    async showPembayaran(id) {
      try {
        return await server.get(`api/pembayaran/${id}`);
      } catch (error) {
        if (error) throw error;
      }
    },

    async callback(id) {
      try {
        return await server.put(`api/pembayaran/callback/${id}`, {
          headers,
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    async invoice() {
      try {
        return await server.get(`api/pembayaran/invoice/${id}`, {
          headers,
        });
      } catch (error) {
        if (error) throw error;
      }
    },
  },
});
