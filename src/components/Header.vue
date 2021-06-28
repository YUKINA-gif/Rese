<template>
  <div :class="header" class="header flex">
    <!-- ヘッダー -->
    <h1 @click="$router.push('/')">
      <font-awesome-icon icon="store" class="icon title_icon" />Rese
    </h1>
    <div class="menu">
      <nav class="nav">
        <ul class="flex">
          <li @click="$router.push('/mypage')">
            <font-awesome-icon icon="home" class="icon" />マイページ
          </li>
          <li
            @click="$router.push('/login')"
            v-if="this.$store.state.auth == false"
          >
            <font-awesome-icon icon="door-open" class="icon" />
            ログイン
          </li>
          <li
            @click="$router.push('/register')"
            v-if="this.$store.state.auth == false"
          >
            <font-awesome-icon icon="user-plus" class="icon" />
            新規会員登録
          </li>
          <li @click="logout" v-else>
            <font-awesome-icon icon="check" class="icon" />ログアウト
          </li>
        </ul>
      </nav>
      <!-- ハンバーガーメニュー -->
      <div class="hamburger" @click="hamburger()" :class="{ active: menu }">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav :class="{ open: menu }" class="menu_content">
        <ul class="hamburger_memu">
          <li>
            <a href="/mypage">
              <font-awesome-icon
                icon="home"
                class="hamburger_icon"
              />マイページ</a
            >
          </li>
          <li v-if="this.$store.state.auth == false">
            <a href="/login">
              <font-awesome-icon
                icon="door-open"
                class="hamburger_icon"
              />ログイン</a
            >
          </li>
          <li v-if="this.$store.state.auth == false">
            <a href="/register">
              <font-awesome-icon
                icon="user-plus"
                class="hamburger_icon"
              />新規会員登録</a
            >
          </li>
          <li @click="logout" v-else>
            <font-awesome-icon icon="check" class="hamburger_icon" />
            ログアウト
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      header: "default",
    };
  },
  methods: {
    hamburger() {
      this.menu = !this.menu;
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
/* ====================
      ヘッダー
==================== */
  .header {
    height: 60px;
    line-height: 60px;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    background-color: #ffa500;
  }
  .custom a {
    color: #ffa500;
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
  .nav {
    position: absolute;
    right: 0;
  }
  .nav ul li {
    padding-right: 30px;
    font-weight: bold;
    cursor: pointer;
  }
  .menu_content {
    display: none;
  }
  .icon {
    width: 19px;
    height: auto;
    cursor: pointer;
    color: #fff;
    margin-right: 2px;
  }
  .title_icon {
    width: 30px;
    height: auto;
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
    cursor: pointer;
    z-index: 100;
    transition: 0.4s;
    margin-right: 15px;
  }
  .hamburger span {
    margin-top: 7px;
    display: inline-block;
    position: absolute;
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
    display: inline-block;
    text-decoration: none;
    color: #333333;
    display: block;
  }
  .hamburger_icon {
    margin-right: 3px;
  }
}
</style>