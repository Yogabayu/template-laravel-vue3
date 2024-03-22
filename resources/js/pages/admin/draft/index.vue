<template>
  <v-card>
    <VCardTitle class="text-2xl font-weight-bold d-flex justify-left">
      Draft Approval
    </VCardTitle>
    <v-tabs v-model="tab" class="v-tabs-pill" bg-color="secondary">
      <v-tab value="1">Semua</v-tab>
      <v-tab value="2">Pending</v-tab>
      <v-tab value="3">Approved</v-tab>
      <v-tab value="4">Rejected</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <!-- semua -->
        <v-window-item value="1">
          <!-- <VForm @submit.prevent="filterData">
            <v-row>
              <VCol md="4" cols="12">
                <VTextField
                  placeholder="Cari Judul, Deskripsi"
                  apppend-icon="mdi-person"
                  v-model="dataFilter.text"
                />
              </VCol>
              <v-col md="4" cols="12">
                <VTextField
                  placeholder="Draft xx"
                  apppend-icon="mdi-person"
                  type="month"
                  v-model="dataFilter.date"
                />
              </v-col>
              <v-col md="4" cols="12">
                <v-row class="d-flex justify-left align-center ma-3">
                  <VBtn type="button" @click="filterData" size="small"
                    >Update</VBtn
                  >
                  &nbsp;
                  <button type="reset" class="btn btn-blue">reset</button>
                </v-row>
              </v-col>
            </v-row>
          </VForm> -->
          <v-row class="d-flex justify-end pa-3">
            <v-btn
              color="primary"
              size="small"
              class="my-3 mx-3"
              @click="openModal(1)"
            >
              Tambah Data
            </v-btn>
            <v-spacer></v-spacer>
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
            <v-spacer></v-spacer>
            <v-btn
              :color="isTable == true ? 'secondary' : 'on-primary'"
              @click="isTable = !isTable"
              size="x-small"
              class="mt-3"
            >
              <v-icon size="20" icon="bx-table" color="on-primary"></v-icon>
              Table
            </v-btn>
            <v-btn
              :color="isTable == false ? 'secondary' : 'on-primary'"
              @click="isTable = !isTable"
              size="x-small"
              class="mt-3"
            >
              <v-icon size="20" icon="bx-box" color="on-primary"></v-icon> Grid
            </v-btn>
          </v-row>
          <EasyDataTable
            class="mt-2"
            show-index
            :headers="headers"
            :items="items"
            :search-value="searchValue"
            v-if="isTable"
          >
            <template #empty-message>
              <p>Data Kosong</p>
            </template>
            <template #loading>
              <p>loading data .....</p>
            </template>
            <template #item-status="item">
              <v-chip
                variant="outlined"
                color="primary"
                @click="changeDraftStatus(item.id)"
              >
                {{ item.status }}
              </v-chip>
            </template>
            <!-- <template #item-file="item">
              <a :href="draftUrl + '/' + item.file" target="_blank">
                <v-btn prepend-icon="mdi-open-in-new" size="x-small">
                  Lihat File
                </v-btn>
              </a>
            </template> -->
            <template #item-operation="item">
              <div class="operation-wrapper">
                <button>
                  <VIcon
                    size="20"
                    icon="bx-file-find"
                    color="blue"
                    @click="toLink(item.id)"
                  />
                </button>
                &nbsp;
                <button>
                  <VIcon
                    size="20"
                    icon="bx-edit"
                    color="blue"
                    @click="openModal(2, item)"
                  />
                </button>
                &nbsp;
                <button>
                  <VIcon
                    size="20"
                    icon="bx-trash"
                    color="red"
                    @click="deleteData(item)"
                  />
                </button>
              </div>
            </template>
          </EasyDataTable>
          <v-container v-if="isTable == false">
            <v-row no-gutters>
              <v-col
                class="ma-2"
                v-for="(draft, index) in items"
                :key="index"
                cols="12"
                sm="3"
              >
                <v-card class="mx-auto" max-width="344" height="230px">
                  <v-card-item>
                    <div>
                      <div class="text-overline mb-1">
                        <v-chip
                          color="success"
                          variant="flat"
                          v-if="draft.status == 'approved'"
                          @click="changeDraftStatus(draft.id)"
                        >
                          {{ draft.status }}
                        </v-chip>
                        <v-chip
                          color="warning"
                          variant="flat"
                          v-if="draft.status == 'pending'"
                          @click="changeDraftStatus(draft.id)"
                        >
                          {{ draft.status }}
                        </v-chip>
                        <v-chip
                          color="error"
                          variant="flat"
                          v-if="draft.status == 'rejected'"
                          @click="changeDraftStatus(draft.id)"
                        >
                          {{ draft.status }}
                        </v-chip>
                      </div>
                      <div class="text-h6 mb-1">{{ draft.title }}</div>
                      <div class="text-caption">
                        {{ draft.desc.substring(0, 50) + "..." }}
                      </div>
                      <div class="text-caption mt-2">
                        {{ formatDate(draft.created_at) }}
                      </div>
                    </div>
                  </v-card-item>

                  <v-card-actions>
                    <v-btn size="small" class="mt-3" @click="toLink(draft.id)">
                      <v-icon size="20" icon="mdi-open-in-new"></v-icon>
                    </v-btn>
                    <v-btn
                      size="small"
                      class="mt-3"
                      @click="openModal(2, draft)"
                      v-if="userData.uuid == draft.user_uuid"
                    >
                      <v-icon size="20" icon="mdi-pen"></v-icon>
                    </v-btn>
                    <v-btn
                      size="small"
                      class="mt-3"
                      @click="deleteData(draft)"
                      v-if="userData.uuid == draft.user_uuid"
                    >
                      <v-icon size="20" icon="mdi-trash"></v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>

          <v-dialog v-model="insert" width="auto">
            <v-card>
              <template v-slot:title> Tambah Data </template>

              <template v-slot:text>
                <VForm @submit.prevent="insertData">
                  <VRow>
                    <VCol md="12" cols="12">
                      <VTextField
                        placeholder="Draft xx"
                        label="Judul Draft"
                        v-model="dataForm.title"
                        autofocus
                        :rules="[rules.required]"
                        prepend-icon="mdi-person"
                      />
                    </VCol>

                    <VCol cols="12" md="12">
                      <v-textarea
                        counter
                        label="Deskripsi"
                        :rules="rulesTextArea"
                        v-model="dataForm.desc"
                        prepend-icon="mdi-comment"
                      ></v-textarea>
                    </VCol>

                    <VCol cols="12" md="12">
                      <v-file-input
                        accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                        placeholder="Pick an file"
                        prepend-icon="mdi-file"
                        :rules="[rules.required]"
                        label="File Draft"
                        @change="handleFileChange"
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
                          <template v-slot:title>
                            Urutan Persetujuan Draft :
                          </template>

                          <template v-slot:text>
                            <v-row>
                              <v-col
                                v-for="(item, index) in selectedPositions"
                                :key="index"
                                cols="6"
                              >
                                <v-list-item>
                                  <v-list-item-title
                                    v-text="index + 1 + ' - ' + item.title"
                                  ></v-list-item-title>
                                </v-list-item>
                              </v-col>
                            </v-row>
                          </template>
                        </v-card>
                      </v-col>
                    </v-row>

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
                <VForm @submit.prevent="updateData">
                  <VRow>
                    <VCol md="12" cols="12">
                      <VTextField
                        placeholder="Draft xx"
                        label="Judul Draft"
                        v-model="dataForm.title"
                        autofocus
                        :rules="[rules.required]"
                        prepend-icon="mdi-person"
                      />
                    </VCol>

                    <VCol cols="12" md="12">
                      <v-textarea
                        counter
                        label="Deskripsi"
                        :rules="rulesTextArea"
                        v-model="dataForm.desc"
                        prepend-icon="mdi-comment"
                      ></v-textarea>
                    </VCol>

                    <VCol cols="12" md="12">
                      <v-select
                        label="Status"
                        :items="[
                          { value: 'pending', title: 'Pending' },
                          { value: 'approved', title: 'Approved' },
                          { value: 'rejected', title: 'Rejected' },
                        ]"
                        v-model="dataForm.status"
                        prepend-icon="mdi-help-rhombus"
                      ></v-select>
                    </VCol>

                    <VCol cols="12" md="12">
                      <v-file-input
                        accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                        placeholder="Pick an file"
                        prepend-icon="mdi-file"
                        :rules="[rules.required]"
                        label="File Draft"
                        @change="handleFileChange"
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
                          <template v-slot:title>
                            Urutan Persetujuan Draft :
                          </template>

                          <template v-slot:text>
                            <v-row>
                              <h5>Urutan Saat ini</h5>
                              <v-col>
                                <v-chip-group
                                  selected-class="text-primary"
                                  column
                                >
                                  <div
                                    v-for="(
                                      item, index
                                    ) in displaySelectedPositions"
                                    :key="index"
                                  >
                                    <VChip style="color: rgb(6, 84, 107)">
                                      {{ index + 1 + " - " + item }}
                                    </VChip>
                                  </div>
                                </v-chip-group>
                              </v-col>
                            </v-row>
                            <v-row>
                              <h5>Urutan Baru :</h5>
                              <v-col>
                                <v-chip-group
                                  selected-class="text-primary"
                                  column
                                >
                                  <div
                                    v-for="(item, index) in selectedPositions"
                                    :key="index"
                                  >
                                    <VChip style="color: rgb(6, 84, 107)">
                                      {{ index + 1 + " - " + item.title }}
                                    </VChip>
                                  </div>
                                </v-chip-group>
                              </v-col>
                            </v-row>
                          </template>
                        </v-card>
                      </v-col>
                    </v-row>

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
        </v-window-item>

        <!-- pending -->
        <v-window-item value="2">
          <v-row class="d-flex justify-end pa-3">
            <v-btn
              color="primary"
              size="small"
              class="my-3 mx-3"
              @click="openModal(1)"
            >
              Tambah Data
            </v-btn>
            <v-spacer></v-spacer>
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
            <v-spacer></v-spacer>
            <v-btn
              :color="isTable == true ? 'secondary' : 'on-primary'"
              @click="isTable = !isTable"
              size="x-small"
              class="mt-3"
            >
              <v-icon size="20" icon="bx-table" color="on-primary"></v-icon>
              Table
            </v-btn>
            <v-btn
              :color="isTable == false ? 'secondary' : 'on-primary'"
              @click="isTable = !isTable"
              size="x-small"
              class="mt-3"
            >
              <v-icon size="20" icon="bx-box" color="on-primary"></v-icon> Grid
            </v-btn>
          </v-row>
          <EasyDataTable
            class="mt-2"
            show-index
            :headers="headers"
            :items="items"
            :search-value="searchValue"
            v-if="isTable"
          >
            <template #empty-message>
              <p>Data Kosong</p>
            </template>
            <template #loading>
              <p>loading data .....</p>
            </template>
            <template #item-status="item">
              <v-chip
                variant="outlined"
                color="primary"
                @click="changeDraftStatus(item.id, 'pending')"
              >
                {{ item.status }}
              </v-chip>
            </template>
            <!-- <template #item-file="item">
              <a :href="draftUrl + '/' + item.file" target="_blank">
                <v-btn prepend-icon="mdi-open-in-new" size="x-small">
                  Lihat File
                </v-btn>
              </a>
            </template> -->
            <template #item-operation="item">
              <div class="operation-wrapper">
                <button>
                  <VIcon
                    size="20"
                    icon="bx-file-find"
                    color="blue"
                    @click="toLink(item.id)"
                  />
                </button>
                &nbsp;
                <button>
                  <VIcon
                    size="20"
                    icon="bx-edit"
                    color="blue"
                    @click="openModal(2, item)"
                  />
                </button>
                &nbsp;
                <button>
                  <VIcon
                    size="20"
                    icon="bx-trash"
                    color="red"
                    @click="deleteData(item)"
                  />
                </button>
              </div>
            </template>
          </EasyDataTable>
          <v-container v-if="isTable == false">
            <v-row no-gutters>
              <v-col
                class="ma-2"
                v-for="(draft, index) in items"
                :key="index"
                cols="12"
                sm="3"
              >
                <v-card class="mx-auto" max-width="344" height="230px">
                  <v-card-item>
                    <div>
                      <div class="text-overline mb-1">
                        <v-chip
                          color="success"
                          variant="flat"
                          v-if="draft.status == 'approved'"
                          @click="changeDraftStatus(draft.id)"
                        >
                          {{ draft.status }}
                        </v-chip>
                        <v-chip
                          color="warning"
                          variant="flat"
                          v-if="draft.status == 'pending'"
                          @click="changeDraftStatus(draft.id)"
                        >
                          {{ draft.status }}
                        </v-chip>
                        <v-chip
                          color="error"
                          variant="flat"
                          v-if="draft.status == 'rejected'"
                          @click="changeDraftStatus(draft.id)"
                        >
                          {{ draft.status }}
                        </v-chip>
                      </div>
                      <div class="text-h6 mb-1">{{ draft.title }}</div>
                      <div class="text-caption">
                        {{ draft.desc.substring(0, 50) + "..." }}
                      </div>
                      <div class="text-caption mt-2">
                        {{ formatDate(draft.created_at) }}
                      </div>
                    </div>
                  </v-card-item>

                  <v-card-actions>
                    <v-btn size="small" class="mt-3" @click="toLink(draft.id)">
                      <v-icon size="20" icon="mdi-open-in-new"></v-icon>
                    </v-btn>
                    <v-btn
                      size="small"
                      class="mt-3"
                      @click="openModal(2, draft)"
                      v-if="userData.uuid == draft.user_uuid"
                    >
                      <v-icon size="20" icon="mdi-pen"></v-icon>
                    </v-btn>
                    <v-btn
                      size="small"
                      class="mt-3"
                      @click="deleteData(draft)"
                      v-if="userData.uuid == draft.user_uuid"
                    >
                      <v-icon size="20" icon="mdi-trash"></v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>

        <!-- approved -->
        <v-window-item value="3">
          <v-row class="d-flex justify-end pa-3">
            <v-btn
              color="primary"
              size="small"
              class="my-3 mx-3"
              @click="openModal(1)"
            >
              Tambah Data
            </v-btn>
            <v-spacer></v-spacer>
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
            <v-spacer></v-spacer>
            <v-btn
              :color="isTable == true ? 'secondary' : 'on-primary'"
              @click="isTable = !isTable"
              size="x-small"
              class="mt-3"
            >
              <v-icon size="20" icon="bx-table" color="on-primary"></v-icon>
              Table
            </v-btn>
            <v-btn
              :color="isTable == false ? 'secondary' : 'on-primary'"
              @click="isTable = !isTable"
              size="x-small"
              class="mt-3"
            >
              <v-icon size="20" icon="bx-box" color="on-primary"></v-icon> Grid
            </v-btn>
          </v-row>
          <EasyDataTable
            class="mt-2"
            show-index
            :headers="headers"
            :items="items"
            :search-value="searchValue"
            v-if="isTable"
          >
            <template #empty-message>
              <p>Data Kosong</p>
            </template>
            <template #loading>
              <p>loading data .....</p>
            </template>
            <template #item-status="item">
              <v-chip
                variant="outlined"
                color="primary"
                @click="changeDraftStatus(item.id, 'approved')"
              >
                {{ item.status }}
              </v-chip>
            </template>
            <!-- <template #item-file="item">
              <a :href="draftUrl + '/' + item.file" target="_blank">
                <v-btn prepend-icon="mdi-open-in-new" size="x-small">
                  Lihat File
                </v-btn>
              </a>
            </template> -->
            <template #item-operation="item">
              <div class="operation-wrapper">
                <button>
                  <VIcon
                    size="20"
                    icon="bx-file-find"
                    color="blue"
                    @click="toLink(item.id)"
                  />
                </button>
                &nbsp;
                <button>
                  <VIcon
                    size="20"
                    icon="bx-edit"
                    color="blue"
                    @click="openModal(2, item)"
                  />
                </button>
                &nbsp;
                <button>
                  <VIcon
                    size="20"
                    icon="bx-trash"
                    color="red"
                    @click="deleteData(item)"
                  />
                </button>
              </div>
            </template>
          </EasyDataTable>
          <v-container v-if="isTable == false">
            <v-row no-gutters>
              <v-col
                class="ma-2"
                v-for="(draft, index) in items"
                :key="index"
                cols="12"
                sm="3"
              >
                <v-card class="mx-auto" max-width="344" height="230px">
                  <v-card-item>
                    <div>
                      <div class="text-overline mb-1">
                        <v-chip
                          color="success"
                          variant="flat"
                          v-if="draft.status == 'approved'"
                          @click="changeDraftStatus(draft.id)"
                        >
                          {{ draft.status }}
                        </v-chip>
                        <v-chip
                          color="warning"
                          variant="flat"
                          v-if="draft.status == 'pending'"
                          @click="changeDraftStatus(draft.id)"
                        >
                          {{ draft.status }}
                        </v-chip>
                        <v-chip
                          color="error"
                          variant="flat"
                          v-if="draft.status == 'rejected'"
                          @click="changeDraftStatus(draft.id)"
                        >
                          {{ draft.status }}
                        </v-chip>
                      </div>
                      <div class="text-h6 mb-1">{{ draft.title }}</div>
                      <div class="text-caption">
                        {{ draft.desc.substring(0, 50) + "..." }}
                      </div>
                      <div class="text-caption mt-2">
                        {{ formatDate(draft.created_at) }}
                      </div>
                    </div>
                  </v-card-item>

                  <v-card-actions>
                    <v-btn size="small" class="mt-3" @click="toLink(draft.id)">
                      <v-icon size="20" icon="mdi-open-in-new"></v-icon>
                    </v-btn>
                    <v-btn
                      size="small"
                      class="mt-3"
                      @click="openModal(2, draft)"
                      v-if="userData.uuid == draft.user_uuid"
                    >
                      <v-icon size="20" icon="mdi-pen"></v-icon>
                    </v-btn>
                    <v-btn
                      size="small"
                      class="mt-3"
                      @click="deleteData(draft)"
                      v-if="userData.uuid == draft.user_uuid"
                    >
                      <v-icon size="20" icon="mdi-trash"></v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>

        <!--  rejected -->
        <v-window-item value="4">
          <v-row class="d-flex justify-end pa-3">
            <v-btn
              color="primary"
              size="small"
              class="my-3 mx-3"
              @click="openModal(1)"
            >
              Tambah Data
            </v-btn>
            <v-spacer></v-spacer>
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
            <v-spacer></v-spacer>
            <v-btn
              :color="isTable == true ? 'secondary' : 'on-primary'"
              @click="isTable = !isTable"
              size="x-small"
              class="mt-3"
            >
              <v-icon size="20" icon="bx-table" color="on-primary"></v-icon>
              Table
            </v-btn>
            <v-btn
              :color="isTable == false ? 'secondary' : 'on-primary'"
              @click="isTable = !isTable"
              size="x-small"
              class="mt-3"
            >
              <v-icon size="20" icon="bx-box" color="on-primary"></v-icon> Grid
            </v-btn>
          </v-row>
          <EasyDataTable
            class="mt-2"
            show-index
            :headers="headers"
            :items="items"
            :search-value="searchValue"
            v-if="isTable"
          >
            <template #empty-message>
              <p>Data Kosong</p>
            </template>
            <template #loading>
              <p>loading data .....</p>
            </template>
            <template #item-status="item">
              <v-chip
                variant="outlined"
                color="primary"
                @click="changeDraftStatus(item.id, 'rejected')"
              >
                {{ item.status }}
              </v-chip>
            </template>
            <!-- <template #item-file="item">
              <a :href="draftUrl + '/' + item.file" target="_blank">
                <v-btn prepend-icon="mdi-open-in-new" size="x-small">
                  Lihat File
                </v-btn>
              </a>
            </template> -->
            <template #item-operation="item">
              <div class="operation-wrapper">
                <button>
                  <VIcon
                    size="20"
                    icon="bx-file-find"
                    color="blue"
                    @click="toLink(item.id)"
                  />
                </button>
                &nbsp;
                <button>
                  <VIcon
                    size="20"
                    icon="bx-edit"
                    color="blue"
                    @click="openModal(2, item)"
                  />
                </button>
                &nbsp;
                <button>
                  <VIcon
                    size="20"
                    icon="bx-trash"
                    color="red"
                    @click="deleteData(item)"
                  />
                </button>
              </div>
            </template>
          </EasyDataTable>
          <v-container v-if="isTable == false">
            <v-row no-gutters>
              <v-col
                class="ma-2"
                v-for="(draft, index) in items"
                :key="index"
                cols="12"
                sm="3"
              >
                <v-card class="mx-auto" max-width="344" height="230px">
                  <v-card-item>
                    <div>
                      <div class="text-overline mb-1">
                        <v-chip
                          color="success"
                          variant="flat"
                          v-if="draft.status == 'approved'"
                          @click="changeDraftStatus(draft.id)"
                        >
                          {{ draft.status }}
                        </v-chip>
                        <v-chip
                          color="warning"
                          variant="flat"
                          v-if="draft.status == 'pending'"
                          @click="changeDraftStatus(draft.id)"
                        >
                          {{ draft.status }}
                        </v-chip>
                        <v-chip
                          color="error"
                          variant="flat"
                          v-if="draft.status == 'rejected'"
                          @click="changeDraftStatus(draft.id)"
                        >
                          {{ draft.status }}
                        </v-chip>
                      </div>
                      <div class="text-h6 mb-1">{{ draft.title }}</div>
                      <div class="text-caption">
                        {{ draft.desc.substring(0, 50) + "..." }}
                      </div>
                      <div class="text-caption mt-2">
                        {{ formatDate(draft.created_at) }}
                      </div>
                    </div>
                  </v-card-item>

                  <v-card-actions>
                    <v-btn size="small" class="mt-3" @click="toLink(draft.id)">
                      <v-icon size="20" icon="mdi-open-in-new"></v-icon>
                    </v-btn>
                    <v-btn
                      size="small"
                      class="mt-3"
                      @click="openModal(2, draft)"
                      v-if="userData.uuid == draft.user_uuid"
                    >
                      <v-icon size="20" icon="mdi-pen"></v-icon>
                    </v-btn>
                    <v-btn
                      size="small"
                      class="mt-3"
                      @click="deleteData(draft)"
                      v-if="userData.uuid == draft.user_uuid"
                    >
                      <v-icon size="20" icon="mdi-trash"></v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script>
