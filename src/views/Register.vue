<template>
  <div class="register">
    <h2>新規会員登録</h2>
    <div class="register_card">
      <form>
        <ul>
          <li>
            <label for="name">お名前:</label>
            <input
              type="text"
              id="name"
              placeholder="お名前を入力してください"
              v-model="name"
            />
          </li>
          <li>
            <label for="email">メールアドレス:</label>
            <input
              type="email"
              id="email"
              placeholder="メールアドレスを入力してください"
              v-model="email"
            />
          </li>
          <li>
            <label for="password">パスワード:</label>
            <input
              type="password"
              id="password"
              placeholder="パスワードを入力してください"
              v-model="password"
            />
          </li>
        </ul>
        <button @click="register" type="button" class="button">
          新規会員登録
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    // 会員登録
    register() {
      axios
        .post("https://rese-booking.herokuapp.com/api/user", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.$router.replace("/thanks");
        })
        .catch((response) => {
          alert(response);
        });
    },
  },
};
</script>
<style scoped>
  .register {
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
  .register_card {
    width: 80%;
    margin: 50px auto;
    padding: 30px;
    border: 1px solid #c2c2c2;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
    line-height: 3;
    text-align: center;
  }
  input {
    width: 60%;
    padding: 8px;
  }
  label {
    display: inline-block;
    width: 30%;
  }
  li {
    text-align: left;
    margin: 30px 0;
  }
  h2 {
    font-size: 25px;
    margin-top: 120px;
  }
  .button {
    padding: 10px 15px;
  }
/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .register {
    width: 90%;
  }
  label,
  input {
    width: 90%;
  }
}
</style>
