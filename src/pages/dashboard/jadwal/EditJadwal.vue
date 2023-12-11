<template>
  <div>
    <q-form @submit="editJadwal">
      <q-card class="q-px-lg q-py-md" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Edit Jadwal</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
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
              <!-- - -->
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
            <q-input filled v-model="data.kuota" type="number" label="Kuota" />
          </div>

          <!-- Tersisa -->
          <div class="q-my-md">
            <div class="text-subtitle2">Tersisa :</div>
            <q-input
              filled
              v-model="data.tersisa"
              type="number"
              label="Tersisa"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            type="submit"
            label="Edit jadwal"
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
import { useJadwalStore } from "src/stores/jadwal-store";

const $q = useQuasar();
const jadwalStore = useJadwalStore();
const emits = defineEmits(["edited"]);
const { jadwal } = defineProps(["jadwal"]);
const data = ref({
  id: jadwal.id,
  tanggal: jadwal.tanggal_edit,
  waktu_1: jadwal.waktu_1,
  waktu_2: jadwal.waktu_2,
  kuota: jadwal.kuota,
  tersisa: jadwal.tersisa,
});

// Disabled Button
const loading = ref(false);
const disabledButton = computed(() => {
  return (
    loading.value ||
    !data.value.tanggal ||
    !data.value.waktu_1 ||
    !data.value.waktu_2 ||
    !data.value.kuota ||
    !data.value.tersisa
  );
});

// Edit Jadwal
const editJadwal = async () => {
  loading.value = true;
  try {
    const res = await jadwalStore.editJadwal(data.value);

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
