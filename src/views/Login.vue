<template>
  <div class="login">
    <h2>ログイン</h2>
    <div class="login_card">
      <form action="">
        <ul>
          <li>
            <label for="email">メールアドレス:</label>
            <input
              type="email"
              id="email"
              placeholder="メールアドレスを入力してください"
              v-model="email"
            />
            <div class="error" v-if="email_required">メールアドレスが入力されていません</div>
            <div class="error" v-if="not_email">メールアドレスで入力してください</div>
          </li>
          <li>
            <label for="password">パスワード:</label>
            <input
              type="password"
              id="password"
              placeholder="パスワードを入力してください"
              v-model="password"
            />
            <div class="error" v-if="password_required">パスワードが入力されていません</div>
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
      email_required:false,
      not_email:false,
      password_required:false,
    };
  },
  methods: {
    // ログイン
    login() {
      // バリデーション

      if (this.email == ""){
        this.email_required = true
      } if (this.password == ""){
        this.password_required = true
      } if (!this.email.includes("@")){
        this.not_email = true
      }else {
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
  .login {
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
  .login_card {
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
  .error{
    color: red;
    margin-left: 30%;
  }
/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .login {
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
