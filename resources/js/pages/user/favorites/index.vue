<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          File Favorite
        </VCardTitle>
      </VCardItem>
      <v-container>
        <v-row>
          <v-col cols="12" md="12" v-if="items == null">
            <v-row class="text-center">
              <v-col cols="12">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-col>
              <v-col cols="12">
                <span class="subtitle-1">Getting Data ...</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" v-if="items != null && items.length == 0">
            <v-row class="text-center">
              <v-col cols="12">
                <v-icon size="64" color="grey lighten-2">mdi-folder-search-outline</v-icon>
              </v-col>
              <v-col cols="12">
                <span class="subtitle-1">Tidak ada file favorite</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col v-if="items != null && items.length > 0" v-for="(item, index) in items" :key="index" cols="12" md="6">
            <v-card class="mx-auto card-style" max-width="344" height="200px" color="primary" variant="tonal" hover>
              <v-img
                src="https://bankarthaya.com/wp-content/uploads/2023/07/desktop-1024x576-1.jpg"
                height="20px"
                cover
              ></v-img>
              <v-card-item>
                <div>
                  <div class="text-overline mb-1">
                    {{ item.file.author.name }}
                  </div>
                  <div class="text-h6 mb-1">{{ item.file.name }}</div>
                  <div class="text-caption">
                    {{ item.file.summary.substring(0, 70) + "..." }}
                  </div>
                </div>
              </v-card-item>

              <v-card-actions class="d-flex justify-end">
                <v-btn class="ma-2" variant="text" icon="mdi-open-in-new" color="blue-lighten-2"
                  @click="toDetail(item.file.id)"></v-btn>
                <v-btn class="ma-2" variant="text" icon="mdi-trash" color="blue-lighten-2"
                  @click="favorite(item.file.id)"></v-btn>

              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </VCard>
  </div>
</template>

<script>
import mainURL from "@/axios";

export default {
  data() {
    return {
      items: null,
    };
  },
  methods: {
    toDetail(id) {
      this.$router.push(`/u-filedetail/${id}`);
    },
    async favorite(id) {
      try {
        const response = await mainURL.get(`/user/setfavfile/${id}`);
        if (response.status === 200) {
          this.getFileFav();
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.getFileFav();
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async getFileFav() {
      try {
        const response = await mainURL.get("/user/fav");

        if (response.status === 200) {
          this.items = response.data.data;
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.data.data.message);
      }
    },
  },
  mounted() {
    this.getFileFav();
  },
};
</script>
