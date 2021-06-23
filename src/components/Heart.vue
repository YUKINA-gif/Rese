<template>
  <div class="heart">
    <!-- お気に入り機能 -->
    <font-awesome-icon
      icon="heart"
      @click="favorite()"
      class="icon"
      :class="{ heart_color: isActive }"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["val"],
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    // お気に入り店舗登録もしくは削除
    favorite() {
      // ハートの色を変える
      this.isActive = !this.isActive;
      // ログインしていなければログイン画面へ誘導
      if (this.$store.state.auth == true) {
        axios
          .post("https://rese-booking.herokuapp.com/api/favorite", {
            user_id: this.$store.state.user.id,
            store_id: this.val.id,
          })
          .then((response) => {
            console.log(response);
          });
      } else {
        this.$router.replace("/login");
      }
    },
    // ユーザーお気に入り情報取得してハートに反映
    checkfavorite() {
      if (this.val.favorites.length === 0 || this.$store.state.auth == false) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
  },
  created() {
    this.checkfavorite();
  },
};
</script>

<style scoped>
/* ====================
    お気に入り機能
==================== */
.icon {
  width: 25px;
  height: auto;
  cursor: pointer;
  margin-right: 20px;
  color: gray;
}
.heart_color {
  color: red;
}
</style>
