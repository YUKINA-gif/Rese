<template>
  <div class="header flex">
    <h1 @click="$router.push('/')">Rese</h1>
    <nav class="nav">
      <ul class="flex">
        <li @click="$router.push('/mypage')">マイページ</li>
        <li @click="$router.push('/login')" v-if="this.$store.state.auth  == false">ログイン</li>
        <li @click="$router.push('/register')" v-if="this.$store.state.auth  == false">新規会員登録</li>
        <li @click="logout" v-else>ログアウト</li>
      </ul>
    </nav>
    <div class="hamburger" @click="hamburger()" :class="{ active: menu }">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <nav :class="{ open: menu }" class="menu_content">
      <ul class="hamburger_memu">
        <li><a href="/mypage">マイページ</a></li>
        <li v-if="this.$store.state.auth  == false"><a href="/login">ログイン</a></li>
        <li v-if="this.$store.state.auth  == false"><a href="/register">新規会員登録</a></li>
        <li @click="logout" v-else>ログアウト</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    hamburger() {
      this.menu = !this.menu;
    },
    logout(){
      this.$store.dispatch("logout");
    }
  },
};
</script>

<style scoped>
  .header {
    height: 60px;
    background-color: #ffa500;
    line-height: 60px;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  h1 {
    font-size: 28px;
    cursor: pointer;
  }
  .nav,
  h1 {
    color: #fff;
    margin-left: 20px;
  }
  .nav{
    position: absolute;
    right: 0;
  }
  .nav ul li {
    padding-right: 30px;
    font-weight: bold;
    cursor: pointer;
  }
  .menu_content{
    display: none;
  }
/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .nav {
    display: none;
  }
  .hamburger {
    width: 40px;
    height: 40px;
    position: absolute;
    cursor: pointer;
    z-index: 100;
    top: 8px;
    right: 20px;
    transition: 0.4s;
  }
  .hamburger span {
    position: absolute;
    display: block;
    width: 35px;
    height: 3px;
    background-color: #fff;
    transition: 0.3s;
  }
  .hamburger span:nth-of-type(1) {
    top: 10px;
  }
  .hamburger span:nth-of-type(2) {
    top: 20px;
  }
  .hamburger span:nth-of-type(3) {
    top: 30px;
  }
  .hamburger.active span:nth-of-type(1) {
    top: 20px;
    transform: rotate(45deg);
  }
  .hamburger.active span:nth-of-type(2) {
    opacity: 0;
  }
  .hamburger.active span:nth-of-type(3) {
    top: 20px;
    transform: rotate(-45deg);
  }
  .menu_content {
    display: block;
    width: 50%;
    text-align: center;
    position: fixed;
    transition: 0.3s;
    top: 60px;
    right: calc(-100% - 80px);
    background: rgb(255, 255, 255, 0.8);
    color: #333333;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
    z-index: 999;
  }
  .menu_content li {
    color: #333333;
    margin: 15px;
    padding: 5px;
    border-bottom: 0.5px solid #ffa500;
    text-decoration: none;
    display: block;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }
  .menu_content.open {
    right: 0;
  }
  .menu_content li a {
    text-decoration: none;
    color: #333333;
    display: block;
  }
}
</style>
