<template>
  <div style="height: 100vh" class="high">
    <q-layout
      view="lHh lpr lFf"
      container
      style="height: 100%"
      class="shadow-2 rounded-borders"
    >
      <q-footer bordered class="bg-grey-3 text-primary">
        <q-tabs
          no-caps
          active-color="primary"
          indicator-color="transparent"
          class="text-grey-8"
        >
          <q-route-tab :to="{ name: 'beranda' }" exact clickable v-ripple
            ><q-icon name="home" size="20px" />Beranda</q-route-tab
          >
          <q-route-tab :to="{ name: 'riwayat' }" exact clickable v-ripple
            ><q-icon name="history" size="20px" />Riwayat</q-route-tab
          >
          <q-route-tab :to="{ name: 'profile' }" exact clickable v-ripple
            ><q-icon name="person" size="20px" />Saya</q-route-tab
          >
        </q-tabs>
      </q-footer>

      <q-page-container>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup></script>

<style>
::-webkit-scrollbar {
  display: none;
}
.high {
  max-width: 500px;
  margin: auto;
}
</style>
