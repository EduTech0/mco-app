<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#0079ca, #ffffff)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 400px; height: 580px">
          <q-card-section class="bg-deep-purple-7 q-pa-sm text-center">
            <h4 class="text-h5 text-white q-my-md">Register dulu cuy</h4>
          </q-card-section>

          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <!-- Username -->
              <q-input
                square
                clearable
                v-model="username"
                lazy-rules
                :rules="usernameRules"
                type="username"
                label="Username"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

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

              <!-- Password Confirmation -->
              <q-input
                square
                clearable
                v-model="repassword"
                :type="passwordFieldType"
                lazy-rules
                :rules="repasswordRules"
                label="Password Confirmation"
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
              label="Register"
            />
          </q-card-actions>

          <q-btn
            to="/login"
            flat
            style="color: #003f88"
            label="Sudah mempunyai akun?"
          >
            <q-tooltip>Login</q-tooltip>
          </q-btn>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { LocalStorage } from "quasar";

const username = ref("");
const email = ref("");
const password = ref("");
const repassword = ref("");
const passwordFieldType = ref("password");
const loading = ref(false);
const visibility = ref(false);
const visibilityIcon = ref("visibility");

// Validate
const usernameRules = ref([
  (v) => !!v || "Username harus diisi",
  (v) => v.length >= 6 || "Username minimal harus 6 karakter",
]);
const emailRules = [
  (v) => !!v || "Email harus diisi",
  (v) => /.+@.+/.test(v) || "Email tidak valid",
];
const passwordRules = ref([
  (v) => !!v || "Password harus diisi",
  (v) => v.length >= 6 || "Password minimal harus 6 karakter",
]);
const repasswordRules = ref([
  (v) => !!v || "Password harus diisi",
  (v) => v.length >= 6 || "Password minimal harus 6 karakter",
  (v) => v === password.value || "Password tidak cocok",
]);

const submit = async () => {
  loading.value = true;
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      {
        name: username.value,
        email: email.value,
        password: password.value,
        c_password: repassword.value,
      }
    );

    if (response.data.status === "Success") {
      // Successful login
      LocalStorage.set("token", response.data.data.token);

      $router.push("/beranda");
      window.location.reload();

      $q.notify({
        message: response.data.message,
        icon: "check",
        color: "positive",
      });
    } else {
      // Failed login
      $q.notify({
        icon: "warning",
        color: "negative",
        message: response.data.message,
      });
    }
  } catch (error) {
    // Handle any network or server errors here
    console.error(error);
  }
  loading.value = false;
};

const switchVisibility = () => {
  visibility.value = !visibility.value;
  passwordFieldType.value = visibility.value ? "text" : "password";
  visibilityIcon.value = visibility.value ? "visibility_off" : "visibility";
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
