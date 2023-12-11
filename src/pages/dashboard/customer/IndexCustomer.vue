<template>
  <q-page class="q-pa-sm">
    <q-table
      flat
      bordered
      class="statement-table"
      title="Customers"
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

      <!-- Add Customer -->
      <template v-slot:top-left>
        <div class="text-h5 q-pr-md">Customers</div>
        <q-btn
          dense
          @click="addCustomerDialog = true"
          color="black"
          icon="add"
          class="shadow-3"
          ><q-tooltip>Add Customer</q-tooltip></q-btn
        >
        <q-dialog v-model="addCustomerDialog">
          <AddCustomer @added="customerAdded" />
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
            @click="editCustomerId(props.row)"
          >
            <q-dialog v-model="editCustomerDialog">
              <EditCustomer
                @edited="customerEdited(props.row)"
                :customer="customerData"
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
            @click="deleteCustomerDialog(props.row)"
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

                  <!-- Action -->
                  <div v-else-if="col.name === 'action'">
                    <q-btn
                      dense
                      flat
                      round
                      color="blue"
                      field="edit"
                      icon="edit"
                      @click="editCustomerId(props.row)"
                    >
                      <q-dialog v-model="editCustomerDialog">
                        <EditCustomer
                          @edited="customerEdited(props.row)"
                          :customer="customerData"
                        />
                      </q-dialog>
                    </q-btn>
                    <q-btn
                      dense
                      flat
                      color="red"
                      field="delete"
                      icon="delete"
                      @click="deleteCustomerDialog(props.row)"
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
import { useCustomerStore } from "src/stores/customer-store";
import AddCustomer from "./CreateCustomer.vue";
import EditCustomer from "./EditCustomer.vue";

const $q = useQuasar();
const customerStore = useCustomerStore();

// Get Customer
const customers = ref([]);
const getCustomer = async () => {
  try {
    const res = await customerStore.allCustomer();
    customers.value = res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  getCustomer();
});

// Create Customer
const addCustomerDialog = ref(false);
const customerAdded = () => {
  addCustomerDialog.value = false;
  getCustomer();
};

// Edit Customer
const editCustomerDialog = ref(false);
const customerData = ref("");
const editCustomerId = (row) => {
  editCustomerDialog.value = true;
  customerData.value = row;
};
const customerEdited = (row) => {
  editCustomerDialog.value = false;
  getCustomer();
};

// Delete Customer
const deleteCustomerDialog = (row) => {
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
    deleteCustomer(row);
  });
};
const deleteCustomer = async (row) => {
  try {
    const res = await customerStore.deleteCustomer(row.id);
    if (res.data.status === "Success") {
      $q.notify({
        color: "positive",
        message: res.data.message,
      });
      getCustomer();
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
const currencyData = customers;
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
    name: "email",
    field: "email",
    label: "Email",
    align: "left",
    sortable: true,
  },
  {
    name: "tanggal_lahir",
    field: "tanggal_lahir",
    label: "Tanggal Lahir",
    align: "center",
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
    name: "role",
    field: "role",
    label: "Role",
    align: "center",
    sortable: true,
  },
  {
    name: "address",
    field: "address",
    label: "Address",
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
