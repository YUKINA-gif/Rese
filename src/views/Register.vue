<template>
  <div class="register">
    <!-- 会員登録 -->
    <h2>新規会員登録</h2>
    <div class="register_card">
      <form>
        <ul>
          <li>
            <!-- 名前 -->
            <label for="name"><span>*</span>お名前:</label>
            <input
              type="text"
              id="name"
              placeholder="お名前を入力してください"
              v-model="name"
            /><br>
            <!-- 名前エラーメッセージ -->
            <div class="error" v-if="name_required">お名前が入力されていません</div>
          </li>
          <li>
            <!-- メールアドレス -->
            <label for="email"><span>*</span>メールアドレス:</label>
            <input
              type="email"
              id="email"
              placeholder="メールアドレスを入力してください"
              v-model="email"
            />
            <!-- メールアドレスエラーメッセージ -->
            <div class="error" v-if="email_required">メールアドレスが入力されていません</div>
            <div class="error" v-if="not_email">メールアドレスで入力してください</div>
          </li>
          <li>
            <!-- パスワード -->
            <label for="password"><span>*</span>パスワード:</label>
            <input
              type="password"
              id="password"
              placeholder="8文字以上で入力してください"
              v-model="password"
            />
            <!-- パスワードエラーメッセージ -->
            <div class="error" v-if="password_required">パスワードが入力されていません</div>
            <div class="error" v-if="password_min_length">8文字以上で入力してください</div>
          </li>
        </ul>
        <!-- 会員登録ボタン -->
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
      name_required:false,
      name_max_length:false,
      email_required:false,
      not_email:false,
      password_required:false,
      password_min_length:false
    };
  },
  methods: {
    // 会員登録
    register() {
      // バリデーション
      // 名前が空ならメッセージ表示
      if (this.name == "") {
        this.name_required = true
      // メールアドレスが空ならメッセージ表示
      } if (this.email == ""){
        this.email_required = true
      // パスワードが空ならメッセージ表示
      } if (this.password == ""){
        this.password_required = true
      // パスワードが8文字以下ならメッセージ表示
      } if (this.password.length < 7){
        this.password_min_length = true
      // メールアドレスでなければメッセージ表示
      } if (!this.email.includes("@")){
        this.not_email = true
      } else {
      //上記以外なら会員登録 
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
        .catch(() => {
          alert("会員登録ができませんでした。お手数ですが再度お試しください");
        });
    }},
  },
};
</script>

<style scoped>
/* ====================
        会員登録
==================== */
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
  .error,span{
    color: red;
  }
  .error{
    margin-left: 30%;
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
  .error{
    margin: 0;
  }
}
</style>
