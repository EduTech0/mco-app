<template>
  <div>
    <q-form @submit="addCustomer">
      <q-card class="q-px-lg q-py-md" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Customer</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- Nama -->
          <q-input
            v-model="customer.name"
            label="Nama"
            dense
            autofocus
            required
          ></q-input>

          <!-- Email -->
          <q-input
            v-model="customer.email"
            label="email"
            dense
            type="email"
            required
          ></q-input>

          <!-- Password -->
          <q-input
            square
            clearable
            v-model="customer.password"
            :type="passwordFieldType"
            lazy-rules
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

          <!-- Password -->
          <q-input
            square
            clearable
            v-model="customer.c_password"
            :type="passwordFieldType"
            lazy-rules
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
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            type="submit"
            label="Tambah Customer"
            color="dark"
            :disable="isSubmitting"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
import { LocalStorage } from "quasar";

export default {
  data() {
    return {
      customer: {
        name: "",
        email: null,
        password: null,
        c_password: null,
      },
      isSubmitting: false,
      passwordFieldType: "password",
      visibility: false,
      visibilityIcon: "visibility",
    };
  },

  methods: {
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },

    addCustomer() {
      this.isSubmitting = true;

      const formData = new FormData();
      formData.append("name", this.customer.name);
      formData.append("email", this.customer.email);
      formData.append("password", this.customer.password);
      formData.append("c_password", this.customer.c_password);

      const token = LocalStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Kirim permintaan ke API Laravel untuk menambahkan customer
      axios
        .post("http://localhost:8000/api/customers/create", formData, {
          headers,
        })
        .then((response) => {
          // Handle respons dari server (berhasil atau gagal)
          console.log(response.data);
          this.$q.notify({
            color: "positive",
            message: response.data.message,
          });
          this.$emit("added", response.data.data);
          // Reset formulir setelah berhasil menambahkan
          this.customer.name = "";
          this.customer.email = null;
          this.customer.password = null;
          this.customer.c_password = null;
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
          });
          console.error(error);
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
  },
};
</script>
