<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <span color="primary" @click="goBack" style="cursor: pointer">
          <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
          Back
        </span>
        <VCardTitle class="text-2xl font-weight-bold"> List User : {{ userProfile.name ?? '-' }} </VCardTitle>
      </VCardItem>      

      <EasyDataTable
        :headers="headers"
        :items="items"
        :search-value="searchValue"
        show-index
      >
        <template #empty-message>
          <p>Data User Kosong</p>
        </template>
        <template #loading>
          <p>loading data .....</p>
        </template>
        <template #item-created_at="item">
            <p>{{ formatDate(item.created_at) }} </p>
        </template>
      </EasyDataTable>
    </VCard>
  </div>
</template>

<script lang="ts">
import mainURL from "@/axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      items: [],
      headers: [
        { text: "Nama", value: "user.name", sortable: true },
        { text: "Deskripsi", value: "desc", sortable: true },
        { text: "Waktu", value: "created_at", sortable: true },
      ],
      positions: [],
      searchValue: "",
      insert: false,
      btnInsert: true,
      isPasswordVisible: false,
      edit: false,
      userUuid: this.$route.params.userUuid,
      userProfile: {
        'name': null,
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    formatDate(dateString: string | number | Date) {
      const date = new Date(dateString);
      return date.toLocaleString('id-ID');
    },
    async getActivityByUserId(id: any) {
      try {
        const response = await mainURL.get(`/useractivity/${id}`);

        if (response.status === 200) {
            this.items = response.data.data;
            this.userProfile = response.data.user;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
  },
  mounted() {
    this.getActivityByUserId(this.userUuid);
  },
});
</script>
