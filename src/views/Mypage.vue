<template>
  <div class="mypage">
    <p class="username">{{ name }}様</p>


    <span class="title">予約状況</span>
    <div v-for="(booking, index) in bookings" :key="index" class="booking">
      <table class="mybooking">
      <tr><th>店舗名:</th><td>{{ booking.storename}}</td></tr>
      <tr><th>予約日:</th><td>{{ booking.date }}</td></tr>
      <tr><th>予約時間:</th><td>{{ booking.time }}</td></tr>
      <tr><th>予約人数:</th><td>{{booking.number }}人</td><button class="button" id="booking-button">予約取消</button></tr>
      
      </table>
      
    </div>
    <span class="title">お気に入り店舗</span>
    <p>全{{ stores.length }}件</p>
    <div class="flex wrap store-flex">
      <div class="store-card" v-for="(store, index) in stores" :key="index">
        
          <img :src="store.image" alt="" class="store-image image">
       
       
        <span class="store-name">{{ store.name }}</span>
        <img src="../assets/heart.png" alt="" class="png">
      
        <div class="flex">
          <p class="area">#{{ store.area }}</p>
          <p class="genre">#{{ store.genre }}</p>
       
        </div>
        <button class="button" @click="$router.push({
        path: '/store/' + store.id,
        params:{ id: store.id },
        })">店舗詳細・予約</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:"おなまえ",
      bookings:[
        {id:1,storename:"仙人",date:"2021-05-21",time:"19:00",number:2},
        {id:2,storename:"仙人",date:"2021-05-21",time:"19:00",number:2}
      ],
      stores:[
        {id:1,name:"仙人",area:"東京",genre:"寿司",image:"https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg"},
        {id:2,name:"仙人",area:"東京",genre:"寿司",image:"https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg"},
        {id:3,name:"仙人",area:"東京",genre:"寿司",image:"https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg"},
        {id:4,name:"仙人",area:"東京",genre:"寿司",image:"https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg"},
        {id:5,name:"仙人",area:"東京",genre:"寿司",image:"https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg"}
      ],
    }
  },
}
</script>
<style scoped>
.mypage{
  width: 60%;
  margin: 50px auto;
}
.username{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
}
.title{
  font-size: 18px;
  font-weight: bold;
  border-bottom: 3px solid #ffa500;
  display: inline-block;
  margin: 20px 0;
}
/* ====================
      予約状況
==================== */
.mybooking{
  width: 60%;
  margin: 0 auto 30px;
  background-color: #fffaf2;
  border-left: 4px solid #ffa500;
  line-height: 1.7;
}
th{
  padding: 3px;
  width: 30%;
  text-align: left;
}
td{
  width: 40%;
}
h3{
  margin: 20px;
}
#booking-button{
  background-color: #D90303;
  margin: 0 0 5px 20px;
}
/* ====================
    お気に入り店舗
==================== */
.store-card{
  width: 30%;
  position: relative;
  margin: 30px 1% 0 1%;
  border: 1px solid #c2c2c2;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
}
.png{
  position: absolute;
  right: 10px;
}
.store-name{
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;
}
.button{
  width: 60%;
  padding: 7px 15px;
  margin-left: 50%;
  transform: translate(-50%);
  margin-bottom:30px;
}
.area,.genre{
  margin: 15px 0 20px 10px;
  color:gray;
}

</style>