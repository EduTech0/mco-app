<template>
  <q-card>
    <q-card-section class="bg-primary q-py-sm text-white shadow">
      <q-btn dense flat icon="arrow_back" v-close-popup class="absolute-left" />
      <div class="text-subtitle1 text-center">Location</div>
    </q-card-section>

    <q-card-section>
      <br />
      <div class="text-h6">Location</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <p>Selamat datang di MCO Lectzz!</p>
      <p>
        Syarat dan ketentuan berikut menjelaskan peraturan dan ketentuan
        penggunaan Website MCO Lectzz dengan alamat https://mcolectzz.com.
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup></script>

<style scoped>
.shadow {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: -2px 2px 15px black;
}
</style>
