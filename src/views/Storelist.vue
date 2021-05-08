<template>
  <div id="main">
    <img src="../assets/italian.jpg" alt="mainimage" class="image mainimage" />
    <Search />

    <div class="stores-container">
      <h2 id="store-title">店舗一覧</h2>
      <div class="flex wrap store-flex">
        <div class="store-card" v-for="(store, index) in getItems" :key="index">
          <img :src="store.image" alt="" class="store-image image" />

          <span class="store-name">{{ store.name }}</span>
          <img src="../assets/heart.png" alt="" class="png" />

          <div class="flex">
            <p>#{{ store.area }}</p>
            <p>#{{ store.genre }}</p>
          </div>
          <button
            class="button store-button"
            @click="
              $router.push({
                path: '/detail/' + store.id,
                params: { id: store.id },
              })">
            店舗詳細・予約
          </button>
        </div>
      </div>
    </div>
    <paginate
      class="flex pagination"
      :page-count="getPage"
      :prev-text = "'<'"
      :next-text = "'>'"
      :click-handler="paginateClickCallback"
      :container-class = "'page-ui'"
    ></paginate>
    <Footer />
  </div>
</template>

<script>
import Search from "../components/Seach";
import Footer from "../components/Footer";
import paginate from 'vuejs-paginate';
export default {
  components: {
    Search,
    Footer,
    paginate
  },
  data() {
    return {
      stores: [
        {
          id: 1,
          name: "仙人",
          area: "東京",
          genre: "寿司",
          image:
            "https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg",
        },
        {
          id: 2,
          name: "仙人",
          area: "東京",
          genre: "寿司",
          image:
            "https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg",
        },
        {
          id: 3,
          name: "仙人",
          area: "東京",
          genre: "寿司",
          image:
            "https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg",
        },
        {
          id: 4,
          name: "仙人",
          area: "東京",
          genre: "寿司",
          image:
            "https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg",
        },
        {
          id: 5,
          name: "仙人",
          area: "東京",
          genre: "寿司",
          image:
            "https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg",
        },
      ],
      currentPage:1,
      parPage:12,
    };
  },
  computed:{
    getItems: function () {
      let start = (this.currentPage - 1) * this.parPage;
      let end = this.currentPage * this.parPage;
      return this.stores.slice(start, end);
    },
    getPage: function() {
      return Math.ceil(this.stores.length / this.parPage);
    }
  },
  methods: {
    paginateClickCallback: function (pageNum) {
      this.currentPage = Number(pageNum);
    },
  },
};
</script>

<style scoped>
/* ====================
    メイン画像
==================== */
.mainimage {
  height: 580px;
}
/* ====================
    店舗一覧
==================== */
#store-title {
  font-size: 22px;
  margin-left: 20px;
}
.stores-container {
  width: 95%;
  margin: 50px auto;
  line-height: 2;
}
.store-card {
  width: 22.5%;
  position: relative;
  margin: 30px 1% 0 1%;
  border: 1px solid #c2c2c2;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
}
.png {
  position: absolute;
  right: 10px;
}
.store-name {
  font-weight: bold;
  font-size: 20px;
}
.store-button {
  padding: 7px 15px;
  margin-left: 50%;
  transform: translate(-50%);
  margin-bottom: 30px;
  font-size: 15px;
}
p {
  margin: 15px 0 20px 10px;
  color: gray;
}
span {
  margin-left: 10px;
}

.pagination{
  width: 150px;
  list-style: none;
  margin: 0 auto 20px auto;
  justify-content: space-around;
  
}
.page-ui{
  font-size: 20px;
}
</style>
