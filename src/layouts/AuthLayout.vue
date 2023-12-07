<template>
  <div id="q-app">
    <q-layout view="lHh Lpr fff">
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

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AuthLayout",
});
</script>
