<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          User Profile
        </VCardTitle>
      </VCardItem>

      <div class="d-flex justify-space-between mb-6">
        <v-btn
          color="primary"
          size="small"
          class="my-3 mx-3"
          @click="openModal(1)"
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
          <template v-slot:title> Tambah Data </template>

          <template v-slot:text>
            <VForm @submit.prevent="insertData">
              <VRow>
                <!-- 👉 First Name -->
                <VCol md="6" cols="12">
                  <VTextField
                    placeholder="John"
                    label="Nama"
                    v-model="dataForm.name"
                    autofocus
                    :rules="[rules.required]"
                    prepend-icon="mdi-person"
                  />
                </VCol>

                <!-- 👉 Email -->
                <VCol cols="12" md="6">
                  <VTextField
                    label="E-mail"
                    placeholder="johndoe@gmail.com"
                    type="email"
                    prepend-icon="mdi-mail"
                    v-model="dataForm.email"
                    :rules="emailRules"
                  />
                </VCol>

                <!-- 👉 NIK -->
                <VCol cols="12" md="6">
                  <VTextField
                    label="NIK"
                    v-model="dataForm.nik"
                    type="number"
                    prepend-icon="mdi-passport"
                    :rules="[rules.required]"
                  />
                </VCol>

                <!-- 👉 Address -->
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="dataForm.password"
                    :rules="[rules.required]"
                    prepend-icon="mdi-lock"
                    label="Password"
                    placeholder="············"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="
                      isPasswordVisible ? 'bx-hide' : 'bx-show'
                    "
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                </VCol>

                <VCol cols="12" md="6">
                  <v-select
                    label="Jabatan"
                    :items="positions"
                    v-model="dataForm.position_id"
                    :rules="[rules.required]"
                    prepend-icon="mdi-divide"
                  ></v-select>
                </VCol>

                <VCol cols="12" md="6">
                  <v-select
                    label="Status Akun"
                    :items="[
                      { value: 1, title: 'Aktif' },
                      { value: 0, title: 'Non-aktif' },
                    ]"
                    v-model="dataForm.isActive"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol cols="12" md="6">
                  <v-select
                    label="Level Akun"
                    :items="[
                      { value: 1, title: 'Admin' },
                      { value: 0, title: 'User' },
                    ]"
                    v-model="dataForm.isAdmin"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>
                <VCol cols="12" md="6">
                  <v-select
                    label="Izin download?"
                    :items="[
                      { value: 1, title: 'Diizinkan' },
                      { value: 0, title: 'Dilarang' },
                    ]"
                    v-model="dataForm.canDownload"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>
                <VCol cols="12" md="6">
                  <v-select
                    label="Izin Print?"
                    :items="[
                      { value: 1, title: 'Diizinkan' },
                      { value: 0, title: 'Dilarang' },
                    ]"
                    v-model="dataForm.canPrint"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>
                <VCol cols="12" md="6">
                  <v-select
                    label="Izin Comment?"
                    :items="[
                      { value: 1, title: 'Diizinkan' },
                      { value: 0, title: 'Dilarang' },
                    ]"
                    v-model="dataForm.canComment"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <!-- 👉 photo -->
                <VCol cols="12" md="6">
                  <v-file-input
                    accept="image/png, image/jpeg, image/webp"
                    placeholder="Pick an photo"
                    prepend-icon="mdi-camera"
                    :rules="[rules.required]"
                    label="Photo"
                    @change="handlePhotoChange"
                  ></v-file-input>
                </VCol>

                <!-- 👉 Form Actions -->
                <VCol cols="12" class="d-flex flex-wrap gap-4">
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
          <template v-slot:title> Update Data </template>

          <template v-slot:text>
            <VForm class="mt-6" @submit.prevent="updateData">
              <VRow>
                <!-- 👉 First Name -->
                <VCol md="6" cols="12">
                  <VTextField
                    placeholder="John"
                    label="Nama"
                    v-model="dataForm.name"
                    autofocus
                    prepend-icon="mdi-person"
                  />
                </VCol>

                <!-- 👉 Email -->
                <VCol cols="12" md="6">
                  <VTextField
                    label="E-mail"
                    placeholder="johndoe@gmail.com"
                    type="email"
                    prepend-icon="mdi-mail"
                    v-model="dataForm.email"
                    :rules="emailRules"
                  />
                </VCol>

                <!-- 👉 NIK -->
                <VCol cols="12" md="6">
                  <VTextField
                    label="NIK"
                    v-model="dataForm.nik"
                    type="number"
                    prepend-icon="mdi-passport"
                  />
                </VCol>

                <!-- 👉 Address -->
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="dataForm.password"
                    prepend-icon="mdi-lock"
                    label="Password"
                    placeholder="············"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="
                      isPasswordVisible ? 'bx-hide' : 'bx-show'
                    "
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                </VCol>

                <VCol cols="12" md="6">
                  <v-select
                    label="Jabatan"
                    :items="positions"
                    v-model="dataForm.position_id"
                    prepend-icon="mdi-divide"
                  ></v-select>
                </VCol>

                <VCol cols="12" md="6">
                  <v-select
                    label="Status Akun"
                    :items="[
                      { value: 1, title: 'Aktif' },
                      { value: 0, title: 'Non-aktif' },
                    ]"
                    v-model="dataForm.isActive"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <VCol cols="12" md="6">
                  <v-select
                    label="Level Akun"
                    :items="[
                      { value: 1, title: 'Admin' },
                      { value: 0, title: 'User' },
                    ]"
                    v-model="dataForm.isAdmin"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>
                <VCol cols="12" md="6">
                  <v-select
                    label="Izin download?"
                    :items="[
                      { value: 1, title: 'Diizinkan' },
                      { value: 0, title: 'Dilarang' },
                    ]"
                    v-model="dataForm.canDownload"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>
                <VCol cols="12" md="6">
                  <v-select
                    label="Izin Print?"
                    :items="[
                      { value: 1, title: 'Diizinkan' },
                      { value: 0, title: 'Dilarang' },
                    ]"
                    v-model="dataForm.canPrint"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>
                <VCol cols="12" md="6">
                  <v-select
                    label="Izin Comment?"
                    :items="[
                      { value: 1, title: 'Diizinkan' },
                      { value: 0, title: 'Dilarang' },
                    ]"
                    v-model="dataForm.canComment"
                    prepend-icon="mdi-help-rhombus"
                  ></v-select>
                </VCol>

                <!-- 👉 photo -->
                <VCol cols="12" md="6">
                  <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an photo"
                    prepend-icon="mdi-camera"
                    :rules="[rules.required]"
                    label="Photo"
                    @change="handlePhotoChange"
                  ></v-file-input>
                </VCol>

                <!-- 👉 Form Actions -->
                <VCol cols="12" class="d-flex flex-wrap gap-4">
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
        :headers="headers"
        :items="items"
        :search-field="searchField"
        :search-value="searchValue"
        show-index
      >
        <template #empty-message>
          <p>Data User Kosong</p>
        </template>
        <template #loading>
          <p>loading data .....</p>
        </template>
        <template #item-photo="{ photo, name }">
          <div class="player-wrapper">
            <img
              class="avator"
              :src="photoUrl + photo"
              :alt="name"
              :width="60"
            />
          </div>
        </template>
        <template #item-position="{ position }">
          <div>
            <p>{{ position.name }}</p>
          </div>
        </template>
        <template #item-division="{ division }">
          <div>
            <p>{{ division.name }}</p>
          </div>
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper">
            <v-tooltip location="top" text="Reset Password">
              <template v-slot:activator="{ props }">
                <button v-bind="props">
                  <VIcon
                    size="20"
                    icon="bx-reset"
                    color="#6c42f5"
                    @click="resetPassword(item)"
                  />
                </button>
              </template>
            </v-tooltip>
            &nbsp;
            <v-tooltip location="top" text="Lihat Device User">
              <template v-slot:activator="{ props }">
                <button v-bind="props">
                  <VIcon
                    size="20"
                    icon="bx-devices"
                    color="blue"
                    @click="toUserDevice(item)"
                  />
                </button>
              </template>
            </v-tooltip>
            &nbsp;
            <v-tooltip location="top" text="Edit User">
              <template v-slot:activator="{ props }">
                <button v-bind="props">
                  <VIcon
                    size="20"
                    icon="bx-edit"
                    color="#adad82"
                    @click="openModal(2, item)"
                  />
                </button>
              </template>
            </v-tooltip>
            &nbsp;

            <v-tooltip location="top" text="Hapus User">
              <template v-slot:activator="{ props }">
                <button v-bind="props">
                  <VIcon
                    size="20"
                    icon="bx-trash"
                    color="#f33"
                    @click="deleteUser(item)"
                  />
                </button>
              </template>
            </v-tooltip>
          </div>
        </template>
      </EasyDataTable>
    </VCard>
  </div>
