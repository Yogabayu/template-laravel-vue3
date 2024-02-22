<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          Daftar Semua File
        </VCardTitle>
      </VCardItem>

      <div class="d-flex justify-space-between mb-6">
        <div class="row">
          <v-btn
            color="primary"
            size="small"
            class="my-3 mx-3"
            @click="openModal(1)"
          >
            Tambah Data
          </v-btn>
          <v-btn
            color="primary"
            size="small"
            class="my-3 mx-3"
            @click="toLink('a-filedivision')"
          >
            Filter: Divisi
          </v-btn>
        </div>
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

      <v-dialog v-model="edit" width="auto">
        <v-card>
          <template v-slot:title>Update Data</template>
          <template v-slot:text>
            <VForm @submit.prevent="updateData">
              <VRow>
                <VCol md="12" cols="12">
                  <VTextField
                    placeholder="Nama file"
                    label="Nama"
                    v-model="dataForm.name"
                    autofocus
                    prepend-icon="mdi-file"
                  />
                </VCol>

                <VCol cols="12" md="12">
                  <v-select
                    label="Pilih Divisi"
                    :items="divisions"
                    v-model="dataForm.divisions"
                    prepend-icon="mdi-file"
                    multiple
                    clearable
                  ></v-select>

                  <div v-if="selectedDivisions !== null">
                    <p>Divisi saat ini:</p>
                    <v-chip-group selected-class="text-primary" column>
                      <div v-for="(x, index) in selectedDivisions" :key="index">
                        <v-chip> {{ x.title }} </v-chip>
                      </div>
                    </v-chip-group>
                  </div>
                </VCol>

                <VCol cols="12" md="12">
                  <v-select
                    label="Pilih Posisi"
                    :items="positions"
                    v-model="dataForm.positions"
                    prepend-icon="mdi-file"
                    multiple
                    clearable
                  ></v-select>

                  <div v-if="selectedPositions !== null">
                    <p>Posisi saat ini:</p>
                    <v-chip-group selected-class="text-primary" column>
                      <div v-for="(x, index) in selectedPositions" :key="index">
                        <v-chip> {{ x.title }} </v-chip>
                      </div>
                    </v-chip-group>
                  </div>
                </VCol>

                <VCol cols="12" md="12">
                  <v-select
                    label="Pilih Categories"
                    :items="categories"
                    v-model="dataForm.categories"
                    prepend-icon="mdi-file"
                    multiple
                    clearable
                  ></v-select>

                  <div v-if="selectedCategories !== null">
                    <p>Kategori saat ini:</p>
                    <v-chip-group selected-class="text-primary" column>
                      <div
                        v-for="(x, index) in selectedCategories"
                        :key="index"
                      >
                        <v-chip> {{ x.title }} </v-chip>
                      </div>
                    </v-chip-group>
                  </div>
                </VCol>

                <VCol cols="12" md="12">
                  <v-textarea
                    counter
                    label="Deskripsi Singkat"
                    v-model="dataForm.summary"
                    prepend-icon="mdi-comment"
                  ></v-textarea>
                </VCol>

                <VCol cols="12" md="6">
                  <v-file-input
                    accept="image/png, image/jpeg, image/webp"
                    placeholder="Pilih thumbnail"
                    prepend-icon="mdi-camera"
                    label="Thumbnail"
                    @change="handleThumbnailChange"
                  ></v-file-input>
                </VCol>

                <VCol cols="12" md="6">
                  <v-file-input
                    accept="application/pdf"
                    placeholder="Pilih File"
                    prepend-icon="mdi-file"
                    label="File"
                    @change="handlePathChange"
                  ></v-file-input>
                </VCol>

                <!-- 👉 Form Actions -->
                <VCol cols="12" class="d-flex flex-wrap justify-end gap-4">
                  <VBtn type="submit">Update</VBtn>

                  <button
                    type="button"
                    class="btn btn-blue"
                    @click="closeModal(2)"
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
          <p>Data file Kosong</p>
        </template>
        <template #loading>
          <p>loading data .....</p>
        </template>
        <template #item-thumbnail="item">
          <div class="player-wrapper">
            <img
              class="avator"
              :src="fileThumbnail + item.thumbnail"
              :alt="item.name"
              :width="60"
            />
          </div>
        </template>
        <template #item-divisions="item">
          <v-chip-group selected-class="text-primary" column>
            <div v-for="(x, index) in item.divisions" :key="index">
              <v-chip style="color: blue" @click="toPerLink(x)"> {{ x.name }} </v-chip>
            </div>
          </v-chip-group>
        </template>
        <template #item-positions="item">
          <v-chip-group selected-class="text-primary" column>
            <div v-for="(x, index) in item.positions" :key="index">
              <VChip style="color: rgb(6, 84, 107)" @click="testClick(x.id)">
                {{ x.name }}
              </VChip>
            </div>
          </v-chip-group>
        </template>
        <template #item-created_at="item">
          <p>{{ formatDate(item.created_at) }}</p>
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
        <template #item-operation="item">
          <div class="d-flex justify-space-between">
            <button>
              <VIcon
                size="20"
                icon="bx-edit"
                color="blue"
                @click="openModal(2, item)"
              />
            </button>
            <button>
              <VIcon
                size="20"
                icon="bx-trash"
                color="red"
                @click="deleteFile(item)"
              />
            </button>
            <button>
              <VIcon
                size="20"
                icon="bx-menu"
                color="red"
                @click="toDetailFileLink(item)"
              />
            </button>
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
      insert: false,
      edit: false,
      fileThumbnail: this.$fileThumbnail,
      filePath: this.$filePath,
      rules: {
        required: (value: any) => !!value || "Required",
      },
      rulesTextArea: [
        (v: string | any[]) => v.length <= 255 || "Max 255 characters",
      ],
      items: [],
      headers: [
        { text: "Pengunggah", value: "author.name", sortable: true },
        { text: "File Name", value: "name", sortable: true },
        { text: "Thumbnail", value: "thumbnail", sortable: true },
        { text: "Divisi", value: "divisions", sortable: true },
        { text: "Posisi", value: "positions", sortable: true },
        { text: "Kategori", value: "categories", sortable: true },
        { text: "File", value: "path", sortable: true },
        { text: "Tanggal Diupload", value: "created_at", sortable: true },
        { text: "Operation    ", value: "operation" },
      ],
      searchValue: "",
      searchField: [
        "name",
        "author.name",
        "email",
        "thumbnail",
        "divisions",
        "positions",
        "categories",
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
      selectedDivisions: [],
      selectedPositions: [],
      selectedCategories: [],
      filter: [
        { value: 1, title: "divisi" },
        { value: 2, title: "posisi" },
      ],
      selectedFilter: null,
    };
  },
  methods: {
    toPerLink(item: any){
      this.$router.push(`/a-filedivisionid/${item.id}`)
    },
    toDetailFileLink(item: any) {
      this.$router.push(`/a-filedivisioniddetail/${item.id}`);
    },
    toLink(link: string) {
      this.$router.push(`/${link}`);
    },
    testClick(id: any) {
      console.log(id);
    },
    async updateData() {
      try {
        const formData = new FormData();

        formData.append("id", this.dataForm.id);
        formData.append("name", this.dataForm.name);
        formData.append("summary", this.dataForm.summary);
        if (this.dataForm.thumbnail !== null) {
          formData.append("thumbnail", this.dataForm.thumbnail);
        }
        if (this.dataForm.path !== null) {
          formData.append("path", this.dataForm.path);
        }

        if (this.dataForm.divisions !== null) {
          this.dataForm.divisions.forEach((division: string | Blob) => {
            formData.append("divisions[]", division);
          });
        }
        if (this.dataForm.positions !== null) {
          this.dataForm.positions.forEach((position: string | Blob) => {
            formData.append("positions[]", position);
          });
        }
        if (this.dataForm.categories !== null) {
          this.dataForm.categories.forEach((category: string | Blob) => {
            formData.append("categories[]", category);
          });
        }

        formData.append("_method", "PUT");

        const response = await mainURL.post(
          `/file/${this.dataForm.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          this.closeModal(2);
          this.getAllFiles();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.closeModal(2);
          this.getAllFiles();
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.closeModal(2);
        this.getAllFiles();
        this.$showToast("error", "Sorry", "error get data division");
      }
    },
    async deleteFile(item: { id: any }) {
      try {
        const confirmDelete = window.confirm(
          "Semua Data yang terkait akan ikut terhapus. Apakah Anda yakin ingin menghapus data?"
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/file/${item.id}`);

        if (response.status === 200) {
          this.getAllFiles();
          this.$showToast("success", "Berhasil", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
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
          this.closeModal(1);
          this.getAllFiles();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
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
    formatDate(dateString: string | number | Date) {
      const date = new Date(dateString);
      return date.toLocaleString("id-ID");
    },
    async getAllFiles() {
      try {
        const response = await mainURL.get("/file");
        if (response.status === 200) {
          this.items = response.data.data;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.data.message);
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
    closeModal(type: number) {
      if (type === 1) {
        this.resetForm();
        this.insert = false;
      } else if (type === 2) {
        this.resetForm();
        this.edit = false;
      }
    },
    openModal(type: number, item = null) {
      if (type === 1) {
        this.insert = true;
        this.getDivisions();
        this.getPositions();
        this.getCategories();
      } else if (type === 2) {
        if (item) {
          this.getDivisions();
          this.getPositions();
          this.getCategories();
          this.dataForm.id = item.id;
          this.dataForm.name = item.name;
          this.dataForm.summary = item.summary;
          this.selectedDivisions = item.divisions.map(
            (item: { id: any; name: any }) => ({
              value: item.id,
              title: item.name,
            })
          );
          this.selectedPositions = item.positions.map(
            (item: { id: any; name: any }) => ({
              value: item.id,
              title: item.name,
            })
          );
          this.selectedCategories = item.categories.map(
            (item: { id: any; name: any }) => ({
              value: item.id,
              title: item.name,
            })
          );
          this.edit = true;
        }
      }
    },
  },
  mounted() {
    this.getAllFiles();
  },
};
</script>
