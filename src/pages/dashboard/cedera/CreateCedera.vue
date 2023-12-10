<template>
  <div>
    <q-form @submit="addCedera">
      <q-card class="q-px-lg q-py-md" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Cedera</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row justify-center">
            <!-- Nama -->
            <div class="col-5 q-mr-sm">
              <q-input
                v-model="data.name"
                label="Nama"
                class="q-my-sm"
                dense
                autofocus
                required
                :rules="nameRules"
              ></q-input>
            </div>
            <!-- Harga -->
            <div class="col-5 q-ml-sm">
              <q-input
                v-model="data.harga"
                label="Harga"
                class="q-my-sm"
                outlined
                dense
                type="number"
                required
                :rules="hargaRules"
              ></q-input>
            </div>
          </div>

          <!-- Image -->
          <q-file
            filled
            bottom-slots
            v-model="data.image"
            class="q-my-sm"
            label="Image"
            counter
            accept=".jpg, .jpeg, .png, .gif, .svg"
            :rules="imageRules"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop.prevent />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop.prevent="data.image = null"
                class="cursor-pointer"
              />
            </template>

            <template v-slot:hint> Field hint </template>
          </q-file>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            type="submit"
            label="Tambah Cedera"
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
import { useCederaStore } from "src/stores/cedera-store";
import { ref } from "vue";

const $q = useQuasar();
const cederaStore = useCederaStore();
const emits = defineEmits(["added"]);
const loading = ref(false);
const data = ref({
  name: "",
  harga: null,
  image: null,
});

// Validate
const nameRules = [
  (v) => !!v || "Nama harus diisi",
  (v) => (v && v.length <= 255) || "Nama tidak boleh lebih dari 255 karakter",
];
const hargaRules = [
  (v) => !!v || "Harga harus diisi",
  (v) => (!isNaN(parseFloat(v)) && isFinite(v)) || "Harga harus berupa angka",
];
const imageRules = [
  (v) => !!v || "Image harus diisi",
  (v) => (v && v.size <= 2048 * 1024) || "Image size harus dibawah 2048 KB",
];

// Create Cedera
const addCedera = async () => {
  loading.value = true;
  try {
    const res = await cederaStore.createCedera(data.value);
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
