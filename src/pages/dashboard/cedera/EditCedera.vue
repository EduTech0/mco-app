<template>
  <div>
    <q-form @submit="editCedera">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">Edit Cedera</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 60vh" class="scroll">
          <div class="row justify-center">
            <!-- Name -->
            <div class="col-5 q-mr-sm">
              <q-input
                v-model="data.name"
                label="Nama"
                class="q-my-sm"
                dense
                autofocus
                required
                :rules="nameRules"
              />
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
              />
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

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            type="submit"
            label="Edit Cedera"
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
import { useCederaStore } from "src/stores/cedera-store";

const $q = useQuasar();
const cederaStore = useCederaStore();
const emits = defineEmits(["edited"]);
const { cedera } = defineProps(["cedera"]);
const data = ref({
  id: cedera.id,
  name: cedera.name,
  harga: cedera.harga,
  image: null,
});

// Disabled Button
const loading = ref(false);
const disabledButton = computed(() => {
  return (
    loading.value || !data.value.name || !data.value.harga || !data.value.image
  );
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

// Edit Cedera
const editCedera = async () => {
  loading.value = true;
  try {
    const res = await cederaStore.editCedera(data.value);

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
  emits("edited");
};
</script>
