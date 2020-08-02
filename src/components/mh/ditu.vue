<template>
  <div class="mh-map"></div>
</template>
<script>
import echarts from "echarts";
import { getMapJson } from "./getStatic"
export default {
  data() {
    return {
        id:"mh-map",
        filePre:""
    };
  },
  mounted() {
      this.getFilePre()
      console.log('filePre',this.filePre)
  },
  methods:{
      getFilePre(){
          getMapJson().then(re => {
              this.filePre=re
          })
      },
      echartsInit(call){

      }
  }
};
</script>
<style scoped lang="scss">
</style>