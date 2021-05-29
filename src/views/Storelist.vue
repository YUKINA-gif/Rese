<template>
  <div id="main">
    <!-- メイン画像 -->
    <img src="../assets/italian.jpg" alt="mainimage" class="image mainimage" />
    <div class="search">
      <!-- 店舗検索 -->
      <h2>店舗検索</h2>
      <div class="flex">
        <select name="エリア" v-model="seachArea">
          <option value="" hidden class="pull-down">エリア </option>
          <option
            v-for="(area, index) in areas"
            :key="index"
            :value="area.id"
            >{{ area.area }}</option
          >
        </select>

        <select name="ジャンル" v-model="seachGenre">
          <option value="" hidden class="pull-down">ジャンル</option>
          <option
            v-for="(genre, index) in genres"
            :key="index"
            :value="genre.id"
            >{{ genre.genre }}</option
          >
        </select>
        <input type="serch" placeholder="店名" />
        <button type="submit" class="button seach_button">検索</button>
      </div>
    </div>

    <!-- 店舗一覧 -->
    <div class="stores-container">
      <h2 id="store-title">店舗一覧</h2>
      <div class="flex wrap store-flex">
        <div class="store-card" v-for="(store, index) in getItems" :key="index">
          <img :src="store.image" alt="" class="store-image image" />
          <div>
            <div class="flex store-heart">
              <span class="store-name">{{ store.name }}</span>
              <div @click="favorite(store)">
                <img
                  src="../assets/heart.png"
                  alt=""
                  class="png"
                  v-if="checkFavorite(index)"
                />
                <img src="../assets/no-heart.png" alt="" class="png" v-else />
              </div>
            </div>
            <div class="flex">
              <p>#{{ store.area.area }}</p>
              <p>#{{ store.genre.genre }}</p>
            </div>
            <button
              class="button store-button"
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
    <!-- ページネーション -->
    <paginate
      class="flex pagination"
      :page-count="getPage"
      :prev-text="'<'"
      :next-text="'>'"
      :click-handler="paginateClickCallback"
      :container-class="'page-ui'"
    ></paginate>
    <!-- フッター -->
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import paginate from "vuejs-paginate";
import axios from "axios";
export default {
  components: {
    Footer,
    paginate,
  },
  data() {
    return {
      stores: [],
      areas: [],
      genres: [],
      currentPage: 1,
      parPage: 12,
      seachArea: "",
      seachGenre: "",
      heart: "",
    };
  },
  // ページネーション設定
  computed: {
    getItems: function() {
      let start = (this.currentPage - 1) * this.parPage;
      let end = this.currentPage * this.parPage;
      return this.stores.slice(start, end);
    },
    getPage: function() {
      return Math.ceil(this.stores.length / this.parPage);
    },
  },
  methods: {
    paginateClickCallback: function(pageNum) {
      this.currentPage = Number(pageNum);
    },
    // 店舗一覧
    getStores() {
      axios
        .get("http://127.0.0.1:8000/api/stores/" + this.$store.state.user.id)
        .then((response) => {
          this.stores = response.data.item.store;
          this.areas = response.data.item.area;
          this.genres = response.data.item.genre;
        });
    },
    // お気に入り店舗登録もしくは削除
    favorite(store) {
      // ログインしていなければログイン画面へ誘導
      if (this.$store.state.auth == true) {
        axios
          .post("http://127.0.0.1:8000/api/favorite", {
            user_id: this.$store.state.user.id,
            store_id: store.id,
          })
          .then((response) => {
            console.log(response);
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
          });
      } else {
        this.$router.replace("/login");
      }
    },
    // ユーザーお気に入り情報取得してハートに反映
    checkFavorite(index) {
      if (this.stores[index].favorites.length === 0) {
        return false;
      } else {
        return true;
      }
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
.mainimage {
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
.seach_button {
  width: 10%;
  line-height: 28px;
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
.store-name {
  font-weight: bold;
  font-size: 20px;
}
.store-heart {
  justify-content: space-between;
}
.png {
  margin-right: 10px;
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
.pagination {
  width: 150px;
  list-style: none;
  margin: 0 auto 20px auto;
  justify-content: space-around;
}
.page-ui {
  font-size: 20px;
}
/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .store-card {
    width: 100%;
    margin: 20px auto;
  }
  .store-button {
    width: 80%;
  }
  .search {
    width: 70%;
    text-align: center;
  }
  .flex {
    display: block;
  }
  select {
    width: 80%;
    margin-bottom: 10px;
  }
  input {
    width: 75%;
    margin-bottom: 10px;
  }
  .seach_button {
    width: 25%;
  }
}
</style>
