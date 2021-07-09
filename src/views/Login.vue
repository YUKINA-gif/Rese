<template>
  <div class="login">
    <!-- ログイン -->
    <h2>ログイン</h2>
    <div class="login_card">
      <ValidationObserver ref="observer">
        <form action="">
          <ul>
            <li>
              <!-- メールアドレス -->
              <ValidationProvider
                rules="required"
                ref="myemail"
                v-slot="{ errors }"
              >
                <label for="email">
                  <font-awesome-icon icon="envelope" class="icon"
                /></label>
                <input
                  type="email"
                  v-model="email"
                  name="メールアドレス"
                  placeholder="メールアドレス"
                />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </li>
            <li>
              <!-- パスワード -->
              <ValidationProvider
                rules="required|min:8"
                ref="mypass"
                v-slot="{ errors }"
              >
                <label for="password">
                  <font-awesome-icon icon="key" class="icon"
                /></label>
                <input
                  type="password"
                  id="password"
                  name="パスワード"
                  placeholder="パスワード"
                  v-model="password"
                />
                <!-- パスワードエラーメッセージ -->
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </li>
          </ul>
          <button @click="login" type="button" class="button">
            ログイン</button
          ><br />
          <a href="/register">会員でない方はこちら</a>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import ja from "vee-validate/dist/locale/ja";
import * as rules from "vee-validate/dist/rules";
for (let rule in rules) {
  extend(rule, rules[rule]);
}
localize("ja", ja);
export default {
  data() {
    return {
      email: "",
      password: "",
      email_required: false,
      not_email: false,
      password_required: false,
      icon_mail: "\u2709 メールアドレス",
      icon_password: "\u1f512",
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    // ログイン
    login() {
      // バリデーション
      this.$refs.observer.validate().then((res) => {
        // バリデーションが有効ならスルー
        if (res == false) {
          console.log(res);
          // そうでなければログイン処理
        } else {
          this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        }
      });
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
  label {
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
  .login_card {
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
