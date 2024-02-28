<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <span color="primary" @click="goBack" style="cursor: pointer">
          <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
          Back
        </span>
        <VCardTitle class="text-2xl font-weight-bold">
          Detail Akses File : {{ fileDetail.name ?? "-" }}
        </VCardTitle>

        <EasyDataTable show-index :headers="headers" :items="items">
          <template #empty-message>
            <p>Data file Kosong</p>
          </template>
          <template #item-latest_view="item">
            <span>{{ formatDate(item.latest_view) }}</span>
          </template>
        </EasyDataTable>
      </VCardItem>
    </VCard>
  </div>
</template>

<script>
import mainURL from "@/axios";

export default {
  data() {
    return {
      fileId: this.$route.params.fileId,
      items: [
        
      ],
      headers: [
        { text: "User", value: "name", sortable: true },
        { text: "Jabatan", value: "posname", sortable: true },
        { text: "Dilihat", value: "count_views", sortable: true },
        { text: "Terakhir dilihat", value: "latest_view", sortable:true },
      ],
      fileDetail: {},
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID");
    },
    async getListUserFilePopular(id) {
      try {
        const response = await mainURL.get(`/fileviewsbyid/${id}`);
        if (response.status === 200) {
          this.items = response.data.data.userList;
          this.fileDetail = response.data.data.detailFile;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.data.message);
      }
    },
  },
  mounted() {
    this.getListUserFilePopular(this.fileId);
  },
};
</script>
