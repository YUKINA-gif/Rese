<template>
  <transition name="modal">
    <div class="overlay" @click.self="$emit('close')">
      <div class="modal_window">
      <h2>店舗情報変更</h2>
      <table>
      <tr>
        <th>店名:</th>
        <td><input type="text" id="store_name" v-model="val.name"></td>
      </tr>
      <tr>
        <th>店舗説明:</th>
        <td><textarea type="text" size="20" id="store_detail" rows="5" cols="30" wrap=”soft” v-model="val.overview"></textarea></td>
      </tr>
      <tr>
        <th>店舗画像:</th>
        <td>
          <input type="file" @change="onFileChange" accept="image/*">
          <div class="flex">
            <div class="store_image_div">
              <img :src="val.image" alt="store_image" class="image store_image"/>
            </div>
            <span v-if="imageSelect">→</span>
            <div class="store_image_div" v-if="preview">
              <img :src="preview" class="image store_image"/>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th>エリア:</th>
        <td><select id="store_area">
              <option value="" hidden class="pull_down">{{ val.area.area }}</option>
              <option
                v-for="(area, index) in areaData"
                :key="index"
                :value="area.id"
                >{{ area.area }}
              </option>
          </select></td>
      </tr>
      <tr>
        <th>ジャンル:</th>
        <td>
          <select id="store_genre">
            <option value="" hidden class="pull_down">{{ val.genre.genre }}</option>
              <option
                v-for="(genre, index) in genreData"
                :key="index"
                :value="genre.id"
                >{{ genre.genre }}
              </option>
          </select>
        </td>
      </tr>
    </table>
    <button class="button">更新</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props:["val","areaData","genreData"],
  data() {
    return {
      preview: "",
      file: "",
      imageSelect: false,
    }
  },
  methods:{
    onFileChange(event) {
      this.file = event.target.files[0];
      // 何も選択されていなかったら処理中断
      if (event.target.files.length === 0) {
        this.reset();
        return false;
      }
      const reader = new FileReader();
      (reader.onload = (e) => {
        this.preview = e.target.result;
        this.imageSelect = true;
      }),
        reader.readAsDataURL(event.target.files[0]);
    },
    reset() {
      (this.preview = null),
        (this.file = null),
        (this.$el.querySelector('input[type="file"]').value = null);
    },
  }
}
</script>

<style scoped>
.overlay {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal_window {
    text-align: left;
    z-index: 2;
    width: 80%;
    padding: 10px;
    background: #fff;
  }
  .store_image_div{
    width: 40%;
  }
  table{
  width: 90%;
  margin: 0 auto;
  }
  tr{
    border: 1px solid #c2c2c2;
  }
  th{
    width: 30%;
    font-size: 15px;
    padding:10px 20px;
    background-color: rgb(212, 208, 201);
  }
  td{
    width: 60%;
    padding: 0 10px;
  }
  td:nth-of-type(1){
    padding-bottom: 10px;
  }
  input,textarea,select{
    width: 100%;
    box-sizing:border-box;
    padding: 5px;
    font-size: 18px;
  }
  textarea{
    display: block;
  }
  .image{
    width: 100%;
    position: relative;
    overflow: hidden;
    margin: 10px 0;
  }
  .image img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .button{
    margin: 20px 0 20px 50%;
    width: 100px;
    font-weight: bold;
    transform: translate(-50%);
    background-color: rgb(108, 172, 209);
  }
  .flex{
    justify-content: space-between;
  }
  span{
    margin-top: 60px;
    font-size: 25px;
    font-weight: bold;
  }
  h2{
    margin-left: 30px;
  }
</style>