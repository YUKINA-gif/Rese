<template>
  <transition name="modal">
    <div class="overlay" @click.self="$emit('close')">
      <div class="modal_window">
        <!-- 予約最終確認 -->
        <p id="title">予約</p>
        <p class="check_text">この内容で予約しますか?</p>

        <table class="booking">
          <tr>
            <th>店名:</th>
            <td>{{ val.store_name }}</td>
          </tr>
          <tr>
            <th>予約日:</th>
            <td>{{ val.booking_date }}</td>
          </tr>
          <tr>
            <th>予約時間:</th>
            <td>{{ val.booking_time }}</td>
          </tr>
          <tr>
            <th>予約人数:</th>
            <td>{{ val.booking_number }}人</td>
          </tr>
        </table>

        <button class="button" @click="booking">
          <p v-if="loading">予約</p>
          <vue-loading
            type="barsCylon"
            color="#fff"
            :size="{ width: '60px', height: '60px' }"
            v-else
            class="loading"
          ></vue-loading>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import { VueLoading } from "vue-loading-template";
export default {
  props: ["val"],
  data() {
    return {
      loading: true,
    };
  },
  components: {
    VueLoading,
  },
  methods: {
    // 予約
    booking() {
      if (this.$store.state.auth == true) {
        this.loading = false;
        axios
          .post("https://rese-booking.herokuapp.com/api/booking", {
            user_id: this.$store.state.user.id,
            store_id: this.val.store_id,
            booking_date: this.val.booking_date,
            booking_time: this.val.booking_time,
            booking_number: this.val.booking_number,
          })
          .then((response) => {
            console.log(response);
            this.$router.replace("/done");
            this.loading = true;
          })
          .catch((response) => {
            console.log(response);
            alert("予約できませんでした。お手数ですが、再度お試しください");
            this.loading = true;
          });
      } else {
        this.$router.replace("/login");
      }
    },
  },
};
</script>

<style scoped>
/* ====================
    予約最終確認
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
    width: 40%;
    padding: 10px;
    background: #fff;
    border-top: 8px solid #ffa500;
  }
  .button {
    width: 80px;
    height: 40px;
  }
  .number {
    width: 100%;
    padding: 8px;
    font-size: 15px;
    color: rgb(131, 130, 130);
    border-radius: 4px;
  }
  .check_text {
    margin-bottom: 20px;
  }
  .loading {
    margin-left: 4px;
    padding-top: 2px;
  }
</style>
