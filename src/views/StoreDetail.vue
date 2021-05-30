<template>
  <div class="detail">
    <!-- 店舗詳細 -->
    <div class="flex">
      <div class="storedetail">
        <h2 class="store-name">{{ store.name }}</h2>
        <div class="detail-image-div">
          <img :src="store.image" alt="storeimage" class="image detail-image" />
        </div>
        <div class="flex tag">
          <p class="area" v-if="store">#{{ store.area.area }}</p>
          <p class="genre" v-if="store">#{{ store.genre.genre }}</p>
        </div>
      </div>
    <!-- 予約 -->
      <div class="booking">
        <h2 class="booking-title">ご予約</h2>
        <form>
          <ul>
            <li class="flex">
              <!-- 来店日 -->
              <p class="booking-date">来店日:</p>
              <datetime
                label="日付を選択してください"
                format="YYYY-MM-DD"
                formatted="MM月DD日"
                only-date
                v-model="date"
                :no-header="true"
                min="start"
                max="end"
                color="#ffa500"
                button-color="#ffa500"
                class="date"
              ></datetime>
            </li>
          </ul>
          <!-- 来店時間 -->
          <ul>
            <li class="time-color flex">
              <p class="booking-time">来店時間:</p>
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
                manual-input
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
              <p class="booking-number">人数:</p>
              <select type="number" name="i" v-model="number" class="number">
                <option value="">人数を選択してください</option>
                <option v-for="i in 30" :key="i">{{ i }}</option>
              </select>
              <span id="number-span">人</span>
            </li>
          </ul>
        </form>
        <button @click="openModal" type="button" class="button booking-button">
          予約する
        </button>
      </div>
    </div>
    <!-- 予約最終確認（モーダルウィンドウ） -->
    <Modal v-if="modal" @close="closeModal" :val="checkItem"></Modal>
    <p class="overview">{{ store.overview }}</p>
    <button class="button back-button" @click="$router.push('/')">戻る</button>
  </div>
</template>

<script>
import datetime from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import axios from "axios";
import Modal from "../components/BookingCheck";
export default {
  components: {
    datetime,
    "vue-timepicker": VueTimepicker,
    Modal,
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
    getStoreDetail() {
      axios
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
.storedetail {
  width: 100%;
}
.detail-image-div {
  width: 90%;
}
.detail-image {
  width: 100%;
}
.store-name {
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
.booking-number,
.booking-date,
.booking-time {
  font-size: 20px;
  margin-top: 12px;
  font-weight: bold;
}
.booking-number {
  width: 32%;
}
.booking-date,
.booking-time {
  width: 30%;
}
form {
  text-align: left;
}
.booking-title {
  font-size: 25px;
  margin: 30px 0 50px 0;
}
.booking-button {
  margin-top: 50px;
  width: 40%;
  padding: 8px 10px;
}

.back-button {
  width: 100px;
  margin: 30px 50%;
  padding: 5px 20px;
  transform: translate(-50%);
}
.time-color >>> .vue__time-picker .dropdown ul li:not([disabled]).active,
.time-color >>> .vue__time-picker .dropdown ul li:not([disabled]).active:focus,
.time-color >>> .vue__time-picker .dropdown ul li:not([disabled]).active:hover {
  background: #ffa500;
}
#number-span {
  font-size: 18px;
  margin: 10px 0 0 5px;
}
/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .detail {
    width: 90%;
    text-align: center;
  }
  .flex {
    flex-wrap: wrap;
  }
  .detail-image-div {
    width: 100%;
  }
  .number {
    width: 90%;
  }
  .booking-number,
  .booking-date,
  .booking-time {
    width: 100%;
  }
  .overview {
    margin: 50px auto;
  }
  .tag {
    display: flex;
  }
  .booking {
    margin: 30px auto;
  }
}
</style>
