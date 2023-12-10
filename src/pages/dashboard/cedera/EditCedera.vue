<template>
  <div>
    <q-form @submit="addCedera">
      <q-card class="q-px-lg q-py-md" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Cedera</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row justify-center">
            <!-- Nama -->
            <div class="col-5 q-mr-sm">
              <q-input
                v-model="cedera.name"
                label="Nama"
                class="q-my-sm"
                dense
                autofocus
                required
              ></q-input>
            </div>
            <!-- Harga -->
            <div class="col-5 q-ml-sm">
              <q-input
                v-model="cedera.harga"
                label="Harga"
                class="q-my-sm"
                outlined
                dense
                type="number"
                required
              ></q-input>
            </div>
          </div>

          <!-- Images -->
          <q-file
            filled
            bottom-slots
            v-model="cedera.images"
            class="q-my-sm"
            label="Images"
            counter
            accept=".jpg, .jpeg, .png, .gif, .svg"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop.prevent />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop.prevent="model = null"
                class="cursor-pointer"
              />
            </template>

            <template v-slot:hint> Field hint </template>
          </q-file>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn type="submit" label="Tambah Cedera" color="dark"></q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    showDialog: Boolean,
    rowData: Object,
  },
  data() {
    return {
      formData: {
        name: "",
        harga: null,
        images: null,
      },
    };
  },
  methods: {
    updateData() {
      const updatedData = {
        name: this.formData.name,
        harga: this.formData.harga,
        images: this.formData.images,
      };

      const token = LocalStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      this.$axios
        .put(
          `http://localhost:8000/api/cederas/edit/${this.rowData.id}`,
          updatedData,
          { headers }
        )
        .then((response) => {
          if (response.data.status === "Success") {
            this.$q.notify({
              color: "positive",
              message: response.data.message,
            });
            console.log("Data Updated Successfully.");
            this.$emit("data-updated", updatedData);
          } else {
            console.error("Failed to update data.");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    },
  },
};
</script>
