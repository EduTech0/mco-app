import { defineStore } from "pinia";
import { server } from "../boot/axios";

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const useJadwalStore = defineStore("jadwal", {
  state: () => ({
    id: null,
    tanggal: null,
    tanggal_header: null,
    waktu: null,
    kuota: null,
    tersisa: null,
  }),

  getters: {},

  actions: {
    async allJadwal() {
      try {
        return await server.get("api/jadwal", { headers });
      } catch (error) {
        if (error) throw error;
      }
    },

    async showJadwal() {
      try {
        return await server.get(`api/jadwal/${id}`, { headers });
      } catch (error) {
        if (error) throw error;
      }
    },

    async createJadwal(data) {
      try {
        return await server.post("api/jadwal/create", data, { headers });
      } catch (error) {
        if (error) throw error;
      }
    },

    async editJadwal(data) {
      try {
        return await server.put(`api/jadwal/edit/${data.id}`, data, {
          headers,
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    async deleteJadwal(id) {
      try {
        return await server.delete(`api/jadwal/delete/${id}`, { headers });
      } catch (error) {
        if (error) throw error;
      }
    },
  },
});
