<template>
  <!-- Loading -->
  <div v-if="isLoading">
    <LoadingPage />
  </div>

  <!-- Page -->
  <div v-else>
    <q-header bordered class="bg-grey-3 text-primary">
      <div class="row">
        <div class="col-10">
          <q-toolbar>
            <q-toolbar-title>
              <div class="text-subtitle1 text-dark">Selamat datang,</div>
              <div class="text-dark text-subtitle2" style="opacity: 0.7">
                {{ profile.name }}
              </div>
            </q-toolbar-title>
          </q-toolbar>
        </div>
        <div class="col-2 self-center q-pl-md" v-if="profile.role === 'Admin'">
          <q-btn flat to="/dashboard/home" class="bg-grey-3">
            <q-icon name="manage_accounts" color="primary" size="32px" />
          </q-btn>
        </div>
      </div>
    </q-header>

    <q-page class="q-pa-sm">
      <!-- Banner -->
      <div class="row q-pa-sm">
        <q-img src="../assets/banner.jpg" style="border-radius: 20px">
          <!-- <div class="text-h5 absolute-bottom text-right">Title</div> -->
        </q-img>
      </div>

      <!-- List Antrian -->
      <ListAntrian />

      <!-- Action -->
      <ItemList />

      <!-- Pendaftaran -->
      <PendaftaranSaya />
    </q-page>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { LocalStorage } from "quasar";
import LoadingPage from "components/beranda/LoadingPage.vue";
import ListAntrian from "components/beranda/ListAntrian.vue";
import ItemList from "components/beranda/ItemList.vue";
import PendaftaranSaya from "components/beranda/PendaftaranSaya.vue";

export default defineComponent({
  name: "BerandaPage",

  components: {
    LoadingPage,
    ListAntrian,
    ItemList,
    PendaftaranSaya,
  },

  setup() {
    const token = LocalStorage.getItem("token");
    const profile = ref("");
    const isLoading = ref(true);

    // Profile
    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        profile.value = response.data.data;
        isLoading.value = false;
      } catch (error) {
        console.error("Error fetching data:", error);
        isLoading.value = false;
      }
    });

    return {
      profile,
      isLoading,
    };
  },
});
</script>
