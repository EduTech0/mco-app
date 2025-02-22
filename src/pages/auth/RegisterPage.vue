<template>
  <q-page class="row justify-center items-center">
    <div class="col-10">
      <div
        class="text-primary q-mb-lg"
        style="
          font-size: 40px;
          font-weight: 800;
          line-height: 48px;
          letter-spacing: -0.3px;
        "
      >
        Register
      </div>
      <q-form>
        <!-- Name -->
        <q-input
          outlined
          dense
          lazy-rules
          label="name"
          type="text"
          v-model="name"
          :rules="nameRules"
          style="border-radius: 20px; margin-bottom: 5px"
        >
          <template v-slot:prepend>
            <q-icon name="person" color="dark" />
          </template>
        </q-input>

        <!-- Email -->
        <q-input
          outlined
          dense
          lazy-rules
          label="Email"
          type="email"
          v-model="email"
          :rules="emailRules"
          style="border-radius: 20px; margin-bottom: 5px"
        >
          <template v-slot:prepend>
            <q-icon name="email" color="dark" />
          </template>
        </q-input>

        <!-- Password -->
        <q-input
          outlined
          dense
          lazy-rules
          label="Password"
          :type="passwordFieldType"
          v-model="password"
          :rules="passwordRules"
          style="border-radius: 20px; margin-bottom: 5px"
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

        <!-- Password Confirmation -->
        <q-input
          outlined
          dense
          label="Password Confirmation"
          lazy-rules
          :type="passwordFieldType"
          v-model="repassword"
          :rules="repasswordRules"
          style="border-radius: 20px; margin-bottom: 5px"
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

      <q-btn
        unelevated
        rounded
        size="lg"
        color="primary"
        label="Register"
        @click="submit"
        :disable="loading"
        class="full-width text-white"
        style="margin-top: 50px"
      />

      <div class="text-center q-mt-md">
        already have an account?
        <router-link
          to="/login"
          class="text-primary"
          style="text-decoration: none"
          >sign in</router-link
        >
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth-store";

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const repassword = ref("");

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
const nameRules = ref([
  (v) => !!v || "name harus diisi",
  (v) => v.length >= 6 || "name minimal harus 6 karakter",
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

// Submit
const submit = async () => {
  loading.value = true;
  try {
    const res = await authStore.register(
      name.value,
      email.value,
      password.value,
      repassword.value
    );

    if (res.data.status === "Success") {
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("role", res.data.data.role);
      router.push({ name: "beranda" });

      $q.notify({
        message: res.data.message,
        icon: "check",
        color: "positive",
      });
      window.location.reload();
    } else {
      $q.notify({
        icon: "warning",
        color: "negative",
        message: res.data.message,
      });
    }
  } catch (error) {
    $q.notify({
      icon: "warning",
      color: "negative",
      message: "Format masih salah, silahkan coba lagi",
    });
    console.error(error);
  }
  loading.value = false;
};
</script>
