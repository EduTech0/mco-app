<template>
  <q-card class="high">
    <q-card-section class="bg-primary q-py-sm text-white shadow">
      <q-btn dense flat icon="arrow_back" v-close-popup class="absolute-left" />
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
                class="q-px-md q-py-sm items-center"
                style="font-size: 10px"
              >
                <div class="col-8">
                  <div class="text-grey-7">Tanggal</div>
                  <div class="q-mb-sm">{{ jadwal.tanggal }}</div>
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
  <q-dialog v-model="jadwalSelected" persistent position="bottom">
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
</template>

<script setup>
import { ref, defineProps, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useJadwalStore } from "src/stores/jadwal-store";
import { usePendaftaranStore } from "src/stores/pendaftaran-store";
import { usePembayaranStore } from "src/stores/pembayaran-store";

const $q = useQuasar();
const { pendaftaran, method } = defineProps(["pendaftaran", "method"]);
const pendaftaranStore = usePendaftaranStore();
const pembayaranStore = usePembayaranStore();
const jadwalStore = useJadwalStore();
const ticket = ref({});

const loading = ref(false);
const jadwalSelected = ref(false);

// Get Jadwal
const jadwals = ref([]);
const getJadwal = async () => {
  try {
    const res = await jadwalStore.allJadwal();
    jadwals.value = res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  getJadwal();
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

const bayar = (jadwalId) => {
  thisJadwal(jadwalId);
  midtrans();
};

// Create or Edit Jadwal
const thisJadwal = async (jadwalId) => {
  loading.value = true;
  const data = ref({
    id: pendaftaran.id,
    slug: pendaftaran.slug,
    jadwal_id: jadwalId,
  });

  try {
    if (method === "Add Jadwal") {
      // Add Jadwal
      const res = await pendaftaranStore.addJadwal(data.value);

      ticket.value = res.data.data;
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
    } else {
      // Edit Jadwal
      const res = await pendaftaranStore.editJadwal(data.value);
      ticket.value = res.data.data;

      if (res.data && res.data.status === "Success") {
        $q.notify({
          message: res.data.message,
          icon: "check",
          color: "positive",
        });
      } else {
        $q.notify({
          message: "Data Gagal Diubah",
          icon: "warning",
          color: "negative",
        });
      }
    }

    router.push(`/beranda/pembayaran/${pendaftaran.id}`);
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

// Create Pembayaran
const midtrans = async () => {
  const data = ref({
    id: pendaftaran.id,
    first_name: pendaftaran.nama_lengkap,
    address: pendaftaran.alamat,
    phone: pendaftaran.nomor,
    total: pendaftaran.total,
  });

  try {
    const res = await pembayaranStore.createPembayaran(data.value);

    if (res.data && res.data.status === "Success") {
      $q.notify({
        message: res.data.message,
        icon: "check",
        color: "positive",
      });
    } else {
      $q.notify({
        message: "Data Gagal Diubah",
        icon: "warning",
        color: "negative",
      });
    }
  } catch (error) {
    console.log(error);
    $q.notify({
      color: "negative",
      icon: "warning",
      message: "Terjadi kesalahan. Mohon coba lagi.",
    });
  }
};
</script>

<style scoped>
.high {
  max-width: 500px;
  margin: auto;
}
</style>
