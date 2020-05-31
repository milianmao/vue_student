
<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>学生管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 内容主体区域 -->
    <el-main>
      <el-card class="box-card">
        <!-- 搜索与添加 -->
        <el-row :gutter="22">
          <el-col :span="6">
            <el-input
              placeholder="请输入内容"
              v-model="studentName.name"
              clearable
              @clear="getStudentList"
            >
              <el-button slot="append" icon="el-icon-search" @click="findStudentList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addStudentDialog">添加学生</el-button>
          </el-col>
          <!-- 导出表格 -->
          <el-col :span="3">
            <download-excel
              class="export-excel-wrapper"
              :data="json_data"
              :fields="json_fields"
              name="filename.xls"
            >
              <el-button type="primary">导出EXCEL</el-button>
            </download-excel>
          </el-col>
        </el-row>
        <!-- 学生列表区域 -->
        <el-table :data="tableData" height="600" border style="width: 100%" stripe>
          <el-table-column prop="id" label="学号" width="100" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" width="100" align="center"></el-table-column>
          <el-table-column prop="birth" label="出生年月日" width="150" align="center"></el-table-column>
          <el-table-column prop="math" label="数学" align="center" width="150"></el-table-column>
          <el-table-column prop="java" label="Java" align="center" width="150"></el-table-column>
          <el-table-column prop="english" label="英语" align="center" width="150"></el-table-column>
          <el-table-column prop="sports" label="体育" align="center" width="150"></el-table-column>
          <el-table-column label="操作" width="180px" align="center">
            <template slot-scope="scope">
              <!-- 修改 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showAlterDialog(scope.row.id)"
              ></el-button>
              <!-- 删除 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeStudentInfo(scope.row.id)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-s-data"
                size="mini"
                @click="showChart(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 添加学生弹窗 -->
      <el-dialog
        title="添加学生"
        :visible.sync="addDialogVisible"
        width="30%"
        @close="addDialogClose"
        :close-on-click-modal="false"
      >
        <!-- 内容主体 -->
        <el-form
          label-position="right"
          :model="addForm"
          :rules="addRules"
          ref="addFormRef"
          label-width="70px"
        >
          <el-form-item label="学号" prop="id">
            <el-input v-model="addForm.id"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="addForm.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生年月" prop="birth">
            <el-date-picker
              type="date"
              placeholder="选择出生日期"
              value-format="yyyy-MM-dd"
              format="”yyyy-MM-dd”"
              v-model="addForm.birth"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="数学" prop="math">
            <el-input v-model="addForm.math"></el-input>
          </el-form-item>
          <el-form-item label="JAVA" prop="java">
            <el-input v-model="addForm.java"></el-input>
          </el-form-item>
          <el-form-item label="英语" prop="english">
            <el-input v-model="addForm.english"></el-input>
          </el-form-item>
          <el-form-item label="体育" prop="sports">
            <el-input v-model="addForm.sports"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStudent">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改学生信息对话框 -->
      <el-dialog
        title="修改学生"
        :visible.sync="alterDialogVisible"
        width="30%"
        @close="alterDialogClose"
        :close-on-click-modal="false"
      >
        <!-- 内容主体 -->
        <el-form
          label-position="right"
          :model="alterForm"
          :rules="alterRules"
          ref="alterFormRef"
          label-width="70px"
        >
          <el-form-item label="学号" prop="id">
            <el-input v-model="alterForm.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="alterForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="alterForm.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生年月" prop="birth">
            <el-date-picker
              type="date"
              placeholder="选择出生日期"
              value-format="yyyy-MM-dd"
              format="”yyyy-MM-dd”"
              v-model="alterForm.birth"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="数学" prop="math">
            <el-input v-model="alterForm.math"></el-input>
          </el-form-item>
          <el-form-item label="JAVA" prop="java">
            <el-input v-model="alterForm.java"></el-input>
          </el-form-item>
          <el-form-item label="英语" prop="english">
            <el-input v-model="alterForm.english"></el-input>
          </el-form-item>
          <el-form-item label="体育" prop="sports">
            <el-input v-model="alterForm.sports"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="alterDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="alterStudent">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 图表对话框 -->
      <el-dialog
        title="成绩柱状图"
        :visible.sync="chartDialogVisible"
        width="50%"
        :close-on-click-modal="false"
      >
        <!-- 图表 -->
        <div id="mychart" style="width: 600px;height:400px;" ref="chartRef"></div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="chartDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
