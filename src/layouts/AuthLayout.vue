<template>
  <div id="q-app" class="high">
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

<script setup></script>

<style>
::-webkit-scrollbar {
  display: none;
}
.high {
  max-width: 500px;
  margin: auto;
  border: 1px solid #b2b2b2;
}
</style>
