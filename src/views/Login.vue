<template>
  <div class="login">
    <!-- ログイン -->
    <h2>ログイン</h2>
    <div class="login_card">
      <form action="">
        <ul>
          <li>
            <!-- メールアドレス -->
            <label for="email">
             <font-awesome-icon
              icon="envelope"
              class="icon"
            /></label>
            <input
              type="email"
              id="email"
              placeholder="メールアドレス"
              v-model="email"
            />
            <!-- メールアドレスエラーメッセージ -->
            <div class="error" v-if="email_required">
              メールアドレスが入力されていません
            </div>
            <div class="error" v-if="not_email">
              メールアドレスで入力してください
            </div>
          </li>
          <li>
            <!-- パスワード -->
            <label for="password">
              <font-awesome-icon
              icon="key"
              class="icon"
            /></label>
            <input
              type="password"
              id="password"
              placeholder="パスワード"
              v-model="password"
            />
            <!-- パスワードエラーメッセージ -->
            <div class="error" v-if="password_required">
              パスワードが入力されていません
            </div>
          </li>
        </ul>
        <button @click="login" type="button" class="button">ログイン</button
        ><br />
        <a href="/register">会員でない方はこちら</a>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      email_required: false,
      not_email: false,
      password_required: false,
      icon_mail:'\u2709 メールアドレス',
      icon_password:'\u1f512'
    };
  },
  methods: {
    // ログイン
    login() {
      // バリデーション
      // メールアドレスが空ならメッセージ表示
      if (this.email == "") {
        this.email_required = true;
      }
      // パスワードが空ならメッセージ表示
      if (this.password == "") {
        this.password_required = true;
      }
      // メールアドレスでなければメッセージ表示
      if (!this.email.includes("@")) {
        this.not_email = true;
      } else {
        // 上記以外の場合ログイン処理
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>

<style scoped>
/* ====================
      ログイン
==================== */
  .login {
    width: 50%;
    margin: 0 auto;
    text-align: center;
  }
  .login_card {
    width: 50%;
    margin: 50px auto;
    padding: 30px;
    border: 1px solid #c2c2c2;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
    line-height: 3;
    text-align: center;
  }
  input {
    width: 90%;
    padding: 8px 0 8px 50px;
    font-size: 16px;
    border: none;
  }
  label{
    position: relative;
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
    margin-bottom: 10px;
  }
  .error {
    color: red;
    margin-left: 30%;
  }
  label {
    font-weight: bold;
  }
  .icon {
  width: 28px;
  height: auto;
  cursor: pointer;
  margin-left: 5px;
  padding-top: 10px;
  position: absolute;
  color: gray;
  }
/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .login {
    width: 90%;
  }
  .login_card{
    margin: 50px auto;
  }
  label,
  input {
    width: 85%;
  }
  .error {
    margin: 0;
  }
}
</style>
