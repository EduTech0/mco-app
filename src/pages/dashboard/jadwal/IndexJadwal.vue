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

        <!-- Add Jadwal -->
        <q-btn
          @click="showDialog = true"
          color="black"
          icon="add"
          class="q-my-sm q-px-lg"
          ><q-tooltip>Add Jadwal</q-tooltip></q-btn
        >
        <q-dialog v-model="showDialog">
          <JadwalForm @added="handleJadwalAdded" />
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
            @click="editItem(props.row)"
          ></q-btn>
          <q-btn
            dense
            flat
            round
            color="red"
            field="delete"
            icon="delete"
            @click="showDeleteDialog(props.row)"
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
                      @click="showDeleteDialog(props.row)"
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

<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { LocalStorage } from "quasar";
import JadwalForm from "./CreateJadwal.vue";

export default defineComponent({
  name: "JadwalDashboardPage",

  components: {
    JadwalForm,
  },

  data() {
    const jadwals = ref([]);
    const token = LocalStorage.getItem("token");

    // Function to fetch data from Laravel API
    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/jadwal");
        jadwals.value = response.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    return {
      currencyData: jadwals,
      currencyColumns: [
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
      ],
      filter: "",
      grid: false,
      setFs(props) {
        props.toggleFullscreen();
      },
      pagination: {},
      showDialog: false,
      token,
    };
  },

  methods: {
    // Add Jadwal
    handleJadwalAdded() {
      this.showDialog = false;
      this.loadData();
    },

    // Edit Jadwal
    editItem(row) {
      // Navigasi ke halaman edit dengan menggunakan router Quasar
      // this.$router.push(`/edit/${row.id}`);
    },

    // Delete Jadwal
    async showDeleteDialog(row) {
      await this.$q
        .dialog({
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
        })
        .onOk(() => {
          this.deleteItem(row);
        })
        .onCancel(() => {
          this.$q.notify({
            color: "negative",
            message: "Penghapusan dibatalkan",
          });
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel");
        });
    },
    async deleteItem(row) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/jadwal/delete/${row.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (response.data.status === "Success") {
          this.$q.notify({
            color: "positive",
            message: response.data.message,
          });
          this.loadData();
        }
      } catch (error) {
        console.error("Error saat menghapus item:", error);
        this.$q.notify({
          color: "negative",
          message: "Terjadi kesalahan saat menghapus item",
        });
      }
    },

    // Load Cedera
    async loadData() {
      try {
        // Mengambil data dari API
        const response = await axios.get("http://localhost:8000/api/jadwal", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        // Simpan data yang diambil dari API ke dalam properti currencyData
        this.currencyData = response.data.data;
      } catch (error) {
        console.error("Error saat mengambil data:", error);
      }
    },
    mounted() {
      this.loadData();
    },
  },
});
</script>
