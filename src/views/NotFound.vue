<template>
  <div class="not_found">
    <h2> 404 Not Found</h2>
    <p>ページがありません</p>
    <button class="button" @click="$router.push('/')">トップページへ</button>
  </div>
</template>

<style scoped>
  .not_found{
    width: 100%;
    text-align: center;
  }
  h2{
    font-size: 30px;
    margin: 120px 0 20px 0;
  }
  p{
    font-size: 25px;
  }
  .button{
    margin-top: 20px;
  }
</style>