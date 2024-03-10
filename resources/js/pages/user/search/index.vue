<template>
  <div>
    <v-card class="auth-card pa-4 pt-5">
      <v-card-title class="text-2xl font-weight-bold">
        Pilih Kategori File
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="12" v-if="categories == null">
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
              v-if="categories != null && categories.length == 0"
            >
              <v-row class="text-center">
                <v-col cols="12">
                  <v-icon size="64" color="grey lighten-2"
                    >mdi-folder-search-outline</v-icon
                  >
                </v-col>
                <v-col cols="12">
                  <span class="subtitle-1"
                    >Tidak ada Kategori yang ditemukan</span
                  >
                </v-col>
                <v-col cols="12">
                  <span class="caption"
                    >Mohon periksa jaringan internet anda atau hubungi
                    administrator</span
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col
              v-if="categories != null && categories.length > 0"
              v-for="(item, index) in categories"
              :key="index"
              cols="12"
              md="6"
            >
              <v-card
                class="mx-auto card-style"
                color="primary"
                variant="tonal"
                max-width="344"
                hover
                @click="toDetail(item.value)"
              >
                <v-img
                  src="https://bankarthaya.com/wp-content/uploads/2023/07/desktop-1024x576-1.jpg"
                  height="20px"
                  cover
                ></v-img>
                <v-card-item>
                  <div>
                    <div class="text-h6 mb-1">{{ item.title }}</div>
                    <div class="text-caption">
                      <!-- Jumlah file: {{ item.count }} -->
                    </div>
                  </div>
                </v-card-item>

                <v-card-actions class="d-flex justify-end">
                  <v-btn
                    class="ma-2"
                    variant="text"
                    icon="mdi-open-in-new"
                    color="blue-lighten-2"
                    @click="toDetail(item.value)"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import mainURL from "@/axios";

export default {
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    toDetail(id) {
      this.$router.push(`/u-search/${id}`);
    },
    async getCategory() {
      try {
        const response = await mainURL.get("/user/category");

        if (response.status === 200) {
          this.categories = response.data.data.map((item) => ({
            value: item.id,
            title: item.name,
          }));
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.data.data.message);
      }
    },
  },
  mounted() {
    this.getCategory();
  },
};
</script>
