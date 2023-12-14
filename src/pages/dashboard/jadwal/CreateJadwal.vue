<template>
  <div>
    <q-form @submit="addJadwal">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">Create Jadwal</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 60vh" class="scroll">
          <!-- Tanggal -->
          <div class="q-my-md">
            <div class="text-subtitle2">Tanggal :</div>
            <q-date v-model="data.tanggal" class="q-ml-md" />
          </div>

          <!-- Waktu -->
          <div class="q-my-md">
            <div class="text-subtitle2">Waktu :</div>
            <div class="row justify-center">
              <!-- Waktu 1 -->
              <div class="col-5">
                <q-input
                  filled
                  v-model="data.waktu_1"
                  mask="time"
                  required
                  :rules="['time', 'required']"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="data.waktu_1" mask="HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col2 items-center">
                <p
                  class="text-subtitle2 q-px-sm q-py-md"
                  style="font-size: 30px"
                >
                  -
                </p>
              </div>

              <!-- Waktu 2 -->
              <div class="col-5">
                <q-input
                  filled
                  v-model="data.waktu_2"
                  mask="time"
                  required
                  :rules="['time', 'required']"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="data.waktu_2" mask="HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <!-- Kuota -->
          <div class="q-my-md">
            <div class="text-subtitle2">Kuota :</div>
            <q-input
              filled
              v-model="data.kuota"
              type="number"
              label="Kuota"
              :rules="['required', 'numeric']"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            type="submit"
            label="Tambah Jadwal"
            color="dark"
            :disable="disabledButton"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useJadwalStore } from "src/stores/jadwal-store";

const $q = useQuasar();
const jadwalStore = useJadwalStore();
const emits = defineEmits(["added"]);
const data = ref({
  tanggal: "2023/09/01",
  waktu_1: "00:00",
  waktu_2: "00:00",
  kuota: null,
});

// Disabled Button
const loading = ref(false);
const disabledButton = computed(() => {
  return (
    loading.value ||
    !data.value.tanggal ||
    !data.value.waktu_1 ||
    !data.value.waktu_2 ||
    !data.value.kuota
  );
});

// Create Jadwal
const addJadwal = async () => {
  loading.value = true;
  try {
    const res = await jadwalStore.createJadwal(data.value);

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
