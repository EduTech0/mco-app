<template>
  <q-dialog
    :model-value="biayaPenanganan"
    @update:model-value="$emit('update:biayaPenanganan', $event)"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="bg-primary q-py-sm text-white shadow">
        <q-btn
          dense
          flat
          icon="arrow_back"
          v-close-popup
          class="absolute-left"
        />
        <div class="text-subtitle1 text-center">Biaya Penanganan</div>
      </q-card-section>

      <q-card-section class="q-pt-lg"></q-card-section>

      <q-card-section class="q-pa-lg">
        <div v-for="cedera in cederas" :key="cedera.id">
          <q-card class="my-card q-my-md">
            <q-card-section horizontal>
              <q-img class="col-2 q-ma-sm" :src="cedera.images" />
              <q-card-section>
                <div>{{ cedera.name }}</div>
                <div class="text-grey-6 text-caption">
                  {{ cedera.harga }}
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

export default {
  name: "BiayaPenangananPage",

  props: {
    biayaPenanganan: Boolean,
    maximizedToggle: Boolean,
  },

  setup(props, { emit }) {
    const cederas = ref([]);

    const internalBiaya = computed({
      get: () => props.biayaPenanganan,
      set: (value) => emit("update:biayaPenanganan", value),
    });

    // Function to fetch data from your Laravel API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cederas");
        cederas.value = response.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      internalBiaya,
      cederas,
    };
  },
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
.my-card {
  border-radius: 12px;
}
</style>
