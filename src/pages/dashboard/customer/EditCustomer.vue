<template>
  <div>
    <q-form @submit="editCustomer">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">Edit Customer</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 60vh" class="scroll">
          <div class="q-my-md">
            <div class="row justify-center">
              <!-- Name -->
              <div class="col-5">
                <q-input
                  v-model="data.name"
                  label="Nama"
                  dense
                  required
                  autofocus
                  :rules="nameRules"
                />
              </div>

              <div class="col-1 items-center" />

              <!-- Email -->
              <div class="col-5">
                <q-input
                  v-model="data.email"
                  label="email"
                  type="email"
                  dense
                  required
                  :rules="emailRules"
                />
              </div>
            </div>
          </div>

          <div class="q-my-md">
            <div class="row justify-center">
              <!-- Tanggal Lahir -->
              <div class="col-5">
                <div class="text-subtitle2">Tanggal Lahir :</div>
                <q-input filled v-model="data.tanggal_lahir" mask="date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="data.tanggal_lahir">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-1 items-center" />

              <!-- Jenis Kelamin -->
              <div class="col-5">
                <div class="text-subtitle2">Jenis Kelamin :</div>
                <div class="q-gutter-sm">
                  <q-radio
                    v-model="data.jenis_kelamin"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="Laki-Laki"
                    label="Laki-Laki"
                  />
                  <q-radio
                    v-model="data.jenis_kelamin"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="Perempuan"
                    label="Perempuan"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Role -->
          <div class="q-my-md">
            <div class="text-subtitle2">Role :</div>
            <div>
              <q-btn-toggle
                v-model="data.role"
                push
                glossy
                toggle-color="primary"
                :options="[
                  { label: 'Admin', value: 'Admin' },
                  { label: 'Member', value: 'Member' },
                ]"
              />
            </div>
          </div>

          <!-- Alamat -->
          <div class="q-my-md">
            <div class="text-subtitle2">Alamat :</div>
            <q-input v-model="data.address" filled type="textarea" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            type="submit"
            label="Edit Customer"
            color="dark"
            :disable="disabledButton"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { useQuasar } from "quasar";
import { useCustomerStore } from "src/stores/customer-store";

const $q = useQuasar();
const customerStore = useCustomerStore();
const emits = defineEmits(["edited"]);
const { customer } = defineProps(["customer"]);
const data = ref({
  id: customer.id,
  name: customer.name,
  email: customer.email,
  tanggal_lahir: customer.tanggal_edit,
  jenis_kelamin: customer.jenis_kelamin,
  role: customer.role,
  address: customer.address,
});

// Disabled Button
const loading = ref(false);
const disabledButton = computed(() => {
  return (
    loading.value || !data.value.name || !data.value.email || !data.value.role
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

// Edit Customer
const editCustomer = async () => {
  loading.value = true;
  try {
    const res = await customerStore.editCustomer(data.value);

    if (res.data && res.data.status === "Success") {
      $q.notify({
        message: res.data.message,
        icon: "check",
        color: "positive",
      });
    } else {
      $q.notify({
        message: "Data Gagal Diubah",
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
  emits("edited");
};
</script>
