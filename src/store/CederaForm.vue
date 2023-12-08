<template>
  <div>
    <q-form @submit="addCedera">
      <q-card class="q-px-lg q-py-md" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Cedera</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row justify-center">
            <!-- Nama -->
            <div class="col-5 q-mr-sm">
              <q-input
                v-model="cedera.name"
                label="Nama"
                class="q-my-sm"
                dense
                autofocus
                required
              ></q-input>
            </div>
            <!-- Harga -->
            <div class="col-5 q-ml-sm">
              <q-input
                v-model="cedera.harga"
                label="Harga"
                class="q-my-sm"
                outlined
                dense
                type="number"
                required
              ></q-input>
            </div>
          </div>

          <!-- Images -->
          <q-file
            filled
            bottom-slots
            v-model="cedera.images"
            class="q-my-sm"
            label="Images"
            counter
            accept=".jpg, .jpeg, .png, .gif, .svg"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop.prevent />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop.prevent="model = null"
                class="cursor-pointer"
              />
            </template>

            <template v-slot:hint> Field hint </template>
          </q-file>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            type="submit"
            label="Tambah Cedera"
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

export default {
  data() {
    return {
      cedera: {
        name: "",
        harga: null,
        images: null,
      },
      isSubmitting: false,
    };
  },

  methods: {
    addCedera() {
      this.isSubmitting = true;

      const formData = new FormData();
      formData.append("name", this.cedera.name);
      formData.append("harga", this.cedera.harga);
      formData.append("images", this.cedera.images);

      const token = LocalStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      // Kirim permintaan ke API Laravel untuk menambahkan cedera
      axios
        .post("http://localhost:8000/api/cederas/create", formData, { headers })
        .then((response) => {
          // Handle respons dari server (berhasil atau gagal)
          console.log(response.data);
          this.$q.notify({
            color: "positive",
            message: response.data.message,
          });
          this.$emit("added", response.data.data);
          // Reset formulir setelah berhasil menambahkan
          this.cedera.name = "";
          this.cedera.harga = null;
          this.cedera.images = null;
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
