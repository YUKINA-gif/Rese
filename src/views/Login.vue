<template>
  <div class="login">
    <h2>ログイン</h2>
    <div class="login-card">
      <form action="">
        <ul>
          <li>
            <label for="email">メールアドレス:</label>
            <input
              type="email"
              id="email"
              placeholder="メールアドレスを入力してください"
            />
          </li>
          <li>
            <label for="password">パスワード:</label>
            <input
              type="password"
              id="password"
              placeholder="パスワードを入力してください"
            />
          </li>
        </ul>
        <button type="submit" class="button">ログイン</button><br />
        <a href="/register">会員でない方はこちら</a>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
.login-card {
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
</style>
