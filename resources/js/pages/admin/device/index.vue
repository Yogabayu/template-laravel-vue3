<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <span color="primary" @click="goBack" style="cursor: pointer">
          <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
          Back
        </span>
        <VCardTitle class="text-2xl font-weight-bold">
          Daftar Perangkat User : {{ username ?? "-" }}
        </VCardTitle>
      </VCardItem>
      <div class="d-flex justify-space-between mb-6">
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
            <VForm class="mt-6" @submit.prevent="updateData">
              <VRow>
                <VCol md="6" cols="12">
                  <VTextField
                    label="Nama"
                    v-model="dataForm.nameDev"
                    autofocus
                    prepend-icon="mdi-person"
                  />
                </VCol>

                <VCol cols="12" md="6">
                  <v-select
                    label="Status Perangkat"
                    :items="[
                      { value: 1, title: 'Di iziinkan' },
                      { value: 0, title: 'DI larang' },
                    ]"
                    v-model="dataForm.isVerified"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn type="submit">Update</VBtn>

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
          <p>Data Divisi Kosong</p>
        </template>
        <template #loading>
          <p>loading data .....</p>
        </template>
        <template #item-isVerified="{ isVerified }">
          <v-chip style="color: rgb(0, 255, 26)" v-if="isVerified">
            Terbuka
          </v-chip>
          <v-chip style="color: rgb(255, 0, 0)" v-else> Tertutup </v-chip>
        </template>
        <template #item-created_at="item">
          <p>{{ formatDate(item.created_at) }}</p>
        </template>
        <template #item-nameDev="{ nameDev }">
          <p v-if="nameDev">{{ nameDev }}</p>
          <p v-else>-</p>
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper">
            <button>
              <VIcon
                size="20"
                icon="bx-edit"
                color="blue"
                @click="openModal(item)"
              />
            </button>
            &nbsp;
            <button>
              <VIcon size="20" icon="bx-trash" color="red"  @click="deleteDevice(item.id)"/>
            </button>
          </div>
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
      rules: {
        required: (value: any) => !!value || "Required",
      },
      username: null,
      dataForm: {
        id: null,
        nameDev: null,
        isVerified: null,
      },
      items: [],
      headers: [
        { text: "Nama Device", value: "nameDev", sortable: true },
        { text: "IP", value: "ip", sortable: true },
        { text: "Detail", value: "deviceName", sortable: true },
        { text: "Tanggal", value: "created_at", sortable: true },
        { text: "Akses", value: "isVerified", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      searchValue: "",
      insert: false,
      edit: false,
      userUuid: this.$route.params.userUuid,
    };
  },
  methods: {
    async deleteDevice(id) {
      try {
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus data?"
        );
        if (!confirmDelete) return;
        const response = await mainURL.delete(`/user-device/${id}`);

        if (response.status === 200) {
          this.$showToast("success", "Berhasil", response.data.data.message);
        } else {
            this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    async updateData() {
      try {
        const formData = new FormData();
        formData.append("id", this.dataForm.id);
        if (this.dataForm.nameDev != null) {
          formData.append("nameDev", this.dataForm.nameDev);
        }
        if (this.dataForm.isVerified != null) {
          formData.append("isVerified", this.dataForm.isVerified);
        }
        formData.append("_method", "POST");
        
        const response = await mainURL.post(`/user-device/`, formData);
        if (response.status === 200) {
          this.closeModal();
          this.getAllDevice(this.userUuid);
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    openModal(item = null) {
      this.dataForm.id = item.id;
      this.dataForm.nameDev = item.nameDev;
      this.dataForm.isVerified = parseInt(item.isVerified);
      this.edit = true;
    },
    resetForm() {
      this.dataForm = {
        id: null,
        nameDev: null,
        isVerified: null,
      };
    },
    closeModal() {
      this.resetForm();
      this.edit = false;
    },
    formatDate(dateString: string | number | Date) {
      const date = new Date(dateString);
      return date.toLocaleString("id-ID");
    },
    async getAllDevice(uuid) {
      try {
        const response = await mainURL.get(`/user-device/${uuid}`);

        if (response.status === 200) {
          this.username = response.data.data.name;
          this.items = response.data.data.devices;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
  },
  mounted() {
    this.getAllDevice(this.userUuid);
  },
};
</script>
