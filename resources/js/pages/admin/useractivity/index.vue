<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          Aktifitas User
        </VCardTitle>
      </VCardItem>
      <div class="d-flex justify-space-between mb-6">
        <div class="d-flex align-center pe-2 w-25">
          <v-text-field prepend-inner-icon="mdi-magnify" density="compact" label="Search" single-line flat hide-details
            variant="solo-filled" v-model="searchValue"></v-text-field>
        </div>
      </div>
      <EasyDataTable
        show-index
        :headers="headers"
        :items="items"
        :search-field="searchField"
        :search-value="searchValue"
      >
        <template #item-created_at="item">
            <p>{{ formatDate(item.created_at) }} </p>
        </template>
        
        <template #empty-message>
          <p>Tidak ada aktifitas</p>
        </template>
      </EasyDataTable>
    </VCard>
  </div>
</template>
<script lang="ts">
import mainURL from "@/axios";

export default {
  data() {
    return {
      items: [],
      headers: [
        { text: "Nama User", value: "user.name", sortable: true },
        { text: "Deskripsi", value: "desc", sortable: true },
        { text: "Tanggal", value: "created_at", sortable: true },
      ],
      searchValue: "",
      searchField: ["user.name", "desc","created_at"],
    };
  },
  methods: {
    formatDate(dateString: string | number | Date) {
      const date = new Date(dateString);
      return date.toLocaleString('id-ID');
    },
    async getAllFiles() {
      try {
        const response = await mainURL.get("/useractivity");
        if (response.status === 200) {
          this.items = response.data.data;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.data.message);
      }
    },
  },
  mounted() {
    this.getAllFiles();
  },
};
</script>
