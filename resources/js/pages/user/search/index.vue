<template>
    <div>
        <v-card class="auth-card pa-4 pt-5">
            <v-card-title class="text-2xl font-weight-bold">
                Cari File
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="searchFile">
                    <v-container>
                        <v-row no-gutters>
                            <v-col cols="12" sm="6">
                                <v-sheet class="ma-2 pa-2">
                                    <v-text-field placeholder="Cari File" autofocus v-model="selectedName" />
                                </v-sheet>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-sheet class="ma-2 pa-2">
                                    <v-select label="Pilih Kategori" :items="categories" v-model="selectedCategory"
                                        variant="solo-filled"></v-select>
                                </v-sheet>
                            </v-col>
                            <v-col cols="12" sm="2">
                                <v-sheet class="ma-2 pa-2 d-flex justify-center">
                                    <v-btn class="ma-2" variant="text" icon="mdi-magnify" color="#5865f2"
                                        type="submit"></v-btn>
                                </v-sheet>
                            </v-col>
                        </v-row>

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
                                <v-col cols="12" md="12" v-if="items != null && items.length == 0">
                                    <v-row class="text-center">
                                        <v-col cols="12">
                                            <v-icon size="64" color="grey lighten-2">mdi-folder-search-outline</v-icon>
                                        </v-col>
                                        <v-col cols="12">
                                            <span class="subtitle-1">Tidak ada file yang ditemukan</span>
                                        </v-col>
                                        <v-col cols="12">
                                            <span class="caption">Mohon periksa kembali nama file dan kategori</span>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col v-if="items != null && items.length > 0" v-for="(item, index) in items" :key="index"
                                    cols="12" md="6">
                                    <v-card class="mx-auto" color="primary" variant="tonal">
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

                                            <v-btn class="ma-2" variant="text" icon="mdi-heart" color="blue-lighten-2"
                                                v-if="item.file.favorite" @click="favorite(item.file.id)"></v-btn>
                                            <v-btn class="ma-2" variant="text" icon="mdi-heart-outline" v-else
                                                color="blue-lighten-2" @click="favorite(item.file.id)"></v-btn>
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
            items: null,
            categories: null,
            selectedCategory: null,
            selectedName: null,
        };
    },
    methods: {
        toDetail(id) {
            this.$router.push(`/u-filedetail/${id}`);
        },
        searchFile() {
            this.getFileSearch(this.selectedName, this.selectedCategory);
        },
        async favorite(id) {
            try {
                const response = await mainURL.get(`/user/setfavfile/${id}`);
                if (response.status === 200) {
                    this.getFileSearch();
                    this.$showToast("success", "Success", response.data.message);
                } else {
                    this.getFileSearch();
                    this.$showToast("error", "Sorry", response.data.message);
                }
            } catch (error) {
                this.$showToast("error", "Sorry", error.response.data.message);
            }
        },
        async getFileSearch(name = null, category = null) {
            try {
                let url = "/user/search?";

                if (name !== null) {
                    url += `name=${name}`;
                }

                if (category !== null) {
                    url += (name !== null ? "&" : "") + `category=${category}`;
                }

                const response = await mainURL.get(url);

                if (response.status === 200) {
                    this.items = response.data.data;
                } else {
                    this.$showToast("error", "Sorry", response.data.data.message);
                }
            } catch (error) {
                this.$showToast("error", "Sorry", error.data.data.message);
            }
        },

        async getCategory() {
            try {
                const response = await mainURL.get("/user/category");

                if (response.status === 200) {
                    this.categories = response.data.data.map(
                        (item) => ({
                            value: item.id,
                            title: item.name,
                        })
                    );
                } else {
                    this.$showToast("error", "Sorry", response.data.data.message);
                }
            } catch (error) {
                this.$showToast("error", "Sorry", error.data.data.message);
            }
        }
    },
    mounted() {
        this.getFileSearch();
        this.getCategory();
    },
};
</script>
