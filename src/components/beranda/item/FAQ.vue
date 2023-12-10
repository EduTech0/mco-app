<template>
  <q-card class="high">
    <q-card-section class="high bg-primary q-py-sm text-white">
      <q-btn dense flat icon="arrow_back" v-close-popup />
      <div class="text-subtitle1 absolute-center" style="top: 23px">FAQ</div>
      <div class="text-center q-mt-lg">
        <img
          src="src/assets/notifikasi.png"
          alt=""
          width="120"
          class="profile q-mt-lg"
        />
      </div>
    </q-card-section>

    <div style="font-size: 10px">
      <div
        class="text-grey-9 bg-grey-4 q-pa-sm q-py-md q-pl-md border"
        style="font-size: 10px"
      >
        ARTIKEL TERPOPULER
      </div>
      <div class="q-pa-sm q-py-md q-pl-md border" style="font-size: 12px">
        <p class="float-left">Apa itu MCO?</p>
        <p class="float-right">
          <q-icon name="chevron_right" size="20px" />
        </p>
        <br />
      </div>
      <div class="q-pa-sm q-py-md q-pl-md border" style="font-size: 12px">
        <p class="float-left">
          Bagaimana pesan jadwal terapi di aplikasi mco lectzz ?
        </p>
        <p class="float-right">
          <q-icon name="chevron_right" size="20px" />
        </p>
        <br />
      </div>
    </div>
  </q-card>
</template>

<script setup></script>

<style scoped>
.high {
  max-width: 500px;
  margin: auto;
}
.border {
  border-top: 1px solid rgb(219, 219, 219);
}
.border:hover {
  cursor: pointer;
  background-color: rgba(34, 34, 34, 0.212);
  transition: background-color 0.3s ease;
}
</style>
