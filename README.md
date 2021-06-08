# Rese

飲食店予約サービスのフロントエンドです。

## Prerequisites

- Node.js 14.17.0
- Vue.js 4.5.13

## Installing

### Node.js

#### Mac

Node.js のインストールは[こちら](https://nodejs.org/ja/download/)

「MacOS Installer」を選択するとダウンロード開始します。

インストーラーが立ち上がるので全て「続ける」をクリックし、「インストール」をクリックします。

インストール完了後に「閉じる」をクリックします。

ターミナルを開き、下記コマンドを入力します。

```
$ node -v
```

バージョンが返ってくれば成功です。

#### Windows

Node.js のインストールは[こちら](https://nodejs.org/ja/download/)

インストーラーが立ちあがるので Next をクリックします。

End-User License Agreement - 「I accept the terms in the License Agreement」にチェックをし、Next をクリックします。

Destination Folder - Next をクリックします。

Custom Setup - Next をクリックします。

Tools for Native Modules - Next をクリックします。

Ready to install Node.js - Install をクリックし、完了後に Finish をクリックします。

CLI を開き、下記コマンドを入力します。

```
$ node -v
```

バージョンが返ってくれば成功です。

### Vue.js Install

#### Mac&Windows

CLI に下記コマンドを入力します。

```
$ npm install -g @vue/cli
```

「permission denied」というエラーが出る場合は以下のコマンドを入力してください。

```
$ sudo npm install -g @vue/cli
```

下記のコードを入力して、バージョン情報が確認できればインストール完了です。

```
$ vue --version
```

### Yarn Install

#### Mac&Windows

下記コマンドを入力します。

```
$ npm install -g yarn
```

permission denied」というエラーが出る場合は以下のコマンドを入力してください。

```
$ sudo npm install -g yarn
```

下記のコードを入力して、バージョン情報が確認できればインストール完了です。

```
$ yarn --version
```

## Data Edit

リポジトリを取得します。

CLI を開きます。
リポジトリをコピーします。

```
$ git clone https://github.com/YUKINA-gif/Rese.git
```

npm パッケージをインストールし、脆弱性の修正をします。

```
$ npm install

$ npm audit fix
```

## Access

アクセスし、動作を確認します。

ローカルサーバーを起動します。

```
$ yarn serve
```

立ち上がったサーバーにアクセスします。

#### URL:
http://localhost:8080/

### 店舗検索(トップページ)

<img src="./src/assets/スクリーンショット (15).png" width=70%>

エリア、ジャンルを選択して店舗検索ができます。
店名を一部入力して検索することも可能です。

#### 例:

エリア「東京」ジャンル「寿司」店名「仙」を選択し"検索"をクリック。

該当店舗「仙人」を表示します。

"クリア"をクリックすると再度店舗一覧を表示します。

### 店舗一覧
<img src="./src/assets/スクリーンショット (13).png" width=70%>

店舗一覧をみることができます。

### 店舗お気に入り

店舗一覧の"ハート"をクリックするとログインページにとばされます。

ログインしている場合のみお気に入り登録することができます。

### 新規会員登録

会員登録ができます。

<img src="./src/assets/スクリーンショット (18).png" width=70%>

#### URL:
http://localhost:8080/register

#### 例:

名前「山田太郎」

メールアドレス「test@example.com」

パスワード「password」

完了すると「会員登録が完了しました」と表示されます。

### ログイン

ログインができます。

<img src="./src/assets/スクリーンショット (16).png" width=70%>

#### URL:
http://localhost:8080/login

#### 例:

メールアドレス「test@example.com」

パスワード「password」

ログインすると店舗一覧ページにもどります。

ログインしているので"ハート"をクリックするとお気に入り登録されます。

### 店舗詳細・予約

店舗の詳細をみることができ、予約もできます。

<img src="./src/assets/スクリーンショット (14).png" width=70%>

#### URL:
http://localhost:8080/detail/1

#### 予約例:

来店日「2020/06/30」

来店時間「19:00」

来店人数「2 人」

### マイページ

ログインが完了している場合、予約内容、お気に入り店舗をみることができます。

また予約内容の変更、取消も可能です。

<img src="./src/assets/スクリーンショット (17).png" width=70%>

#### URL:
http://localhost:8080/mypage

#### 予約更新例:

来店日「2020/08/30」

来店時間「20:00」

来店人数「6 人」

"予約更新"をクリックで完了

#### 予約取消:

"はい"をクリック「予約取消完了しました」

"いいえ"をクリック「マイページにもどります」
