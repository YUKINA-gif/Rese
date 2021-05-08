<template>
  <div class="header flex">
    <h1 @click="$router.push('/')">Rese</h1>
    <nav v-if="nav" class="nav">
      <ul class="flex">
        <li @click="$router.push('/mypage')">マイページ</li>
        <li @click="$router.push('/login')">ログイン</li>
        <li @click="$router.push('/register')">新規会員登録</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default{
  data() {
    return {
      nav:true
    }
  },
}
</script>

<style scoped>
.header{
  height: 60px;
  background-color: #FFA500;
  line-height: 60px;
  padding:  0 20px;
  justify-content: space-between;
}
h1{
  font-size: 28px;
  cursor: pointer;
}
.nav,h1{
  color: #fff;
}
.nav ul li{
  padding-left: 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>
