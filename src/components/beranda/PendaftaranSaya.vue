<template>
  <!-- Loading -->
  <div v-if="loading">
    <div class="q-pa-lg">
      <q-skeleton
        height="150px"
        width="100%"
        class="q-my-sm"
        square
        style="border-radius: 10px"
      />
      <q-skeleton
        height="150px"
        width="100%"
        class="q-my-sm"
        square
        style="border-radius: 10px"
      />
      <q-skeleton
        height="150px"
        width="100%"
        class="q-my-sm"
        square
        style="border-radius: 10px"
      />
      <q-skeleton
        height="150px"
        width="100%"
        class="q-my-sm"
        square
        style="border-radius: 10px"
      />
    </div>
  </div>

  <!-- Ticket -->
  <div v-else v-for="ticket in tickets" :key="ticket.id">
    <div
      class="ticket"
      :style="
        ticket.status === 'Dalam Antrian'
          ? 'background-color: #ffa600ea'
          : ticket.status === 'Terverifikasi'
          ? 'background-color: #00ca11e8'
          : 'background-color: #0025f594'
      "
    >
    <q-card class="card-left">
        <!-- Nama -->
        <div>
          <span class="text-grey" style="font-size: 12px">Nama</span>
          <div style="font-size: 11px; font-family: sans-serif">
            {{ ticket.nama_lengkap }}
          </div>
        </div>

        <!-- Cedera -->
        <div class="q-my-sm">
          <span class="text-grey" style="font-size: 12px">Keluhan</span>
          <div v-for="cedera in ticket.cederas.slice(0, 3)" :key="cedera.id">
            <div style="font-size: 11px; font-family: sans-serif">
              - {{ cedera.name }}
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="q-my-sm">
          <span class="text-grey" style="font-size: 12px">Status</span>
          <div style="font-size: 11px; font-family: sans-serif">
            {{
              ticket.status === "Dalam Antrian"
                ? "Menunggu Verifikasi"
                : ticket.status === "Terverifikasi"
                ? "Sudah Disetujui"
                : "Selesai"
            }}
          </div>
        </div>
     </q-card>

      <q-card class="card-right">
        <div
          class="absolute-center"
          style="cursor: pointer"
          @click="choose(ticket)"
        >
          <div class="text-h6 text-center text-bold text-container">
            {{ ticket.status === 'Dalam Antrian' ? 'TUNGGU VERIFIKASI' : 'PILIH JADWAL' }}
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { usePendaftaranStore } from "src/stores/pendaftaran-store";

const $q = useQuasar();
const router = useRouter();
const pendaftaranStore = usePendaftaranStore();

const tickets = ref([]);
const loading = ref(true);

// Get Ticket
const getTicket = async () => {
  try {
    const res = await pendaftaranStore.ticketPendaftaran();
    tickets.value = res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  loading.value = false;
};
onMounted(() => {
  getTicket();
});

// Choose Ticket
const choose = (ticket) => {
  if (ticket.status === "Terverifikasi") {
    const id = ticket.id;
    router.push({ name: "pembayaran", params: { id } });
  } else {
    $q.dialog({
      title: "Gagal",
      message: "Silakan menunggu pendaftaran ini verifikasi.",
      persistent: true,
      ok: {
        label: "ok",
        color: "primary",
      },
    });
  }
};
</script>

<style scoped>
.ticket {
  position: relative;
  margin: 40px 20px;
  padding: 80px 15px;
  border-radius: 5px;
}
.card-left,
.card-right {
  background: #fff;
  height: 13em;
  float: left;
  position: relative;
  padding: 1em;
  box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2); /* Efek bayangan */
  border-radius: 10px;
  margin-top: -92px;
}
.card-left {
  width: 70%;
}

.card-right {
  width: 30%;
  border-left: 0.18em dashed #7e7e7e;
}

.text-container {
  font-size: small;
  line-height: 1;
}
</style>
