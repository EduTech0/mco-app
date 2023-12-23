<template>
  <q-card>
    <q-card-section class="bg-primary q-py-sm text-white shadow">
      <div class="text-subtitle1 text-center" style="font-size: 20px">
        Silahkan pilih jadwal
      </div>
    </q-card-section>
    <q-card-section class="q-pa-lg">
      <div>
        <div v-for="(dateGroup, date) in sortedGroupedJadwals" :key="date">
          <!-- Header Tanggal -->
          <div class="column items-center">
            <div
              class="bg-grey-3 text-black"
              style="padding: 2px 30px; font-size: 11px; border-radius: 100px"
            >
              {{ date }}
            </div>
          </div>

          <!-- Kartu Jadwal untuk Tanggal Ini -->
          <div v-for="jadwal in dateGroup" :key="jadwal.id">
            <q-card
              class="q-my-md cursor-pointer"
              :style="
                jadwal.tersisa === 0
                  ? 'border-right: 4px solid #ff0000a8;'
                  : 'border-right: 4px solid #00aa00;'
              "
              @click="choose(jadwal)"
            >
              <q-card-section
                horizontal
                class="q-px-md q-py-sm"
                style="font-size: 10px"
              >
                <div class="col-8">
                  <div class="text-grey-7">Tanggal</div>
                  <div class="q-mb-sm">{{ jadwal.tanggal }}</div>
                  <div class="text-grey-7">Kuota</div>
                  <div>{{ jadwal.kuota }}</div>
                </div>

                <div class="col-4 text-right">
                  <div class="text-grey-7">Waktu</div>
                  <div class="q-mb-sm">
                    {{ jadwal.waktu }}
                  </div>
                  <div class="text-grey-7">Tersisa</div>
                  <div>{{ jadwal.tersisa }}</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <!-- Dialog Jadwal Selected -->
  <q-dialog v-model="jadwalSelected" position="bottom">
  <q-card>
    <q-card-section class="text-center" style="font-size: 15px">
      <div class="text-bold q-mb-md">Reservasi Jadwal</div>
      <div class="q-mb-md">
        <div>Tanggal: {{ jadwalChoosed.tanggal }}</div>
        <div>Waktu: {{ jadwalChoosed.waktu }}</div>
      </div>
    </q-card-section>
      <q-card-section class="row justify-center">
        <div class="text-center col-12">
          Apakah anda yakin memilih jadwal ini ?
        </div>
        <div class="q-mt-sm">
          <q-btn
            outline
            rounded
            color="dark"
            label="Tidak"
            class="q-mx-lg"
            v-close-popup
          />
          <q-btn
            rounded
            color="primary"
            label="Ya"
            class="q-mx-lg"
            :disable="loading"
            @click="bayar(jadwalChoosed.id)"
          />
        </div>
      </q-card-section>
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
    <q-card class="high">
      <q-card-section class="bg-primary q-py-sm text-white shadow">
        <q-btn
          dense
          flat
          icon="arrow_back"
          v-close-popup
          class="absolute-left"
        />
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
          <div class="q-my-md">
            <div class="text-center text-grey-7" style="font-size: 40px">
              - - - - - - - - - - - -
            </div>
          </div>
          <div class="row q-my-md">
            <div class="col-8">
              <span class="text-grey">Tanggal</span>
              <div>{{ jadwalChoosed.tanggal }}</div>
            </div>

            <div class="col-4 text-right">
              <span class="text-grey">Waktu</span>
              <div>{{ jadwalChoosed.waktu }}</div>
            </div>
          </div>
          <div class="q-my-md">
            <div style="font-size: 20px">
              Tarif :
              <span class="text-red text-bold">{{ pendaftaran.tarif }}</span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section
        class="q-pa-md q-mt-xl"
        style="display: flex; flex-direction: column; align-items: flex-end"
      >
        <q-btn size="lg" color="primary" label="Bayar Sekarang" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useJadwalStore } from "src/stores/jadwal-store";
import { usePendaftaranStore } from "src/stores/pendaftaran-store";

const $q = useQuasar();
const route = useRoute();
const pendaftaranStore = usePendaftaranStore();
const jadwalStore = useJadwalStore();
const loading = ref(false);

const jadwals = ref([]);
const pendaftaran = ref("");
const jadwalSelected = ref(false);
const dialogPembayaran = ref(false);

// Get Jadwal
const getJadwal = async () => {
  try {
    const res = await jadwalStore.allJadwal();
    console.log('Jadwal API Response:', res.data);
    jadwals.value = res.data.data;
  } catch (error) {
    console.error("Error fetching Jadwal data:", error);
  }
};

const getPendaftaran = async (id) => {
  try {
    const res = await pendaftaranStore.showPendaftaran(id);
    console.log('Pendaftaran API Response:', res.data);
    pendaftaran.value = res.data.data;
  } catch (error) {
    console.error("Error fetching Pendaftaran data:", error);
  }
};

onMounted(() => {
  getJadwal();
  getPendaftaran(route.params.id);
});

// Computed property untuk mengelompokkan Jadwal berdasarkan tanggal
const groupedJadwals = computed(() => {
  const grouped = {};
  for (const jadwal of jadwals.value) {
    const date = jadwal.tanggal_header;
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(jadwal);
  }
  return grouped;
});

// Fungsi untuk mengurutkan tanggal tercepat (terlama) dulu
const sortedGroupedJadwals = computed(() => {
  const dates = Object.keys(groupedJadwals.value);
  dates.sort((a, b) => new Date(a) - new Date(b));
  const sortedGrouped = {};
  for (const date of dates) {
    sortedGrouped[date] = groupedJadwals.value[date];
  }
  return sortedGrouped;
});

// Pilih Jadwal
const jadwalChoosed = ref("");
const choose = async (jadwal) => {
  jadwalChoosed.value = jadwal;
  if (jadwal.tersisa === 0) {
    $q.dialog({
      title: "Gagal",
      message:
        "Tidak ada antrian tersisa untuk jadwal ini, Silahkan pilih jadwal lain",
      persistent: true,
      ok: {
        label: "ok",
        color: "primary",
      },
    });
  } else {
    jadwalSelected.value = true;
  }
};

// Add Jadwal
const addJadwal = async (jadwalId) => {
  loading.value = true;

  const data = ref({
    id: pendaftaran.value.id,
    jadwal: jadwalId,
  });
  console.log(data.value);

  try {
    const res = await pendaftaranStore.addJadwal(data.value);

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

    dialogPembayaran.value = true;
  } catch (error) {
    console.log(error);
    $q.notify({
      color: "negative",
      icon: "warning",
      message: "Terjadi kesalahan. Mohon coba lagi.",
    });
  }

  loading.value = false;
};

// Pembayaran
const bayar = (jadwalId) => {
  addJadwal(jadwalId);
};
</script>

<style scoped>
.high {
  max-width: 500px;
  margin: auto;
}
</style>
