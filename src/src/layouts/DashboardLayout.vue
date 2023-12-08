<template>
  <div style="height: 100vh">
    <q-layout
      view="lHh Lpr lff"
      container
      style="height: 100%"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title class="q-ml-md">Dashboard Admin</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <!-- Home -->
          <q-list padding>
            <q-item exact clickable to="/dashboard/home" v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section> Home </q-item-section>
            </q-item>

            <!-- Customers -->
            <q-item exact clickable to="/dashboard/customer" v-ripple>
              <q-item-section avatar>
                <q-icon name="people" />
              </q-item-section>

              <q-item-section> Customer </q-item-section>
            </q-item>

            <!-- Cedera -->
            <q-item exact clickable to="/dashboard/cedera" v-ripple>
              <q-item-section avatar>
                <q-icon name="assist_walker" />
              </q-item-section>

              <q-item-section> Cedera </q-item-section>
            </q-item>

            <!-- Jadwal -->
            <q-item exact clickable to="/dashboard/jadwal" v-ripple>
              <q-item-section avatar>
                <q-icon name="date_range" />
              </q-item-section>

              <q-item-section> Jadwal </q-item-section>
            </q-item>

            <!-- Pendaftaran -->
            <q-expansion-item icon="description" label="Pendaftaran">
              <div class="q-pl-md">
                <!-- Semua -->
                <q-item exact clickable to="/dashboard/pendaftaran" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="clear_all" />
                  </q-item-section>

                  <q-item-section> Semua </q-item-section>
                </q-item>
                <!-- Belum Terverifikasi -->
                <q-item
                  exact
                  clickable
                  to="/dashboard/pendaftaran/belumSetuju"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="highlight_off" />
                  </q-item-section>

                  <q-item-section> Belum Disetujui </q-item-section>
                </q-item>
                <!-- Sudah Terverifikasi -->
                <q-item
                  exact
                  clickable
                  to="/dashboard/pendaftaran/sudahSetuju"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="done_all" />
                  </q-item-section>

                  <q-item-section> Sudah Disetujui </q-item-section>
                </q-item>
                <!-- Selesai -->
                <q-item
                  exact
                  clickable
                  to="/dashboard/pendaftaran/selesai"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon name="domain_verification" />
                  </q-item-section>

                  <q-item-section> Selesai </q-item-section>
                </q-item>
              </div>
            </q-expansion-item>

            <q-separator />

            <!-- Kembali ke Beranda -->
            <q-item clickable to="/beranda" v-ripple>
              <q-item-section avatar>
                <q-icon name="reply_all" />
              </q-item-section>

              <q-item-section> Ke Beranda </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-circular-progress
              indeterminate
              rounded
              class="column self-center"
              size="30px"
              v-if="isLoading"
            />
            <div v-else>
              <div class="text-weight-bold">{{ profile.name }}</div>
              <div>{{ profile.email }}</div>
            </div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <keep-alive>
          <router-view />
        </keep-alive>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import axios from "axios";
import { LocalStorage } from "quasar";

export default defineComponent({
  name: "DashboardLayout",

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
      drawer: ref(false),
    };
  },
});
</script>
