<template>
  <q-card>
    <q-card-section class="bg-primary q-py-sm text-white shadow">
      <q-btn dense flat icon="arrow_back" v-close-popup class="absolute-left" />
      <q-tabs class="float-right" @click="danger = true"
        ><q-icon name="info" size="20px" class="iconInfo"
      /></q-tabs>
      <div class="text-subtitle1 text-center">Pendaftaran</div>
    </q-card-section>

    <q-card-section>
      <br />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="submitForm" class="q-gutter-sm">
        <!-- Nama Lengkap -->
        <q-input
          v-model="data.nama_lengkap"
          label="Nama Lengkap*"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Masukkan nama lengkap']"
        />

        <!-- Jenis Kelamin -->
        <div>
          <label class="text-grey-7">Jenis Kelamin*</label>
          <q-option-group
            :options="genders"
            type="radio"
            v-model="data.jenis_kelamin"
          />
        </div>

        <!-- Berat dan Tinggi Badan -->
        <div class="row">
          <!-- Berat -->
          <div class="col-6 q-pr-sm">
            <q-input
              type="number"
              v-model="data.berat"
              label="Berat Badan*"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Masukkan berat badan',
              ]"
            />
          </div>
          <!-- Tinggi -->
          <div class="col-6 q-pl-sm">
            <q-input
              type="number"
              v-model="data.tinggi"
              label="Tinggi Badan*"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Masukkan tinggi badan',
              ]"
            />
          </div>
        </div>

        <!-- Usia -->
        <q-input
          type="number"
          v-model="data.usia"
          label="Usia*"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Masukkan usia',
            (val) =>
              (val > 0 && val < 100) || 'Masukkan usia anda yang sekarang',
          ]"
        />

        <!-- Pekerjaan -->
        <q-input
          v-model="data.pekerjaan"
          label="Pekerjaan*"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Masukkan pekerjaan']"
        />

        <!-- Alamat -->
        <q-input
          v-model="data.alamat"
          label="Alamat*"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Masukkan alamat lengkap',
          ]"
        />

        <!-- No.Hp -->
        <q-input
          v-model="data.nomor"
          label="No.Hp*"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Masukkan nomor hp']"
        />

        <!-- Status Olahraga -->
        <div>
          <label class="text-grey-7">Status Olahraga*</label>
          <q-option-group
            :options="sports"
            type="radio"
            v-model="data.olahraga"
          />
        </div>

        <!-- Cabang Olahraga -->
        <q-input
          v-model="data.cabang"
          label="Cabang Olahraga*"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Masukkan cabang olahraga',
          ]"
        />

        <!-- Keluhan -->
        <q-select
          icon="keyboard_arrow_down"
          color="primary"
          @click="open('bottom')"
          filled
          v-model="cederas"
          multiple
          use-chips
          stack-label
          label="Keluhan*"
          :rules="[(val) => (val && val.length > 0) || 'Pilih titik cedera']"
        />

        <!-- Penyebab -->
        <q-input
          v-model="data.penyebab"
          label="Penyebab*"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Masukkan penyebab cedera',
          ]"
        />

        <!-- Lama Cedera -->
        <div>
          <label class="text-grey-7">Lama Cedera*</label>
          <q-option-group
            :options="lamaOptions"
            type="radio"
            v-model="data.lama_cedera"
          />
        </div>

        <!-- Sudah Berapakali diterapi -->
        <div>
          <label class="text-grey-7">Sudah Berapakali diterapi*</label>
          <q-option-group
            :options="terapi"
            type="radio"
            v-model="data.jumlah_terapi"
          />
        </div>

        <!-- Hasil rontgen atau MRI (jika ada) -->
        <q-file
          bottom-slots
          v-model="image"
          label="Hasil rontgen atau MRI (jika ada)"
          counter
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

          <template v-slot:hint></template>
        </q-file>

        <!-- Submit -->
        <div class="column items-center">
          <q-btn
            label="Submit"
            :disable="loading"
            type="submit"
            class="button bg-orange-10 text-white"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>

  <!-- Warning -->
  <q-dialog v-model="danger" :position="bot">
    <q-card class="q-pa-lg" style="border-radius: 20px 20px 0 0">
      <div class="column items-center">
        <q-icon name="warning" size="50px" />
      </div>
      <p class="q-py-md" style="font-size: 12px">
        Tidak menangani cedera baru, patah tulang, kelainan tulang, lumpuh,
        stroke, diabetes, jantung, dan penyakit dalam lainnya
      </p>
      <div class="column items-center q-pb-md">
        <q-btn
          no-caps
          color="primary"
          size="12px"
          label="Ok, Mengerti"
          @click="danger = false"
        />
      </div>
    </q-card>
  </q-dialog>

  <!-- Keluhan -->
  <q-dialog v-model="keluhan" :position="bot">
    <q-card>
      <div v-for="cedera in cederas" :key="cedera.id">
        <q-item tag="label" v-ripple>
          <q-img
            class="col-2 q-ma-sm"
            src="http://localhost:8000/storage/cederas/{{ cedera.images }}"
          />
          <q-item-section>
            <q-item-label>{{ cedera.name }}</q-item-label>
            <q-item-label caption>Rp.{{ cedera.harga }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-checkbox v-model="cederas" :val="cedera.id" />
          </q-item-section>
        </q-item>
      </div>
    </q-card>
  </q-dialog>

  <!-- Success -->
  <q-dialog
    v-model="success"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="bg-primary q-py-sm text-white shadow">
        <div class="text-center text-bold text-caption" style="font-size: 25px">
          Success
        </div>
      </q-card-section>

      <q-card-section class="q-my-lg"></q-card-section>

      <q-card-section class="q-mt-xl">
        <div justify="center" align="center" class="q-mt-xl">
          <div class="text-primary q-gutter-md q-mt-xl">
            <q-icon name="task_alt" size="100px" class="" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-my-lg"></q-card-section>

      <q-card-section class="q-mt-xl text-center">
        <div
          class="text-h5 text-bold"
          style="font-family: sans-serif; font-size: 30px"
        >
          Pendaftaran Berhasil
        </div>
        <div class="text-h5" style="font-family: sans-serif; font-size: 25px">
          Mohon tunggu proses verifikasi
        </div>
      </q-card-section>

      <q-card-actions class="column items-center q-mt-xl">
        <div class="q-mt-lg">
          <q-btn
            v-close-popup
            label="Kembali ke Beranda"
            class="button bg-orange-10 text-white"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";

const $q = useQuasar();
const loading = ref(false);
const token = localStorage.getItem("token");

const bot = ref("bottom");
const maximizedToggle = ref(true);
const danger = ref(false);
const keluhan = ref(false);
const success = ref(false);

const data = ref({
  nama_lengkap: "",
  jenis_kelamin: "",
  berat: null,
  tinggi: null,
  usia: null,
  pekerjaan: "",
  alamat: "",
  nomor: "",
  olahraga: "",
  cabang: "",
  penyebab: "",
  lama_cedera: "",
  jumlah_terapi: "",
});

// Keluhan
const cederas = ref([]);
const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/cederas");
    cederas.value = response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  fetchData();
});

