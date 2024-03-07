<template>
  <v-card class="mx-auto">
    <v-img
      src="https://bankarthaya.com/wp-content/uploads/2023/07/desktop-1024x576-1.jpg"
      height="100px"
      cover
    ></v-img>

    <v-card-title>
      <v-spacer />
      <div class="text-center">
        <v-row class="d-flex align-center justify-center">
            <h3 class="overflow-auto">
              {{ detail.name ?? "-" }}
            </h3>
          <v-btn
            v-if="fav == true"
            class="ma-2"
            variant="text"
            icon="mdi-heart"
            color="blue-lighten-2"
            @click="favorite"
          ></v-btn>
          <v-btn
            v-else
            class="ma-2"
            variant="text"
            icon="mdi-heart-outline"
            color="blue-lighten-2"
            @click="favorite"
          ></v-btn>
        </v-row>
      </div>
      <v-spacer />
    </v-card-title>

    <v-card-subtitle>
      <v-row>
        <v-col>
          Di upload oleh:
          <v-chip>{{ detail.author?.name ? detail.author.name : "-" }}</v-chip>
        </v-col>
        <v-col>
          Kategori :
          <v-chip v-for="(x, index) in categories" :key="index" class="mx-3">{{
            x.name
          }}</v-chip>
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-card-text>
      <div class="">
        <div v-if="userData && userData.canDownload == 1">
          <vue-pdf-embed :source="pdfUrl" loaded scale="2" />
          <div class="d-flex justify-center">
            <v-btn
              class="ma-2"
              variant="text"
              append-icon="mdi-download"
              color="blue-lighten-2"
              :href="pdfUrl"
            >
              Download</v-btn
            >
          </div>
        </div>
        <div v-else>
          <vue-pdf-embed :source="pdfUrl" loaded scale="2" />
        </div>
      </div>

      <v-spacer />

      <h4 class="my-2">Ringkasan</h4>
      <span>
        {{ detail.summary }}
      </span>

      <v-spacer />

      <div class="mt-3">
        <v-card class="mx-auto">
          <v-card-title> Komentar </v-card-title>
          <v-card-title v-if="userData && userData.canComment == 1">
            <VForm @submit.prevent="insertData">
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
          <v-card-text>
            <div>
              <!-- <CommentList :comments="comments" /> -->
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
                    <p>{{ comment.content }}</p>
                    <v-row class="justify-space-between mx-2 mb-2">
                      <small>{{ comment.name }} - {{ comment.position }}</small>
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
                      <v-list-item color="primary" @click="popupEdit(comment)">
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
        </v-card>
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
</template>

<script>
import mainURL from "@/axios";
import VuePdfEmbed from "vue-pdf-embed";

export default {
  components: {
    VuePdfEmbed,
  },
  data() {
    return {
      idFile: this.$route.params.fileId,
      fileUser: this.$userPhotoUrl,
      filePath: this.$filePath,
      pdfUrl: "",
      detail: {},
      userData: null,
      categories: null,
      comments: null,
      dataForm: {
        id: null,
        file_uuid: this.$route.params.fileId,
        desc: null,
        descupdate: null,
      },

      edit: false,
      fav: true,
    };
  },
  methods: {
    popupEdit(comment) {
      this.dataForm.id = comment.id;
      this.dataForm.descupdate = comment.content;
      this.edit = true;
    },
    async favorite() {
      try {
        const response = await mainURL.get(`/user/setfavfile/${this.idFile}`);
        if (response.status === 200) {
          this.getDetail(this.idFile);
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.getDetail(this.idFile);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async updateComment() {
      try {
        const formData = new FormData();
        formData.append("desc", this.dataForm.descupdate);
        formData.append("_method", "PUT");

        const response = await mainURL.post(
          `/user/editcomment/${this.dataForm.id}`,
          formData
        );
        if (response.status === 200) {
          this.resetForm();
          this.getCommentFile(this.idFile);
          this.edit = false;
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

        const response = await mainURL.delete(`/user/deletecomment/${id}`);

        if (response.status === 200) {
          this.getCommentFile(this.idFile);
          this.$showToast("success", "Berhasil", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID");
    },
    async insertData() {
      try {
        if (this.dataForm.desc === null) {
          this.$showToast("error", "Sorry", `komentar kosong`);
        }

        const formData = new FormData();
        formData.append("file_uuid", this.dataForm.file_uuid);
        formData.append("desc", this.dataForm.desc);
        formData.append("_method", "POST");

        const response = await mainURL.post("/user/sendcomment", formData);
        if (response.status === 200) {
          this.resetForm();
          this.getCommentFile(this.idFile);
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
        id: null,
        file_uuid: this.$route.params.fileId,
        desc: null,
        descupdate: null,
      };
    },
    getUserData() {
      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        this.userData = JSON.parse(userDataString);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    async getDetail(id) {
      try {
        const response = await mainURL.get(`/user/file/${id}`);

        if (response.status === 200) {
          this.detail = response.data.data;
          this.pdfUrl = this.filePath + this.detail.path;
          this.categories = response.data.data.categories;
          this.fav = response.data.data.favorite ? true : false;
          this.getUserData();
        } else {
          const errorMessage =
            response && response.data && response.data.message
              ? response.data.message
              : "Gagal. Silakan coba lagi.";
          this.$showToast("error", "Sorry", errorMessage);
        }
      } catch (error) {
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Gagal login. Silakan coba lagi.";
        this.$showToast("error", "Sorry", errorMessage);
      }
    },
    async getCommentFile(id) {
      try {
        const response = await mainURL.get(`/user/commentfile/${id}`);
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
  },
  mounted() {
    this.getDetail(this.idFile);
    this.getUserData();
    this.getCommentFile(this.idFile);
  },
};
</script>

<style scoped>
.iframeContainer {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 100%;
  height: auto;
  /* 3:2 Aspect Ratio */
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
}

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