import mainURL from "@/axios";

export default {
  data() {
    return {
      tab: null,
      dataFilter: {
        text: "",
        date: null,
      },
      isTable: true,

      rulesTextArea: [(v) => v.length <= 2048 || "Max 2048 characters"],
      rules: {
        required: (value) => !!value || "Required",
      },
      items: [],
      originalItems: [],
      headers: [
        { text: "Nama Draft", value: "title", sortable: true },
        { text: "Status", value: "status", sortable: true },
        // { text: "File", value: "file", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      userData: JSON.parse(localStorage.getItem("userData")),
      searchValue: "",
      insert: false,
      // draftUrl: this.$draftUrl,
      edit: false,
      dataForm: {
        id: null,
        title: null,
        file: null,
        desc: "",
        status: "pending",
        positions: [],
      },
      positions: [],
      selectedPositions: [],
      displaySelectedPositions: [],
    };
  },
  watch: {
    tab(newVal) {
      if (newVal === "2") {
        this.filterDataStatus("pending");
      } else if (newVal === "3") {
        this.filterDataStatus("approved");
      } else if (newVal === "4") {
        this.filterDataStatus("rejected");
      } else {
        this.items = [...this.originalItems];
      }
    },
    searchValue(newVal) {
      if (!this.isTable) {
        if (newVal !== "") {
          this.items = this.originalItems.filter((item) =>
            item.title.includes(newVal)
          );
        } else {
          // If search value is empty, reset items to original items
          this.items = [...this.originalItems];
        }
      }
    },

    positions: {
      handler(newVal) {
        // Filter posisi yang dipilih
        const selected = newVal.filter((item) => item.checked);

        // Untuk setiap posisi yang dipilih
        selected.forEach(({ title, value }) => {
          // Jika posisi ini belum ada di selectedPositions
          if (!this.selectedPositions.some((item) => item.value === value)) {
            // Tambahkan posisi ini ke selectedPositions dengan timestamp saat ini
            this.selectedPositions.push({
              title,
              value,
              timestamp: Date.now(),
            });
          }
        });

        // Hapus posisi dari selectedPositions jika tidak lagi dipilih
        this.selectedPositions = this.selectedPositions.filter((item) =>
          selected.some((selectedItem) => selectedItem.value === item.value)
        );

        // Urutkan selectedPositions berdasarkan timestamp
        this.selectedPositions.sort((a, b) => a.timestamp - b.timestamp);
      },
      deep: true,
    },
  },
  methods: {
    async changeDraftStatus(id, status = null) {
      try {
        this.overlay = true;
        const response = await mainURL.get(`/changestatusdraft/${id}`);

        if (response.status === 200) {
          this.getAllDraft();
          if (status == "pending") {
            this.filterDataStatus("pending");
          } else if (status == "approved") {
            this.filterDataStatus("approved");
          } else if (status == "rejected") {
            this.filterDataStatus("rejected");
          }
          this.tab = 0;
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
    filterData() {
      console.log(this.dataFilter);
    },

    toLink(item) {
      // console.log(item);
      this.$router.push(`/u-draft/${item}`);
    },
    async updateData() {
      try {
        const formData = new FormData();
        formData.append("title", this.dataForm.title);
        formData.append("desc", this.dataForm.desc);
        formData.append("status", this.dataForm.status);
        if (this.dataForm.file !== null) {
          formData.append("file", this.dataForm.file);
        }
        this.dataForm.positions = this.selectedPositions.map(
          (item) => item.value
        );
        this.dataForm.positions.forEach((position) => {
          formData.append("positions[]", position);
        });

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

        const response = await mainURL.post(
          `/draft/${this.dataForm.id}`,
          formData,
          config
        );

        if (response.status === 200) {
          this.closeModal(2);
          this.getAllDraft();
          this.uploadProgress = null;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.uploadProgress = null;
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.uploadProgress = null;
        this.closeModal(2);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID");
    },
    async insertData() {
      try {
        const formData = new FormData();
        formData.append("title", this.dataForm.title);
        formData.append("desc", this.dataForm.desc);
        formData.append("file", this.dataForm.file);
        this.dataForm.positions = this.selectedPositions.map(
          (item) => item.value
        );
        this.dataForm.positions.forEach((position) => {
          formData.append("positions[]", position);
        });

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

        const response = await mainURL.post("/draft", formData, config);

        if (response.status === 200) {
          this.closeModal(1);
          this.getAllDraft();
          this.uploadProgress = null;
          this.$showToast("success", "Success", response.data.message);
        } else {
          this.uploadProgress = null;
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.uploadProgress = null;
        this.closeModal(1);
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    async deleteData(item) {
      try {
        const confirmDelete = window.confirm(
          "Semua Data yang terkait akan ikut terhapus. Apakah Anda yakin ingin menghapus data?"
        );
        if (!confirmDelete) return;

        const response = await mainURL.delete(`/draft/${item.id}`);

        if (response.status === 200) {
          this.getAllDraft();
          this.$showToast("success", "Berhasil", response.data.message);
        } else {
          this.$showToast("error", "Sorry", response.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.response.data.message);
      }
    },
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
      ];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        this.dataForm.file = selectedFile;
      } else {
        this.$showToast(
          "error",
          "Error",
          "Hanya file PDF / DOC / DOCX yang diizinkan."
        );
        event.target.value = null;
      }
    },
    filterDataStatus(status) {
      this.items = this.originalItems.filter((item) => item.status === status);
    },
    async getAllDraft() {
      try {
        const response = await mainURL.get("/draft");
        if (response.status === 200) {
          this.items = response.data.data;
          this.originalItems = [...this.items];
        } else {
          this.$showToast("error", "Sorry", response.data.data.message);
        }
      } catch (error) {
        this.$showToast("error", "Sorry", error.data.data.message);
      }
    },
    async getPositions() {
      try {
        const response = await mainURL.get("/position");
        if (response.status === 200) {
          this.positions = response.data.data.map((item) => ({
            value: item.id,
            title: item.name,
            checked: false,
          }));
        } else {
          this.$showToast("error", "Sorry", "error get data position");
        }
      } catch (error) {
        this.$showToast("error", "Sorry", "error get data position");
      }
    },
    async openModal(type, item = null) {
      if (type === 1) {
        await this.getPositions();
        this.insert = true;
      } else if (type === 2) {
        if (item) {
          await this.getPositions();
          this.dataForm.id = item.id;
          this.dataForm.title = item.title;
          this.dataForm.desc = item.desc;
          this.displaySelectedPositions = item.positions.map((pos) => pos.name);

          this.edit = true;
        }
      }
    },
    closeModal(type) {
      if (type === 1) {
        this.resetForm();
        this.insert = false;
      } else if (type === 2) {
        this.resetForm();
        this.edit = false;
      }
    },
    resetForm() {
      this.dataForm = {
        id: null,
        title: null,
        file: null,
        desc: null,
        status: "",
        positions: [],
      };
      this.selectedPositions = [];
    },
  },
  mounted() {
    this.getAllDraft();
  },
};
</script>
