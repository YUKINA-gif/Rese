<template>
  <div class="detail">
    <div class="flex">
      <div class="storedetail">
        <h2 class="store-name">{{ name }}</h2>
        <div class="detail-image-div">
          <img :src="image" alt="storeimage" class="image detail-image" />
        </div>
        <div class="flex">
          <p class="area">#{{ area }}</p>
          <p class="genre">#{{ genre }}</p>
        </div>
      </div>

      <div class="booking">
        <h2 class="booking-title">ご予約</h2>
        <form>
          <ul>
            <li>
              <p class="booking-date">来店日:</p>
              <datetime
                label="日付を選択してください"
                format="YYYY-MM-DD"
                formatted="MM月DD日"
                only-date
                v-model="date"
                :no-header="true"
                color="#ffa500"
                button-color="#ffa500"
                class="date"
              ></datetime>
            </li>
            <li>
              <p class="booking-time">来店時間:</p>
              <datetime
                label="時間を選択してください"
                format="hh:mm a"
                formatted="hh:mm a"
                only-time
                :disabled-hours="[
                  '01',
                  '02',
                  '03',
                  '04',
                  '05',
                  '06',
                  '07',
                  '08',
                ]"
                :minute-interval="15"
                v-model="time"
                :no-header="true"
                color="#ffa500"
                button-color="#ffa500"
                class="time"
              ></datetime>
            </li>
            <li>
              <p class="booking-number">人数:</p>
              <select type="number" name="i" v-model="number" class="number">
                <option value="">人数を選択してください</option>
                <option v-for="i in 30" :key="i">{{ i }}人</option>
              </select>
            </li>
          </ul>
        </form>
        <button type="submit" class="button booking-button">予約する</button>
      </div>
    </div>
    <p class="overview">{{ overview }}</p>
    <button class="button back-button" @click="$router.push('/')">戻る</button>
  </div>
</template>

<script>
import datetime from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
export default {
  components: {
    datetime,
  },
  props: ["id"],
  data() {
    return {
      name: "仙人",
      area: "東京",
      genre: "寿司",
      image:
        "https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg",
      overview:
        "料理長厳選の食材から作る寿司を用いたコースをぜひお楽しみください。食材・味・価格、お客様の満足度を徹底的に追及したお店です。特別な日のお食事、ビジネス接待まで気軽に使用することができます。",
      time: "",
      date: "",
      number: "",
    };
  },
};
</script>

<style scoped>
/* ===============
    店舗詳細
=============== */
.detail {
  width: 80%;
  margin: 30px auto;
}
.detail-image-div {
  position: relative;
  width: 600px;
  height: 500px;
}
.detail-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}
.store-name {
  margin-bottom: 30px;
  font-size: 25px;
}
.area,
.genre {
  font-size: 20px;
  color: #c2c2c2;
}
.area {
  margin-right: 15px;
}
.flex {
  margin: 10px 0;
}
.overview {
  font-size: 18px;
}
/* ===============
      予約
=============== */
.booking {
  width: 90%;
  margin: 60px 0 60px 20px;
  text-align: center;
}
.number {
  width: 60%;
  padding: 10px;
  color: rgb(131, 130, 130);
  border-radius: 4px;
}
.date,
.time {
  width: 60%;
}
li {
  display: flex;
  margin-bottom: 20px;
}
.booking-number,
.booking-date,
.booking-time {
  font-size: 18px;
  margin-top: 15px;
  font-weight: bold;
}
.booking-number {
  width: 35%;
}
.booking-date,
.booking-time {
  width: 30%;
}
form {
  text-align: left;
}
.booking-title {
  font-size: 25px;
  margin-bottom: 50px;
}
.booking-button {
  margin-top: 30px;
  width: 60%;
  padding: 8px 10px;
}

.back-button {
  margin-top: 30px;
  margin-left: 50%;
  padding: 5px 15px;
  transform: translate(0, -50%);
}
</style>
