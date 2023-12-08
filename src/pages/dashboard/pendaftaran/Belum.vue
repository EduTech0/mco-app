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
        <q-td :props="props" field="action">
          <q-btn
            dense
            flat
            round
            color="red"
            icon="delete"
            @click="showDeleteDialog(props.row)"
          ></q-btn>
          <q-btn
            dense
            flat
            round
            v-if="props.row.status === 'Dalam Antrian'"
            color="green"
            icon="task_alt"
            @click="verifikasi(props.row)"
            ><q-tooltip>Verifikasi Pendaftaran</q-tooltip></q-btn
          >
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
                : 'primary'
            "
            text-color="white"
            dense
            class="text-caption"
            square
            >{{ props.row.status }}</q-chip
          >
        </q-td>
      </template>
      <!-- Nama Lengkap -->
      <template #body-cell-nama_lengkap="props">
        <q-td :props="props">
          <div text-color="white" dense class="text-bold text-black" square>
            {{ props.row.nama_lengkap }}
          </div>
        </q-td>
      </template>
      <!-- Jenis Kelamin -->
      <template #body-cell-jenis_kelamin="props">
        <q-td :props="props">
          <div text-color="white" dense class="text-weight-bolder" square>
            {{ props.row.jenis_kelamin }}
          </div>
        </q-td>
      </template>
      <!-- Cedera -->
      <template #body-cell-cedera="props">
        <q-td :props="props">
          <div text-color="white" dense class="text-weight-bolder" square>
            {{ props.row.cedera[0].name }}
          </div>
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
                  <!-- <div v-if="col.name === 'id'" text-color="white" dense square>
                    {{ props.row.id }}
                  </div> -->

                  <!-- Action -->
                  <div v-if="col.name === 'action'" field="action">
                    <q-btn
                      dense
                      flat
                      color="green"
                      icon="task_alt"
                      v-if="props.row.status === 'Dalam Antrian'"
                      @click="verifikasi(props.row)"
                      ><q-tooltip>Verifikasi Pendaftaran</q-tooltip></q-btn
                    >
                    <q-btn
                      dense
                      flat
                      color="red"
                      icon="delete"
                      @click="showDeleteDialog(props.row)"
                    ></q-btn>
                  </div>

                  <!-- Name -->
                  <div
                    v-if="col.name === 'name'"
                    text-color="white"
                    dense
                    class="text-bold text-black"
                    square
                  >
                    {{ props.row.name }}
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

                  <!-- Jenis Kelamin -->
                  <div
                    v-else-if="col.name === 'jenis_kelamin'"
                    text-color="white"
                    dense
                    square
                  >
                    {{ props.row.jenis_kelamin }}
                  </div>

                  <!-- Cedera -->
                  <div
                    v-else-if="col.name === 'cedera'"
                    text-color="white"
                    dense
                    square
                  >
                    {{ props.row.cedera[0].name }}
                  </div>

                  <!-- Status -->
                  <q-chip
                    v-else-if="col.name === 'status'"
                    :color="
                      props.row.status === 'Dalam Antrian'
                        ? 'red'
                        : props.row.status === 'Terverifikasi'
                        ? 'green'
                        : 'primary'
                    "
                    text-color="white"
                    class="text-caption"
                    dense
                    square
                    >{{ props.row.status }}</q-chip
                  >

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

export default defineComponent({
  name: "PendaftaranBelumDisetujuiPage",

  data() {
    const daftar = ref([]);
    const token = LocalStorage.getItem("token");

    // Function to fetch data from Laravel API
    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/pendaftaran");
        const data = response.data.data;

        // Filter data berdasarkan status
        const dataTerverifikasi = data.filter(
          (item) => item.status === "Dalam Antrian"
        );

        daftar.value = dataTerverifikasi;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    return {
      currencyData: daftar,
      currencyColumns: [
        {
          name: "id",
          field: "id",
          label: "ID",
        },
        {
          name: "action",
          field: "action",
          label: "Action",
          align: "center",
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
          name: "nomor",
          field: "nomor",
          label: "Nomor",
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
          name: "cedera",
          field: "cedera",
          label: "Cedera",
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
    // Verifikasi Pendaftaran
    async verifikasi(row) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/pendaftaran/verification/${row.id}`,
          {},
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
        console.error("Error saat memverifikasi pendaftaran.:", error);
        this.$q.notify({
          color: "negative",
          message: "Terjadi kesalahan saat memverifikasi pendaftaran.",
        });
      }
    },

    // Delete Pendaftaran
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
          `http://localhost:8000/api/pendaftaran/delete/${row.id}`,
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

    // Load Pendaftaran
    async loadData() {
      try {
        // Mengambil data dari API
        const response = await axios.get("http://localhost:8000/api/pendaftaran", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        const data = response.data.data;

        // Filter data berdasarkan status
        const dataTerverifikasi = data.filter(
          (item) => item.status === "Dalam Antrian"
        );

        this.currencyData = dataTerverifikasi;
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
