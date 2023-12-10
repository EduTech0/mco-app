<template>
  <q-card class="high">
    <q-card-section class="high bg-primary q-py-sm text-white shadow">
      <q-btn dense flat icon="arrow_back" v-close-popup class="absolute-left" />
      <div class="text-subtitle1 text-center">Informasi Jadwal</div>
    </q-card-section>

    <q-card-section class="q-pt-lg"></q-card-section>

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
              class="q-my-md"
              :style="
                jadwal.tersisa === 0
                  ? 'border-right: 4px solid #ff0000a8;'
                  : 'border-right: 4px solid #00aa00;'
              "
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useJadwalStore } from "src/stores/jadwal-store";

const jadwalStore = useJadwalStore();
const jadwals = ref([]);

// Get Jadwal
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
</script>

<style scoped>
.high {
  max-width: 500px;
  margin: auto;
}
.shadow {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: -2px 2px 15px black;
}
</style>
