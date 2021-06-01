<template>
  <transition name="modal">
    <div class="overlay" @click.self="$emit('close')">
      <div class="modal_window">
        <p id="title">予約更新</p>
        <table>
          <tr>
            <th>店名</th>
            <td>{{ val.store.name }}</td>
          </tr>
          <tr>
            <th>予約日</th>
            <td>
              <datetime
                label="日付を選択してください"
                format="YYYY-MM-DD"
                formatted="MM月DD日"
                only-date
                v-model="val.booking_date"
                :no-header="true"
                :min-date="startDate"
                :max-date="endDate"
                color="#ffa500"
                button-color="#ffa500"
                class="date"
              ></datetime>
            </td>
          </tr>
          <tr>
            <th>予約時間</th>
            <td class="time-color">
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
                v-model="val.booking_time"
                class="time"
              ></vue-timepicker>
            </td>
          </tr>
          <tr>
            <th>予約人数</th>
            <td>
              <select
                type="number"
                name="i"
                v-model="val.booking_number"
                class="number"
              >
                <option value="">人数を選択してください</option>
                <option v-for="i in 30" :key="i">{{ i }}</option>
              </select>
            </td>
          </tr>
        </table>

        <button class="button" @click="booking_update">予約更新</button>
      </div>
    </div>
  </transition>
</template>

<script>
import datetime from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import axios from "axios";
import moment from 'moment';
export default {
  props: ["val"],
  data() {
    return {};
  },
  components: {
    datetime,
    "vue-timepicker": VueTimepicker,
  },
  computed:{
    startDate() {
      // 明日からの日付を指定
      const start = moment().add(1, 'days')
      return start.format('YYYY-MM-DD')
    },
    endDate() {
      // 3ヶ月後までを指定
      const start = moment(this.start)
      const end = start.add(3, 'months').endOf('day')
      return end.format('YYYY-MM-DD')
    }
  },
  methods: {
    booking_update() {
      axios
        .put("https://rese-booking.herokuapp.com/api/booking", {
          id: this.val.id,
          user_id: this.$store.state.user.id,
          store_id: this.val.store_id,
          booking_date: this.val.booking_date,
          booking_time: this.val.booking_time,
          booking_number: this.val.booking_number,
        })
        .then((response) => {
          console.log(response);
          alert("予約内容を更新しました");
          this.$emit("close");
        })
        .catch(() => {
          alert("予約内容の更新ができませんでした。お手数ですが再度お試しください")
        })
    },
  },
};
</script>

<style scoped>
/* ====================
      予約更新
==================== */
  table {
    width: 100%;
    text-align: left;
  }
  th {
    width: 30%;
    background: #f8f3e9;
    padding: 15px 5px;
    border: 1px solid #fff;
  }
  td {
    padding-left: 5px;
  }
  #title {
    font-size: 18px;
    margin: 10px;
    font-weight: bold;
  }
  .overlay {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal_window {
    text-align: center;
    z-index: 2;
    width: 50%;
    padding: 10px;
    background: #fff;
    border-top: 8px solid #ffa500;
  }
  .update_button {
    background-color: rgb(2, 223, 186);
  }
  .time-color >>> .vue__time-picker .dropdown ul li:not([disabled]).active,
  .time-color >>> .vue__time-picker .dropdown ul li:not([disabled]).active:focus,
  .time-color >>> .vue__time-picker .dropdown ul li:not([disabled]).active:hover {
    background: #ffa500;
  }
  .number {
    width: 100%;
    padding: 8px;
    font-size: 15px;
    color: rgb(131, 130, 130);
    border-radius: 4px;
  }
</style>
