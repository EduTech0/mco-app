<template>
  <q-header bordered class="bg-primary text-white q-pb-sm">
    <div class="text-subtitle1 text-center q-pa-sm">Akun Saya</div>
    <div class="text-center q-mt-lg">
      <img
        src="../../assets/profile.jpg"
        alt=""
        width="50"
        class="profile q-mt-lg"
      />
    </div>
    <div class="row justify-center">
      <q-item class="column self-center" v-if="loading">
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" width="130px" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="130px" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <div v-else>
        <div class="text-caption text-center">{{ profile.name }}</div>
        <div class="text-caption text-center">{{ profile.email }}</div>
      </div>
    </div>
  </q-header>

  <q-page style="font-size: 12px">
    <div
      class="text-grey-9 bg-grey-4 q-pa-sm q-py-md q-pl-md border"
      style="font-size: 10px"
    >
      APP SETTINGS
    </div>
    <div class="q-pa-sm q-py-md q-pl-md border">
      <p class="float-left">App Version</p>
      <p class="float-right">2.2.5</p>
      <br />
    </div>
    <div class="q-pa-sm q-py-md q-pl-md border logout" @click="confirm = true">
      Logout
    </div>
    <div
      class="text-grey-9 bg-grey-4 q-pa-sm q-py-md q-pl-md border"
      style="font-size: 10px"
    >
      GENERAL INFO
    </div>
    <div class="q-pa-sm q-py-md q-pl-md border" @click="dialogtutorial = true">
      <div class="float-right">
        <q-icon name="chevron_right" size="20px" />
      </div>
      <div>Tutorial</div>
    </div>
    <div class="q-pa-sm q-py-md q-pl-md border" @click="dialoglocation = true">
      <div class="float-right">
        <q-icon name="chevron_right" size="20px" />
      </div>
      <div>Location</div>
    </div>
    <div class="q-pa-sm q-py-md q-pl-md border" @click="dialogsnk = true">
      <div class="float-right">
        <q-icon name="chevron_right" size="20px" />
      </div>
      <div>Syarat dan Ketentuan</div>
    </div>
  </q-page>

  <!-- Logout -->
  <q-dialog v-model="confirm" persistent>
    <q-card style="border-radius: 25px; font-size: 12px">
      <q-card-section class="column items-center">
        <div class="text-subtitle1">Log out?</div>
        <span class="q-px-lg q-pt-sm">Are you sure want to log out?</span>
      </q-card-section>

      <q-card-actions align="center" style="padding-top: 0">
        <q-btn
          label="Cancel"
          outline
          color="primary"
          v-close-popup
          no-caps
          style="border-radius: 30px; font-size: 11px; padding: 7px 4px"
        />
        <q-btn
          label="Ok"
          class="text-grey-5"
          color="primary"
          @click="logout"
          v-close-popup
          no-caps
          style="
            border-radius: 30px;
            font-size: 11px;
            padding: 7px 4px;
            box-shadow: none;
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- Syarat dan Ketentuan -->
  <q-dialog
    v-model="dialogsnk"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <SnK />
  </q-dialog>
  <!-- Location -->
  <q-dialog
    v-model="dialoglocation"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <Location />
  </q-dialog>
  <!-- Tutorial -->
  <q-dialog
    v-model="dialogtutorial"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <Tutorial />
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useAuthStore } from "src/stores/auth-store";
import { useCustomerStore } from "src/stores/customer-store";
import SnK from "components/saya/SnKDialog.vue";
import Location from "components/saya/LocationDialog.vue";
import Tutorial from "components/saya/TutorialDialog.vue";

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const customerStore = useCustomerStore();

const loading = ref(true);
const profile = ref("");
const confirm = ref(false);

const maximizedToggle = ref(true);
const dialogsnk = ref(false);
const dialoglocation = ref(false);
const dialogtutorial = ref(false);

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

// Logout
const logout = async () => {
  try {
    await authStore.logout();

    $q.notify({
      message: "Logout Successfully.",
      icon: "check",
      color: "positive",
    });

    router.push({ name: "login" });
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.profile {
  border: 2px solid white;
  border-radius: 50%;
}
.border {
  border-top: 1px solid rgb(219, 219, 219);
}
.border:hover {
  cursor: pointer;
  background-color: rgba(34, 34, 34, 0.212);
  transition: background-color 0.3s ease;
}
</style>
