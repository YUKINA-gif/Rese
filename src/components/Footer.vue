<template>
  <div class="footer flex">
    <h1>Rese</h1>
    <div class="pageback">
      <p @click="scrollTop"><span>▲</span>ページ上部へ戻る</p>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    scrollTop:function(){
      window.scrollTo({
        top:0,
        behavior:"instant"
      });
    }
  }
}
</script>

<style scoped>
.footer{
  width:60%;
  margin: 0 auto;
  border-top:1px solid #c2c2c2;
  justify-content: space-between;
}
h1{
  color: #FFA500;
  font-size: 25px;
  margin: 15px 0;
}
p{
  cursor: pointer;
  font-size: 15px;
  border: 1px solid #c2c2c2;
  border-radius: 2px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  padding: 5px;
}
span{
  color: red;
}
</style>