<template>
  <div class="row q-mt-md">
    <!-- Form Pendaftaran -->
    <q-card
      class="col-4 text-center hover card"
      @click="(formPendaftaran = true), warning('bottom')"
    >
      <q-card-section>
        <q-icon
          class="q-mb-sm"
          color="indigo-10"
          name="description"
          size="32px"
        />
        <div class="text-subtitle2">Form Pendaftaran</div>
      </q-card-section>
      <FormPendaftaran
        :formPendaftaran="formPendaftaran"
        :maximizedToggle="maximizedToggle"
        @update:formPendaftaran="updateFormPendaftaran"
        :danger="danger"
        :bot="bot"
      ></FormPendaftaran>
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
    </q-card>

    <!-- Status Registrasi -->
    <q-card
      class="col-4 text-center hover card"
      @click="statusRegistrasi = true"
    >
      <q-card-section>
        <q-icon
          class="q-mb-sm"
          color="indigo-10"
          name="event_available"
          size="32px"
        />
        <div class="text-subtitle2">Status Registrasi</div>
      </q-card-section>
      <StatusRegistrasi
        :statusRegistrasi="statusRegistrasi"
        :maximizedToggle="maximizedToggle"
        @update:statusRegistrasi="updateStatusRegistrasi"
      ></StatusRegistrasi>
    </q-card>

    <!-- Biaya Penanganan -->
    <q-card
      class="col-4 text-center hover card"
      @click="biayaPenanganan = true"
    >
      <q-card-section>
        <q-icon
          class="q-mb-sm"
          color="indigo-10"
          name="price_change"
          size="32px"
        />
        <div class="text-subtitle2">Biaya Penanganan</div>
      </q-card-section>
      <BiayaPenanganan
        :biayaPenanganan="biayaPenanganan"
        :maximizedToggle="maximizedToggle"
        @update:biayaPenanganan="updateBiayaPenanganan"
      ></BiayaPenanganan>
    </q-card>

    <!-- Informasi Jadwal -->
    <q-card
      class="col-4 text-center hover card"
      @click="informasiJadwal = true"
    >
      <q-card-section>
        <q-icon class="q-mb-sm" color="indigo-10" name="info" size="32px" />
        <div class="text-subtitle2">Informasi Jadwal</div>
      </q-card-section>
      <InformasiJadwal
        :informasiJadwal="informasiJadwal"
        :maximizedToggle="maximizedToggle"
        @update:informasiJadwal="updateInformasiJadwal"
      ></InformasiJadwal>
    </q-card>

    <!-- FAQ -->
    <q-card class="col-4 text-center hover card" @click="FAQ = true">
      <q-card-section>
        <q-icon
          class="q-mb-sm"
          color="indigo-10"
          name="live_help"
          size="32px"
        />
        <div class="text-subtitle2">FAQ</div>
      </q-card-section>
      <FAQ
        :FAQ="FAQ"
        :maximizedToggle="maximizedToggle"
        @update:FAQ="updateFAQ"
      ></FAQ>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import FormPendaftaran from "components/beranda/FormPendaftaran.vue";
import StatusRegistrasi from "components/beranda/StatusRegistrasi.vue";
import BiayaPenanganan from "components/beranda/BiayaPenanganan.vue";
import InformasiJadwal from "components/beranda/InformasiJadwal.vue";
import FAQ from "components/beranda/FAQ.vue";

export default defineComponent({
  components: {
    FormPendaftaran,
    StatusRegistrasi,
    BiayaPenanganan,
    InformasiJadwal,
    FAQ,
  },

  setup() {
    const danger = ref(false);
    const bot = ref("top");
    const maximizedToggle = ref(true);
    const formPendaftaran = ref(false);
    const statusRegistrasi = ref(false);
    const biayaPenanganan = ref(false);
    const informasiJadwal = ref(false);
    const FAQ = ref(false);

    const updateFormPendaftaran = (value) => {
      formPendaftaran.value = value;
    };
    const updateStatusRegistrasi = (value) => {
      statusRegistrasi.value = value;
    };
    const updateBiayaPenanganan = (value) => {
      biayaPenanganan.value = value;
    };
    const updateInformasiJadwal = (value) => {
      informasiJadwal.value = value;
    };
    const updateFAQ = (value) => {
      FAQ.value = value;
    };

    return {
      danger,
      bot,
      warning(pos) {
        bot.value = pos;
        danger.value = true;
      },
      close(pos) {
        danger.value = false;
      },
      formPendaftaran,
      statusRegistrasi,
      biayaPenanganan,
      informasiJadwal,
      FAQ,
      maximizedToggle,
      updateFormPendaftaran,
      updateStatusRegistrasi,
      updateBiayaPenanganan,
      updateInformasiJadwal,
      updateFAQ,
    };
  },
});
</script>

<style scoped>
.hover:hover {
  cursor: pointer;
  background-color: rgba(0, 255, 255, 0.144);
  transition: background-color 0.4s ease;
}

.card {
  box-shadow: none;
}
</style>
