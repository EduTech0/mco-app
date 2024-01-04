import { defineStore } from "pinia";
import { server } from "../boot/axios";

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const usePendaftaranStore = defineStore("pendaftaran", {
  state: () => ({
    id: null,
    user_id: null,
    nama_lengkap: null,
    jenis_kelamin: null,
    berat: null,
    tinggi: null,
    usia: null,
    pekerjaan: null,
    alamat: null,
    nomor: null,
    olahraga: null,
    cabang: null,
    penyebab: null,
    lama_cedera: null,
    jumlah_terapi: null,
    status: null,
    cederas: null,
  }),

  getters: {},

  actions: {
    async allPendaftaran() {
      try {
        return await server.get("api/pendaftaran");
      } catch (error) {
        if (error) throw error;
      }
    },

    async ticketPendaftaran() {
      try {
        return await server.get("api/pendaftaran/ticket", { headers });
      } catch (error) {
        if (error) throw error;
      }
    },

    async showPendaftaran(slug) {
      try {
        return await server.get(`api/pendaftaran/${slug}`);
      } catch (error) {
        if (error) throw error;
      }
    },

    async createPendaftaran(data) {
      try {
        return await server.post("api/pendaftaran/create", data, { headers });
      } catch (error) {
        if (error) throw error;
      }
    },

    async editPendaftaran(data) {
      try {
        return await server.put(`api/pendaftaran/edit/${data.slug}`, data, {
          headers,
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    async addJadwal(data) {
      try {
        return await server.put(`api/pendaftaran/addjadwal/${data.slug}`, data, {
          headers,
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    async editJadwal(data) {
      try {
        return await server.put(`api/pendaftaran/editjadwal/${data.slug}`, data, {
          headers,
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    async verificationPendaftaran(id) {
      try {
        return await server.put(`api/pendaftaran/verification/${id}`, {
          headers,
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    async deletePendaftaran(id) {
      try {
        return await server.delete(`api/pendaftaran/delete/${id}`, { headers });
      } catch (error) {
        if (error) throw error;
      }
    },
  },
});
