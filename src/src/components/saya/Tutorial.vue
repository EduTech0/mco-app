<template>
  <q-dialog
    :model-value="dialogtutorial"
    @update:model-value="$emit('update:dialogtutorial', $event)"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="bg-primary q-pt-sm text-white">
        <q-btn dense flat icon="arrow_back" v-close-popup />
        <div class="text-subtitle1 absolute-center" style="top: 23px">
          Tutorial
        </div>
        <div class="text-center q-mt-lg" style="margin-bottom: -22px">
          <img
            src="../../assets/tutorial/display.png"
            alt=""
            width="250"
            class="profile"
          />
        </div>
      </q-card-section>

      <div style="font-size: 10px">
        <q-list bordered class="rounded-borders">
          <q-expansion-item expand-separator label="Pendaftaran">
            <q-img src="../../assets/tutorial/pendaftaran.jpg" />
          </q-expansion-item>

          <q-expansion-item expand-separator label="Status Registrasi">
            <q-img src="../../assets/tutorial/registrasi.jpg" />
          </q-expansion-item>

          <q-expansion-item expand-separator label="Notifikasi">
            <q-img src="../../assets/tutorial/notifikasi.jpg" />
          </q-expansion-item>

          <q-expansion-item expand-separator label="General Information">
            <q-img src="../../assets/tutorial/akun.jpg" />
          </q-expansion-item>
        </q-list>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "TutorialPage",

  props: {
    dialogtutorial: Boolean,
    maximizedToggle: Boolean,
  },

  setup(props, { emit }) {
    const internalTutorial = computed({
      get: () => props.dialogtutorial,
      set: (value) => emit("update:dialogtutorial", value),
    });

    return {
      internalTutorial,
    };
  },
};
</script>

<style scoped>
.shadow {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: -2px 2px 15px black;
}
</style>
