<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <router-link to="/a-file" class="back-link">
          <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
          Back
        </router-link>
        <VCardTitle class="text-2xl font-weight-bold">
          Daftar File Berdasarkan Posisi : {{ positionProfile.name ?? "-" }}
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
                    label="Pilih Kategori"
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
                    accept="application/pdf"
                    placeholder="Pilih File"
                    prepend-icon="mdi-file"
                    :rules="[rules.required]"
                    label="File"
                    @change="handlePathChange"
                  ></v-file-input>
                </VCol>
                <v-divider :thickness="5"></v-divider>
                <v-row>
                  <v-col cols="6">
                    <v-card>
                      <template v-slot:title> Pilih Jabatan : </template>

                      <template v-slot:text>
                        <v-row>
                          <v-col
                            v-for="(item, index) in positions"
                            :key="index"
                            cols="4"
                          >
                            <v-checkbox
                              v-model="item.checked"
                              :label="item.title"
                              :value="item.value"
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </template>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card>
                      <template v-slot:title> Jabatan yang dipilih : </template>
                      <template v-slot:text>
                        <v-row>
                          <v-col
                            v-for="(item, index) in selectedPositions"
                            :key="index"
                            cols="6"
                          >
                            <v-list-item>
                              <template v-slot:prepend>
                                <v-icon icon="mdi-check"></v-icon>
                              </template>
                              <v-list-item-title
                                v-text="item.title"
                              ></v-list-item-title>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </template>
                    </v-card>
                  </v-col>
                </v-row>

                <!-- 👉 Form Actions -->
                <VCol cols="12" class="d-flex flex-wrap justify-end gap-4">
                  <VBtn type="submit">Simpan</VBtn>

                  <button
                    type="button"
                    class="btn btn-blue"
                    @click="closeModal()"
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
          <p>Data File Jabatan Kosong</p>
        </template>
        <template #loading>
          <p>loading data .....</p>
        </template>
        <template #item-file.path="item">
          <a
            :href="filePath + item.file.path"
            target="_blank"
            rel="noopener noreferrer"
            style="cursor: pointer !important"
          >
            <v-chip color="primary">
              <v-icon start icon="mdi-file"></v-icon> lihat
            </v-chip>
          </a>
        </template>
        <template #item-file.categories="item">
          <v-chip-group selected-class="text-primary" column>
            <div v-for="(x, index) in item.file.categories" :key="index">
              <v-chip style="color: rgb(255, 153, 0)"> {{ x.name }} </v-chip>
            </div>
          </v-chip-group>
        </template>
        <template #item-file.created_at="item">
          <p>{{ formatDate(item.file.created_at) }}</p>
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper">
            <div class="d-flex justify-space-between">
              <v-tooltip location="top" text="Lihat Detail File">
                <template v-slot:activator="{ props }">
                  <button v-bind="props">
                    <VIcon
                      size="20"
                      icon="bx-file-find"
                      color="red"
                      @click="toDetailFile(item)"
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
<script lang="ts">
import mainURL from "@/axios";
export default {
  watch: {
    positions: {
      handler(newVal) {
        this.selectedPositions = newVal
          .filter((item: { checked: any }) => item.checked)
          .map(({ title, value }) => ({ title, value }));
      },
      deep: true,
    },
  },
  data() {
    return {
      positionId: this.$route.params.posId,
      positionProfile: {
        name: null,
      },
      filePath: this.$filePath,
      rules: {
        required: (value: any) => !!value || "Required",
      },
      rulesTextArea: [
        (v: string | any[]) => v.length <= 2048 || "Max 2048 characters",
      ],
      dataForm: {
        id: null,
        name: null,
        path: null,
        summary: "",
        positions: [],
        categories: [],
      },
      positions: [],
      categories: [],
      items: [],
      headers: [
        { text: "Pengunggah", value: "file.author.name", sortable: true },
        { text: "Nama File", value: "file.name", sortable: true },
        { text: "Kategori", value: "file.categories", sortable: true },
        { text: "File", value: "file.path", sortable: true },
        { text: "Tanggal Diupload", value: "file.created_at", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      searchValue: "",
      insert: false,
      selectedPositions: [],
      selectedCategories: [],
    };
  },
  methods: {
    formatDate(dateString: string | number | Date) {
      const date = new Date(dateString);
      return date.toLocaleString("id-ID");
    },
    toLink(item: any) {
      this.$router.push(`/a-filedetail/${item.files[0].id}`);
    },
    toDetailFile(item: any) {
      this.$router.push(`/a-filedetail/${item.file.id}`);
    },
    async insertData() {
      try {
        for (let key in this.dataForm) {
          if (key !== "id") {
            if (this.dataForm[key] === null) {
              this.closeModal();
              this.$showToast("error", "Sorry", `Properti ${key} harus diisi.`);
            }
          }
        }
        const formData = new FormData();
        for (let key in this.dataForm) {
          if (key !== "id" && key !== "positions" && key !== "categories") {
            formData.append(key, this.dataForm[key]);
          }
        }
        this.dataForm.positions = this.selectedPositions.map(
          (item: { value: any }) => item.value
        );

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
          this.getAllFilePerPosition(this.positionId);
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
      this.selectedPositions = [];
      this.selectedCategories =  [];
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
          this.$showToast("error", "Sorry", "error get data category");
        }
      } catch (error) {
        this.$showToast("error", "Sorry", "error get data category");
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
    closeModal() {
      this.resetForm();
      this.insert = false;
    },
    openModal() {
      this.getPositions();
      this.getCategories();
      this.insert = true;
    },
    async getAllFilePerPosition(id: any) {
      try {
        const response = await mainURL.get(`/fileperpositionid/${id}`);
        if (response.status === 200) {
          this.items = response.data.data.file;
          this.positionProfile = response.data.data.position;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
  },
  mounted() {
    this.getAllFilePerPosition(this.positionId);
  },
};
</script>
