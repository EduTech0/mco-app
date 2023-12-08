<template>
  <div>
    <q-form @submit="addJadwal">
      <q-card class="q-px-lg q-py-md" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Jadwal</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- Tanggal -->
          <div class="q-my-md">
            <div class="text-subtitle2">Tanggal :</div>
            <q-date v-model="jadwal.tanggal" class="q-ml-md" />
          </div>

          <!-- Waktu -->
          <div class="q-my-md">
            <div class="text-subtitle2">Waktu :</div>
            <div class="row justify-center">
              <div class="col-5">
                <q-input
                  filled
                  v-model="jadwal.waktu1"
                  mask="time"
                  :rules="['time']"
                  ><template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="jadwal.waktu1" mask="HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon> </template
                ></q-input>
              </div>
              <div class="col2 items-center">
                <p
                  class="text-subtitle2 q-px-sm q-py-md"
                  style="font-size: 30px"
                >
                  -
                </p>
              </div>
              <div class="col-5">
                <q-input
                  filled
                  v-model="jadwal.waktu2"
                  mask="time"
                  :rules="['time']"
                  ><template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="jadwal.waktu2" mask="HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon> </template
                ></q-input>
              </div>
            </div>
          </div>

          <!-- Kuota -->
          <div class="q-my-md">
            <div class="text-subtitle2">Kuota :</div>
            <q-input
              filled
              v-model="jadwal.kuota"
              type="number"
              label="Kuota"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            type="submit"
            label="Tambah jadwal"
            color="dark"
            :disable="isSubmitting"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
import { LocalStorage } from "quasar";
import { ref } from "vue";

export default {
  data() {
    return {
      jadwal: {
        tanggal: ref("2023/09/01"),
        waktu1: ref("00:00"),
        waktu2: ref("00:00"),
        kuota: ref(null),
      },
      isSubmitting: false,
    };
  },

  methods: {
    addJadwal() {
      this.isSubmitting = true;

      const formData = new FormData();
      formData.append("tanggal", this.jadwal.tanggal);
      formData.append("waktu1", this.jadwal.waktu1);
      formData.append("waktu2", this.jadwal.waktu2);
      formData.append("kuota", this.jadwal.kuota);

      const token = LocalStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      // Kirim permintaan ke API Laravel untuk menambahkan jadwal
      axios
        .post("http://localhost:8000/api/jadwal/create", formData, { headers })
        .then((response) => {
          // Handle respons dari server (berhasil atau gagal)
          console.log(response.data);
          this.$q.notify({
            color: "positive",
            message: response.data.message,
          });
          this.$emit("added", response.data.data);
          // Reset formulir setelah berhasil menambahkan
          this.jadwal.tanggal = null;
          this.jadwal.waktu1 = null;
          this.jadwal.waktu2 = null;
          this.jadwal.kuota = null;
          this.jadwal.tersisa = null;
        })
        .catch((error) => {
          // Handle kesalahan jika ada
          console.error(error);
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
  },
};
</script>
