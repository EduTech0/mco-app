<template>
  <div>
    <q-form @submit="addCustomer">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">Create Customer</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 60vh" class="scroll">
          <!-- Name -->
          <q-input
            v-model="data.name"
            label="Nama"
            dense
            required
            autofocus
            :rules="nameRules"
          />

          <!-- Email -->
          <q-input
            v-model="data.email"
            label="email"
            type="email"
            dense
            required
            :rules="emailRules"
          />

          <!-- Password -->
          <q-input
            square
            clearable
            v-model="data.password"
            :type="passwordFieldType"
            lazy-rules
            label="Password"
            :rules="passwordRules"
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
            v-model="data.passwordConfirmation"
            :type="passwordFieldType"
            lazy-rules
            label="Password Confirmation"
            :rules="passwordConfirmationRules"
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
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            type="submit"
            label="Tambah Customer"
            color="dark"
            :disable="disabledButton"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useCustomerStore } from "src/stores/customer-store";

const $q = useQuasar();
const customerStore = useCustomerStore();
const emits = defineEmits(["added"]);
const data = ref({
  name: "",
  email: null,
  password: null,
  passwordConfirmation: null,
});

// Disabled Button
const loading = ref(false);
const disabledButton = computed(() => {
  return (
    loading.value ||
    !data.value.name ||
    !data.value.email ||
    !data.value.password ||
    !data.value.passwordConfirmation
  );
});

// Validate
const nameRules = [
  (v) => !!v || "Nama harus diisi",
  (v) => (v && v.length <= 255) || "Nama tidak boleh lebih dari 255 karakter",
];
const emailRules = [
  (v) => !!v || "Email harus diisi",
  (v) => /.+@.+/.test(v) || "Email tidak valid",
];
const passwordRules = ref([
  (v) => !!v || "Password harus diisi",
  (v) => v.length >= 6 || "Password minimal harus 6 karakter",
]);
const passwordConfirmationRules = ref([
  (v) => !!v || "Password harus diisi",
  (v) => v.length >= 6 || "Password minimal harus 6 karakter",
  (v) => v === data.value.password || "Password tidak cocok",
]);

// Visibility Password
const passwordFieldType = ref("password");
const visibility = ref(false);
const visibilityIcon = ref("visibility");
const switchVisibility = () => {
  visibility.value = !visibility.value;
  passwordFieldType.value = visibility.value ? "text" : "password";
  visibilityIcon.value = visibility.value ? "visibility_off" : "visibility";
};

// Create Customer
const addCustomer = async () => {
  loading.value = true;
  try {
    const res = await customerStore.createCustomer(data.value);

    if (res.data && res.data.status === "Success") {
      $q.notify({
        message: res.data.message,
        icon: "check",
        color: "positive",
      });
    } else {
      $q.notify({
        message: "Data Gagal Ditambah",
        icon: "warning",
        color: "negative",
      });
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    $q.notify({
      color: "negative",
      icon: "warning",
      message: "Terjadi kesalahan. Mohon coba lagi.",
    });
  }
  loading.value = false;
  emits("added");
};
</script>
