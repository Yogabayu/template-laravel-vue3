<template>
  <div>
    <h1>File</h1>
    <vue-pdf-embed :source="source1" />

    <!-- <h1>Base64</h1>
    <vue-pdf-embed :source="source2" /> -->
  </div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed'; // OR THE FOLLOWING IMPORT FOR VUE 2// import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
export default {
  components: {
    VuePdfEmbed,
  },
  data() {
    return {
      source1: 'http://localhost:8000/file/file/Design_and_Implementation_Web_Based_Application_of_1709441663.pdf',
      source2: 'https://templatevue.yogabayuap.com/file/file/IK.008%20Proses%20Persetujuan%20Pinjaman_1709275201.pdf#toolbar=0',
    }
  },
}
</script>
