<template>
  <div class="footer flex">
    <div class="flex">
      <h1>Rese</h1>
    </div>
    <div class="page_back">
      <p @click="scrollTop"><span>▲</span>ページ上部へ戻る</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    scrollTop: function() {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    },
  },
};
</script>

<style scoped>
  .footer {
    width: 60%;
    margin: 0 auto;
    border-top: 1px solid #c2c2c2;
    justify-content: space-between;
  }
  h1 {
    color: #ffa500;
    font-size: 25px;
    margin: 15px 0;
  }
  .management{
    margin: 20px 30px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
  }
  .page_back {
    cursor: pointer;
    font-size: 15px;
    border: 1px solid #c2c2c2;
    border-radius: 2px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
    padding: 5px;
    height: 15px;
  }
  span {
    color: red;
  }
</style>