var echarts = require("echarts");
import JsonExcel from 'vue-json-excel'
export default {
  data() {
    var checkGread =(rule,value,callback)=>{
        const grade = /^-?\d{1,3}(?:\.\d{1,1})?$/;
      //  console.log(value<0&&value>100);
      if(value<0||value>100){
        return callback(new Error('请输入0-100的分数'));
      }
       if(value){
        if(!grade.test(value)){
          callback(new Error('成绩只能为数字且小数点后一位'));
        }else{
          callback();
        }
        }else{
       callback();
    }
    }
    return {
      tableData: [],
      chartData: [],
      json_data:[],
      Round: "",
      addDialogVisible: false,
      alterDialogVisible: false,
      chartDialogVisible: false,
      addForm: {
        id: "",
        name: "",
        sex: "",
        birth: "",
        math: null,
        java: null,
        english: null,
        sports: null
      },
      alterForm: {
        id: "",
        name: "",
        sex: "",
        birth: "",
        math: null,
        java: null,
        english: null,
        sports: null
      },
      studentName: {
        name: ""
      },
      addRules: {
        name: [{ required: true, message: "请输入学生姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birth: [{ required: true, message: "请选择出生年月", trigger: "change" }],
        math:[{validator:checkGread,trigger: "blur" }],
        java:[{validator:checkGread,trigger: "blur" }],
        english:[{validator:checkGread,trigger: "blur" }],
        sports:[{validator:checkGread,trigger: "blur" }]
      },
      alterRules: {
        name: [{ required: true, message: "请输入学生姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birth: [{ required: true, message: "请选择出生年月", trigger: "change" }],
        math:[{validator:checkGread,trigger: "blur" }],
        java:[{validator:checkGread,trigger: "blur" }],
        english:[{validator:checkGread,trigger: "blur" }],
        sports:[{validator:checkGread,trigger: "blur" }]
      },
      json_fields:{
          "姓名":"name",
          "数学":"math",
          "JAVA":"java",
          "英语":"english",
          "体育":"sports"
      },
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]
    };
  },
  components:{
    'download-excel': JsonExcel
  },
  created() {
    this.getStudentList();
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },
    //获取学生列表
    async getStudentList() {
      const { data: res } = await this.$http.get("student");
      this.tableData = res;
      this.json_data = res;
      // console.log( this.json_data);
    },
    // 添加学生
    addStudentDialog() {
      
      this.Round = this.getRound();
      this.getResult(this.Round);
      if (this.getResult) {
        this.addForm.id = this.Round;
        this.addDialogVisible = true;
      }
    },
    //获取学号随机数
    getRound() {
      return Math.ceil(Math.random() * 100);
    },
    //对学号的随机数进行验证
    getResult(Round) {
      var result = 0;
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id === Round) {
          result = 1;
        }
      }
      if (result === 0) {
        return 1;
      } else {
        this.addStudentDialog();
      }
    },
    //取消添加学生监听事件
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
      this.addForm.id = "";
      this.RoundID = "";
    },
    //确认添加学生监听
    addStudent() {
      this.$refs.addFormRef.validate(async voild => {
        if (!voild) return;
        const { data: res } = await this.$http.post("student", this.addForm);
        if (res !== "添加成功") {
          return this.$message.error("添加学生失败！");
        }
         console.log("ok");
        this.$message.success("添加学生成功！");
        this.addDialogVisible = false;
        this.getStudentList();
      });
    },
    // 展示修改学生对话框
    async showAlterDialog(id) {
      // console.log(id);
      const { data: res } = await this.$http.get("student/" + id);
      //  console.log(res);
      if (res === "无此学生") {
        return this.$message.error("无数据");
      }
      this.alterForm = res;
      this.alterDialogVisible = true;
    },
    // 修改学生信息
    alterStudent(id) {
      this.$refs.alterFormRef.validate(async validate => {
        if (!validate) return;
        const { data: res } = await this.$http.put(
          "student/" + this.alterForm.id,
          {
            name: this.alterForm.name,
            sex: this.alterForm.sex,
            birth: this.alterForm.birth,
            math: this.alterForm.math,
            java: this.alterForm.java,
            english: this.alterForm.english,
            sports: this.alterForm.sports
          }
        );
        if (res != "保存成功") {
          return this.$message.error("更新学生失败！");
        }
        this.alterDialogVisible = false;
        this.getStudentList();
        this.$message.success("更新学生成功！");
      });
    },
    alterDialogClose() {
      this.$refs.alterFormRef.resetFields();
    },
    // 删除学生
    async removeStudentInfo(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该学生, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      // console.log(confirmResult);
      if (confirmResult !== "confirm") {
        return this.$message.info("已经取消删除学生");
      }
      const { data: res } = await this.$http.delete("student/" + id);
      if (res !== "删除成功") {
        return this.$message.error("删除学生失败");
      }
      this.getStudentList();
      this.$message.success("删除学生成功");
    },
    async findStudentList() {
      // console.log(this.studentName);
      const { data: res } = await this.$http.get("findStudent", {
        params: { name: this.studentName.name }
      });
      // console.log(res);
      this.tableData = res;
      this.json_data = res;
    },
    //显示图表对话框
    showChart(id) {
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id === id) {
          this.chartData = this.tableData[i];
        }
      }
      this.chartDialogVisible = true;
      this.myChart();
      // console.log(this.chartData.math);
    },
    myChart() {
      this.$nextTick(_ => {
        // console.log("chartRef");
        // console.log(this);
        // console.log(this.$refs);
        // console.log(this.$refs.chartRef);
        var myChart = echarts.init(this.$refs.chartRef);
        var option = {
          title: {
            text: "成绩"
          },
          tooltip: {},
          legend: {
            data: ["分数"]
          },
          xAxis: {
            data: ["数学", "JAVA", "英语", "体育"]
          },
          yAxis: {},
          series: [
            {
              name: "分数",
              type: "bar",
              data: [
                this.chartData.math,
                this.chartData.java,
                this.chartData.english,
                this.chartData.sports
              ]
            }
          ]
        };
        myChart.setOption(option);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 15px;
  }
}
.el-main {
  background-color: #eaedf1;
}
.el-card {
  width: 66.2%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>