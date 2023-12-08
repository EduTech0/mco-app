<template>
  <q-dialog
    :model-value="formPendaftaran"
    @update:model-value="$emit('update:formPendaftaran', $event)"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
    class="high"
  >
    <q-card>
      <q-card-section class="bg-primary q-py-sm text-white shadow">
        <q-btn
          dense
          flat
          icon="arrow_back"
          v-close-popup
          class="absolute-left"
        />
        <q-tabs class="float-right" @click="warning('bottom')"
          ><q-icon name="info" size="20px" class="iconInfo"
        /></q-tabs>
        <div class="text-subtitle1 text-center">Pendaftaran</div>
      </q-card-section>

      <q-card-section>
        <br />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="submitForm" @reset="onReset" class="q-gutter-sm">
          <!-- Nama Lengkap -->
          <q-input
            v-model="nama_lengkap"
            label="Nama Lengkap*"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Masukkan nama lengkap',
            ]"
          />

          <!-- Jenis Kelamin -->
          <div>
            <label class="text-grey-7">Jenis Kelamin*</label>
            <q-option-group :options="gender" type="radio" v-model="genders" />
          </div>

          <!-- Berat dan Tinggi Badan -->
          <div class="row">
            <!-- Berat -->
            <div class="col-6 q-pr-sm">
              <q-input
                type="number"
                v-model="berat"
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
                v-model="tinggi"
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
            v-model="usia"
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
            v-model="pekerjaan"
            label="Pekerjaan*"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Masukkan pekerjaan']"
          />

          <!-- Alamat -->
          <q-input
            v-model="alamat"
            label="Alamat*"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Masukkan alamat lengkap',
            ]"
          />

          <!-- No.Hp -->
          <q-input
            v-model="nomor"
            label="No.Hp*"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Masukkan nomor hp']"
          />

          <!-- Status Olahraga -->
          <div>
            <label class="text-grey-7">Status Olahraga*</label>
            <q-option-group :options="olahraga" type="radio" v-model="sport" />
          </div>

          <!-- Cabang Olahraga -->
          <q-input
            v-model="cabang"
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
            v-model="keluhans"
            multiple
            use-chips
            stack-label
            label="Keluhan*"
            :rules="[(val) => (val && val.length > 0) || 'Pilih titik cedera']"
          />

          <!-- Penyebab -->
          <q-input
            v-model="penyebab"
            label="Penyebab*"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Masukkan penyebab cedera',
            ]"
          />

          <!-- Lama Cedera -->
          <div>
            <label class="text-grey-7">Lama Cedera*</label>
            <q-option-group :options="lama" type="radio" v-model="long" />
          </div>

          <!-- Sudah Berapakali diterapi -->
          <div>
            <label class="text-grey-7">Sudah Berapakali diterapi*</label>
            <q-option-group :options="terapi" type="radio" v-model="massage" />
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
  </q-dialog>

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
          @click="close('bottom')"
        />
      </div>
    </q-card>
  </q-dialog>

  <!-- Keluhan -->
  <q-dialog v-model="dialog" :position="position">
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
            <q-checkbox v-model="keluhans" :val="cedera.id" />
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

<script>
import { useQuasar, LocalStorage } from "quasar";
import { ref, computed, onMounted } from "vue";
import axios from "axios";

export default {
  name: "FormPendaftaranPage",

  props: {
    formPendaftaran: Boolean,
    maximizedToggle: Boolean,
  },

  setup(props, { emit }) {
    const internalPendaftaran = computed({
      get: () => props.formPendaftaran,
      set: (value) => emit("update:formPendaftaran", value),
    });
    const $q = useQuasar();
    const loading = ref(false);

    // token
    const token = LocalStorage.getItem("token");

    // Warning
    const danger = ref(false);
    const bot = ref("top");

    // Form
    const nama_lengkap = ref("");
    const genders = ref("");
    const berat = ref(null);
    const tinggi = ref(null);
    const usia = ref(null);
    const pekerjaan = ref("");
    const alamat = ref("");
    const nomor = ref("");
    const sport = ref("");
    const cabang = ref("");
    const penyebab = ref("");
    const long = ref("");
    const massage = ref("");

    // Keluhan
    const cederas = ref([]);
    const dialog = ref(false);
    const position = ref("top");
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

    return {
      internalPendaftaran,
      $q,
      token,
      loading,
      success: ref(false),

      // Warning
      danger,
      bot,

      // Form
      nama_lengkap,
      genders,
      berat,
      tinggi,
      usia,
      pekerjaan,
      alamat,
      nomor,
      sport,
      cabang,
      penyebab,
      long,
      massage,

      // Gender
      gender: [
        { label: "Laki-Laki", value: "Laki-laki" },
        { label: "Perempuan", value: "Perempuan" },
      ],
      // Olahraga
      olahraga: [
        { label: "Hobi Olahraga", value: "Hobi" },
        { label: "Atlet", value: "Atlet" },
        { label: "Lainnya", value: "Lainnya" },
      ],
      // Keluhan
      dialog,
      position,
      cederas,
      keluhans: ref([]),
      open(pos) {
        position.value = pos;
        dialog.value = true;
      },
      // Lama Cedera
      lama: [
        { label: "< 1 minggu", value: "<1minggu" },
        { label: "< 1 bulan>", value: "<1bulan" },
        { label: "< 1 tahun>", value: "<1tahun" },
        { label: "> 1 tahun", value: ">1tahun" },
      ],
      // Terapi
      terapi: [
        { label: "Belum Pernah", value: "belum" },
        { label: "1 kali", value: "1kali" },
        { label: "> 1 kali", value: ">1kali" },
      ],
      // File
      image: ref(null),
    };
  },

  methods: {
    cekKeluhan() {
      console.log(this.keluhans);
    },
    async submitForm() {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append("nama_lengkap", this.nama_lengkap);
        formData.append("jenis_kelamin", this.genders);
        formData.append("berat", this.berat);
        formData.append("tinggi", this.tinggi);
        formData.append("usia", this.usia);
        formData.append("pekerjaan", this.pekerjaan);
        formData.append("alamat", this.alamat);
        formData.append("nomor", this.nomor);
        formData.append("olahraga", this.sport);
        formData.append("cabang", this.cabang);
        formData.append("cederas", this.keluhans);
        this.keluhans.forEach((id) => formData.append("cederas[]", id));
        formData.append("penyebab", this.penyebab);
        formData.append("lama_cedera", this.long);
        formData.append("jumlah_terapi", this.massage);

        const response = await axios.post(
          "http://localhost:8000/api/pendaftaran/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (response.data.status === "Success") {
          this.$q.notify({
            color: "positive",
            position: "top",
            message: response.data.message,
          });
          this.loading = false;
          this.success = true;
          // Reset form values
          this.nama_lengkap = null;
          this.genders = null;
          this.berat = null;
          this.tinggi = null;
          this.usia = null;
          this.pekerjaan = null;
          this.alamat = null;
          this.nomor = null;
          this.sport = null;
          this.cabang = null;
          this.keluhans = null;
          this.penyebab = null;
          this.long = null;
          this.massage = null;
        } else {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Pendaftaran gagal. Mohon coba lagi.",
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);

        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          this.$q.notify({
            color: "negative",
            position: "top",
            message: errorMessage || "Terjadi kesalahan. Mohon coba lagi.",
          });
          console.error(errorMessage);
        } else {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Terjadi kesalahan. Mohon coba lagi.",
          });
        }
        this.loading = false;
      }
    },
  },
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
