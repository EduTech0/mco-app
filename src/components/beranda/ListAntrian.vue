<template>
  <div class="row">
    <div class="col q-pb-sm q-pr-sm q-pl-sm">
      <div>
        <q-card-section class="bg-white" style="border-radius: 20px;">
          <div class="text-body2 float-left">Antrian Verifikasi</div>
          <img :src="verifikasi" color="black" size="20px" class="float-right" />
          <br />
          <div class="text-subtitle1 text-bold">9</div>
        </q-card-section>
      </div>
    </div>

    <div class="col q-pb-sm q-pr-sm">
      <div>
        <q-card-section class="bg-white" style="border-radius: 20px;">
          <div class="text-body2 float-left">Antrian Jadwal</div>
          <img
            :src="jadwal"
            color="orange"
            size="20px"
            class="float-right"
          />
          <br />
          <div class="text-subtitle1 text-bold">9714</div>
        </q-card-section>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col q-pb-sm q-pr-sm q-pl-sm">
      <div>
        <q-card-section class="bg-white" style="border-radius: 20px;">
          <div class="text-body2 float-left">Slot Hari Ini</div>
          <img
            :src="hariIni"
            color="red"
            size="20px"
            class="float-right"
          />
          <br />
          <div class="text-subtitle1 text-bold">22</div>
        </q-card-section>
      </div>
    </div>

    <div class="col q-pb-sm q-pr-sm">
      <div>
        <q-card-section class="bg-white" style="border-radius: 20px;">
          <div class="text-body2 float-left">Slot Tersedia</div>
          <img
            :src="tersedia"
            color="green"
            size="20px"
            class="float-right"
          />
          <br />
          <div class="text-subtitle1 text-bold">8</div>
        </q-card-section>
      </div>
    </div>
  </div>
</template>

<script setup>
import verifikasi from "../../svg/verifikasi.svg"
import hariIni from "../../svg/hariIni.svg"
import jadwal from "../../svg/jadwal.svg"
import tersedia from "../../svg/tersedia.svg"
</script>
