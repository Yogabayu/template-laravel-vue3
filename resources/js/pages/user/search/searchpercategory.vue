<template>
  <div>
    <v-card class="auth-card pa-4 pt-5">
      <v-card-title class="text-2xl font-weight-bold">
        <span color="primary" @click="goBack" style="cursor: pointer">
          <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
          Back
        </span>
        Cari File dengan kategori : {{ category.name ?? "-" }}
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="getFileSearch">
          <v-container>
            <v-row no-gutters>
              <v-col cols="12" sm="8">
                <v-sheet class="ma-2 pa-2">
                  <v-text-field
                    placeholder="Cari File"
                    autofocus
                    v-model="selectedName"
                  />
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="2">
                <v-sheet class="ma-2 pa-2 d-flex justify-center">
                  <v-btn
                    class="ma-2"
                    variant="text"
                    icon="mdi-magnify"
                    color="#5865f2"
                    type="submit"
                  ></v-btn>
                </v-sheet>
              </v-col>
            </v-row>

            <v-container>
              <v-row>
                <v-col cols="12" md="12" v-if="files == null">
                  <v-row class="text-center">
                    <v-col cols="12">
                      <v-progress-circular
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                    </v-col>
                    <v-col cols="12">
                      <span class="subtitle-1">Getting Data ...</span>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                  v-if="files != null && files.length == 0"
                >
                  <v-row class="text-center">
                    <v-col cols="12">
                      <v-icon size="64" color="grey lighten-2"
                        >mdi-folder-search-outline</v-icon
                      >
                    </v-col>
                    <v-col cols="12">
                      <span class="subtitle-1"
                        >Tidak ada file yang ditemukan</span
                      >
                    </v-col>
                    <v-col cols="12">
                      <span class="caption">Silahkan coba lagi</span>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-if="files != null && files.length > 0"
                  v-for="(item, index) in files"
                  :key="index"
                  cols="12"
                  md="6"
                >
                  <v-card
                    class="mx-auto card-style"
                    color="primary"
                    variant="tonal"
                    height="230px"
                    max-width="344"
                    hover
                  >
                    <v-img
                      src="https://bankarthaya.com/wp-content/uploads/2023/07/desktop-1024x576-1.jpg"
                      height="20px"
                      cover
                    ></v-img>
                    <v-card-item>
                      <div>
                        <div class="text-overline mb-1">
                          {{ category.name }}
                        </div>
                        <div class="text-h6 mb-1">
                          {{ item.name.substring(0, 20) + "..." }}
                        </div>
                        <div class="text-caption">
                          {{ item.summary.substring(0, 30) + "..." }}
                        </div>
                      </div>
                    </v-card-item>

                    <v-card-actions class="d-flex justify-end">
                      <v-btn
                        class="ma-2"
                        variant="text"
                        icon="mdi-open-in-new"
                        color="blue-lighten-2"
                        @click="toDetail(item.id)"
                      ></v-btn>

                      <v-btn
                        class="ma-2"
                        variant="text"
                        icon="mdi-heart"
                        color="blue-lighten-2"
                        v-if="item.favorite"
                        @click="favorite(item.id)"
                      ></v-btn>
                      <v-btn
                        class="ma-2"
                        variant="text"
                        icon="mdi-heart-outline"
                        v-else
                        color="blue-lighten-2"
                        @click="favorite(item.id)"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import mainURL from "@/axios";

export default {
  data() {
    return {
      idCat: this.$route.params.categoryId,
      files: [],
      category: {},
      selectedName: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toDetail(id) {
      this.$router.push(`/u-filedetail/${id}`);
    },
    async getFileSearch() {
      try {
        let url = "/user/search?";

        if (this.selectedName !== null) {
          url += `name=${this.selectedName}`;
        }

        url +=
          (this.selectedName !== null ? "&" : "") +
          `category=${this.category.id}`;

        const response = await mainURL.get(url);

        if (response.status === 200) {
          this.files = response.data.data;
            
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.data.data.message);
      }
    },
    async favorite(id) {
      try {
        const response = await mainURL.get(`/user/setfavfile/${id}`);
        if (response.status === 200) {
          this.getFile(this.idCat);
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.getFile(this.idCat);
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async getFile(id) {
      try {
        const response = await mainURL.get(`/user/category/${id}`);

        if (response.status === 200) {
          this.category = response.data.data.category;
          this.files = response.data.data.files;
          console.log(response.data);
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.data.data.message);
      }
    },
  },
  mounted() {
    this.getFile(this.idCat);
    console.log(this.idCat);
  },
};
</script>
