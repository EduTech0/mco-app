<template>
  <q-card>
    <q-card-section class="bg-primary q-py-sm text-white shadow">
      <q-btn dense flat icon="arrow_back" v-close-popup class="absolute-left" />
      <div class="text-subtitle1 text-center">Status Registrasi</div>
    </q-card-section>

    <!-- Loading -->
    <q-card-section v-if="loading">
      <div
        class="text-subtitle2 text-bold"
        style="font-size: 17px; margin-bottom: -20px; margin-top: 30px"
      >
        <q-skeleton type="text" width="150px" height="50px" />
      </div>
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
    </q-card-section>

    <!-- Ticket -->
    <q-card-section v-else class="q-mt-lg">
      <!-- Tidak ada Data -->
      <div class="absolute-center" v-if="tickets.length === 0">
        <img src="src/assets/registrasi.png" alt="" width="300" />
      </div>

      <!-- Data -->
      <div v-for="ticket in tickets" :key="ticket.id">
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
            <div class="q-my-sm">
              <span class="text-grey" style="font-size: 12px">Nama</span>
              <div>{{ ticket.nama_lengkap }}</div>
            </div>

            <!-- Cedera -->
            <div class="q-my-sm">
              <span class="text-grey" style="font-size: 12px">Keluhan</span>
              <div
                v-for="cedera in ticket.cederas.slice(0, 3)"
                :key="cedera.id"
              >
                <div style="font-size: 11px; font-family: sans-serif">
                  - {{ cedera.name }}
                </div>
              </div>
            </div>

            <!-- Status -->
            <div class="q-my-sm">
              <span class="text-grey" style="font-size: 12px">Status</span>
              <div>
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
            <div style="cursor: pointer" @click="choose(ticket)">
              <h5 class="text-center text-bold">KLIK DISINI</h5>
            </div>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <!-- Data -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { usePendaftaranStore } from "src/stores/pendaftaran-store";

const $q = useQuasar();
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
    $q.dialog({
      title: "Coming Soon!",
      message: "",
      persistent: true,
      ok: {
        label: "ok",
        color: "primary",
      },
    });
  } else {
    $q.dialog({
      title: "Gagal",
      message: "Silakan menunggu pendaftaran ini disetujui.",
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
.shadow {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: -2px 2px 15px black;
}
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
</style>
