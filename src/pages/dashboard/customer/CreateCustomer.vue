<template>
  <div>
    <q-form @submit="addCustomer">
      <q-card class="q-px-lg q-py-md" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Customer</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- Name -->
          <q-input
            v-model="data.name"
            label="Nama"
            dense
            autofocus
            required
            :rules="nameRules"
          ></q-input>

          <!-- Email -->
          <q-input
            v-model="data.email"
            label="email"
            dense
            type="email"
            required
            :rules="emailRules"
          ></q-input>

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

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            type="submit"
            label="Tambah Customer"
            color="dark"
            :disable="loading"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useCustomerStore } from "src/stores/customer-store";
import { ref } from "vue";

const $q = useQuasar();
const customerStore = useCustomerStore();
const emits = defineEmits(["added"]);
const loading = ref(false);
const data = ref({
  name: "",
  email: null,
  password: null,
  passwordConfirmation: null,
});

// Visibility Password
const passwordFieldType = ref("password");
const visibility = ref(false);
const visibilityIcon = ref("visibility");
const switchVisibility = () => {
  visibility.value = !visibility.value;
  passwordFieldType.value = visibility.value ? "text" : "password";
  visibilityIcon.value = visibility.value ? "visibility_off" : "visibility";
};

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

// Create Customer
const addCustomer = async () => {
  loading.value = true;
  try {
    const res = await customerStore.createCustomer(data.value);
    $q.notify({
      color: "positive",
      message: res.data.message,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  loading.value = false;
  emits("added");
};
</script>
