<template>
  <div>
    <VuePdfEmbed annotation-layer text-layer :source="pdfUrl" />
  </div>
</template>

<script>
import VuePdfEmbed from "vue-pdf-embed";

// essential styles
import "vue-pdf-embed/dist/style/index.css";

// optional styles
import PdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import { GlobalWorkerOptions } from 'vue-pdf-embed/dist/index.essential.mjs';
import "vue-pdf-embed/dist/style/annotationLayer.css";
import "vue-pdf-embed/dist/style/textLayer.css";

GlobalWorkerOptions.workerSrc = PdfWorker

export default {
  props: {
    pdfUrl: {
      type: String,
      required: true,
    },
  },
};
</script>
