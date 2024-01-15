<template>
  <q-page class="q-pa-sm">
    <q-table
      flat
      bordered
      class="statement-table"
      title="Pendaftaran Belum Terverifikasi"
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

      <!-- Add Pendaftaran -->
      <template v-slot:top-left>
        <div class="text-h5 q-pr-lg">Pendaftarans</div>
        <q-btn
          dense
          @click="addPendaftaranDialog = true"
          color="black"
          icon="add"
          class="shadow-3"
        >
          <q-tooltip>Add Pendaftaran</q-tooltip>
        </q-btn>
        <q-dialog v-model="addPendaftaranDialog" persistent>
          <AddPendaftaran @added="pendaftaranAdded" />
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

      <!-- Status -->
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-chip
            :color="
              props.row.status === 'Dalam Antrian'
                ? 'red'
                : props.row.status === 'Terverifikasi'
                ? 'green'
                : 'secondary'
            "
            text-color="white"
            dense
            class="text-caption"
            square
            >{{ props.row.status }}</q-chip
          >
        </q-td>
      </template>

      <!-- Cedera -->
      <template #body-cell-cederas="props">
        <q-td :props="props">
          <div text-color="white" class="text-weight-bolder" dense square>
            {{
              props.row.cederas ? props.row.cederas[0].name : "Tidak ada cedera"
            }}
          </div>
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props" field="action">
          <q-btn
            dense
            flat
            round
            color="red"
            icon="delete"
            @click="deletePendaftaranDialog(props.row)"
          ></q-btn>
          <q-btn
            dense
            flat
            round
            v-if="props.row.status === 'Dalam Antrian'"
            color="green"
            icon="task_alt"
            @click="verificationPendaftaran(props.row)"
          >
            <q-tooltip>Verifikasi Pendaftaran</q-tooltip>
          </q-btn>
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
                    {{ props.rowIndex + 1 }}
                  </div>

                  <!-- Status -->
                  <q-chip
                    v-else-if="col.name === 'status'"
                    :color="
                      props.row.status === 'Dalam Antrian'
                        ? 'red'
                        : props.row.status === 'Terverifikasi'
                        ? 'green'
                        : 'secondary'
                    "
                    text-color="white"
                    class="text-caption"
                    dense
                    square
                    >{{ props.row.status }}</q-chip
                  >

                  <!-- Cedera -->
                  <div
                    v-else-if="col.name === 'cederas'"
                    text-color="white"
                    class="text-weight-bolder"
                    dense
                    square
                  >
                    {{
                      props.row.cederas
                        ? props.row.cederas[0].name
                        : "Tidak ada cedera"
                    }}
                  </div>

                  <!-- Action -->
                  <div v-else-if="col.name === 'action'" field="action">
                    <q-btn
                      dense
                      flat
                      color="green"
                      icon="task_alt"
                      v-if="props.row.status === 'Dalam Antrian'"
                      @click="verificationPendaftaran(props.row)"
                    >
                      <q-tooltip>Verifikasi Pendaftaran</q-tooltip>
                    </q-btn>
                    <q-btn
                      dense
                      flat
                      color="red"
                      icon="delete"
                      @click="deletePendaftaranDialog(props.row)"
                    ></q-btn>
                  </div>

                  <!-- DLL -->
                  <q-item-label
                    v-else
                    caption
                    :class="col.classes ? col.classes : ''"
                  >
                    {{ col.value }}
                  </q-item-label>
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
import { usePendaftaranStore } from "src/stores/pendaftaran-store";
import AddPendaftaran from "./../CreatePendaftaran.vue";

const $q = useQuasar();
const router = useRouter();
const pendaftaranStore = usePendaftaranStore();

// Get Pendaftaran
const pendaftarans = ref([]);
const getPendaftaran = async () => {
  try {
    const res = await pendaftaranStore.dashboardPendaftarans();
    const data = res.data.data;
    if (res.data.response === "Gagal") {
      router.push("/notfound");
    }

    // Filter data berdasarkan status
    const dataTerverifikasi = data.filter(
      (item) => item.status === "Dalam Antrian"
    );
    pendaftarans.value = dataTerverifikasi;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  getPendaftaran();
});

// Create Pendaftaran
const addPendaftaranDialog = ref(false);
const pendaftaranAdded = () => {
  addPendaftaranDialog.value = false;
  getPendaftaran();
};

// Edit Pendaftaran
const editPendaftaran = (row) => {
  // Navigasi ke halaman edit dengan menggunakan router Quasar
  // $router.push(`/edit/${row.id}`);
};

// Verification Pendaftaran
const verificationPendaftaran = async (row) => {
  try {
    const res = await pendaftaranStore.verificationPendaftaran(row.slug);
    if (res.data.status === "Success") {
      $q.notify({
        color: "positive",
        message: res.data.message,
      });
      getPendaftaran();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    $q.notify({
      color: "negative",
      message: "Terjadi kesalahan saat memverifikasi pendaftaran.",
    });
  }
};

// Delete Pendaftaran
const deletePendaftaranDialog = (row) => {
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
    deletePendaftaran(row);
  });
};
const deletePendaftaran = async (row) => {
  try {
    const res = await pendaftaranStore.deletePendaftaran(row.slug);
    if (res.data.status === "Success") {
      $q.notify({
        color: "positive",
        message: res.data.message,
      });
      getPendaftaran();
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
const currencyData = pendaftarans;
const currencyColumns = [
  {
    name: "id",
    field: "id",
    label: "ID",
  },
  {
    name: "status",
    field: "status",
    label: "Status",
    align: "left",
    sortable: true,
  },
  {
    name: "nama_lengkap",
    field: "nama_lengkap",
    label: "Nama Lengkap",
    align: "left",
    sortable: true,
  },
  {
    name: "jenis_kelamin",
    field: "jenis_kelamin",
    label: "Jenis Kelamin",
    align: "center",
    sortable: true,
  },
  {
    name: "berat",
    field: "berat",
    label: "Berat",
    align: "left",
    sortable: true,
  },
  {
    name: "tinggi",
    field: "tinggi",
    label: "Tinggi",
    align: "left",
    sortable: true,
  },
  {
    name: "usia",
    field: "usia",
    label: "Usia",
    align: "left",
    sortable: true,
  },
  {
    name: "nomor",
    field: "nomor",
    label: "Nomor",
    align: "left",
    sortable: true,
  },
  {
    name: "pekerjaan",
    field: "pekerjaan",
    label: "Pekerjaan",
    align: "left",
    sortable: true,
  },
  {
    name: "alamat",
    field: "alamat",
    label: "Alamat",
    align: "left",
    sortable: true,
  },
  {
    name: "olahraga",
    field: "olahraga",
    label: "Olahraga",
    align: "left",
    sortable: true,
  },
  {
    name: "cabang",
    field: "cabang",
    label: "Cabang",
    align: "left",
    sortable: true,
  },
  {
    name: "cederas",
    field: "cederas",
    label: "Cederas",
    align: "left",
    sortable: true,
  },
  {
    name: "penyebab",
    field: "penyebab",
    label: "Penyebab",
    align: "left",
    sortable: true,
  },
  {
    name: "lama_cedera",
    field: "lama_cedera",
    label: "Lama Cedera",
    align: "left",
    sortable: true,
  },
  {
    name: "jumlah_terapi",
    field: "jumlah_terapi",
    label: "Jumlah Terapi",
    align: "left",
    sortable: true,
  },
  {
    name: "slug",
    field: "slug",
    label: "Slug",
    align: "left",
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
