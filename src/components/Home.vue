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
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">添加学生</el-button>
          </el-col>
        </el-row>
        <!-- 学生列表区域 -->
        <el-table :data="tableData" height="250" border style="width: 100%" stripe>
          <el-table-column prop="id" label="学号" width="100" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" width="100" align="center"></el-table-column>
          <el-table-column prop="birth" label="出生年月日" width="150" align="center"></el-table-column>
          <el-table-column prop="math" label="数学" align="center"  width="150"></el-table-column>
          <el-table-column prop="java" label="Java" align="center"  width="150"></el-table-column>
          <el-table-column prop="english" label="英语" align="center"  width="150"></el-table-column>
          <el-table-column prop="sports" label="体育" align="center"  width="150"></el-table-column>
          <el-table-column label="操作" width="180px" align="center">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" ></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" ></el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
        tableData:[]
    }
  },
  created() {
      this.getStudentList()
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },
    async getStudentList(){
        const {data:res} = await this.$http.get('student')
            this.tableData=res;          
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