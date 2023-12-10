<template>
  <div>
    <q-form @submit="addJadwal">
      <q-card class="q-px-lg q-py-md" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Jadwal</div>
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
              <div class="col-5">
                <q-input
                  filled
                  v-model="data.waktu_1"
                  mask="time"
                  :rules="['time']"
                  ><template v-slot:append>
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
                    </q-icon> </template
                ></q-input>
              </div>
              <div class="col2 items-center">
                <p
                  class="text-subtitle2 q-px-sm q-py-md"
                  style="font-size: 30px"
                >
                  -
                </p>
              </div>
              <div class="col-5">
                <q-input
                  filled
                  v-model="data.waktu_2"
                  mask="time"
                  :rules="['time']"
                  ><template v-slot:append>
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
                    </q-icon> </template
                ></q-input>
              </div>
            </div>
          </div>

          <!-- Kuota -->
          <div class="q-my-md">
            <div class="text-subtitle2">Kuota :</div>
            <q-input filled v-model="data.kuota" type="number" label="Kuota" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            type="submit"
            label="Tambah jadwal"
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
import { useJadwalStore } from "src/stores/jadwal-store";
import { ref } from "vue";

const $q = useQuasar();
const jadwalStore = useJadwalStore();
const emits = defineEmits(["added"]);

const data = ref({
  tanggal: ref("2023/09/01"),
  waktu_1: ref("00:00"),
  waktu_2: ref("00:00"),
  kuota: ref(null),
});
const loading = ref(false);

// Create Jadwal
const addJadwal = async () => {
  loading.value = true;
  try {
    const res = await jadwalStore.createJadwal(data.value);
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
