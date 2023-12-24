<template>
  <q-card class="high">
    <q-card-section class="high bg-primary q-py-sm text-white shadow">
      <q-btn dense flat icon="arrow_back" v-close-popup class="absolute-left" />
      <q-tabs class="float-right" @click="warning = true"
        ><q-icon name="info" size="20px" class="iconInfo"
      /></q-tabs>
      <div class="text-subtitle1 text-center">Pendaftaran</div>
    </q-card-section>

    <q-card-section>
      <br />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="createPendaftaran" class="q-gutter-sm">
        <!-- Nama Lengkap -->
        <q-input
          v-model="data.nama_lengkap"
          label="Nama Lengkap*"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Masukkan nama lengkap',
            (val) => (val && val.length <= 20) || 'Maksimal 20 kata',
          ]"
        />

        <!-- Jenis Kelamin -->
        <div>
          <label class="text-grey-7">Jenis Kelamin*</label>
          <q-option-group
            :options="[
              { label: 'Laki-Laki', value: 'Laki-Laki' },
              { label: 'Perempuan', value: 'Perempuan' },
            ]"
            type="radio"
            v-model="data.jenis_kelamin"
            :rules="[(v) => !!v || 'Pilih jenis kelamin']"
          />
          <div v-if="!data.jenis_kelamin" class="text-subtitle2 text-negative">
            Pilih jenis kelamin
          </div>
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
          type="number"
          v-model="data.nomor"
          label="No.Hp*"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Masukkan nomor hp',
            (val) =>
              (val && val.length >= 8 && val.length <= 14) ||
              'Nomor hp harus antara 8 dan 14 karakter',
          ]"
        />

        <!-- Status Olahraga -->
        <div>
          <label class="text-grey-7">Status Olahraga*</label>
          <q-option-group
            :options="[
              { label: 'Hobi Olahraga', value: 'Hobi' },
              { label: 'Atlet', value: 'Atlet' },
              { label: 'Lainnya', value: 'Lainnya' },
            ]"
            type="radio"
            v-model="data.olahraga"
            :rules="[(v) => !!v || 'Pilih status olahraga']"
          />
          <div v-if="!data.olahraga" class="text-subtitle2 text-negative">
            Pilih status olahraga
          </div>
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
          @click="cederasList = true"
          filled
          v-model="selectedCederas"
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
            :options="[
              { label: '< 1 minggu', value: '<1 Minggu' },
              { label: '< 1 bulan>', value: '<1 Bulan' },
              { label: '< 1 tahun>', value: '<1 Tahun' },
              { label: '> 1 tahun', value: '>1 Tahun' },
            ]"
            type="radio"
            v-model="data.lama_cedera"
            :rules="[(v) => !!v || 'Pilih lama cedera']"
          />
          <div v-if="!data.lama_cedera" class="text-subtitle2 text-negative">
            Pilih lama cedera
          </div>
        </div>

        <!-- Sudah Berapakali diterapi -->
        <div>
          <label class="text-grey-7">Sudah Berapakali diterapi*</label>
          <q-option-group
            :options="[
              { label: 'Belum Pernah', value: 'Belum' },
              { label: '1 kali', value: '1 Kali' },
              { label: '> 1 kali', value: '>1 Kali' },
            ]"
            type="radio"
            v-model="data.jumlah_terapi"
            :rules="[(v) => !!v || 'Pilih jumlah terapi']"
          />
          <div v-if="!data.jumlah_terapi" class="text-subtitle2 text-negative">
            Pilih jumlah terapi
          </div>
        </div>

        <!-- Hasil rontgen atau MRI (jika ada) -->
        <q-file
          bottom-slots
          v-model="data.image"
          label="Hasil rontgen atau MRI (jika ada)"
          counter
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="data.image = null"
              class="cursor-pointer"
            />
          </template>

          <template v-slot:hint></template>
        </q-file>

        <!-- Submit -->
        <div class="column items-center">
          <q-btn
            label="Submit"
            style="background-color: #045951"
            type="submit"
            class="button text-white"
            :disable="loading || isFormIncomplete"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>

  <!-- Warning -->
  <q-dialog v-model="warning" :position="dialogPosition">
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
          @click="warning = false"
        />
      </div>
    </q-card>
  </q-dialog>

  <!-- Keluhan -->
  <q-dialog v-model="cederasList" :position="dialogPosition">
    <q-card>
      <div v-for="cedera in cederas" :key="cedera.id">
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>{{ cedera.name }}</q-item-label>
            <q-item-label caption>Rp.{{ cedera.harga }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-checkbox v-model="data.cederas" :val="cedera.id" />
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
    <q-card class="high">
      <q-card-section class="high bg-primary q-py-sm text-white shadow">
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
            label="Kembali ke Beranda"
            class="button bg-orange-10 text-white"
            onclick="window.location.reload()"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { usePendaftaranStore } from "src/stores/pendaftaran-store";
import { useCederaStore } from "src/stores/cedera-store";

const $q = useQuasar();
const pendaftaranStore = usePendaftaranStore();
const cederaStore = useCederaStore();

const dialogPosition = ref("bottom");
const warning = ref(false);
const cederasList = ref(false);
const maximizedToggle = ref(true);
const success = ref(false);

// Data
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
  cederas: [],
  penyebab: "",
  lama_cedera: "",
  jumlah_terapi: "",
  image: null,
});

// Keluhan
const cederas = ref([]);
const selectedCederas = computed(() => {
  return data.value.cederas.map((id) => {
    const selectedCedera = cederas.value.find((cedera) => cedera.id === id);
    return selectedCedera ? selectedCedera.name : "";
  });
});
const getCedera = async () => {
  try {
    const res = await cederaStore.allCedera();
    cederas.value = res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  getCedera();
});

// Disable Submit
const loading = ref(false);
const isFormIncomplete = computed(() => {
  const dataWithoutImage = { ...data.value };
  delete dataWithoutImage.image;

  return Object.values(dataWithoutImage).some((value) => {
    return value === null || value === "";
  });
});

// Submit
const createPendaftaran = async () => {
  loading.value = true;
  try {
    const res = await pendaftaranStore.createPendaftaran(data.value);

    if (res.data.status === "Success") {
      $q.notify({
        color: "positive",
        position: "top",
        message: res.data.message,
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

    if (error.res && error.res.data) {
      $q.notify({
        color: "negative",
        position: "top",
        message:
          error.res.data.message || "Terjadi kesalahan. Mohon coba lagi.",
      });
    } else {
      $q.notify({
        color: "negative",
        position: "top",
        message: "Terjadi kesalahan. Mohon coba lagi.",
      });
    }
  }
  loading.value = false;
};
</script>

<style scoped>
.high {
  max-width: 500px;
  margin: auto;
}
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
</style>
