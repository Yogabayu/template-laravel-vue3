<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <span color="primary" @click="goBack" style="cursor: pointer">
          <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
          Back
        </span>
        <VCardTitle class="text-2xl font-weight-bold">
          Detail {{ detail.name ?? "-" }}
        </VCardTitle>

        <v-divider inset></v-divider>

        <v-table>
          <tbody>
            <tr>
              <td>Nama File</td>
              <td>:</td>
              <td>{{ detail.name }}</td>
            </tr>
            <tr>
              <td>Deskripsi Singkat</td>
              <td>:</td>
              <td>{{ detail.summary }}</td>
            </tr>
            <tr v-if="detail.author">
              <td>Pengunggah</td>
              <td>:</td>
              <td>
                <div class="row d-flex align-center">
                  <div class="player-wrapper" v-if="detail.author.photo">
                    <img
                      class="avator"
                      :src="fileUser + detail.author.photo"
                      :alt="detail.name"
                      :width="60"
                    />
                  </div>
                  <span v-if="detail.author.name">{{
                    detail.author.name
                  }}</span>
                </div>
              </td>
            </tr>
            <tr v-if="detail.positions">
              <td>Jabatan</td>
              <td>:</td>
              <td>
                <div class="row d-flex align-center">
                  <v-chip-group selected-class="text-primary" column>
                    <div v-for="(x, index) in detail.positions" :key="index">
                      <VChip style="color: rgb(6, 84, 107)">
                        {{ x.name }}
                      </VChip>
                    </div>
                  </v-chip-group>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>

        <div>
          <iframe
            width="100%"
            height="500px"
            :src="filePath + detail.path"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>

        <v-spacer />

        <div class="mt-3">
          <v-card class="mx-auto">
            <v-card-title> Komentar </v-card-title>
            <v-card-title>
              <VForm @submit.prevent="insertCommentar">
                <v-row align="center" justify="center">
                  <VCol md="10" cols="10">
                    <v-textarea
                      bg-color="grey-lighten-2"
                      color="cyan"
                      v-model="dataForm.desc"
                    ></v-textarea>
                  </VCol>
                  <VCol md="2" cols="2">
                    <v-btn
                      density="compact"
                      icon="mdi-note-plus"
                      type="submit"
                    ></v-btn>
                  </VCol>
                </v-row>
              </VForm>
            </v-card-title>

            <v-spacer />
            <v-card-text>
              <div>
                <div>
                  <div
                    v-for="(comment, index) in comments"
                    :key="index"
                    :class="{
                      'admin-comment': comment.user_type == 1,
                      'user-comment': comment.user_type == 0,
                    }"
                  >
                    <div class="comment-content">
                      <p>" {{ comment.content }} "</p>
                      <v-row class="justify-space-between mx-2 mb-2">
                        <small
                          >{{ comment.name }} - {{ comment.position }}</small
                        >
                        <small>{{ formatDate(comment.created_at) }}</small>
                      </v-row>
                    </div>

                    <v-menu transition="scale-transition">
                      <template v-slot:activator="{ props }">
                        <v-icon v-bind="props" class="ellipsis-icon"
                          >mdi-dots-vertical</v-icon
                        >
                      </template>

                      <v-list>
                        <v-list-item
                          color="primary"
                          @click="popupEdit(comment)"
                        >
                          <template v-slot:prepend>
                            <v-icon icon="mdi-edit"></v-icon>
                          </template>

                          <v-list-item-title> edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          color="primary"
                          @click="deleteComment(comment.id)"
                        >
                          <template v-slot:prepend>
                            <v-icon icon="mdi-trash"></v-icon>
                          </template>

                          <v-list-item-title> hapus</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-dialog v-model="edit" width="auto">
              <v-card>
                <template v-slot:title> Update comment </template>
                <template v-slot:text>
                  <VForm @submit.prevent="updateComment">
                    <v-row align="center" justify="center">
                      <VCol md="10" cols="10">
                        <v-textarea
                          bg-color="grey-lighten-2"
                          color="cyan"
                          v-model="dataForm.descupdate"
                        ></v-textarea>
                      </VCol>
                      <VCol md="2" cols="2">
                        <v-btn
                          density="compact"
                          icon="mdi-note-plus"
                          type="submit"
                        ></v-btn>
                      </VCol>
                    </v-row>
                  </VForm>
                </template>
              </v-card>
            </v-dialog>
          </v-card>
        </div>
      </VCardItem>
    </VCard>
  </div>
</template>

<script>
import mainURL from "@/axios";

export default {
  data() {
    return {
      detail: {},
      fileId: this.$route.params.fileId,
      fileUser: this.$userPhotoUrl,
      filePath: this.$filePath,
      comments: null,
      dataForm: {
        id: null,
        file_uuid: this.$route.params.fileId,
        desc: null,
        descupdate: null,
      },
      edit: false,
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
    async getDetailFile(id) {
      try {
        const response = await mainURL.get(`/file/${id}`);
        if (response.status === 200) {
          this.detail = response.data.data;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.data.message);
      }
    },

    resetForm() {
      this.dataForm = {
        id: null,
        file_uuid: this.$route.params.fileId,
        desc: null,
        descupdate: null,
      };
    },

    async getCommentFile(id) {
      try {
        const response = await mainURL.get(`/comment/${id}`);
        this.comments = response.data.data.map((comment) => ({
          id: comment.uuid,
          content: comment.desc,
          user_type: comment.user.isAdmin,
          name: comment.user.name,
          position: comment.user.position.name,
          created_at: comment.created_at,
        }));
      } catch (error) {
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Gagal login. Silakan coba lagi.";
        this.$showToast("error", "Sorry", errorMessage);
      }
    },
    async insertCommentar() {
      try {
        if (this.dataForm.desc === null) {
          this.$showToast("error", "Sorry", `komentar kosong`);
        }

        const formData = new FormData();
        formData.append("file_uuid", this.dataForm.file_uuid);
        formData.append("desc", this.dataForm.desc);
        formData.append("_method", "POST");

        const response = await mainURL.post("/comment", formData);
        if (response.status === 200) {
          this.resetForm();
          this.getCommentFile(this.fileId);
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async deleteComment(id) {
      try {
        const confirmDelete = window.confirm(
          "Apakah Anda yakin ingin menghapus comment?"
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/comment/${id}`);

        if (response.status === 200) {
          this.getCommentFile(this.fileId);
          this.$showToast("success", "Berhasil", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    popupEdit(comment) {
      this.dataForm.id = comment.id;
      this.dataForm.descupdate = comment.content;
      this.edit = true;
    },
    async updateComment() {
      try {
        const formData = new FormData();
        formData.append("desc", this.dataForm.descupdate);
        formData.append("_method", "PUT");

        const response = await mainURL.post(
          `/comment/${this.dataForm.id}`,
          formData
        );
        if (response.status === 200) {
          this.resetForm();
          this.getCommentFile(this.fileId);
          this.edit = false;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
  },
  mounted() {
    this.getDetailFile(this.fileId);
    this.getCommentFile(this.fileId);
  },
};
</script>

<style scoped>
.admin-comment {
  background-color: #f2f2f2;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  position: relative;
}

.user-comment {
  background-color: #e6f7ff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  position: relative;
}

.ellipsis-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}

.comment-content {
  position: relative;
}
</style>
