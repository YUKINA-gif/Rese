<template>
  <transition name="modal">
    <div class="overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <p id="title">予約取消</p>
        <p class="check_text">本当にこの予約を取消しますか?</p>

        <button class="button yes_button" @click="booking_delete">はい</button>
        <button class="button" @click.self="$emit('close')">
          いいえ
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
export default {
  props: ["val"],
  data() {
    return {};
  },
  methods: {
    booking_delete() {
      axios
        .request({
          method: "delete",
          url: "https://rese-booking.herokuapp.com/api/booking",
          data: {
            user_id: this.$store.state.user.id,
            id: this.val.id,
          },
        })
        .then((response) => {
          console.log(response);
          alert("予約内容を取消しました");
          this.$emit("close");
        })
        .catch((error) => {
          console.log(error.config);
        });
    },
  },
};
</script>

<style scoped>
/* ====================
      予約取消
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
.modal-window {
  text-align: center;
  z-index: 2;
  width: 40%;
  padding: 10px;
  background: #fff;
  border-top: 8px solid #ffa500;
}
.update_button {
  background-color: rgb(2, 223, 186);
}
.number {
  width: 100%;
  padding: 8px;
  font-size: 15px;
  color: rgb(131, 130, 130);
  border-radius: 4px;
}
.yes_button {
  margin-right: 50px;
  padding: 5px 15px;
  background-color: rgb(204, 6, 6);
}
.check_text {
  margin-bottom: 20px;
}
</style>
