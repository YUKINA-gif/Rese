<template>
  <div id="main">
    <!-- メイン画像 -->
    <img
      src="../assets/italian.jpg"
      alt="main_image"
      class="image main_image"
    />
    <div class="search">
      <!-- 店舗検索 -->
      <h2>店舗検索</h2>
      <div class="flex search_flex">
        <select name="エリア" v-model="searchArea">
          <option value="" hidden class="pull_down">エリア </option>
          <option value="0">すべて</option>
          <option v-for="(area, index) in areas" :key="index" :value="area.id"
            >{{ area.area }}
          </option>
        </select>

        <select name="ジャンル" v-model="searchGenre">
          <option value="" hidden class="pull_down">ジャンル</option>
          <option value="0">すべて</option>
          <option
            v-for="(genre, index) in genres"
            :key="index"
            :value="genre.id"
            >{{ genre.genre }}</option
          >
        </select>
        <input type="serch" placeholder="店名" v-model="searchStoreName" />
        <button type="submit" class="button search_button" @click="storeSearch">
          検索
        </button>
      </div>
    </div>

    <!-- 店舗一覧 -->
    <div class="stores_container">
      <h2 id="store_title">店舗一覧</h2>
      <p v-if="searchResult">検索店舗はありません</p>
      <div class="flex wrap store_flex" v-else>
        <vue-loading
          type="spin"
          color="#ffa500"
          :size="{ width: '60px', height: '60px' }"
          v-if="loading"
          class="loading"
        ></vue-loading>
        <div
          class="store_card"
          v-for="(store, index) in stores"
          :key="index"
          v-else
        >
          <img
            :src="
              'https://rese-image.s3.ap-northeast-3.amazonaws.com/' +
                store.image
            "
            alt=""
            class="store_image image"
          />
          <div>
            <div class="flex store_heart">
              <span class="store_name">{{ store.name }}</span>
              <Heart :val="store" />
            </div>
            <div class="flex">
              <p>#{{ store.area.area }}</p>
              <p>#{{ store.genre.genre }}</p>
            </div>
            <button
              class="button store_button"
              @click="
                $router.push({
                  path: '/detail/' + store.id,
                  params: { id: store.id },
                })
              "
            >
              店舗詳細・予約
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- フッター -->
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import axios from "axios";
import { VueLoading } from "vue-loading-template";
import Heart from "../components/Heart.vue";
export default {
  components: {
    Footer,
    VueLoading,
    Heart,
  },
  data() {
    return {
      stores: [],
      areas: [],
      genres: [],
      searchArea: "",
      searchGenre: "",
      searchStoreName: "",
      heart: "",
      searchResult: false,
      loading: false,
      isActive: false,
    };
  },
  methods: {
    // 店舗一覧
    async getStores() {
      this.loading = true;
      await axios
        .get(
          "https://rese-booking.herokuapp.com/api/stores/" +
            this.$store.state.user.id
        )
        .then((response) => {
          this.stores = response.data.item.store;
          this.areas = response.data.item.area;
          this.genres = response.data.item.genre;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 店舗検索
    async storeSearch() {
      this.loading = true;
      await axios
        .get(
          "https://rese-booking.herokuapp.com/api/storesSearch/" +
            this.$store.state.user.id,
          {
            params: {
              name: this.searchStoreName,
              area_id: this.searchArea,
              genre_id: this.searchGenre,
            },
          }
        )
        .then((response) => {
          this.stores = response.data.store;
          this.searchResult = false;
          this.loading = false;
        })
        .catch(() => {
          this.searchResult = true;
          this.loading = false;
        });
    },
  },
  created() {
    this.getStores();
  },
};
</script>

<style scoped>
/* ====================
      メイン画像
==================== */
  .main_image {
    height: 580px;
  }
/* ====================
      店舗検索
==================== */
  .search {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -80%);
    background: #fff;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
    width: 60%;
    padding: 25px;
  }
  select,
  input {
    padding: 7px;
    margin-right: 10px;
  }
  select {
    width: 20%;
  }
  input {
    width: 40%;
  }
  h2 {
    margin-bottom: 10px;
  }
  .search_button,
  .delete_search {
    width: 10%;
    line-height: 28px;
  }
  .delete_search {
    background-color: brown;
    margin-left: 10px;
  }
/* ====================
    店舗一覧
==================== */
  #store_title {
    font-size: 22px;
    margin-left: 20px;
  }
  .stores_container {
    width: 95%;
    margin: 50px auto;
    line-height: 2;
  }
  .store_card {
    width: 19%;
    position: relative;
    margin: 30px 5px 0 5px;
    border: 1px solid #c2c2c2;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  }
  .store_name {
    font-weight: bold;
    font-size: 20px;
  }
  .store_heart {
    justify-content: space-between;
  }
  .png {
    margin-right: 10px;
  }
  .store_button {
    width: 70%;
    padding: 7px 15px;
    margin-left: 50%;
    transform: translate(-50%);
    margin-bottom: 30px;
    font-size: 15px;
  }
  p {
    margin: 0 0 10px 10px;
    color: gray;
  }
  span {
    margin-left: 10px;
  }
  .pagination {
    width: 150px;
    list-style: none;
    margin: 0 auto 20px auto;
    justify-content: space-around;
  }
  .page_ui {
    font-size: 20px;
  }
/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .store_card {
    width: 48%;
    margin: 20px auto;
  }
  .store_button {
    width: 80%;
  }
  .search_flex {
    flex-wrap: wrap;
  }
  .search {
    width: 70%;
    text-align: center;
  }
  select {
    width: 100%;
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    margin-bottom: 10px;
  }
  .search_button,
  .delete_search {
    height: 40px;
    width: 40%;
    margin: 0 auto;
  }
}
</style>
