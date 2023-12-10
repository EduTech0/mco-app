<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#0079ca, #ffffff)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 400px; height: 540px">
          <q-card-section class="bg-deep-purple-7 q-pa-sm text-center">
            <h4 class="text-h5 text-white q-my-md">Login dulu cuy</h4>
          </q-card-section>

          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <!-- Email -->
              <q-input
                square
                clearable
                v-model="email"
                type="email"
                lazy-rules
                :rules="emailRules"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

              <!-- Password -->
              <q-input
                square
                clearable
                v-model="password"
                :type="passwordFieldType"
                lazy-rules
                :rules="passwordRules"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="secondary"
              :disable="loading"
              @click="submit"
              class="full-width text-white"
              label="Login"
            />
          </q-card-actions>

          <q-btn
            to="/register"
            flat
            style="color: #003f88"
            label="Tidak mempunyai akun?"
          >
            <q-tooltip>Register</q-tooltip>
          </q-btn>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth-store";

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");

const passwordFieldType = ref("password");
const visibility = ref(false);
const visibilityIcon = ref("visibility");
const loading = ref(false);

// Visibility Password
const switchVisibility = () => {
  visibility.value = !visibility.value;
  passwordFieldType.value = visibility.value ? "text" : "password";
  visibilityIcon.value = visibility.value ? "visibility_off" : "visibility";
};

// Validate
const emailRules = [
  (v) => !!v || "Email harus diisi",
  (v) => /.+@.+/.test(v) || "Email tidak valid",
];
const passwordRules = ref([
  (v) => !!v || "Password harus diisi",
  (v) => v.length >= 6 || "Password minimal harus 6 karakter",
]);

// Submit
const submit = async () => {
  loading.value = true;
  try {
    const res = await authStore.login(email.value, password.value);

    if (res.data.status === "Success") {
      localStorage.setItem("token", res.data.data.token)
      router.push({ name: "beranda" });
      window.location.reload();

      $q.notify({
        message: res.data.message,
        icon: "check",
        color: "positive",
      });
    } else {
      $q.notify({
        icon: "warning",
        color: "negative",
        message: "Email atau Password salah, silahkan coba lagi",
      });
    }
  } catch (error) {
    $q.notify({
      icon: "warning",
      color: "negative",
      message: "Email atau Password salah, silahkan coba lagi",
    });
    console.error(error);
  }
  loading.value = false;
};
</script>

<style scoped>
.q-card-login {
  max-width: 400px;
  margin: 0 auto;
}

.q-card-section {
  text-align: center;
}

.q-form {
  max-width: 300px;
  margin: 0 auto;
}

.q-btn {
  width: 100%;
}
</style>
