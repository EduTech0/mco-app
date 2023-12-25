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
              <div>
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
          <div class="col-12" v-if="ticket.status === 'Terverifikasi'">
            <!-- Edit Keluhan -->
            <q-btn
              push
              flat
              no-caps
              color="primary"
              label="Edit Keluhan"
              :size="$q.screen.width <= 370 ? 'xs' : 'sm'"
              padding="none"
              @click="editKeluhan(ticket)"
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
              v-if="ticket.jadwal && ticket.jadwal.length > 0"
              @click="editJadwal(ticket)"
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
            v-else-if="ticket.status === 'Dalam Antrian'"
            class="text-h6 text-center text-bold text_title"
            @click="choose(ticket)"
          >
            TUNGGU VERIFIKASI
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

  <!-- Jadwal -->
  <q-dialog
    v-model="chooseJadwal"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <ChooseJadwal :pendaftaran="pendaftaran" :method="method" />
  </q-dialog>

  <!-- Keluhan -->
  <q-dialog v-model="editCederas" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Pilih Cedera</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          filled
          multiple
          use-chips
          stack-label
          icon="keyboard_arrow_down"
          color="primary"
          label="Keluhan*"
          v-model="selectedCederas"
          @click="cederasList = true"
          :rules="[(val) => (val && val.length > 0) || 'Pilih titik cedera']"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat color="primary" label="Cancel" v-close-popup />
        <q-btn
          color="primary"
          label="Save"
          :disable="isSubmitting"
          @click="updateKeluhan(pendaftaran)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="cederasList" position="bottom">
    <q-card>
      <div v-for="cedera in cederas" :key="cedera.id">
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>{{ cedera.name }}</q-item-label>
            <q-item-label caption>Rp.{{ cedera.harga }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-checkbox v-model="pendaftaran.cederas" :val="cedera.id" />
          </q-item-section>
        </q-item>
      </div>
    </q-card>
  </q-dialog>

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
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { usePendaftaranStore } from "src/stores/pendaftaran-store";
import { useCederaStore } from "src/stores/cedera-store";
import PembayaranDialog from "src/components/PembayaranDialog.vue";
import ChooseJadwal from "src/components/ChooseJadwal.vue";

const $q = useQuasar();
const cederaStore = useCederaStore();
const pendaftaranStore = usePendaftaranStore();

const pendaftaran = ref("");
const method = ref("");
const loading = ref(true);
const isSubmitting = ref(false);

// Get Ticket
const tickets = ref([]);
const getTicket = async () => {
  try {
    const res = await pendaftaranStore.ticketPendaftaran();
    tickets.value = res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  loading.value = false;
};

// Get Cedera
const cederas = ref([]);
const getCedera = async () => {
  try {
    const res = await cederaStore.allCedera();
    cederas.value = res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  getTicket();
  getCedera();
});

// Choose Ticket
const choose = (ticket) => {
  if (ticket.status === "Terverifikasi") {
    pendaftaran.value = ticket;
    method.value = "Add Jadwal";
    chooseJadwal.value = true;
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

// Edit Keluhan
const editCederas = ref(false);
const cederasList = ref(false);
const selectedCederas = computed(() => {
  return pendaftaran.value.cederas.map((id) => {
    const selectedCedera = cederas.value.find((cedera) => cedera.id === id);
    return selectedCedera ? selectedCedera.name : "";
  });
});
const editKeluhan = (ticket) => {
  pendaftaran.value = ticket;
  editCederas.value = true;

  pendaftaran.value.cederas = ticket.cederas.map((cedera) => cedera.id);
};

const updateKeluhan = async (ticket) => {
  isSubmitting.value = true;
  try {
    delete ticket.status;
    ticket.cederas = selectedCederas.value
      .map((name) => cederas.value.find((c) => c.name === name)?.id)
      .filter((id) => id !== null);

    const res = await pendaftaranStore.editPendaftaran(ticket);
    console.log(res);
    if (res.data && res.data.status === "Success") {
      $q.notify({
        message: res.data.message,
        icon: "check",
        color: "positive",
      });
    } else {
      $q.notify({
        message: "Data Gagal Ditambah",
        icon: "warning",
        color: "negative",
      });
    }
    editCederas.value = true;
    getTicket();
  } catch (error) {
    console.error("Error submitting form:", error);
    $q.notify({
      color: "negative",
      icon: "warning",
      message: "Terjadi kesalahan. Mohon coba lagi.",
    });
  }
  isSubmitting.value = false;
};

// Ganti Jadwal
const chooseJadwal = ref(false);
const editJadwal = (ticket) => {
  pendaftaran.value = ticket;
  method.value = "Edit Jadwal";
  chooseJadwal.value = true;
};

// Bayar
const dialogPembayaran = ref(false);
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
