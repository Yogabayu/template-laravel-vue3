<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <router-link to="/a-file" class="back-link">
          <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
          Back
        </router-link>
        <VCardTitle class="text-2xl font-weight-bold">
          Daftar File Berdasarkan Divisi
        </VCardTitle>
      </VCardItem>
      <div class="d-flex justify-space-between mb-6">
        <v-btn
          color="primary"
          size="small"
          class="my-3 mx-3"
          @click="openModal"
        >
          Tambah Data
        </v-btn>

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
      <v-dialog v-model="insert" width="auto">
        <v-card>
          <template v-slot:title>Tambah Data</template>
          <template v-slot:text>
            <VForm @submit.prevent="insertData">
              <VRow>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Nama file"
                    label="Nama"
                    v-model="dataForm.name"
                    autofocus
                    :rules="[rules.required]"
                    prepend-icon="mdi-file"
                  />
                </VCol>

                <VCol cols="12" md="12">
                  <v-select
                    label="Pilih Divisi"
                    :items="divisions"
                    v-model="dataForm.divisions"
                    prepend-icon="mdi-file"
                    :rules="[rules.required]"
                    multiple
                    clearable
                  ></v-select>
                </VCol>

                <VCol cols="12" md="12">
                  <v-select
                    label="Pilih Posisi"
                    :items="positions"
                    v-model="dataForm.positions"
                    prepend-icon="mdi-file"
                    :rules="[rules.required]"
                    multiple
                    clearable
                  ></v-select>
                </VCol>

                <VCol cols="12" md="12">
                  <v-select
                    label="Pilih Categories"
                    :items="categories"
                    v-model="dataForm.categories"
                    prepend-icon="mdi-file"
                    :rules="[rules.required]"
                    multiple
                    clearable
                  ></v-select>
                </VCol>

                <VCol cols="12" md="12">
                  <v-textarea
                    counter
                    label="Deskripsi Singkat"
                    :rules="rulesTextArea"
                    v-model="dataForm.summary"
                    prepend-icon="mdi-comment"
                  ></v-textarea>
                </VCol>

                <VCol cols="12" md="6">
                  <v-file-input
                    accept="image/png, image/jpeg, image/webp"
                    placeholder="Pilih thumbnail"
                    prepend-icon="mdi-camera"
                    :rules="[rules.required]"
                    label="Thumbnail"
                    @change="handleThumbnailChange"
                  ></v-file-input>
                </VCol>

                <VCol cols="12" md="6">
                  <v-file-input
                    accept="application/pdf"
                    placeholder="Pilih File"
                    prepend-icon="mdi-file"
                    :rules="[rules.required]"
                    label="File"
                    @change="handlePathChange"
                  ></v-file-input>
                </VCol>

                <!-- 👉 Form Actions -->
                <VCol cols="12" class="d-flex flex-wrap justify-end gap-4">
                  <VBtn type="submit">Simpan</VBtn>

                  <button
                    type="button"
                    class="btn btn-blue"
                    @click="closeModal(1)"
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
        <template #item-files="item">
          <v-chip-group selected-class="text-primary" column>
            <div v-for="(x, index) in item.files" :key="index">
              <VChip style="color: rgb(6, 84, 107)"> {{ x.name }} </VChip>
            </div>
          </v-chip-group>
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper">
            <button>
              <VIcon size="20" icon="bx-menu" color="red" @click="toLink(item)"/>
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
      rulesTextArea: [
        (v: string | any[]) => v.length <= 255 || "Max 255 characters",
      ],
      dataForm: {
        id: null,
        name: null,
        thumbnail: null,
        path: null,
        summary: "",
        divisions: [],
        positions: [],
        categories: [],
      },
      divisions: [],
      positions: [],
      categories: [],
      items: [],
      headers: [
        { text: "Nama Divisi", value: "name", sortable: true },
        { text: "Total File", value: "files_count", sortable: true },
        { text: "File(s)", value: "files", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      searchValue: "",
      insert: false,
    };
  },
  methods: {
    toLink(item: any){
      this.$router.push(`/a-filedivisionid/${item.id}`)
    },
    async insertData() {
      try {
        for (let key in this.dataForm) {
          if (key !== "id") {
            if (this.dataForm[key] === null) {
              this.closeModal(1);
              this.$showToast("error", "Sorry", `Properti ${key} harus diisi.`);
            }
          }
        }
        const formData = new FormData();
        for (let key in this.dataForm) {
          if (
            key !== "id" &&
            key !== "divisions" &&
            key !== "positions" &&
            key !== "categories"
          ) {
            formData.append(key, this.dataForm[key]);
          }
        }
        this.dataForm.divisions.forEach((division: string | Blob) => {
          formData.append("divisions[]", division);
        });
        this.dataForm.positions.forEach((position: string | Blob) => {
          formData.append("positions[]", position);
        });
        this.dataForm.categories.forEach((category: string | Blob) => {
          formData.append("categories[]", category);
        });

        formData.append("_method", "POST");

        const response = await mainURL.post("/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          this.closeModal();
          this.getAllFilePerDivision();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    resetForm() {
      this.dataForm = {
        name: null,
        thumbnail: null,
        path: null,
        summary: null,
        divisions: null,
        positions: null,
        categories: null,
      };
    },
    async getCategories() {
      try {
        const response = await mainURL.get("/category");
        if (response.status === 200) {
          this.categories = response.data.data.map(
            (item: { id: any; name: any }) => ({
              value: item.id,
              title: item.name,
            })
          );
        } else {
          this.$showToast("error", "Sorry", "error get data division");
        }
      } catch (error) {
        this.$showToast("error", "Sorry", "error get data division");
      }
    },
    async getDivisions() {
      try {
        const response = await mainURL.get("/division");
        if (response.status === 200) {
          this.divisions = response.data.data.map(
            (item: { id: any; name: any }) => ({
              value: item.id,
              title: item.name,
            })
          );
        } else {
          this.$showToast("error", "Sorry", "error get data division");
        }
      } catch (error) {
        this.$showToast("error", "Sorry", "error get data division");
      }
    },
    async getPositions() {
      try {
        const response = await mainURL.get("/position");
        if (response.status === 200) {
          this.positions = response.data.data.map(
            (item: { id: any; name: any }) => ({
              value: item.id,
              title: item.name,
            })
          );
        } else {
          this.$showToast("error", "Sorry", "error get data position");
        }
      } catch (error) {
        this.$showToast("error", "Sorry", "error get data position");
      }
    },
    handlePathChange(event: { target: { files: any[]; value: null } }) {
      const selectedFile = event.target.files[0];
      const allowedTypes = ["application/pdf"];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        this.dataForm.path = selectedFile;
      } else {
        this.$showToast("error", "Error", "Hanya file PDF yang diizinkan.");
        event.target.value = null;
      }
    },
    handleThumbnailChange(event: { target: { files: any[]; value: null } }) {
      const selectedFile = event.target.files[0];
      const allowedTypes = ["image/jpeg", "image/png"];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        this.dataForm.thumbnail = selectedFile;
      } else {
        this.$showToast(
          "error",
          "Error",
          "Hanya file JPEG atau PNG yang diizinkan."
        );
        event.target.value = null;
      }
    },
    closeModal(type: number) {
      this.resetForm();
      this.insert = false;
    },
    openModal() {
      this.getDivisions();
      this.getPositions();
      this.getCategories();
      this.insert = true;
    },
    async getAllFilePerDivision() {
      try {
        const response = await mainURL.get("/fileperdivision");
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
    this.getAllFilePerDivision();
  },
};
</script>
