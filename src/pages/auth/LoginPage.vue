<template>
  <q-page class="row justify-center items-center">
    <div class="col-10">
      <div
        class="text-h5 text-primary text-bold q-mb-lg"
        style="font-size: 30px; font-family: Poppins"
      >
        Log In
      </div>
      <q-form>
        <!-- Email -->
        <q-input
          outlined
          dense
          v-model="email"
          type="email"
          lazy-rules
          :rules="emailRules"
          label="Email"
          style="border-radius: 20px; margin-bottom: 10px"
        >
          <template v-slot:prepend>
            <q-icon name="email" color="dark" />
          </template>
        </q-input>

        <!-- Password -->
        <q-input
          outlined
          dense
          v-model="password"
          :type="passwordFieldType"
          lazy-rules
          :rules="passwordRules"
          label="Password"
        >
          <template v-slot:prepend>
            <q-icon name="lock" color="dark" />
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

      <div class="text-center text-grey" style="margin-bottom: 150px">
        forgot a password
      </div>

      <q-btn
        unelevated
        rounded
        size="lg"
        color="primary"
        :disable="loading"
        @click="submit"
        class="full-width text-white"
        label="Login"
      />

      <div class="text-center q-mt-md">
        don't have an account?
        <router-link
          to="/register"
          class="text-warning"
          style="text-decoration: none"
          >sign up</router-link
        >
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
      localStorage.setItem("token", res.data.data.token);
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
