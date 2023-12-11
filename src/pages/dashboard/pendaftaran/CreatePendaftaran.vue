<template>
  <div>
    <q-form @submit="addPendaftaran">
      <q-card class="q-px-lg q-py-md" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Pendaftaran</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- Nama Lengkap -->
          <q-input
            v-model="data.nama_lengkap"
            label="Nama Lengkap*"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Masukkan nama lengkap',
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
            <div
              v-if="!data.jenis_kelamin"
              class="text-subtitle2 text-negative"
            >
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
            v-model="data.cederas"
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
            <div
              v-if="!data.jumlah_terapi"
              class="text-subtitle2 text-negative"
            >
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
              type="submit"
              class="button bg-orange-10 text-white"
              :disable="loading || disabledButton"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </div>

  <!-- Keluhan -->
  <q-dialog v-model="cederasList" :position="dialogPosition">
    <q-card>
      <div v-for="cedera in cederas" :key="cedera.id">
        <q-item tag="label" v-ripple>
          <img
            :src="'http://localhost:8000/storage/cederas/' + cedera.image"
            alt="Cedera Image"
            width="80"
          />
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
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { usePendaftaranStore } from "src/stores/pendaftaran-store";
import { useCederaStore } from "src/stores/cedera-store";

const $q = useQuasar();
const pendaftaranStore = usePendaftaranStore();
const cederaStore = useCederaStore();
const emits = defineEmits(["added"]);

const dialogPosition = ref("bottom");
const cederasList = ref(false);

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

// Disable Button
const loading = ref(false);
const disabledButton = computed(() => {
  const dataWithoutImage = { ...data.value };
  delete dataWithoutImage.image;

  return Object.values(dataWithoutImage).some((value) => {
    return value === null || value === "";
  });
});

// Create Pendaftaran
const addPendaftaran = async () => {
  loading.value = true;
  try {
    const res = await pendaftaranStore.createPendaftaran(data.value);

    if (res.data && res.data.status === "Success") {
      $q.notify({
        message: res.data.message,
        icon: "check",
        color: "positive",
      });
    } else {
      $q.notify({
        message: "Data Gagal Ditambah",
        icon: "warning",
        color: "negative",
      });
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    $q.notify({
      color: "negative",
      icon: "warning",
      message: "Terjadi kesalahan. Mohon coba lagi.",
    });
  }
  loading.value = false;
  emits("added");
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
</style>
