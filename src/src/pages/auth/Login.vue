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
                ref="email"
                square
                clearable
                v-model="email"
                type="email"
                lazy-rules
                :rules="[this.required, this.isEmail, this.short]"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

              <!-- Password -->
              <q-input
                ref="password"
                square
                clearable
                v-model="password"
                :type="passwordFieldType"
                lazy-rules
                :rules="[this.required, this.short]"
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

<script>
import { useQuasar, LocalStorage } from "quasar";
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
      passwordFieldType: "password",
      loading: false,
      visibility: false,
      visibilityIcon: "visibility",
      $q: useQuasar(),
    };
  },

  methods: {
    required(val) {
      return (val && val.length > 0) || "Kolom harus diisi";
    },
    short(val) {
      return (val && val.length > 6) || "Password harus lebih dari 6 karakter";
    },
    isEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Email tidak valid";
    },

    async submit() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      this.loading = true;

      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/auth/login",
            {
              email: this.email,
              password: this.password,
            }
          );

          if (response.data.status === "Success") {
            // Successful login
            LocalStorage.set("token", response.data.data.token);

            this.$router.push("/beranda");
            window.location.reload();

            this.$q.notify({
              message: response.data.message,
              icon: "check",
              color: "positive",
            });
          } else {
            // Failed login
            this.$q.notify({
              icon: "warning",
              color: "negative",
              message: "Email or Password Failed, Please try again later.",
            });
          }
        } catch (error) {
          // Handle any network or server errors here
          console.error(error);
        }
      }
      this.loading = false;
    },

    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },
  },
});
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
