<template>
  <q-card class="high">
    <q-card-section class="bg-primary q-py-sm text-white shadow">
      <q-btn
        dense
        flat
        icon="arrow_back"
        :to="{ name: 'riwayat' }"
        class="absolute-left"
      />
      <div class="text-subtitle1 text-center q-py-sm" style="font-size: 20px">
        Konfirmasi Pembayaran
      </div>
    </q-card-section>

    <q-card-section v-if="isLoading">
      <q-skeleton
        height="100px"
        width="100%"
        square
        style="
          border-radius: 30px;
          width: 100%;
          height: 450px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        "
      />
    </q-card-section>

    <q-card-section v-else>
      <div
        style="
          border: 3px #3b3b3b6c solid;
          border-radius: 20px;
          font-size: 15px;
          font-family: sans-serif;
          padding: 0 20px;
        "
      >
        <div class="row q-my-md">
          <div class="col-8">
            <div class="q-my-md">
              <span class="text-grey">Nama</span>
              <div>{{ pendaftaran.nama_lengkap }}</div>
            </div>
            <div class="q-my-md">
              <span class="text-grey">Keluhan</span>
              <div v-for="cedera in pendaftaran.cederas" :key="cedera.id">
                <div>- {{ cedera.name }}</div>
              </div>
            </div>
            <div class="q-my-md">
              <span class="text-grey">Penyebab</span>
              <div>{{ pendaftaran.penyebab }}</div>
            </div>
          </div>

          <div class="col-4 text-right">
            <div class="q-my-md">
              <span class="text-grey">Jenis Kelamin</span>
              <div>{{ pendaftaran.jenis_kelamin }}</div>
            </div>

            <div v-for="jadwal in pendaftaran.jadwal" :key="jadwal.id">
              <div class="q-my-md">
                <span class="text-grey">Tanggal</span>
                <div>{{ jadwal.tanggal }}</div>
              </div>

              <div class="q-my-md">
                <span class="text-grey">Waktu</span>
                <div>{{ jadwal.waktu }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="q-my-md">
          <div class="text-center text-grey-7" style="font-size: 40px">
            - - - - - - - - - - - -
          </div>
        </div>

        <div class="q-my-md">
          <div class="q-mb-md" style="font-size: 15px">
            Biaya :
            <div v-for="cedera in pendaftaran.cederas" :key="cedera.id">
              <div class="q-pl-md text-subtitle2" style="font-size: 15px">
                - {{ cedera.name }} = {{ cedera.harga }}
              </div>
            </div>
          </div>
          <div class="row items-center">
            <div class="col-8" style="font-size: 20px">
              Total :
              <span class="text-red text-bold">{{ pendaftaran.tarif }}</span>
            </div>
            <div class="col-4 text-right" style="font-size: 12px">
              <span class="text-grey">Status Pembayaran</span>
              <div>{{ pendaftaran.status_pembayaran }}</div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-section
      style="display: flex; float: right"
      v-if="pendaftaran.status_pembayaran === 'Belum Dibayar'"
    >
      <q-btn
        @click="bayarNanti()"
        flat
        size="md"
        color="primary"
        class="q-mx-xs"
        label="Bayar Nanti"
      />
      <q-btn
        @click="bayarSekarang"
        size="md"
        color="primary"
        class="q-mx-xs"
        label="Bayar Sekarang"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { usePendaftaranStore } from "src/stores/pendaftaran-store";
import { usePembayaranStore } from "src/stores/pembayaran-store";

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const pendaftaranStore = usePendaftaranStore();
const pembayaranStore = usePembayaranStore();
const isLoading = ref(true);

// Get Pendaftaran
const pendaftaran = ref([]);
const getPendaftaran = async (slug) => {
  try {
    const res = await pendaftaranStore.showPendaftaran(slug);
    pendaftaran.value = res.data.data;
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  getPendaftaran(route.params.slug);
});

// Bayar Nanti
const bayarNanti = () => {
  router.push({ name: "riwayat" });
};

// Bayar Sekarang
const bayarSekarang = () => {
  window.snap.pay(pendaftaran.value.pembayaran.snapToken, {
    onSuccess: function (result) {
      onSuccess(pendaftaran.value.pembayaran.id, pendaftaran.value.slug);
      console.log(result);
    },
  });
};
const onSuccess = async (id, slug) => {
  await pembayaranStore.callback(id, slug);

  $q.notify({
    message: "Pembayaran Berhasil",
    icon: "check",
    color: "positive",
  });

  router.push({ name: "riwayat" });
};
</script>

<style scoped>
.high {
  max-width: 500px;
  margin: auto;
  margin-bottom: 80px;
}
</style>
