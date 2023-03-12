<template>
  <div class="layout">
    <el-container>
      <el-header>
        <i class="logo"></i>
        <span class="title">{{Title}}</span>
        <div class="userinfo">
          <span class="username">{{userName}}</span>
          <!-- <el-dropdown
            trigger="click"
            class="username"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              {{userName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changepw">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <!-- <el-button class="logout" type="text" @click="logout">登出</el-button> -->
          <el-button type="warning" @click="logout">登出</el-button>
        </div>
      </el-header>
      <el-container class="maxheight">
        <aside>
          <el-menu
            :default-openeds="defaultOpeneds"
            :default-active="activeIndex"
            router
            :collapse="isCollapse"
            @open="openMenu"
          >
            <template v-for="item in menuData">
              <el-submenu
                v-if="item.menuItem.length > 0"
                :key="item.index"
                :index="item.index"
              >
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.title }}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="subitem in item.menuItem"
                    :key="subitem.index"
                    :index="subitem.index"
                  >
                    {{ subitem.title }}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-menu-item
                v-if="item.menuItem.length == 0"
                :key="item.index"
                :index="item.index"
              >
                <i class="el-icon-setting"></i>
                <span slot="title">{{ item.title }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </aside>
        <el-container>
          <el-main>
            <keep-alive :include="includedComponents">
              <router-view></router-view>
            </keep-alive>
          </el-main>
          <el-footer>Powered by JDF</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { allRoutes, resetRouter } from "@/router";
import { getStore,removeStore } from '@/utils/storage';
export default {
  data() {
    return {
      userName:"",
      isCollapse: false,
      defaultOpeneds: [],
      includedComponents:[],
      Title:"JDF"
    };
  },
  computed: {
    menuData() {
      let menuArr = [];
      let arr = allRoutes.filter(
        item => item.path !== "" && item.meta &&item.meta.title !== ""
      );;
      arr.forEach(item => {
        menuArr[Number(item.meta.index) - 1] = {
          index: item.path,
          icon: item.meta.icon,
          title: item.meta.title,
          menuItem: [],
        };
      });
      return menuArr;
    },
    // 菜單高亮
    activeIndex() {
      return this.$route.path;
    },
  },
  watch:{
  },
  created() {
    let routeData = this.$route;
    this.defaultOpeneds = [routeData.meta.parentIndex];
    this.userName=getStore("userName");
  },
  methods: {
    openMenu(index) {
      if (index.indexOf(this.defaultOpeneds[0]) !== -1) return;
      this.defaultOpeneds = [index];
    },
    selectMenu(index){
    },
    handleCommand(command) {
      console.log(command);
    },
    logout() {
      resetRouter();
      removeStore("token");
      removeStore("userName");
      removeStore("permissions");
      this.$router.push({path:"/login"})
    },
  },
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .logo {
    width: 50px;
    height: 50px;
    display: block;
    border-radius: 5%;
    background: url("~@/assets/images/logo.png") center center no-repeat;
    background-size: cover;
    float: left;
    margin-top: 5px;
    margin-right: 10px;
  }
  .el-container {
    height: 100%;
  }
  .maxheight {
    height: calc(100% - 60px);
  }
  .el-header,
  .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header {
    border-bottom: 1px solid #ccc;
    padding-right: 50px;
    .title {
      display: block;
      float: left;
      font-size: 24px;
      font-weight: 600;
    }
    .userinfo {
      float: right;
      .username {
        font-weight: 600;
        margin-right: 50px;
        height: 34px;
      }
      .logout {
        margin-right: 50px;
        font-weight: 600;
        color: #e6a23c;
      }
    }
  }
  .el-footer {
    border-top: 1px solid #ccc;
  }

  aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 200px;
    border-right: 1px solid #ccc;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: left;
    padding: 15px;
    flex: none;
    box-sizing: border-box;
    min-height: calc(100% - 61px);
    max-height: calc(100% - 61px);
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .el-menu {
    width: 200px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 3px;/*设置滚动条的宽度*/
    }
    &::-webkit-scrollbar-thumb {
      background-color: #929292;
    }
    &::-webkit-scrollbar-track {
      background-color: #eee;
    }
  }
  // .el-menu--collapse {
  //   width: 65px;
  // }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-submenu__title {
    text-align: left;
  }
  .el-menu-item {
    text-align: left;
    transition:border-color 0s;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
  .el-menu-item.is-active {
    background: #409EFF;
    color: #fff;
  }
}
</style>
