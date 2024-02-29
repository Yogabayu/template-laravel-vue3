<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <span color="primary" @click="goBack" style="cursor: pointer">
          <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
          Back
        </span>
        <VCardTitle class="text-2xl font-weight-bold">
          List File Akses User : {{ userProfile.name ?? "-" }}
        </VCardTitle>
      </VCardItem>

      <div class="d-flex justify-end mb-6">
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

      <v-dialog v-model="detailHistory" width="100%">
        <v-card>
          <template v-slot:title> Riwayat </template>
          <template v-slot:text>
            <EasyDataTable
              show-index
              :headers="headersHistory"
              :items="itemsHistory"
            >
              <template #item-startTime="item">
                {{ formatDate(item.startTime) }}
              </template>
              <template #empty-message>
                <p>Data Kosong</p>
              </template>
            </EasyDataTable>
          </template>
        </v-card>
      </v-dialog>

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
        <template #item-path="item">
          <a
            :href="filePath + item.path"
            target="_blank"
            rel="noopener noreferrer"
            style="cursor: pointer !important"
          >
            <v-chip color="primary">
              <v-icon start icon="mdi-file"></v-icon> lihat
            </v-chip>
          </a>
        </template>
        <template #item-latest_view="item">
          {{ formatDate(item.latest_view) }}
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper">
            <div class="d-flex justify-space-between">
              <v-tooltip location="top" text="Lihat Detail Perangkat">
                <template v-slot:activator="{ props }">
                  <button v-bind="props" @click="openModal(item.id)">
                    <VIcon size="20" icon="bx-file-find" />
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
      userUuid: this.$route.params.userUuid,
      filePath: this.$filePath,
      userProfile: {},
      detailHistory: false,

      searchValue: "",
      items: [],
      headers: [
        { text: "Nama File", value: "name", sortable: true },
        { text: "File", value: "path", sortable: true },
        { text: "Terakhir dilihat", value: "latest_view", sortable: true },
        { text: "Operation", value: "operation" },
      ],

      itemsHistory: [],
      headersHistory: [
        { text: "File", value: "file.name", sortable: true },
        { text: "Dilihat", value: "startTime", sortable: true },
      ],
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString("id-ID");
    },
    async openModal(fileId) {
      try {
        const formData = new FormData();
        formData.append("uuid", this.userProfile.uuid);
        formData.append("fileid", fileId);
        formData.append("_method", "POST");

        const response = await mainURL.post("/listhistoryfilebyuser", formData);
        if (response.status === 200) {
          this.itemsHistory = response.data.data;
          this.detailHistory = true;
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    async getListFile(id) {
      try {
        const response = await mainURL.get(`/fileviewbyuser/${id}`);

        if (response.status === 200) {
          this.items = response.data.data.fileList;
          this.userProfile = response.data.data.detailUser;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
  },
  mounted() {
    this.getListFile(this.userUuid);
  },
};
</script>
