<template>
  <q-page class="q-pa-sm">
    <q-table
      flat
      bordered
      class="statement-table"
      title="Jadwal"
      :rows="currencyData"
      :hide-header="grid"
      :columns="currencyColumns"
      row-key="__index"
      :grid="grid"
      :filter="filter"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 10, 20, 30]"
    >
      <!-- Top -->
      <template v-slot:top-right="props">
        <!-- Fullscreen -->
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="setFs(props)"
        >
          <q-tooltip>{{
            props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
          }}</q-tooltip>
        </q-btn>

        <!-- Grid Switch -->
        <q-btn
          flat
          round
          dense
          :icon="grid ? 'list' : 'grid_on'"
          @click="grid = !grid"
          class="q-mr-sm"
        >
          <q-tooltip>{{ grid ? "List" : "Grid" }}</q-tooltip>
        </q-btn>

        <!-- Search -->
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- Add Jadwal -->
      <template v-slot:top-left>
        <div class="text-h5 q-pr-lg">Jadwals</div>
        <q-btn
          dense
          @click="addJadwalDialog = true"
          color="black"
          icon="add"
          class="shadow-3"
          ><q-tooltip>Add Jadwal</q-tooltip></q-btn
        >
        <q-dialog v-model="addJadwalDialog" persistent>
          <AddJadwal @added="jadwalAdded" />
        </q-dialog>
      </template>

      <!-- Table -->
      <!-- ID -->
      <template #body-cell-id="props">
        <q-td :props="props">
          <div text-color="white" dense square>
            {{ props.rowIndex + 1 }}
          </div>
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn
            dense
            flat
            round
            color="blue"
            field="edit"
            icon="edit"
            @click="editJadwalId(props.row)"
          >
            <q-dialog v-model="editJadwalDialog" persistent>
              <EditJadwal
                @edited="jadwalEdited(props.row)"
                :jadwal="jadwalData"
              />
            </q-dialog>
          </q-btn>
          <q-btn
            dense
            flat
            round
            color="red"
            field="delete"
            icon="delete"
            @click="deleteJadwalDialog(props.row)"
          ></q-btn>
        </q-td>
      </template>

      <!-- Grid -->
      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card>
            <q-list dense>
              <q-item v-for="col in props.cols" :key="col.id">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <!-- ID -->
                  <div v-if="col.name === 'id'" text-color="white" dense square>
                    {{ props.row.id }}
                  </div>

                  <!-- Action -->
                  <div v-else-if="col.name === 'action'">
                    <q-btn
                      dense
                      flat
                      round
                      color="blue"
                      field="edit"
                      icon="edit"
                      @click="editJadwalId(props.row)"
                    >
                      <q-dialog v-model="editJadwalDialog" persistent>
                        <EditJadwal
                          @edited="jadwalEdited(props.row)"
                          :jadwal="jadwalData"
                        />
                      </q-dialog>
                    </q-btn>
                    <q-btn
                      dense
                      flat
                      color="red"
                      field="delete"
                      icon="delete"
                      @click="deleteJadwalDialog(props.row)"
                    ></q-btn>
                  </div>

                  <!-- DLL -->
                  <q-item-label
                    v-else
                    caption
                    :class="col.classes ? col.classes : ''"
                    >{{ col.value }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useJadwalStore } from "src/stores/jadwal-store";
import AddJadwal from "./CreateJadwal.vue";
import EditJadwal from "./EditJadwal.vue";

const $q = useQuasar();
const router = useRouter();
const jadwalStore = useJadwalStore();

// Get Jadwal
const jadwals = ref([]);
const getJadwal = async () => {
  try {
    const res = await jadwalStore.dashboardJadwals();
    jadwals.value = res.data.data;
    if (res.data.response === "Gagal") {
      router.push("/notfound");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  getJadwal();
});

// Create Jadwal
const addJadwalDialog = ref(false);
const jadwalAdded = () => {
  addJadwalDialog.value = false;
  getJadwal();
};

// Edit Jadwal
const editJadwalDialog = ref(false);
const jadwalData = ref("");
const editJadwalId = (row) => {
  editJadwalDialog.value = true;
  jadwalData.value = row;
};
const jadwalEdited = () => {
  editJadwalDialog.value = false;
  getJadwal();
};

// Delete Jadwal
const deleteJadwalDialog = (row) => {
  $q.dialog({
    title: "WARNING!",
    message: "Apakah kamu yakin ingin menghapus data ini?",
    cancel: true,
    persistent: true,
    ok: {
      label: "Ya",
      color: "red-7",
    },
    cancel: {
      label: "Tidak",
      color: "primary",
    },
  }).onOk(() => {
    deleteJadwal(row);
  });
};
const deleteJadwal = async (row) => {
  try {
    const res = await jadwalStore.deleteJadwal(row.id);
    if (res.data.status === "Success") {
      $q.notify({
        color: "positive",
        message: res.data.message,
      });
      getJadwal();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    $q.notify({
      color: "negative",
      message: "Terjadi kesalahan saat menghapus item",
    });
  }
};

// Table
const currencyData = jadwals;
const currencyColumns = [
  {
    name: "id",
    field: "id",
    label: "ID",
  },
  {
    name: "tanggal",
    field: "tanggal",
    label: "Tanggal",
    align: "left",
    sortable: true,
  },
  {
    name: "waktu",
    field: "waktu",
    label: "Waktu",
    align: "left",
    sortable: true,
  },
  {
    name: "kuota",
    field: "kuota",
    label: "Kuota",
    align: "center",
    sortable: true,
  },
  {
    name: "tersisa",
    field: "tersisa",
    label: "Tersisa",
    align: "center",
    sortable: true,
  },
  {
    name: "action",
    field: "action",
    label: "Action",
    align: "center",
  },
];
const filter = ref("");
const grid = ref(false);
const pagination = ref({});
const setFs = (props) => {
  props.toggleFullscreen();
};
</script>

<style lang="sass">
.statement-table
  thead tr:last-child th:last-child
    background-color: #bdb9b993
    backdrop-filter: blur(5px)
    max-width: 200px

  td:last-child
    background-color: #bdb9b993
    backdrop-filter: blur(5px)
    max-width: 200px

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1
</style>
