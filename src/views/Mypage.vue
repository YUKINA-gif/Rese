<template>
  <div class="mypage">
    <p class="username">{{ name }}様</p>
    <!-- 予約状況一覧 -->
    <span class="title">予約状況</span>
    <!-- 予約店舗0の場合表示 -->
    <p v-if="haveBooking">予約店舗はありません</p>
    <!-- 予約店舗がある場合表示 -->
    <div
      v-for="(booking, index) in bookings"
      :key="index"
      class="booking flex"
      v-else
    >
      <img :src="booking.store.image" class="image store_image" />
      <table class="mybooking">
        <tr>
          <th>店名:</th>
          <td>{{ booking.store.name }}</td>
        </tr>
        <tr>
          <th>予約日:</th>
          <td>{{ booking.booking_date }}</td>
        </tr>
        <tr>
          <th>予約時間:</th>
          <td>{{ booking.booking_time }}</td>
        </tr>
        <tr>
          <th>予約人数:</th>
          <td>{{ booking.booking_number }}人</td>
        </tr>
      </table>

      <div class="booking_button">
        <button
          class="button"
          id="booking_update_button"
          @click="openModal(booking)"
        >
          予約内容の変更
        </button>
        <button
          class="button"
          id="booking_delete_button"
          @click="openModalDel(booking)"
        >
          予約取消
        </button>
      </div>
    </div>
    <!-- 予約更新画面 -->
    <Modal v-if="modal" @close="closeModal" :val="postItem"></Modal>
    <!-- 予約削除画面 -->
    <ModalDel
      v-if="modal_del"
      @close="closeModalDel"
      :val="deleteItem"
    ></ModalDel>
    <!-- お気に入り店舗 -->
    <span class="title">お気に入り店舗</span>
    <p>全{{ favorites.length }}件</p>
    <p v-if="haveFavorite">お気に入り店舗はありません</p>
    <div class="flex wrap store_flex" v-else>
      <div class="store_card" v-for="(store, index) in favorites" :key="index">
        <img :src="store.store.image" alt="" class="image" />
      <div class="flex">
        <span class="store_name">{{ store.store.name }}</span>
        <div @click="favorite(store)">
          <img src="../assets/heart.png" alt="" class="png" />
        </div>
      </div>
        <div class="flex">
          <p class="area">#{{ store.store.area.area }}</p>
          <p class="genre">#{{ store.store.genre.genre }}</p>
        </div>
        <button
          class="button"
          @click="
            $router.push({
              path: '/detail/' + store.store_id,
              params: { id: store.id },
            })
          "
        >
          店舗詳細・予約
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../components/BookingUpdate";
import ModalDel from "../components/BookingDelete";
export default {
  data() {
    return {
      name: this.$store.state.user.name,
      bookings: [],
      favorites: [],
      modal: false,
      modal_del: false,
      haveBooking: true,
      haveFavorite: true,
    };
  },
  components: {
    Modal,
    ModalDel,
  },
  methods: {
    // お気に入り店舗情報取得
    getMyFavorite() {
      axios
        .get(
          "https://rese-booking.herokuapp.com/api/user/" +
            this.$store.state.user.id +
            "/favorite"
        )
        .then((response) => {
          this.favorites = response.data.data;
          if (this.favorites == 0) {
            this.haveFavorite = true;
          } else {
            this.haveFavorite = false;
          }
        })
        .catch((response) => {
          console.log(response);
        });
    },
    // 予約状況取得
    getMyBooking() {
      axios
        .get(
          "https://rese-booking.herokuapp.com/api/user/" +
            this.$store.state.user.id +
            "/booking"
        )
        .then((response) => {
          this.bookings = response.data.data;
          if (this.bookings == 0) {
            this.haveBooking = true;
          } else {
            this.haveBooking = false;
          }
        })
        .catch((response) => {
          console.log(response);
        });
    },
    // 予約更新モーダルウィンドウ表示
    openModal(booking) {
      this.modal = true;
      this.postItem = booking;
    },
    closeModal() {
      this.modal = false;
      this.$router.go({
        path: this.$router.currentRoute.path,
        force: true,
      });
    },
    // 予約取消モーダルウィンドウ表示
    openModalDel(booking) {
      this.modal_del = true;
      this.deleteItem = booking;
    },
    closeModalDel() {
      this.modal_del = false;
      this.$router.go({
        path: this.$router.currentRoute.path,
        force: true,
      });
    },
    // お気に入り店舗登録もしくは削除
    favorite(store) {
      axios
        .post("https://rese-booking.herokuapp.com/api/favorite", {
          user_id: this.$store.state.user.id,
          store_id: store.store_id,
        })
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
  },
  created() {
    this.getMyFavorite();
    this.getMyBooking();
  },
};
</script>
<style scoped>
/* ====================
  マイページ全体設計
==================== */
  .mypage {
    width: 70%;
    margin: 50px auto;
  }
  .username {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0;
    padding-top: 20px;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    border-bottom: 3px solid #ffa500;
    display: inline-block;
    margin: 20px 0;
  }
/* ====================
      予約状況
==================== */
  .mybooking {
    width: 50%;
    font-size: 18px;
  }
  .booking {
    margin-bottom: 20px;
  }
  .store_name {
    font-weight: bold;
    font-size: 20px;
    width: 10%;
    margin: 10px;
  }
  th {
    padding: 25px;
    width: 1%;
    text-align: left;
    background-color: #f8f3e9;
    border: 1px solid #fff;
  }
  td {
    width: 3%;
    border-bottom: 1px solid #f8f3e9;
    padding-left: 5px;
  }
  h3 {
    margin: 20px;
  }
  #booking_delete_button,
  #booking_update_button {
    color: #fff;
    font-weight: bold;
    margin-bottom: 10px;
  }
  #booking_delete_button {
    background-color: rgb(204, 6, 6);
  }
  #booking_update_button {
    background-color: rgb(2, 223, 186);
  }
  .store_image {
    width: 300px;
  }
  .booking_button {
    width: 25%;
  }
/* ====================
    お気に入り店舗
==================== */
  .store_card {
    width: 45%;
    position: relative;
    margin: 30px 1% 0 1%;
    border: 1px solid #c2c2c2;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  }
  .png {
    position: absolute;
    right: 10px;
  }
  .store_name {
    width: 100%;
    font-weight: bold;
    font-size: 20px;
    margin-top: 10px;
  }
  .button {
    width: 60%;
    padding: 7px 15px;
    margin-left: 50%;
    transform: translate(-50%);
    margin-bottom: 20px;
  }
  .area,
  .genre {
    margin: 15px 0 20px 10px;
    color: gray;
  }

/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .mypage {
    width: 90%;
  }
  .mybooking,
  #booking_update_button,
  #booking_delete_button,
  .store_card {
    width: 100%;
  }
}
</style>
