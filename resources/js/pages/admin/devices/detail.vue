<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <span color="primary" @click="goBack" style="cursor: pointer">
          <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
          Back
        </span>
        <VCardTitle class="text-2xl font-weight-bold">
          Daftar Perangkat User : {{ userProfile.name ?? "-" }}
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

      <v-dialog v-model="edit" width="auto">
        <v-card>
          <template v-slot:title> Update Data </template>
          <template v-slot:text>
            <VForm @submit.prevent="updateData">
              <VRow>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Nama Perangkat"
                    label="Nama"
                    v-model="dataForm.nameDev"
                    autofocus
                    prepend-icon="mdi-devices"
                  />
                </VCol>
                <VCol cols="12" md="12">
                  <v-select
                    label="Pilih Status"
                    :items="status"
                    v-model="dataForm.isVerified"
                    prepend-icon="mdi-check"
                    clearable
                  ></v-select>
                </VCol>
                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn type="submit">Simpan</VBtn>

                  <button
                    type="button"
                    class="btn btn-blue"
                    @click="closeModal"
                  >
                    Batal
                  </button>
                </VCol>
              </VRow>
            </VForm>
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
        <template #item-isVerified="{ isVerified }">
          <v-chip color="primary" v-if="isVerified"> Verified </v-chip>
          <v-chip color="#eb4034" v-else> Not Verified </v-chip>
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper">
            <div class="d-flex justify-space-between">
              <v-tooltip location="top" text="Edit Perangkat">
                <template v-slot:activator="{ props }">
                  <button v-bind="props" @click="openModal(item)">
                    <VIcon size="20" icon="bx-edit" />
                  </button>
                </template>
              </v-tooltip>
              <v-tooltip location="top" text="Hapus Perangkat">
                <template v-slot:activator="{ props }">
                  <button v-bind="props" @click="deleteDevice(item)">
                    <VIcon size="20" icon="bx-trash" />
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
import axios from "axios";

export default {
  data() {
    return {
      edit: false,
      userId: this.$route.params.userId,
      userProfile: {},
      dataForm: {
        id: null,
        nameDev: "",
        isVerified: null,
        device: null,
      },

      items: [],
      searchValue: "",
      headers: [
        { text: "Nama Perangkat", value: "nameDev", sortable: true },
        { text: "Detail Perangkat", value: "deviceName", sortable: true },
        { text: "IP", value: "ip", sortable: true },
        { text: "Status", value: "isVerified", sortable: true },
        { text: "Operation", value: "operation" },
      ],

      status: [
        { title: "Verified", value: 1 },
        { title: "not verified", value: 0 },
      ],
    };
  },
  methods: {
    closeModal() {
      this.dataForm.id = null;
      this.dataForm.nameDev = "";
      this.dataForm.isVerified = null;
      this.dataForm.device = null;
      this.edit = false;
    },
    openModal(item) {
      this.dataForm.id = item.id;
      this.dataForm.nameDev = item.nameDev;
      this.dataForm.isVerified = item.isVerified;
      this.dataForm.device = item.deviceName;
      this.edit = true;
    },
    goBack() {
      this.$router.go(-1);
    },
    async deleteDevice(item) {
      try {
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data?"
        );
        if (!confirmDelete) return;

        const userAgent = navigator.userAgent;
        const ip = await axios.get("https://api.ipify.org?format=json");
        let userIP = ip.data.ip;
        if (item.nameDev === userAgent && item.ip === userIP) {
          alert(
            "Anda tidak diizinkan untuk menghapus perangkat ini. Karena anda sedang menggunakan nya. Silahkan hubungi admin jika ingin menghapusnya"
          );
          return;
        }
        const response = await mainURL.delete(`/deletedevices/${item.id}`);

        if (response.status === 200) {
          this.getUserDevice(this.userId);
          this.$showToast("success", "Berhasil", response.data.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async updateData() {
      try {
        const formData = new FormData();

        if (this.dataForm.nameDev != null) {
          formData.append("nameDev", this.dataForm.nameDev);
        }
        if (this.dataForm.isVerified != null) {
          formData.append("isVerified", this.dataForm.isVerified);
        }
        formData.append("_method", "PUT");

        const response = await mainURL.post(
          `/updatedevices/${this.dataForm.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          const userAgent = navigator.userAgent;
          this.$showToast("success", "Berhasil", response.data.data.message);
          if (
            userAgent == this.dataForm.device &&
            this.dataForm.isVerified != 1
          ) {
            localStorage.removeItem("userToken");
            localStorage.removeItem("userData");

            this.$router.push(`/login`);
          }

          this.closeModal();
          this.getUserDevice(this.userId);
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async getUserDevice(id) {
      try {
        const response = await mainURL.get(`/devices/${id}`);

        if (response.status === 200) {
          this.items = response.data.devices;
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
    this.getUserDevice(this.userId);
  },
};
</script>
