<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular
      color="primary"
      size="64"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
  <VCard class="auth-card pa-2 pt-5"
    ><span color="primary" @click="goBack" style="cursor: pointer">
      <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
      Back
    </span>
    <VCardTitle
      class="text-2xl font-weight-bold d-flex justify-center overflow-auto"
    >
      {{ draft.title }}
    </VCardTitle>
    <v-alert
      v-if="draft.status == 'approved'"
      text="Draft Telah dinyatakan disetujui oleh semua pihak"
      title="Draft Telah disetujui"
      type="success"
    ></v-alert>
  </VCard>
  <v-spacer class="ma-2"></v-spacer>
  <VCard class="auth-card pt-5">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" sm="2" class="pa-0">
          <h4>{{ draft.title }}</h4>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="2" class="pa-0">
          <h4>Status</h4>
        </v-col>
        <v-col cols="12" sm="2" class="pa-0">
          <v-chip
            class="ma-2"
            color="success"
            prepend-icon="mdi-checkbox-marked-circle"
            v-if="draft.status == 'approved'"
            @click="changeDraftStatus(draft.id)"
          >
            Approved
          </v-chip>
          <v-chip
            class="ma-2"
            color="warning"
            prepend-icon="mdi-alert"
            v-if="draft.status == 'pending'"
            @click="changeDraftStatus(draft.id)"
          >
            Pending
          </v-chip>
          <v-chip
            class="ma-2"
            color="error"
            prepend-icon="mdi-alert"
            v-if="draft.status == 'rejected'"
          >
            Rejected
          </v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" class="px-2 py-0">
          <h5>{{ formatDate(draft.created_at) }}</h5>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3" class="px-2 py-0">
          <h5>Pengunggah: {{ draft?.user?.name }}</h5>
        </v-col>
        <v-col cols="12" sm="3" class="px-2 py-0">
          <h5>Jabatan: {{ draft?.user?.position?.name }}</h5>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="px-2 py-1">
          {{ draft?.desc || "unknown" }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" class="px-2 py-2">
          <a :href="draftUrl + '/' + draft?.file" target="_blank">
            <v-btn
              :prepend-icon="
                getFileExtension(draft?.file) === 'pdf'
                  ? 'mdi-file-pdf'
                  : 'mdi-file-word'
              "
              size="small"
            >
              {{ draft?.file }}
            </v-btn>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </VCard>
  <v-spacer class="ma-2"></v-spacer>
  <VCard class="auth-card pt-5">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" sm="12" class="pa-0">
          <h4>Required Approval : {{ draft.required_approvals }}</h4>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" sm="12" class="pa-0">
          <v-chip
            v-for="(pos, index) in selectedPositions"
            :color="pos?.pivot?.is_approved == 1 ? 'success' : 'error'"
            :key="index"
            class="ma-2"
            @click="openModal(1, pos)"
            >{{ pos.name }}</v-chip
          >
        </v-col>
      </v-row>
    </v-container>
  </VCard>
  <v-spacer class="ma-2"></v-spacer>
  <v-row>
    <v-col cols="12" md="8">
      <VCard class="auth-card pt-5">
        <v-container fluid>
          <v-row no-gutters>
            <v-col cols="12" sm="12" class="pa-0">
              <h4>Discussion</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-card variant="outlined">
                <v-card-title>
                  <VForm @submit.prevent="addComment">
                    <v-row align="center" justify="center">
                      <v-col md="10" cols="10">
                        <v-textarea
                          bg-color="grey-lighten-2"
                          color="cyan"
                          v-model="dataComment.desc"
                        ></v-textarea>
                      </v-col>
                      <v-col
                        md="2"
                        cols="2"
                        class="d-flex justify-space-between align-center"
                      >
                        <v-btn icon color="primary" @click="addComment">
                          <v-icon>mdi-send</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          color="secondary"
                          size="small"
                          @click="attachment = !attachment"
                        >
                          <v-icon>mdi-paperclip</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="12" v-if="attachment">
                        <v-file-input
                          accept="application/pdf,
                      application/msword,
                      application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                      application/vnd.ms-excel,
                      application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          prepend-icon="mdi-file"
                          label="File Attachment"
                          @change="handleFileChange"
                          ref="fileInput"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </VForm>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-container>
                <!-- <v-row>
              <v-col cols="12" sm="12">
                <h4>Tampilan</h4>
              </v-col>
            </v-row> -->
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-chip
                      color="primary"
                      v-if="displayComment == false"
                      @click="displayComment = !displayComment"
                      >Semua Komentar</v-chip
                    >
                    <v-chip
                      color="secondary"
                      v-if="displayComment == true"
                      @click="displayComment = !displayComment"
                      >Semua Komentar</v-chip
                    >
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-chip
                      color="primary"
                      v-if="displayComment == true"
                      @click="displayComment = !displayComment"
                      >Perposisi</v-chip
                    >
                    <v-chip
                      color="secondary"
                      v-if="displayComment == false"
                      @click="displayComment = !displayComment"
                      >Perposisi</v-chip
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
          <!-- <v-row>
        <v-col> -->
          <v-card
            variant="outlined"
            color="secondary"
            v-if="displayComment == true"
          >
            <div v-if="difPos">
              <v-row>
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        {{ userData?.position?.name }}
                      </v-expansion-panel-title>
                      <div v-for="(comment, index) in comments" :key="index">
                        <v-expansion-panel-text
                          v-if="
                            userData.position.id == comment.user.position_id
                          "
                        >
                          <v-card
                            class="mx-auto"
                            color="secondary"
                            variant="flat"
                          >
                            <v-card class="ma-4" rounded="lg" variant="flat">
                              <v-card-item>
                                <v-card-title
                                  class="text-body-2 d-flex align-center"
                                >
                                  <v-icon
                                    color="#949cf7"
                                    icon="mdi-calendar"
                                    start
                                  ></v-icon>

                                  <span
                                    class="text-medium-emphasis font-weight-bold"
                                  >
                                    {{ formatDate(comment.created_at) }}
                                  </span>
                                </v-card-title>

                                <div class="py-2">
                                  <div
                                    class="font-weight-light text-medium-emphasis"
                                  >
                                    {{ comment.desc }} as
                                  </div>
                                </div>
                              </v-card-item>

                              <v-divider></v-divider>

                              <div class="pa-4 d-flex align-center">
                                <div v-if="userData.uuid == comment.user.uuid">
                                  <button>
                                    <VIcon
                                      size="20"
                                      icon="bx-edit"
                                      color="blue"
                                      @click="openModal(2, comment)"
                                    />
                                  </button>
                                </div>
                                <div v-if="userData.uuid == comment.user.uuid">
                                  <button>
                                    <VIcon
                                      size="20"
                                      icon="bx-trash"
                                      color="red"
                                      @click="deleteComment(comment.id)"
                                    />
                                  </button>
                                </div>
                                <v-spacer></v-spacer>
                                <a
                                  :href="drafCommenttUrl + comment.attachment"
                                  target="_blank"
                                  v-if="comment.attachment"
                                >
                                  <v-btn
                                    class="me-2 text-none"
                                    prepend-icon="mdi-paperclip"
                                    variant="flat"
                                    v-if="comment.attachment"
                                  >
                                    {{ comment.attachment }}
                                  </v-btn></a
                                >
                              </div>
                            </v-card>
                          </v-card>
                        </v-expansion-panel-text>
                      </div>
                      <div v-if="comments != null && comments.length == 0">
                        <v-expansion-panel-text>
                          <v-card
                            class="mx-auto"
                            color="secondary"
                            variant="flat"
                          >
                            <v-cart-text> Belum ada komentar </v-cart-text>
                          </v-card>
                        </v-expansion-panel-text>
                      </div>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </div>
            <div v-for="(pos, index) in selectedPositions" :key="index">
              <v-row>
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        {{ pos.name }}
                        <v-chip
                          class="ma-2"
                          color="success"
                          prepend-icon="mdi-checkbox-marked-circle"
                          v-if="pos.pivot.is_approved == 1"
                          @click="openModal(1, pos)"
                        >
                          Approved
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          color="error"
                          prepend-icon="mdi-alert"
                          @click="openModal(1, pos)"
                          v-else
                        >
                          Not Approved
                        </v-chip>
                      </v-expansion-panel-title>
                      <div v-for="(comment, index) in comments" :key="index">
                        <v-expansion-panel-text
                          v-if="pos.id == comment.user.position_id"
                        >
                          <v-card
                            class="mx-auto"
                            color="secondary"
                            variant="flat"
                          >
                            <v-card class="ma-4" rounded="lg" variant="flat">
                              <v-card-item>
                                <v-card-title
                                  class="text-body-2 d-flex align-center"
                                >
                                  <v-icon
                                    color="#949cf7"
                                    icon="mdi-calendar"
                                    start
                                  ></v-icon>

                                  <span
                                    class="text-medium-emphasis font-weight-bold"
                                  >
                                    {{ formatDate(comment.created_at) }}
                                  </span>
                                </v-card-title>

                                <div class="py-2">
                                  <div
                                    class="font-weight-light text-medium-emphasis"
                                  >
                                    {{ comment.desc }}
                                  </div>
                                </div>
                              </v-card-item>

                              <v-divider></v-divider>

                              <div class="pa-4 d-flex align-center">
                                <div v-if="userData.uuid == comment.user.uuid">
                                  <button>
                                    <VIcon
                                      size="20"
                                      icon="bx-edit"
                                      color="blue"
                                      @click="openModal(2, comment)"
                                    />
                                  </button>
                                </div>
                                <div v-if="userData.uuid == comment.user.uuid">
                                  <button>
                                    <VIcon
                                      size="20"
                                      icon="bx-trash"
                                      color="red"
                                      @click="deleteComment(comment.id)"
                                    />
                                  </button>
                                </div>
                                <v-spacer></v-spacer>
                                <a
                                  :href="drafCommenttUrl + comment.attachment"
                                  target="_blank"
                                  v-if="comment.attachment"
                                >
                                  <v-btn
                                    class="me-2 text-none"
                                    prepend-icon="mdi-paperclip"
                                    variant="flat"
                                    v-if="comment.attachment"
                                  >
                                    {{ comment.attachment }}
                                  </v-btn></a
                                >
                              </div>
                            </v-card>
                          </v-card>
                        </v-expansion-panel-text>
                      </div>
                      <div v-if="comments != null && comments.length == 0">
                        <v-expansion-panel-text>
                          <v-card
                            class="mx-auto"
                            color="secondary"
                            variant="flat"
                          >
                            <v-cart-text> Belum ada komentar </v-cart-text>
                          </v-card>
                        </v-expansion-panel-text>
                      </div>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </div>
          </v-card>
          <!-- </v-col>
      </v-row> -->
          <v-row>
            <v-col>
              <v-card
                variant="outlined"
                color="secondary"
                v-if="displayComment == false"
              >
                <div>
                  <v-row>
                    <v-col>
                      <v-expansion-panels>
                        <v-expansion-panel>
                          <v-expansion-panel-title>
                            Semua Komentar
                          </v-expansion-panel-title>
                          <v-expansion-panel-text>
                            <div
                              v-for="(comment, index) in comments"
                              :key="index"
                            >
                              <v-expansion-panel-text>
                                <v-card
                                  class="mx-auto"
                                  color="secondary"
                                  variant="flat"
                                >
                                  <v-card
                                    class="ma-4"
                                    rounded="lg"
                                    variant="flat"
                                  >
                                    <v-card-item>
                                      <v-card-title
                                        class="text-body-2 d-flex align-center"
                                      >
                                        <span
                                          class="text-medium-emphasis font-weight-bold"
                                        >
                                          {{ comment.user.name }}
                                        </span>

                                        <v-spacer></v-spacer>
                                        <v-icon
                                          color="#949cf7"
                                          icon="mdi-calendar"
                                          start
                                        ></v-icon>
                                        <span
                                          class="text-medium-emphasis font-weight-bold"
                                        >
                                          {{ formatDate(comment.created_at) }}
                                        </span>
                                      </v-card-title>

                                      <div class="py-2">
                                        <div
                                          class="font-weight-light text-medium-emphasis"
                                        >
                                          {{ comment.desc }}
                                        </div>
                                      </div>
                                    </v-card-item>

                                    <div class="pa-4 d-flex align-center">
                                      <div
                                        v-if="
                                          userData.uuid == comment.user.uuid
                                        "
                                      >
                                        <button>
                                          <VIcon
                                            size="20"
                                            icon="bx-edit"
                                            color="blue"
                                          />
                                        </button>
                                      </div>
                                      <div
                                        v-if="
                                          userData.uuid == comment.user.uuid
                                        "
                                      >
                                        <button>
                                          <VIcon
                                            size="20"
                                            icon="bx-trash"
                                            color="red"
                                            @click="deleteComment(comment.id)"
                                          />
                                        </button>
                                      </div>
                                      <v-spacer></v-spacer>
                                      <a
                                        :href="
                                          drafCommenttUrl + comment.attachment
                                        "
                                        target="_blank"
                                        v-if="comment.attachment"
                                      >
                                        <v-btn
                                          class="me-2 text-none"
                                          prepend-icon="mdi-paperclip"
                                          variant="flat"
                                        >
                                          {{
                                            comment.attachment.substring(
                                              0,
                                              10
                                            ) + "..."
                                          }}
                                        </v-btn>
                                      </a>
                                    </div>
                                  </v-card>
                                </v-card>
                              </v-expansion-panel-text>
                            </div>
                            <div
                              v-if="comments != null && comments.length == 0"
                            >
                              <v-expandion-panel-text>
                                <v-card
                                  class="mx-auto"
                                  color="secondary"
                                  variant="flat"
                                >
                                  <v-cart-text>
                                    Belum ada komentar
                                  </v-cart-text>
                                </v-card>
                              </v-expandion-panel-text>
                            </div>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-col>
                  </v-row>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </VCard>
    </v-col>
    <v-col cols="12" md="4">
      <VCard class="auth-card pt-5">
        <v-container fluid>
          <v-row no-gutters>
            <v-col cols="12" sm="12" class="pa-0">
              <h4>History</h4>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="12"
              v-for="(history, index) in displayedHistories"
              :key="index"
            >
              <v-card class="auth-card ma-1">
                <template v-slot:subtitle>
                  <h4>
                    {{ history.user.name }} -
                    {{ formatDate(history.created_at) }}
                  </h4>
                </template>
                <template v-slot:text>{{ history.desc }} </template>
              </v-card>
            </v-col>
          </v-row>

          <v-pagination
            v-model="currentPageHistory"
            :length="totalPages"
            @input="changePage"
          ></v-pagination>
        </v-container>
      </VCard>
    </v-col>
  </v-row>

  <v-dialog v-model="updatePosProv">
    <v-card>
      <template v-slot:text>
        <VForm @submit.prevent="changePosApprove">
          <VCol cols="12" md="12">
            <v-select
              label="Status Approve"
              :items="[
                { value: 1, title: 'Approved' },
                { value: 0, title: 'Rejected' },
              ]"
              v-model="dataPosProv.statusPosProv"
              prepend-icon="mdi-help-rhombus"
            ></v-select>
          </VCol>
          <VCol cols="12" class="d-flex flex-wrap gap-4">
            <VBtn type="submit">Update</VBtn>

            <button type="button" class="btn btn-blue" @click="closeModal(1)">
              Batal
            </button>
          </VCol>
        </VForm>
      </template>
    </v-card>
  </v-dialog>
  <v-dialog v-model="updateComment">
    <v-card>
      <template v-slot:title> Edit Comment </template>
      <template v-slot:text>
        <VForm @submit.prevent="sendUpdateComment">
          <v-row align="center" justify="center">
            <v-col md="10" cols="10">
              <v-textarea
                bg-color="grey-lighten-2"
                color="cyan"
                v-model="updateDataComment.desc"
              ></v-textarea>
            </v-col>
            <v-col
              md="2"
              cols="2"
              class="d-flex justify-space-between align-center"
            >
              <v-btn
                icon
                color="secondary"
                size="small"
                @click="updateAttachment = !updateAttachment"
              >
                <v-icon>mdi-paperclip</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" v-if="updateAttachment">
              <v-file-input
                accept="application/pdf,
                application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                application/vnd.ms-excel,
                application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                prepend-icon="mdi-file"
                label="File Attachment"
                @change="updatecommenthandleFileChange"
              ></v-file-input>
            </v-col>
            <VCol cols="12" class="d-flex flex-wrap justify-end gap-4">
              <VBtn type="submit">Update</VBtn>

              <button type="button" class="btn btn-blue" @click="closeModal(3)">
                Batal
              </button>
            </VCol>
          </v-row>
        </VForm>
      </template>
      <template v-slot:actions>
        <v-progress-linear
          v-model="uploadProgress"
          color="amber"
          height="25"
        ></v-progress-linear>
      </template>
    </v-card>
  </v-dialog>