</template>

<script lang="ts">
import mainURL from "@/axios";
import { defineComponent } from "vue";

export default defineComponent({
  watch: {
    "dataForm.email": function (mail) {
      // e_Mail is the exact name used in v-model
      if (mail !== "") {
        this.emailRules = [
          (v: string) =>
            v.match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) || "Invalid Email address",
        ];
      } else if (mail === "") {
        this.emailRules = [];
      }
    },
  },
  data() {
    return {
      emailRules: [],
      rules: {
        required: (value: any) => !!value || "Required",
      },
      photoUrl: this.$userPhotoUrl,
      dataForm: {
        name: "",
        email: "",
        password: null,
        nik: null,
        uuid: null,
        photo: null,
        position_id: null,
        isActive: 1,
        isAdmin: 0,
        canDownload: null,
        canPrint: null,
        canComment: null,
      },
      items: [],
      headers: [
        { text: "Nama", value: "name", sortable: true },
        { text: "Photo", value: "photo", sortable: true },
        { text: "NIK", value: "nik", sortable: true },
        { text: "Email", value: "email", sortable: true },
        { text: "Posisi", value: "position", sortable: false },
        { text: "Operation", value: "operation" },
      ],
      positions: [],
      searchValue: "",
      searchField: ["name", "nik", "email", "posision.name"],
      insert: false,
      btnInsert: true,
      isPasswordVisible: false,
      edit: false,
    };
  },
  methods: {
    toUserDevice(item: any) {
      this.$router.push(`/a-deviceuser/${item.uuid}`);
    },
    async insertData() {
      try {
        for (let key in this.dataForm) {
          if (key !== "uuid") {
            if (this.dataForm[key] === null) {
              this.closeModal(1);
              this.$showToast("error", "Sorry", `Properti ${key} harus diisi.`);
            }
          }
        }
        const formData = new FormData();
        for (let key in this.dataForm) {
          if (key !== "uuid") {
            formData.append(key, this.dataForm[key]);
          }
        }
        formData.append("_method", "POST");

        const response = await mainURL.post("/user-add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          this.closeModal(1);
          this.getAllUser();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async updateData() {
      try {
        const formData = new FormData();
        for (let key in this.dataForm) {
          if (this.dataForm[key] !== null) {
            formData.append(key, this.dataForm[key]);
          }
        }
        formData.append("_method", "PUT");

        const response = await mainURL.post("/updateUserProfile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          this.closeModal(2);
          this.getAllUser();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    openModal(type: number, item = null) {
      if (type === 1) {
        this.insert = true;
        this.getPositions();
      } else if (type === 2) {
        if (item) {
          this.resetForm();
          this.getPositions();
          this.dataForm.name = item.name;
          this.dataForm.email = item.email;
          this.dataForm.nik = item.nik;
          this.dataForm.uuid = item.uuid;
          this.dataForm.position_id = item.position_id;
          this.dataForm.isActive = item.isActive;
          this.dataForm.isAdmin = item.isAdmin;
          this.dataForm.canDownload = item.canDownload;
          this.dataForm.canPrint = item.canPrint;
          this.dataForm.canComment = item.canComment;
          this.edit = true;
        }
      }
    },
    handlePhotoChange(event: { target: { files: any[]; value: null } }) {
      const selectedFile = event.target.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        this.dataForm.photo = selectedFile;
      } else {
        this.$showToast(
          "error",
          "Error",
          "Hanya file JPEG atau PNG yang diizinkan."
        );
        event.target.value = null;
      }
    },
    resetForm() {
      this.dataForm = {
        name: "",
        email: "",
        password: null,
        nik: null,
        uuid: null,
        photo: null,
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
    async deleteUser(item: { uuid: any }) {
      try {
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus pengguna?"
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/user-delete/${item.uuid}`);

        if (response.status === 200) {
          this.getAllUser();
          this.$showToast("success", "Berhasil", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async getAllUser() {
      try {
        const response = await mainURL.get("/all-user");

        if (response.status === 200) {
          this.items = response.data.data;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async resetPassword(item: any){
      try {
        const response = await mainURL.get(`/reset-password/${item.uuid}`);

        if (response.status === 200) {
          this.$showToast("success", "Berhasil", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    }
  },
  mounted() {
    this.getAllUser();
  },
});
</script>