const genders = [
  { label: "Laki-Laki", value: "Laki-laki" },
  { label: "Perempuan", value: "Perempuan" },
];

const sports = [
  { label: "Hobi Olahraga", value: "Hobi" },
  { label: "Atlet", value: "Atlet" },
  { label: "Lainnya", value: "Lainnya" },
];

const lamaOptions = [
  { label: "< 1 minggu", value: "<1 Minggu" },
  { label: "< 1 bulan>", value: "<1 Bulan" },
  { label: "< 1 tahun>", value: "<1 Tahun" },
  { label: "> 1 tahun", value: ">1 Tahun" },
];

const terapi = [
  { label: "Belum Pernah", value: "Belum" },
  { label: "1 kali", value: "1 Kali" },
  { label: "> 1 kali", value: ">1 Kali" },
];

// File
const image = ref(null);

const submitForm = async () => {
  loading.value = true;
  try {
    const formData = new FormData();
    for (const key in data.value) {
      if (data.value.hasOwnProperty(key)) {
        formData.append(key, data.value[key]);
      }
    }
    cederas.value.forEach((id) => formData.append("cederas[]", id));

    const response = await axios.post(
      "http://localhost:8000/api/pendaftaran/create",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.status === "Success") {
      $q.notify({
        color: "positive",
        position: "top",
        message: response.data.message,
      });
      success.value = true;
    } else {
      $q.notify({
        color: "negative",
        position: "top",
        message: "Pendaftaran gagal. Mohon coba lagi.",
      });
    }
  } catch (error) {
    console.error("Error submitting form:", error);

    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      $q.notify({
        color: "negative",
        position: "top",
        message: errorMessage || "Terjadi kesalahan. Mohon coba lagi.",
      });
      console.error(errorMessage);
    } else {
      $q.notify({
        color: "negative",
        position: "top",
        message: "Terjadi kesalahan. Mohon coba lagi.",
      });
    }
    loading.value = false;
  }
};
</script>

<style scoped>
.shadow {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: -2px 2px 15px black;
}
.button {
  width: 300px;
  border-radius: 50px;
}
.iconInfo {
  margin-top: 3px;
  cursor: pointer;
}
.iconInfo:hover {
  color: azure;
  scale: 1.1;
  transition: background-color 0.3s ease;
  transition: scale 0.5s ease;
}
@media (min-width: 769px) {
  .high {
    padding: 0 450px;
  }
}
</style>
