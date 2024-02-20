<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol cols="12" md="12">
      <AnalyticsCongratulations />
    </VCol>

    <VCol cols="12" sm="4">
      <VRow>
        <!-- 👉 Profit -->
        <VCol cols="12" md="6">
          <CardStatisticsVertical
            v-bind="{
              title: 'Total File',
              image: docs,
              stats: `${tFile}`,
            }"
          />
        </VCol>

        <!-- 👉 Sales -->
        <VCol cols="12" md="6">
          <CardStatisticsVertical
            v-bind="{
              title: 'Total User',
              image: user,
              stats: `${tUser}`,
            }"
          />
        </VCol>
      </VRow>
    </VCol>

  </VRow>
</template>

<script>
import AnalyticsCongratulations from "@/views/dashboard/AnalyticsCongratulations.vue";
import AnalyticsFinanceTabs from "@/views/dashboard/AnalyticsFinanceTab.vue";
import AnalyticsOrderStatistics from "@/views/dashboard/AnalyticsOrderStatistics.vue";
import AnalyticsProfitReport from "@/views/dashboard/AnalyticsProfitReport.vue";
import AnalyticsTotalRevenue from "@/views/dashboard/AnalyticsTotalRevenue.vue";
import AnalyticsTransactions from "@/views/dashboard/AnalyticsTransactions.vue";

// Images
import chart from "@images/cards/chart-success.png";
import card from "@images/cards/credit-card-primary.png";
import docs from "@images/cards/docs.png";
import paypal from "@images/cards/paypal-error.png";
import user from "@images/cards/user.png";
import wallet from "@images/cards/wallet-info.png";


import mainURL from "@/axios";

export default {
  components: {
    AnalyticsCongratulations,
    AnalyticsFinanceTabs,
    AnalyticsOrderStatistics,
    AnalyticsProfitReport,
    AnalyticsTotalRevenue,
    AnalyticsTransactions,
  },
  data() {
    return {
      userData: null,
      userToken: null,
      chart: chart,
      card: card,
      paypal: paypal,
      wallet: wallet,
      docs:docs,
      user:user,
      tFile: null,
      tUser: null,
    };
  },
  methods: {
    getUserDataAndToken() {
      const savedUserData = localStorage.getItem("userData");
      const savedUserToken = localStorage.getItem("userToken");

      if (savedUserData && savedUserToken) {
        this.userData = JSON.parse(savedUserData);
        this.userToken = savedUserToken;
      }
    },

    async getTotalFile() {
      try {
        const response = await mainURL.get("/total-file");

        if (response.status === 200) {
          this.tFile=response.data.data
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
    async getTotalUser() {
      try {
        const response = await mainURL.get("/total-user");

        if (response.status === 200) {
          this.tUser=response.data.data
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
    }
  },
  mounted() {
    this.getTotalFile();
    this.getTotalUser();
  },
};
</script>
