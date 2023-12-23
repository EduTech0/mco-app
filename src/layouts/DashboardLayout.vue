<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title> Dashboard Admin </q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <!-- FullScreen -->
          <q-btn
            round
            dense
            flat
            color="white"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            v-if="$q.screen.gt.sm"
          >
          </q-btn>

          <!-- Notification -->
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    label="View All"
                    style="max-width: 120px !important"
                    flat
                    dense
                    class="text-indigo-8"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>

          <!-- Profile -->
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary text-white"
    >
      <q-list>
        <!-- Home -->
        <q-item
          :to="{ name: 'home' }"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Customer -->
        <q-item
          :to="{ name: 'customer' }"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Customer</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Cedera -->
        <q-item
          :to="{ name: 'cedera' }"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="assist_walker" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cedera</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Jadwal -->
        <q-item
          :to="{ name: 'jadwal' }"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="date_range" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Jadwal</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Pendaftaran -->
        <q-expansion-item icon="description" label="Pendaftaran">
          <q-list class="q-pl-lg">
            <!-- Semua -->
            <q-item
              :to="{ name: 'semuapendaftaran' }"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="clear_all" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Semua</q-item-label>
              </q-item-section>
            </q-item>
            <!-- Belum Terverifikasi -->
            <q-item
              :to="{ name: 'belumpendaftaran' }"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="highlight_off" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Belum Disetujui</q-item-label>
              </q-item-section>
            </q-item>
            <!-- Sudah Terverifikasi -->
            <q-item
              :to="{ name: 'sudahpendaftaran' }"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="done_all" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Sudah Disetujui</q-item-label>
              </q-item-section>
            </q-item>
            <!-- Selesai -->
            <q-item
              :to="{ name: 'selesaipendaftaran' }"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="domain_verification" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Selesai</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-separator />

        <!-- Kembali ke Beranda -->
        <q-item to="/beranda" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="reply_all" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ke Beranda</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Messages from "src/components/Messages.vue";

import { ref } from "vue";
import { useQuasar } from "quasar";

const leftDrawerOpen = ref(false);
const $q = useQuasar();
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style>
/* FONT AWESOME GENERIC BEAT */
.fa-beat {
  animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1);
  }
  55% {
    transform: scale(1.25);
  }
  70% {
    transform: scale(1);
  }
}
</style>
