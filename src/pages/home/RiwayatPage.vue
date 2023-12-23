<template>
  <q-header bordered class="bg-primary text-white shadow-4">
    <div class="text-subtitle1 text-center q-pa-sm">Pendaftaran</div>
  </q-header>

  <q-page class="q-pa-sm">
    <!-- <div class="absolute-center">
      <img src="../../assets/notifikasi.png" alt="" width="300" />
    </div> -->
    <PendaftaranSaya/>
  </q-page>
</template>

<script setup>
import PendaftaranSaya from "components/beranda/PendaftaranSaya.vue";
</script>
