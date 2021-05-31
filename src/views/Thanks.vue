<template>
  <div class="thanks">
    <h3>会員登録が完了しました</h3>
    <button class="button" @click="$router.push('/login')">
      ログインページへ戻る
    </button>
  </div>
</template>

<style scoped>
  .thanks {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 120px;
  }
  h3 {
    font-size: 25px;
    margin-bottom: 15px;
  }
</style>
