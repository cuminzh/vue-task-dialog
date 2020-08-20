<template>
  <v-app>
    <v-btn @click="showDialog">显示Dialog</v-btn>
    <task-dialog :show="show"/>
  </v-app>
</template>

<script>
import TaskDialog from "./views/table-task-dialog/TaskDialog";
export default {
  name: 'App',
  components:{TaskDialog},
  data: () => ({
    show: false
    //
  }),
  methods:{
    showDialog(){
      this.show = true
    }
  }
};
</script>
