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
            <tr>
              <td>File</td>
              <td>:</td>
              <td>
                <iframe
                  width="600"
                  height="400"
                  :src="filePath + detail.path + '#toolbar=0'"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </td>
            </tr>
          </tbody>
        </v-table>
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
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
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
  },
  mounted() {
    this.getDetailFile(this.fileId);
  },
};
</script>
