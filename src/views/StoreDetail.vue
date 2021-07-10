<template>
  <div class="detail">
    <!-- 店舗詳細 -->
    <div class="detail_div flex">
      <div class="store_detail">
        <h2 class="store_name">{{ store.name }}</h2>
        <div class="detail_image_div">
          <img
            :src="
              'https://rese-image.s3.ap-northeast-3.amazonaws.com/' +
                store.image
            "
            alt="store_image"
            class="image detail_image"
          />
        </div>
        <div class="flex tag">
          <p class="area" v-if="store">#{{ store.area.area }}</p>
          <p class="genre" v-if="store">#{{ store.genre.genre }}</p>
        </div>
        <p class="overview">{{ store.overview }}</p>
      </div>
      <!-- 予約 -->
      <div class="booking">
        <h2 class="booking_title">ご予約</h2>
        <form>
          <ul>
            <li class="flex">
              <!-- 来店日 -->
              <font-awesome-icon icon="calendar" class="icon confirm_icon" />
              <datetime
                label="日付を選択してください"
                format="YYYY-MM-DD"
                formatted="MM月DD日"
                only-date
                v-model="date"
                :no-header="true"
                :min-date="startDate"
                :max-date="endDate"
                color="#ffa500"
                button-color="#ffa500"
                class="date"
              ></datetime>
            </li>
          </ul>
          <!-- 来店時間 -->
          <ul>
            <li class="time_color flex">
              <font-awesome-icon icon="clock" class="icon confirm_icon" />
              <vue-timepicker
                placeholder="時間を選択してください"
                format="H:mm"
                hour-label="時"
                minute-label="分"
                :hour-range="[
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20,
                  21,
                  22,
                ]"
                hide-disabled-hours
                advanced-keyboard
                input-width="100%"
                minute-interval="15"
                v-model="time"
                class="time"
              ></vue-timepicker>
            </li>
          </ul>
          <!-- 来店人数 -->
          <ul>
            <li class="flex">
              <font-awesome-icon icon="users" class="icon confirm_icon" />
              <select type="number" name="i" v-model="number" class="number">
                <option value="">人数を選択してください</option>
                <option v-for="i in 30" :key="i">{{ i }}</option>
              </select>
              <span id="number_span">人</span>
            </li>
          </ul>
        </form>
        <button @click="openModal" type="button" class="button booking_button">
          予約する
        </button>
      </div>
    </div>
    <!-- 予約最終確認モーダル -->
    <Modal v-if="modal" @close="closeModal" :val="checkItem"></Modal>
    <button class="button back_button" @click="$router.push('/')">戻る</button>
  </div>
</template>

<script>
import datetime from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import axios from "axios";
import Modal from "../components/BookingCheck";
import moment from "moment";
export default {
  components: {
    datetime,
    "vue-timepicker": VueTimepicker,
    Modal,
  },
  // カレンダー日付設定
  computed: {
    startDate() {
      // 明日からの日付を指定
      const start = moment().add(1, "days");
      return start.format("YYYY-MM-DD");
    },
    endDate() {
      // 3ヶ月後までを指定
      const start = moment(this.start);
      const end = start.add(3, "months").endOf("day");
      return end.format("YYYY-MM-DD");
    },
  },
  props: ["id"],
  data() {
    return {
      modal: false,
      store: "",
      date: "",
      time: "",
      number: "",
    };
  },
  methods: {
    // 店舗情報取得
    async getStoreDetail() {
      await axios
        .get("https://rese-booking.herokuapp.com/api/store/" + this.id)
        .then((response) => {
          this.store = response.data.store;
        });
    },
    // モーダルウィンドウを開いたときに送る情報
    openModal() {
      if (this.$store.state.auth == true) {
        this.modal = true;
        this.checkItem = {
          store_name: this.store.name,
          store_id: this.store.id,
          booking_date: this.date,
          booking_time: this.time,
          booking_number: this.number,
        };
      } else {
        this.$router.replace("/login");
      }
    },
    // モーダルウィンドウを閉じたときにページを再リロード
    closeModal() {
      this.modal = false;
      this.$router.go({
        path: this.$router.currentRoute.path,
        force: true,
      });
    },
  },
  created() {
    this.getStoreDetail();
  },
};
</script>

<style scoped>
/* ===============
    店舗詳細
=============== */
  .detail {
    width: 90%;
    margin: 30px auto;
  }
  .store_detail {
    width: 90%;
  }
  .detail_image {
    width: 100%;
  }
  .store_name {
    padding-top: 30px;
    margin-bottom: 30px;
    font-size: 30px;
  }
  .area,
  .genre {
    font-size: 20px;
    color: #c2c2c2;
  }
  .area {
    margin-right: 15px;
  }
  .flex {
    margin: 10px 0;
  }
  .overview {
    font-size: 18px;
  }
/* ===============
      予約
=============== */
  .booking {
    width: 100%;
    margin: 60px 0 60px 20px;
    text-align: center;
    line-height: 4;
  }
  ul {
    margin-top: 30px;
  }
  li {
    width: 90%;
  }
  .number {
    width: 100%;
    padding: 8px;
    font-size: 15px;
    color: rgb(131, 130, 130);
    border-radius: 4px;
  }
  .date {
    width: 100%;
  }
  .booking_number,
  .booking_date,
  .booking_time {
    font-size: 20px;
    font-weight: bold;
  }
  .booking_number {
    width: 38%;
  }
  .booking_date,
  .booking_time {
    width: 35%;
  }
  form {
    text-align: left;
  }
  .booking_title {
    font-size: 25px;
    margin: 0 0 40px 0;
  }
  .booking_button {
    margin-top: 50px;
    width: 40%;
    padding: 8px 10px;
  }

  .back_button {
    width: 100px;
    margin: 30px 50%;
    padding: 5px 20px;
    transform: translate(-50%);
  }
  .time_color >>> .vue__time-picker .dropdown ul li:not([disabled]).active,
  .time_color >>> .vue__time-picker .dropdown ul li:not([disabled]).active:focus,
  .time_color >>> .vue__time-picker .dropdown ul li:not([disabled]).active:hover {
    background: #ffa500;
  }
  #number_span {
    font-size: 18px;
    margin: 10px 0 0 5px;
  }
  .icon {
    width: 30px;
    height: auto;
    color: gray;
    margin-right: 20px;
  }
/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .detail {
    width: 95%;
    margin: 0 auto;
    text-align: center;
  }
  .booking {
    width: 95%;
  }
  .store_detail {
    width: 100%;
  }
  .booking_button {
    width: 100px;
    margin-right: 20px;
  }
  .back_button {
    margin: 0 auto;
    transform: translate(0, -50%);
  }
  .detail_div {
    flex-wrap: wrap;
  }
  ul {
    display: block;
    width: 100%;
  }
  .detail_image_div {
    width: 100%;
    margin: 0 auto;
  }
  .number {
    width: 85%;
  }
  .overview {
    margin: 50px auto;
  }
  .tag {
    display: flex;
  }
  .overview {
    width: 90%;
  }
}
</style>
