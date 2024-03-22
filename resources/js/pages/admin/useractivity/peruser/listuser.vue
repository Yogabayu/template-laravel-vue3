<template>
  <div>
    <VCard class="auth-card pa-4 pt-5">
      <VCardItem class="align-left">
        <VCardTitle class="text-2xl font-weight-bold">
          List User(s)
        </VCardTitle>
      </VCardItem>

      <div class="d-flex justify-end mb-6">
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
            <v-tooltip location="top" text="Lihat Detail">
              <template v-slot:activator="{ props }">
                <button v-bind="props">
                  <VIcon
                    size="20"
                    icon="bx-file-find"
                    color="#6c42f5"
                    @click="toLink(item.uuid)"
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
  data() {
    return {
      items: [],
      headers: [
        { text: "Nama", value: "name", sortable: true },
        { text: "Email", value: "email", sortable: true },
        { text: "Jabatan", value: "position", sortable: false },
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
    toLink(uuid) {
      this.$router.push(`/a-listuseractivity/${uuid}`);
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
  },
  mounted() {
    this.getAllUser();
  },
});
</script>
