<template>
  <q-card class="high">
    <q-card-section class="high bg-primary q-py-sm text-white shadow">
      <q-btn dense flat icon="arrow_back" v-close-popup class="absolute-left" />
      <div class="text-subtitle1 text-center">Biaya Penanganan</div>
    </q-card-section>

    <q-card-section class="q-pt-lg"></q-card-section>

    <q-card-section class="q-pa-lg">
      <div v-for="cedera in cederas" :key="cedera.id">
        <q-card class="my-card q-my-md">
          <q-card-section horizontal>
            <img
              :src="urlServer + 'storage/cederas/' + cedera.image"
              alt="Cedera Image"
              width="80"
            />
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { urlServer } from "src/boot/axios";
import { useCederaStore } from "src/stores/cedera-store";

const cederaStore = useCederaStore();
const cederas = ref([]);

// Get Cedera
const getCedera = async () => {
  try {
    const res = await cederaStore.allCedera();
    cederas.value = res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  getCedera();
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
.my-card {
  border-radius: 12px;
}
</style>
