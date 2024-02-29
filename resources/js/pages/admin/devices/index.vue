<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          Daftar Perangkat
        </VCardTitle>
      </VCardItem>

      <div class="d-flex justify-end mb-6">
        <!-- <v-btn color="primary" size="small" class="my-3 mx-3" @click="openModal(1)">
            Tambah Data
          </v-btn> -->

        <div class="d-flex align-center pe-2 w-25">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            density="compact"
            label="Search"
            single-line
            flat
            hide-details
            variant="solo-filled"
            v-model="searchValue"
          ></v-text-field>
        </div>
      </div>

      <EasyDataTable
        show-index
        :headers="headers"
        :items="items"
        :search-value="searchValue"
      >
        <template #empty-message>
          <p>Data Kosong</p>
        </template>
        <template #loading>
          <p>loading data .....</p>
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper">
            <div class="d-flex justify-space-between">
              <v-tooltip location="top" text="Lihat Detail Perangkat">
                <template v-slot:activator="{ props }">
                  <button v-bind="props" @click="toDetail(item.uuid)">
                    <VIcon
                      size="20"
                      icon="bx-file-find"                      
                    />
                  </button>
                </template>
              </v-tooltip>
            </div>
          </div>
        </template>
      </EasyDataTable>
    </VCard>
  </div>
</template>

<script>
import mainURL from "@/axios";

export default {
  data() {
    return {
      searchValue: "",
      items: [],
      headers: [
        { text: "Nama User", value: "name", sortable: true },
        { text: "Jabatan", value: "position.name", sortable: true },
        { text: "Jumlah Perangkat", value: "devices_count", sortable: true },
        { text: "Operation", value: "operation" },
      ],
    };
  },
  methods: {
    toDetail(id) {
      this.$router.push(`/a-devices/${id}`);
    },
    async getDataUser() {
      try {
        const response = await mainURL.get("/devices");

        if (response.status === 200) {
          this.items = response.data.data;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
  },
  mounted() {
    this.getDataUser();
  },
};
</script>
