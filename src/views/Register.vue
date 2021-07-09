<template>
  <div class="register">
    <!-- 会員登録 -->
    <h2>新規会員登録</h2>
    <div class="register_card">
      <ValidationObserver ref="observer">
        <form>
          <ul>
            <li>
              <!-- 名前 -->
              <ValidationProvider
                rules="required"
                ref="myname"
                v-slot="{ errors }"
              >
                <label for="name">
                  <font-awesome-icon icon="user" class="icon"
                /></label>
                <input
                  type="text"
                  id="name"
                  name="お名前"
                  placeholder="お名前"
                  v-model="name"
                />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </li>
            <li>
              <ValidationProvider
                rules="required|email"
                ref="mypass"
                v-slot="{ errors }"
              >
                <!-- メールアドレス -->
                <label for="email">
                  <font-awesome-icon icon="envelope" class="icon"
                /></label>
                <input
                  type="email"
                  id="email"
                  name="メールアドレス"
                  placeholder="メールアドレス"
                  v-model="email"
                />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </li>
            <li>
              <ValidationProvider
                rules="required|min:8"
                ref="mypass"
                v-slot="{ errors }"
              >
                <!-- パスワード -->
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
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </li>
          </ul>
          <!-- 会員登録ボタン -->
          <button @click="register" type="button" class="button">
            新規会員登録
          </button>
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
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      name_required: false,
      name_max_length: false,
      email_required: false,
      not_email: false,
      password_required: false,
      password_min_length: false,
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  methods: {
    // 会員登録
    register() {
      // バリデーション
      this.$refs.observer.validate().then((res) => {
        // バリデーションが有効ならスルー
        if (res == false) {
          console.log(res);
          // そうでなければ登録処理
        } else {
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
              alert(
                "会員登録ができませんでした。お手数ですが再度お試しください"
              );
            });
        }
      });
    },
  },
};
</script>

<style scoped>
/* ====================
        会員登録
==================== */
  .register {
    width: 50%;
    margin: 0 auto;
    text-align: center;
  }
  .register_card {
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
  }
  .error,
  span {
    color: red;
  }
  .icon {
    width: 28px;
    height: auto;
    cursor: pointer;
    margin-left: 5px;
    padding-top: 9px;
    position: absolute;
    color: gray;
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
  .error {
    margin: 0;
  }
}
</style>
