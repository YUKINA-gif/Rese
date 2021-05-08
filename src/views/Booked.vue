<template>
  <div class="booked">
    <h3>ご予約ありがとうございます</h3>
    <button class="button" @click="$router.push('/')">戻る</button>
  </div>
</template>

<style scoped>
.booked {
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
