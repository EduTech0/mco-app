<template>
  <div class="row q-mt-md">
    <!-- Form Pendaftaran -->
    <q-card
      class="col-4 text-center hover card"
      @click="(formPendaftaran = true), (danger = true)"
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
      <q-dialog
        v-model="formPendaftaran"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <FormPendaftaran />
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
              @click="danger = false"
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
      <q-dialog
        v-model="statusRegistrasi"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <StatusRegistrasi />
      </q-dialog>
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
      <q-dialog
        v-model="biayaPenanganan"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <BiayaPenanganan />
      </q-dialog>
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
      <q-dialog
        v-model="informasiJadwal"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <InformasiJadwal />
      </q-dialog>
    </q-card>

    <!-- FAQ -->
    <q-card class="col-4 text-center hover card" @click="faq = true">
      <q-card-section>
        <q-icon
          class="q-mb-sm"
          color="indigo-10"
          name="live_help"
          size="32px"
        />
        <div class="text-subtitle2">FAQ</div>
      </q-card-section>
      <q-dialog
        v-model="faq"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <FAQ />
      </q-dialog>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FormPendaftaran from "components/beranda/FormPendaftaran.vue";
import StatusRegistrasi from "components/beranda/StatusRegistrasi.vue";
import BiayaPenanganan from "components/beranda/BiayaPenanganan.vue";
import InformasiJadwal from "components/beranda/InformasiJadwal.vue";
import FAQ from "components/beranda/FAQ.vue";

const bot = ref("bottom");
const danger = ref(false);
const maximizedToggle = ref(true);

const formPendaftaran = ref(false);
const statusRegistrasi = ref(false);
const biayaPenanganan = ref(false);
const informasiJadwal = ref(false);
const faq = ref(false);
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
