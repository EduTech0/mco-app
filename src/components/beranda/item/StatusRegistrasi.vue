<template>
  <q-card class="high">
    <q-card-section class="high bg-primary q-py-sm text-white shadow">
      <q-btn dense flat icon="arrow_back" v-close-popup class="absolute-left" />
      <div class="text-subtitle1 text-center">Status Registrasi</div>
    </q-card-section>

    <!-- Ticket -->
    <q-card-section class="q-mt-lg">
      <PendaftaranSaya />
    </q-card-section>
  </q-card>
</template>

<script setup>
import PendaftaranSaya from "components/beranda/PendaftaranSaya.vue";
</script>

<style scoped>
.high {
  max-width: 500px;
  margin: auto;
}
</style>
