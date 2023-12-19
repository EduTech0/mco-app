<template>
  <!-- Loading -->
  <div v-if="loading">
    <LoadingPage />
  </div>

  <!-- Page -->
  <div v-else style="background: linear-gradient(to right top, #045951, white)">
    <q-page class="q-pa-sm">
      <!-- Banner -->
      <div class="row q-pa-sm">
        <div
          class="banner-container"
          style="
            border-radius: 30px;
            width: 100%;
            height: 120px;
            background: linear-gradient(to left, #045951, white);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
          "
        >
          <div style="order: 2">
            <img :src="mainIcon" />
          </div>

          <div style="order: 1; color: black">
            <span style="font-size: 30px; line-height: 1.5; font-weight: 900">
              MCO
            </span>
            <br />
            <div style="line-height: 1; font-weight: 600">
              <span style="font-size: 10px"
                >Kemudahan Kesehatan dalam Satu Aplikasi,
              </span>
              <br />
              <span style="font-size: 10px">Kesehatan di Ujung Jari Anda</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Antrian -->
      <div style="margin-top: 10px">
        <ListAntrian />
      </div>

      <!-- Item -->
      <ItemList />
    </q-page>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCustomerStore } from "src/stores/customer-store";
import mainIcon from "../../svg/mainIcon.svg";
import LoadingPage from "components/beranda/LoadingPage.vue";
import ListAntrian from "components/beranda/ListAntrian.vue";
import ItemList from "components/beranda/ItemList.vue";

const customerStore = useCustomerStore();
const loading = ref(true);
const profile = ref("");

// Profile
const getProfile = async () => {
  try {
    const res = await customerStore.profile();
    profile.value = res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  loading.value = false;
};
onMounted(() => {
  getProfile();
});
</script>
