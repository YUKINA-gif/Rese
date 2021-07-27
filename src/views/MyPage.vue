<template>
  <div class="mypage">
    <!-- マイページ -->
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
      <img
        :src="
          'https://rese-image.s3.ap-northeast-3.amazonaws.com/' +
            booking.store.image
        "
        class="image store_image"
      />
      <table class="mybooking">
        <tr>
          <th>店名:</th>
          <td>{{ booking.store.name }}</td>
        </tr>
        <tr>
          <th>予約日:</th>
          <td>{{ booking.booking_date | moment}}</td>
        </tr>
        <tr>
          <th>予約時間:</th>
          <td>{{ booking.booking_time.substr(0, 5) }}</td>
        </tr>
        <tr>
          <th>予約人数:</th>
          <td>{{ booking.booking_number }}人</td>
        </tr>
      </table>
      <!-- 予約内容変更モーダル表示 -->
      <div class="booking_button flex" v-if="status(booking)">
        <button
          class="button"
          id="booking_update_button"
          @click="openModal(booking)"
        >変更</button
        ><br />
        <!-- 予約取消モーダル表示 -->
        <button
          class="button"
          id="booking_delete_button"
          @click="openModalDel(booking)"
        >取消
        </button>
      </div>
      <div v-else>
          <font-awesome-icon icon="bookmark" class="icon confirm_icon" />
          <p class="status">予約確定</p>
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
        <img
          :src="
            'https://rese-image.s3.ap-northeast-3.amazonaws.com/' +
              store.store.image
          "
          alt=""
          class="image"
        />
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
          class="button store_detail_button"
          @click="
            $router.push({
              path: '/detail/' + store.store_id,
              params: { id: store.id },
            })">
          店舗詳細・予約
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment';
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
      bookingChange: false
    };
  },
  components: {
    Modal,
    ModalDel,
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY年MM月DD日");
    },
  },
  methods: {
    // お気に入り店舗情報取得
    async getMyFavorite() {
      await axios
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
    async getMyBooking() {
      await axios
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
      this.getMyFavorite();
      this.getMyBooking();
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
      this.getMyFavorite();
      this.getMyBooking();
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
        .then(() => {
          this.getMyFavorite();
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
    status(booking){
      const today = new Date();
      if (moment(booking.booking_date) > today ) {
        return true;
      } else {
        return false
      }
    }
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
    width: 60%;
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
    position: relative;
    margin-bottom: 20px;
    border: 1px solid #f8f3e9;
  }
  .store_name {
    font-weight: bold;
    font-size: 20px;
    width: 10%;
    margin: 10px;
  }
  th {
    padding: 18px;
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
    position: absolute;
    color: #fff;
    font-weight: bold;
    margin: 10px 5px;
    width: 60px;
    height: 35px;
    border-radius: 5px;
  }
  #booking_delete_button{
    top: 0;
    right: 10px;
  }
   #booking_update_button{
    top: 0;
    right: 80px;
  }
  .store_image {
    width: 300px;
  }
  .status{
    position: absolute;
    top: 5px;
    right: 50px;
    color: rgb(175, 236, 175);
  }
  .icon{
    position: absolute;
    top: 0;
    right: 10px;
    width: 25px;
    height: auto;
  }
  .menu_icon{
    cursor: pointer;
    top: 5px;
    color: #ffa500;
  }
  .confirm_icon{
    color: rgb(175, 236, 175);
  }
/* ====================
    お気に入り店舗
==================== */
  .store_card {
    width: 30%;
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
  .store_detail_button {
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
  .booking {
    flex-wrap: wrap;
  }
  .booking_button {
    display: flex;
    width: 100%;
  }
  .store_image,
  .mybooking {
    width: 100%;
  }
  .store_card {
    width: 47%;
  }
  .status{
    background-color: #fff;
    padding: 3px 5px;
    font-weight: bold;
  }
  th {
    padding: 20px 5px;
    width: 30%;
  }
  td {
    width: 70%;
  }
  #booking_update_button,
  #booking_delete_button {
    width: 40%;
    margin: 10px auto;
  }
  #booking_delete_button {
    margin-left: 20px;
  }
}
</style>
