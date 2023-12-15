<template>
  <div class="row q-mt-md">
    <!-- Form Pendaftaran -->
    <div
      class="col-4 text-center hover card"
      @click="(formPendaftaran = true), (danger = true)"
    >
      <q-card-section>
        <q-icon
          class="q-mb-sm"
          color="white"
          name="description"
          size="40px"
        />
        <div class="text-subtitle2" style="color:white;">Form Pendaftaran</div>
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
        <div class="q-pa-lg" style="border-radius: 20px 20px 0 0">
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
        </div>
      </q-dialog>
    </div>

    <!-- Status Registrasi -->
    <div
      class="col-4 text-center hover card"
      @click="statusRegistrasi = true"
    >
      <q-card-section>
        <q-icon
          class="q-mb-sm"
          color="white"
          name="event_available"
          size="40px"
        />
        <div class="text-subtitle2" style="color:white;">Status Registrasi</div>
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
    </div>

    <!-- Biaya Penanganan -->
    <div
      class="col-4 text-center hover card"
      @click="biayaPenanganan = true"
    >
      <q-card-section>
        <q-icon
          class="q-mb-sm"
          color="white"
          name="price_change"
          size="40px"
        />
        <div class="text-subtitle2" style="color:white;">Biaya Penanganan</div>
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
    </div>

    <!-- Informasi Jadwal -->
    <div
      class="col-4 text-center hover card"
      @click="informasiJadwal = true"
    >
      <q-card-section>
        <q-icon class="q-mb-sm" color="white" name="info" size="40px" />
        <div class="text-subtitle2" style="color:white;">Informasi Jadwal</div>
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
    </div>

    <!-- FAQ -->
    <div class="col-4 text-center hover card" @click="faq = true">
      <q-card-section>
        <q-icon
          class="q-mb-sm"
          color="white"
          name="live_help"
          size="40px"
        />
        <div class="text-subtitle2" style="color:white;">FAQ</div>
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
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FormPendaftaran from "components/beranda/item/FormPendaftaran.vue";
import StatusRegistrasi from "components/beranda/item/StatusRegistrasi.vue";
import BiayaPenanganan from "components/beranda/item/BiayaPenanganan.vue";
import InformasiJadwal from "components/beranda/item/InformasiJadwal.vue";
import FAQ from "components/beranda/item/FAQ.vue";

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
  border: none;
}
</style>