</template>
<script>
import mainURL from "@/axios";

export default {
  watch: {
    histories: {
      handler: function (newValue, oldValue) {
        // Update displayedHistories with the new calculated value
        this.displayedHistories = this.calculateDisplayedHistories();
      },
      deep: true, // untuk mengamati perubahan dalam objek dalam array
    },
    currentPageHistory: function () {
      // Ketika halaman berubah, perbarui displayedHistories
      this.displayedHistories = this.calculateDisplayedHistories();
    },
  },
  data() {
    return {
      draftId: this.$route.params.draftId,
      draftUrl: this.$draftUrl,
      drafCommenttUrl: this.$drafCommenttUrl,
      attachment: false,
      updatePosProv: false,
      overlay: false,
      updateComment: false,
      difPos: false,
      uploadProgress: null,
      userData: JSON.parse(localStorage.getItem("userData")),
      dataPosProv: {
        id: null,
        statusPosProv: null,
      },
      dataComment: {
        draft_id: this.$route.params.draftId,
        desc: null,
        attachment: null,
      },

      updateDataComment: {
        id: null,
        desc: null,
        attachment: null,
      },
      updateAttachment: false,
      displayComment: true,
      draft: {},
      selectedPositions: [],
      comments: [],

      //history
      currentPageHistory: 1,
      perPageHistory: 5,
      histories: [],
    };
  },
  computed: {
    // Menghitung total halaman berdasarkan jumlah total item dan item per halaman
    totalPages() {
      return Math.ceil(this.histories.length / this.perPageHistory);
    },
    // Mengambil item yang akan ditampilkan pada halaman saat ini
    displayedHistories() {
      const startIndex = (this.currentPageHistory - 1) * this.perPageHistory;
      const endIndex = startIndex + this.perPageHistory;
      return this.histories.filter((history, index) => {
        return index >= startIndex && index < endIndex;
      });
    },
  },
  methods: {
    calculateDisplayedHistories() {
      const startIndex = (this.currentPageHistory - 1) * this.perPageHistory;
      const endIndex = startIndex + this.perPageHistory;
      return this.histories.filter((history, index) => {
        return index >= startIndex && index < endIndex;
      });
    },
    changePage(page) {
      this.currentPageHistory = page;
    },
    goBack() {
      this.$router.go(-1);
    },
    getFileExtension(filename) {
      if (filename) {
        return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
      } else {
        return "";
      }
    },
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        this.dataComment.attachment = selectedFile;
      } else {
        this.$showToast(
          "error",
          "Error",
          "Hanya file PDF / DOC / DOCX / XLX / XLSX yang diizinkan."
        );
        event.target.value = null;
      }
    },
    updatecommenthandleFileChange(event) {
      const selectedFile = event.target.files[0];
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        this.updateDataComment.attachment = selectedFile;
      } else {
        this.$showToast(
          "error",
          "Error",
          "Hanya file PDF / DOC / DOCX / XLX / XLSX yang diizinkan."
        );
        event.target.value = null;
      }
    },
    closeModal(type) {
      if (type == 1) {
        this.dataPosProv.id = null;
        this.dataPosProv.statusPosProv = null;
        this.updatePosProv = false;
      } else if (type == 2) {
        this.dataComment.desc = null;
        this.dataComment.attachment = null;
        if (this.$refs.fileInput) {
          this.$refs.fileInput.reset();
        }
      } else if (type == 3) {
        this.updateDataComment.id = null;
        this.updateDataComment.desc = null;
        this.updateDataComment.attachment = null;
        this.updateComment = false;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID");
    },
    async getDetailDraft(id) {
      try {
        this.overlay = true;
        const response = await mainURL.get(`/user/draft/${id}`);
        if (response.status === 200) {
          this.draft = response.data.data;
          this.selectedPositions = response.data.data.positions;
          this.comments = response.data.data.comments;
          this.histories = response.data.data.draft_activities;
          if (this.draft.user.position_id == this.userData.position_id) {
            this.difPos = true;
          }

          this.overlay = false;
        } else {
          this.overlay = false;
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.overlay = false;
        this.$showToast("error", "Sorry", error.response.data.data.message);
      }
    },
    openModal(type, data = null) {
      if (type == 1) {
        this.dataPosProv.id = data.pivot.id;
        this.dataPosProv.statusPosProv = data.pivot.is_approved;
        this.updatePosProv = true;
      } else if (type == 2) {
        this.updateDataComment.id = data.id;
        this.updateDataComment.desc = data.desc;
        this.updateComment = true;
      }
    },
    async changeDraftStatus(id) {
      try {
        this.overlay = true;
        const response = await mainURL.get(`/user/changestatusdraft/${id}`);

        if (response.status === 200) {
          this.getDetailDraft(this.draftId);
          this.overlay = false;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.overlay = false;
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async changePosApprove() {
      try {
        this.overlay = true;
        const formData = new FormData();
        formData.append("id", this.dataPosProv.id);
        formData.append("statusPosProv", this.dataPosProv.statusPosProv);
        formData.append("_method", "POST");

        const response = await mainURL.post("/user/changeposapprove", formData);

        if (response.status === 200) {
          this.closeModal(1);
          this.getDetailDraft(this.draftId);
          this.overlay = false;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.$showToast("error", "Sorry", response.data.message);
          this.closeModal(1);
        }
      } catch (error) {
        this.overlay = false;
        this.closeModal(1);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async addComment() {
      try {
        this.overlay = true;
        if (this.dataComment.desc === null) {
          this.$showToast("error", "Sorry", `komentar wajib diisi`);
        }
        const formData = new FormData();
        formData.append("draft_id", this.dataComment.draft_id);
        formData.append("desc", this.dataComment.desc);
        if (this.dataComment.attachment != null) {
          formData.append("attachment", this.dataComment.attachment);
        }
        formData.append("_method", "POST");
        const config = {
          onUploadProgress: (progressEvent) => {
            try {
              this.uploadProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            } catch (error) {
              console.error("Error calculating progress:", error);
            }
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await mainURL.post(
          "/user/adddraftcomment",
          formData,
          config
        );

        if (response.status === 200) {
          this.overlay = false;
          this.closeModal(2);
          this.getDetailDraft(this.draftId);
          this.uploadProgress = null;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.closeModal(2);
          this.uploadProgress = null;
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.overlay = false;
        this.closeModal(2);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },

    async sendUpdateComment() {
      try {
        this.overlay = true;
        if (this.updateDataComment.desc === null) {
          this.$showToast("error", "Sorry", `komentar wajib diisi`);
        }
        const formData = new FormData();
        formData.append("desc", this.updateDataComment.desc);
        if (this.updateDataComment.attachment != null) {
          formData.append("attachment", this.updateDataComment.attachment);
        }
        formData.append("_method", "PUT");
        const config = {
          onUploadProgress: (progressEvent) => {
            try {
              this.uploadProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            } catch (error) {
              console.error("Error calculating progress:", error);
            }
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        // console.log(...formData);

        const response = await mainURL.post(
          `/user/updatedraftcomment/${this.updateDataComment.id}`,
          formData,
          config
        );

        if (response.status === 200) {
          this.overlay = false;
          this.closeModal(3);
          this.getDetailDraft(this.draftId);
          this.uploadProgress = null;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.closeModal(3);
          this.getDetailDraft(this.draftId);
          this.uploadProgress = null;
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.getDetailDraft(this.draftId);
        this.overlay = false;
        this.closeModal(3);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },

    async deleteComment(id) {
      try {
        this.overlay = true;
        const confirmDelete = window.confirm(
          "Semua Data yang terkait akan ikut terhapus. Apakah Anda yakin ingin menghapus data?"
        );
        if (!confirmDelete) {
          this.overlay = false;
          return;
        }
        const response = await mainURL.delete(`/user/deletedraftcomment/${id}`);
        if (response.status === 200) {
          this.overlay = false;
          this.getDetailDraft(this.draftId);
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.overlay = false;
          this.getDetailDraft(this.draftId);
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.overlay = false;
        this.getDetailDraft(this.draftId);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
  },
  mounted() {
    this.getDetailDraft(this.draftId);
  },
};
</script>
