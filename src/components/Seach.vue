<template>
  <div class="search">
    <h2>店舗検索</h2>
    <div class="flex">
      <select name="エリア">
        <option value="0" hidden class="pull-down">エリア
        </option>
      <option v-for="(area, index) in areas" :key="index" :value="area.id">{{ area.area }}</option>
      </select>

      <select name="ジャンル">
      <option value="0" hidden class="pull-down">ジャンル</option>
      <option v-for="(genre, index) in genres" :key="index" :value="genre.id">{{ genre.genre }}</option>
      </select>
      <input type="serch" placeholder="店名">
      <button type="submit" class="button">検索</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areas:[
        {id: 1,area:"東京"},
        {id: 2,area:"大阪"},
        {id: 3,area:"福岡"},
      ],
      genres:[
        {id: 1,genre:"寿司"},
        {id: 2,genre:"焼肉"},
        {id: 3,genre:"居酒屋"},
        {id: 4,genre:"イタリアン"},
        {id: 5,genre:"ラーメン"},
      ]
    }
  },
}
</script>

<style scoped>
.search{
  position: absolute;
  top: 92%;
  left: 50%;
  transform: translate(-50%,-92%);
  background: #fff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  width: 60%;
  height: 75px;
  padding: 15px;
}
select,input{
  padding: 7px;
  margin-right: 10px;
}
select{
  width: 20%;
}
input{
  width: 40%;
}
h2{
  margin-bottom: 10px;
}
.button{
  width: 10%;
  line-height: 28px;
}
</style>