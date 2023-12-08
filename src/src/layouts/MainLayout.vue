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
          <q-route-tab to="/beranda" exact clickable v-ripple
            ><q-icon name="home" size="20px" />Beranda</q-route-tab
          >
          <q-route-tab to="/beranda/notifikasi" exact clickable v-ripple
            ><q-icon name="notifications" size="20px" />Notifikasi</q-route-tab
          >
          <q-route-tab to="/beranda/saya" exact clickable v-ripple
            ><q-icon name="person" size="20px" />Saya</q-route-tab
          >
        </q-tabs>
      </q-footer>

      <q-page-container>
        <keep-alive>
          <router-view />
        </keep-alive>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
@media (min-width: 769px) {
  .high {
    padding: 0 450px;
  }
}
</style>
