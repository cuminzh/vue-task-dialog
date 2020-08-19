<template>
  <v-app>
    <task-dialog/>
  </v-app>
</template>

<script>
import TaskDialog from "./views/table-task-dialog/TaskDialog";
export default {
  name: 'App',
  components:{TaskDialog},
  data: () => ({
    //
  }),
};
</script>
