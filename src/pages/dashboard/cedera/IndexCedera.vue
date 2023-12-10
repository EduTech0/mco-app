<template>
  <q-page class="q-pa-sm">
    <q-table
      flat
      bordered
      class="statement-table"
      title="Cedera"
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
        >
          <q-tooltip>{{ grid ? "List" : "Grid" }}</q-tooltip>
        </q-btn>
        <div class="q-pa-sm q-gutter-sm"></div>

        <!-- Add Cedera -->
        <q-btn
          @click="addCederaDialog = true"
          color="black"
          icon="add"
          class="q-my-sm q-px-lg"
          ><q-tooltip>Add Cedera</q-tooltip></q-btn
        >
        <q-dialog v-model="addCederaDialog">
          <AddCedera @added="cederaAdded" />
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

      <!-- Harga -->
      <template #body-cell-harga="props">
        <q-td :props="props">
          <div
            text-color="white"
            dense
            class="text-weight-bolder text-red"
            square
          >
            {{ props.row.harga }}
          </div>
        </q-td>
      </template>

      <!-- Image -->
      <template #body-cell-image="props">
        <q-td :props="props">
          <div text-color="white" dense square>
            <img
              :src="'http://localhost:8000/storage/cederas/' + props.row.image"
              alt="Cedera Image"
              width="80"
            />
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
            @click="editItem(props.row)"
          ></q-btn>
          <q-btn
            dense
            flat
            round
            color="red"
            field="delete"
            icon="delete"
            @click="deleteCederaDialog(props.row)"
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
                    {{ props.rowIndex + 1 }}
                  </div>

                  <!-- Harga -->
                  <div
                    v-else-if="col.name === 'harga'"
                    text-color="white"
                    dense
                    class="text-red text-bold"
                    square
                  >
                    {{ props.row.harga }}
                  </div>

                  <!-- Image -->
                  <div
                    v-else-if="col.name === 'image'"
                    text-color="white"
                    dense
                    square
                  >
                    <img
                      :src="
                        'http://localhost:8000/storage/cederas/' +
                        props.row.image
                      "
                      alt="Cedera Image"
                      width="80"
                    />
                  </div>

                  <!-- Action -->
                  <div v-else-if="col.name === 'action'">
                    <q-btn
                      dense
                      flat
                      color="primary"
                      field="edit"
                      icon="edit"
                      @click="editItem(props.row)"
                    ></q-btn>
                    <q-btn
                      dense
                      flat
                      color="red"
                      field="delete"
                      icon="delete"
                      @click="deleteCederaDialog(props.row)"
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
import { useQuasar } from "quasar";
import { useCederaStore } from "src/stores/cedera-store";
import AddCedera from "./CreateCedera.vue";

const $q = useQuasar();
const cederaStore = useCederaStore();

// Get Cedera
const cederas = ref([]);
const getCedera = async () => {
  try {
    const res = await cederaStore.allCedera();
    cederas.value = res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  getCedera();
});

// Create Cedera
const addCederaDialog = ref(false);
const cederaAdded = () => {
  addCederaDialog.value = false;
  getCedera();
};

// Edit Cedera
const editCedera = (row) => {
  // Navigasi ke halaman edit dengan menggunakan router Quasar
  // $router.push(`/edit/${row.id}`);
};

// Delete Cedera
const deleteCederaDialog = (row) => {
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
    deleteCedera(row);
  });
};
const deleteCedera = async (row) => {
  try {
    const res = await cederaStore.deleteCedera(row.id);
    if (res.data.status === "Success") {
      $q.notify({
        color: "positive",
        message: res.data.message,
      });
      getCedera();
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
const currencyData = cederas;
const currencyColumns = [
  {
    name: "id",
    field: "id",
    label: "ID",
  },
  {
    name: "name",
    field: "name",
    label: "Name",
    align: "left",
    sortable: true,
  },
  {
    name: "harga",
    field: "harga",
    label: "Harga",
    align: "center",
    sortable: true,
  },
  {
    name: "image",
    field: "image",
    label: "Image",
    align: "left",
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
