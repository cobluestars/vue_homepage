<template>
    <div class="my-content">
      <!-- cardclass -->
      <div class="card" id="cardclass" style="width: 18rem;">
        <span class="upload-image-container">
          <!-- cardclass 이미지 표시 -->
          <img :src="cardClassImage || require('@/assets/images/catandme.png')" class="card-img-top" alt="uploadimage" @click="uploadImage('cardclass')">
          <!-- cardclass 이미지 업로드 인풋 -->
          <input ref="cardClassImageInput" type="file" id="imageUpload" style="display: none" accept="image/*" @change="handleImageUpload($event, 'cardclass')">
        </span>
        <div class="card-body">
          <!-- 제목 입력 필드 -->
          <input v-model="newTitle" type="text" id="Card title" placeholder="제목을 입력하세요">
          <hr>
          <!-- 메시지 입력 필드 -->
          <textarea v-model="newMessage" rows="4" cols="50" placeholder="메시지를 입력하세요"></textarea>
          <!-- 게시 버튼 -->
          <button type="button" class="btn btn-success" @click="addMessage">게시</button>
        </div>
      </div>
      <hr>
  
      <!-- cardcontext -->
      <ul class="card-list">
        <div class="card" id="cardcontext" v-for="message in messages" :key="message.id">
          <span class="upload-image-container">
            <!-- 업로드된 이미지 표시 -->
            <img :src="message.uploadedImageUrl || cardClassImage" class="card-img-top" alt="uploaded-image" @click="message.editing ? uploadImage($event, message) : null">
            <!-- 이미지 업로드 인풋 -->
            <input type="file" class="image-upload" style="display: none" accept="image/*" @change="handleImageUpload($event, message)">
          </span>
          <div class="card-body">
            <!-- 제목 -->
            <h5 v-if="!message.editing" class="card-title">{{ message.title }}</h5>
            <input v-else v-model="message.title" type="text" id="Card title" placeholder="제목을 수정하세요">
            <hr>
            <!-- 메시지 -->
            <p v-if="!message.editing" class="card-text">{{ message.text }}</p>
            <textarea v-else v-model="message.text" rows="4" cols="50" placeholder="메시지를 수정하세요"></textarea>
            <!-- 게시 일자 및 시간 -->
            <div class="card-footer text-muted">
              {{ formatDate(message.postedAt) }}
            </div>
            <!-- 삭제 버튼 -->
            <a href="#" class="btn btn-dark" id="delete" @click="deleteMessage(message)">삭제</a>
            <!-- 수정 버튼 -->
            <a href="#" class="btn btn-secondary" id="modify" @click="toggleEditing(message)">수정</a>
          </div>
        </div>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyContent',
  
    data() {
      return {
        newTitle: '',
        newMessage: '',
        messages: [],
        cardClassImage: '',
        defaultCardClassImage: require('@/assets/images/catandme.png'),
      };
    },
  
    methods: {
      // 메시지 추가
      addMessage() {
        if (this.newMessage && this.newTitle) {
          const message = {
            id: Date.now(), // 고유한 ID 생성
            title: this.newTitle, // 제목 저장
            text: this.newMessage, // 메시지 저장
            uploadedImage: null, // 업로드된 이미지 초기화
            uploadedImageUrl: this.cardClassImage || this.defaultCardClassImage, // cardclass 이미지 URL 사용, 이미지 미업로드시, 디폴트 이미지인 catandme.png가 출력된다.
            editing: false, // 수정 모드 여부
            postedAt: new Date(), // 현재 시간을 할당
          };
          this.messages.push(message); // 메시지를 배열에 추가
          this.newTitle = ''; // 입력 필드 초기화
          this.newMessage = ''; // 입력 필드 초기화
          this.cardClassImage = ''; // cardclass 이미지 초기화
        }
      },
  
      // 이미지 업로드 처리
      uploadImage(target) {
        const inputElement = target === 'cardclass' ? this.$refs.cardClassImageInput : event.target.nextElementSibling;
        inputElement.click();
      },
  
      // 이미지 업로드 핸들러
      handleImageUpload(event, target) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            if (target === 'cardclass') {
              this.cardClassImage = reader.result;
            } else {
              target.uploadedImage = reader.result;
              target.uploadedImageUrl = reader.result;
            }
          };
          reader.readAsDataURL(file);
        }
      },
  
      // 수정 모드 토글
      toggleEditing(message) {
        event.preventDefault(); // 기본 동작 막기 (수정 버튼 누를 시 스크롤 올라가는 현상 해결)
        message.editing = !message.editing; // 수정 모드를 토글
      },
  
      // 메시지 삭제
      deleteMessage(message) {
        event.preventDefault(); // 기본 동작 막기 (삭제 버튼 누를 시 스크롤 올라가는 현상 해결)
        const index = this.messages.indexOf(message); // 메시지의 인덱스를 찾음
        if (index !== -1) {
          this.messages.splice(index, 1); // 배열에서 메시지를 제거
        }
      },
  
      // 날짜 및 시간 포맷팅
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
    },
  };
  </script>
  
  <style scoped>
  .my-content {
    max-width: 900px;
    margin: 0 auto;
    color: white;
    padding: 20px;
    position: relative;
  }
  
  #cardclass {
    width: 360px;
    margin: 0 auto;
  }
  
  .upload-image-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  
  .upload-image-container input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  
  #cardcontext {
    width: 360px;
    margin: 20px;
  }
  
  #modify {
    float: right;
    margin: 5px;
  }
  
  #delete {
    float: right;
    margin: 5px;
  }
  
  li {
    margin-bottom: 10px;
  }
  </style>
  