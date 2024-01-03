<template>
  <q-card class="high">
    <q-card-section class="bg-primary q-py-sm text-white shadow">
      <q-btn dense flat icon="arrow_back" v-close-popup class="absolute-left" />
      <div class="text-subtitle1 text-center q-py-sm" style="font-size: 20px">
        Konfirmasi Pembayaran
      </div>
    </q-card-section>

    <q-card-section>
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

            <div
              v-for="jadwal in pendaftaran.jadwal.slice(0, 1)"
              :key="jadwal.id"
            >
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
          <div style="font-size: 20px">
            Total :
            <span class="text-red text-bold">{{ pendaftaran.tarif }}</span>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-section style="display: flex; float: right">
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
import { ref, onMounted, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { usePembayaranStore } from "src/stores/pembayaran-store";

const $q = useQuasar();
const router = useRouter();
const { pendaftaran } = defineProps(["pendaftaran"]);
const pembayaranStore = usePembayaranStore();

// Get Pembayaran
const pembayarans = ref([]);
const id = pendaftaran.id;
const getPembayaran = async (id) => {
  try {
    const res = await pembayaranStore.showPembayaran(id);
    console.log(res.data.data);
    pembayarans.value = res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  getPembayaran(id);
});

// Bayar Nanti
const bayarNanti = () => {
  router.push({ name: "riwayat" });
  window.location.reload();
};

// Bayar Sekarang
const bayarSekarang = (pendaftaran, id) => {
  window.snap.pay(pembayarans.value.snapToken, {
    onSuccess: onSuccess(pendaftaran, id),
  });
};
const onSuccess = async (pendaftaran, id) => {
  await pembayaranStore.callback(pendaftaran, id);

  $q.notify({
    message: "Pembayaran Berhasil",
    icon: "check",
    color: "positive",
  });
};
</script>

<style scoped>
.high {
  max-width: 500px;
  margin: auto;
}
</style>
