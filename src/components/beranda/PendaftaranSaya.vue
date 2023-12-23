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
        <div class="row items-center">
          <!-- Pendaftaran -->
          <div class="col-6">
            <!-- Nama -->
            <div>
              <span class="text-grey text_header">Nama</span>
              <div
                class="text_data"
                style="font-family: sans-serif; margin-top: -4px"
              >
                {{ ticket.nama_lengkap }}
              </div>
            </div>

            <!-- Cedera -->
            <div class="q-my-sm">
              <span class="text-grey text_header">Keluhan</span>
              <div v-if="ticket.cederas.length > 0">
                <div
                  class="text_data"
                  style="font-family: sans-serif; margin-top: -4px"
                >
                  <span v-if="ticket.cederas.length > 1"
                    >{{ ticket.cederas[0].name }}, dll</span
                  >
                  <span v-else>{{ ticket.cederas[0].name }}</span>
                </div>
              </div>
            </div>

            <!-- Status Pendaftaran -->
            <div class="q-my-sm">
              <span class="text-grey text_header">Status Pendaftaran</span>
              <div
                class="text_data"
                style="font-family: sans-serif; margin-top: -4px"
              >
                {{
                  ticket.status === "Dalam Antrian"
                    ? "Menunggu Verifikasi"
                    : ticket.status === "Terverifikasi"
                    ? "Sudah Disetujui"
                    : "Selesai"
                }}
              </div>
            </div>
          </div>

          <!-- Jadwal -->
          <div class="col-6 text-right">
            <div v-if="ticket.jadwal && ticket.jadwal.length > 0">
              <!-- Tanggal -->
              <div>
                <span class="text-grey text_header">Tanggal</span>
                <div
                  class="text_data"
                  style="font-family: sans-serif; margin-top: -4px"
                >
                  {{ ticket.jadwal[0].tanggal }}
                </div>
              </div>

              <!-- Waktu -->
              <div class="q-my-sm">
                <span class="text-grey text_header">Waktu</span>
                <div
                  class="text_data"
                  style="font-family: sans-serif; margin-top: -4px"
                >
                  {{ ticket.jadwal[0].waktu }}
                </div>
              </div>

              <!-- Status Pembayaran -->
              <div class="q-my-sm">
                <span class="text-grey text_header">Status Pembayaran</span>
                <div
                  class="text_data"
                  style="font-family: sans-serif; margin-top: -4px"
                >
                  Belum Dibayar
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <!-- Edit Keluhan -->
            <q-btn
              push
              flat
              no-caps
              color="primary"
              label="Edit Keluhan"
              :size="$q.screen.width <= 370 ? 'xs' : 'sm'"
              padding="none"
              v-if="
                ticket.status === 'Terverifikasi' &&
                ticket.jadwal &&
                ticket.jadwal.length > 0
              "
            />
            <!-- Ganti Jadwal -->
            <q-btn
              push
              flat
              no-caps
              color="primary"
              label="Ganti Jadwal"
              :size="$q.screen.width <= 370 ? 'xs' : 'sm'"
              padding="none"
              class="float-right"
              v-if="ticket.status === 'Terverifikasi'"
            />
          </div>
        </div>
      </q-card>

      <q-card class="card-right">
        <div class="absolute-center" style="cursor: pointer">
          <div
            v-if="
              ticket.status === 'Terverifikasi' &&
              ticket.jadwal &&
              ticket.jadwal.length > 0
            "
            class="text-h6 text-center text-bold text_title"
            @click="bayar(ticket)"
          >
            BAYAR SEKARANG
          </div>
          <div
            v-else-if="ticket.status === 'Selesai'"
            class="text-h6 text-center text-bold text_title"
            @click="choose(ticket)"
          >
            SELESAI
          </div>
          <div
            v-else
            class="text-h6 text-center text-bold text_title"
            @click="choose(ticket)"
          >
            PILIH JADWAL
          </div>
        </div>
      </q-card>
    </div>
  </div>

  <!-- Pembayaran -->
  <q-dialog
    v-model="dialogPembayaran"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <PembayaranDialog :pendaftaran="pendaftaran" />
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { usePendaftaranStore } from "src/stores/pendaftaran-store";
import PembayaranDialog from "./PembayaranDialog.vue";

const $q = useQuasar();
const router = useRouter();
const pendaftaranStore = usePendaftaranStore();

const tickets = ref([]);
const loading = ref(true);
const dialogPembayaran = ref(false);

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
  } else if (ticket.status === "Selesai") {
    $q.dialog({
      title: "Info",
      message: "Pendaftaran sudah selesai.",
      persistent: true,
      ok: {
        label: "ok",
        color: "primary",
      },
    });
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

// Bayar
const pendaftaran = ref("");
const bayar = (ticket) => {
  pendaftaran.value = ticket;
  dialogPembayaran.value = true;
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

.text_title {
  font-size: 20px;
}

.text_header {
  font-size: 12px;
}
.text_data {
  font-size: 11px;
}

@media only screen and (max-width: 450px) {
  .text_header {
    font-size: 10px;
  }
  .text_data {
    font-size: 9px;
  }
  .text_title {
    font-size: 15px;
  }
}
@media only screen and (max-width: 370px) {
  .text_header {
    font-size: 8px;
  }
  .text_data {
    font-size: 6px;
  }
  .text_title {
    font-size: 10px;
  }
}
</style>
