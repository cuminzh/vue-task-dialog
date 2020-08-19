<template>
  <div>
    <div slot="header">
      <v-container fluid class="pl-5 pr-5 pt-5 pb-0">
        <v-row no-gutters>
          <v-col>选择项目</v-col>
        </v-row>
        <v-row>
          <v-spacer/>
          <v-col cols="10">
            <div class="filter">
<!--              <div class="filter-item" v-if="userType==1">-->
<!--                <v-select-->
<!--                    v-model="params.firstBrandId"-->
<!--                    :items="brands"-->
<!--                    item-text="name"-->
<!--                    item-value="id"-->
<!--                    class="input-select"-->
<!--                    placeholder="请选择品牌"-->
<!--                    hide-details>-->
<!--                </v-select>-->
<!--              </div>-->
              <div class="filter-item">
                <v-select
                    v-model="params.scheduleType"
                    :items="scheduleTypes"
                    item-text="name"
                    item-value="val"
                    class="input-select"
                    placeholder="请选择档期"
                    @change="searchList"
                    hide-details
                />
              </div>
              <div class="filter-item">
                <v-select
                    v-model="params.activityType"
                    :items="activityTypes"
                    item-text="name"
                    item-value="val"
                    class="input-select"
                    placeholder="请选择项目类型"
                    @change="searchList"
                    hide-details
                />
              </div>
              <div class="filter-item">
                <v-text-field
                    v-model.trim="params.projectName"
                    placeholder="项目名称"
                    class="input-text"
                    @keyup.enter="search"
                    hide-details
                />
              </div>
              <v-btn color="primary" small @click="searchList()" elevation="0" class="mr-2">
                <v-icon small>search</v-icon>
                搜索
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-data-table
        class="fixed-dialog-footer"
        :headers="headers"
        :items="list"
        item-key="id"
        fixed-header
        :options.sync="pagination"
        :no-data-text="dataText"
        :server-items-length="total"
        show-select
        single-select
        v-model="selectProject"
        hide-default-footer
    >
      <template v-slot:item.projectOrder="{item}">
        {{item.projectOrder}}
        <br/>
        {{item.creationDate | format("YYYY-MM-DD HH:mm")}}
      </template>
      <template v-slot:item.projectNum="{ item }">
        {{item.projectNum}}
        <br/>
        {{item.projectName}}
      </template>

      <template v-slot:item.activityBrand="{ item }">
        {{item.customerName}}
        <br/>
        {{item.activityBrand}}
      </template>
      <template v-slot:item.activityType="{ item }">
        {{scheduleTypeObj[item.scheduleType]?scheduleTypeObj[item.scheduleType].name:'未知'}}
        <br/>
        {{activityTypeObj[item.activityType]?activityTypeObj[item.activityType].name:'未知'}}
      </template>
      <template v-slot:item.startTime="{ item }">
        起：{{dayjs(item.startTime).format("YYYY-MM-DD")}}
        <br/>
        止：{{dayjs(item.endTime).format("YYYY-MM-DD")}}
      </template>
      <template
          v-slot:item.status="{ item }"
      >{{statusObj[item.status]?statusObj[item.status].name:'未知'}}
      </template>
    </v-data-table>
    <div slot="footer" class="text-right">
      <v-container fill-height>
        <v-row no-gutters align="center" justify="center">
          <v-col class="text-center">
            <v-btn color="success" elevation="0" width="100" small @click="callback(selectProject)">
              确定
            </v-btn>
            <v-btn class="ml-4" color="grey" elevation="0" width="100" small @click="close">
              取消
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
  import {PRJ_SCHEDULE_TYPES, PRJ_ACTIVITY_TYPES, PRJ_STATUS} from "../../model/model-type";
  import {Tools} from "../../utils/tools";
  import dayjs from "dayjs"

  export default {
    name: "TaskDialog",
    props: ["search", "callback", "close", "list", "total", "pagination"],
    data(){
      return{
        scheduleTypes: PRJ_SCHEDULE_TYPES,
        activityTypes: PRJ_ACTIVITY_TYPES,
        statusObj: null,
        status: PRJ_STATUS,
        scheduleTypeObj: null,
        activityTypeObj: null,
        headers: [
          {
            text: "项目序号/创建时间",
            value: "projectOrder",
            sortable: false,
            align: "left",
            width: "150"
          },
          {
            text: "项目编号/项目名称",
            value: "projectNum",
            sortable: false,
            align: "left",
            width: "140"
          },
          {
            text: "客户/品牌",
            value: "activityBrand",
            sortable: false,
            align: "left",
            width: "90"
          },
          {
            text: "档期/活动类型",
            value: "activityType",
            sortable: false,
            align: "left",
            width: '120'
          },
          {
            text: "活动时间",
            value: "startTime",
            sortable: false,
            align: "left",
            width: '130'
          },
          // {text: "积分", value: "points", sortable: false, align: "left", width: '60'},
          {text: "状态", value: "status", sortable: false, align: "left", width: '80'},
        ],
        selectProject: [],
        dayjs: dayjs,
        params: {
          firstBrandId: "",
          scheduleType: "",
          activityType: "",
          projectName: "",
          status: ""
        },
        dataText: '当前暂无数据'
      }
    },
    mounted() {
      this.scheduleTypeObj = Tools.arrToObj(this.scheduleTypes, "val");
      this.activityTypeObj = Tools.arrToObj(this.activityTypes, "val");
      this.statusObj = Tools.arrToObj(this.status, "val");
    },
    methods: {
      searchList() {
        this.search(this.params)
      }
    }
  }
</script>

<style scoped>

</style>
