<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          Daftar File Populer
        </VCardTitle>
      </VCardItem>

      <EasyDataTable show-index :headers="headers" :items="items" >
        <template #empty-message>
          <p>Data file Kosong</p>
        </template>
        <template #loading>
          <p>loading data .....</p>
        </template>
        <template #item-positions="item">
          <v-chip-group selected-class="text-primary" column>
            <div v-for="(x, index) in item.positions" :key="index">
              <VChip style="color: rgb(6, 84, 107)">
                {{ x.name }}
              </VChip>
            </div>
          </v-chip-group>
        </template>
        <template #item-path="item">
          <a :href="filePath + item.path" target="_blank" rel="noopener noreferrer" style="cursor: pointer !important">
            <v-chip color="primary">
              <v-icon start icon="mdi-file"></v-icon> lihat
            </v-chip>
          </a>
        </template>
        <template #item-operation="item">
          <div class="d-flex justify-space-between">
            <v-tooltip location="top" text="Lihat Detail user akses">
              <template v-slot:activator="{ props }">
                <button v-bind="props" @click="toDetail(item.id)">
                  <VIcon size="20" icon="bx-file-find" color="red"  />
                </button>
              </template>
            </v-tooltip>
          </div>
        </template>
        <template #item-categories="item">
          <v-chip-group selected-class="text-primary" column>
            <div v-for="(x, index) in item.categories" :key="index">
              <v-chip style="color: rgb(255, 153, 0)"> {{ x.name }} </v-chip>
            </div>
          </v-chip-group>
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
      filePath: this.$filePath,
      items: [],
      headers: [
        { text: "Pengunggah", value: "username", sortable: true },
        { text: "File Name", value: "name", sortable: true },
        { text: "Dilihat", value: "views_count", sortable: true },
        { text: "File", value: "path", sortable: true },
        { text: "Operation    ", value: "operation" },
      ],
    };
  },
  methods: {
    toDetail(id: any){
      this.$router.push(`/a-popular-list/${id}`);
    },
    async getMostView() {
      try {
        const response = await mainURL.get("/mostfileviews");

        if (response.status === 200) {
          this.items = response.data.data;
        } else {
          const errorMessage =
            response && response.data && response.data.message
              ? response.data.message
              : "Gagal. Silakan coba lagi.";
          this.$showToast("error", "Sorry", errorMessage);
        }
      } catch (error) {
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Gagal login. Silakan coba lagi.";
        this.$showToast("error", "Sorry", errorMessage);
      }
    },
  },
  mounted() {
    this.getMostView();
  },
};
</script>
