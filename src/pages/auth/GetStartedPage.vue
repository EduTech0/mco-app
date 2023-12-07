<template>
  <q-page>
    <div class="q-fullscreen">
      <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="primary"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        height="100vh"
        class="shadow-1 rounded-borders"
        style="position: absolute; top: 0; left: 0; right: 0; bottom: 0"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="style" size="56px" />
          <div class="text-body1 text-bold q-mt-md text-center">
            Selamat datang di aplikasi MCO Lectzz
          </div>
          <div class="text-center">
            Aplikasi mobile untuk kemudahan mendaftar terapi MCO
          </div>
          <div style="z-index: 1">
            <div class="absolute-bottom-left q-pa-md q-ml-lg">
              <q-btn
                @click="nextSlide"
                label="Skip"
                flat
                color="primary"
                no-caps
              />
            </div>
            <div class="absolute-bottom-right q-pa-md q-mr-lg">
              <q-btn
                @click="nextSlide"
                label="Next"
                flat
                color="primary"
                no-caps
              />
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="text-body1 text-bold q-mt-md text-center">Fitur Sesi</div>
          <div class="text-center">
            Customer dapat melihat sesi terapi yang tersedia
          </div>
          <div style="z-index: 1">
            <div class="absolute-bottom-left q-pa-md q-ml-lg">
              <q-btn
                @click="prevSlide"
                label="Previous"
                flat
                color="primary"
                no-caps
              />
            </div>
            <div class="absolute-bottom-right q-pa-md q-mr-lg">
              <q-btn label="Login" to="/login" flat color="primary" no-caps />
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const slide = ref("style");

const prevSlide = () => {
  if (slide.value === "style") {
    slide.value = "tv";
  } else {
    slide.value = "style";
  }
};
const nextSlide = () => {
  if (slide.value === "style") {
    slide.value = "tv";
  } else {
    slide.value = "style";
  }
};
</script>

<style>
.q-fullscreen {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
