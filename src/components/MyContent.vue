<template>
  <div class="my-content">
    <!-- cardclass -->
    <div class="card" id="cardclass" style="width: 18rem;">
      <!-- cardclass 이미지 표시 -->
      <img :src="cardClassImage || require('@/assets/images/catandme.png')" class="card-img-top" alt="uploadimage" @click="uploadImage('cardclass')">
      <!-- cardclass 이미지 업로드 인풋 -->
      <input ref="cardClassImageInput" type="file" id="imageUpload" style="display: none" accept="image/*" @change="handleImageUpload($event, 'cardclass')">
      <div class="card-body">
        <span id="imageclick" class="badge text-bg-secondary">이미지 클릭 시 이미지를 업로드합니다.</span>
        <!-- 제목 입력 필드 -->
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">제목</span>
          <input v-model="newTitle" type="text" id="Card title" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
        </div> 
        <hr>
        <!-- 메시지 입력 필드 -->
        <div class="input-group">
          <textarea class="form-control" aria-label="With textarea" v-model="newMessage" rows="4" cols="50" placeholder="메시지를 입력하세요"></textarea>
        </div>
        <!-- 게시 버튼 -->
        <button type="button" id="submit" class="btn btn-success" @click="addMessage">게시</button>
      </div>
    </div>
    <hr>

    <!-- cardcontext -->
    <ul class="card-list">
      <!-- 페이지 기능 추가 -->
      <div class="card" id="cardcontext" v-for="message in pagedCardcontexts" :key="message.id">
        <!-- 업로드된 이미지 표시 -->
        <img :src="message.uploadedImageUrl || cardClassImage" class="card-img-top" alt="uploaded-image" @click="message.editing ? uploadImage($event, message) : null">
        <!-- 이미지 업로드 인풋 -->
        <input type="file" class="image-upload" style="display: none" accept="image/*" @change="handleImageUpload($event, message)">
        <div class="card-body">
          <span v-if="message.editing" id="imageclick2" class="badge text-bg-secondary">이미지 클릭 시 이미지를 업로드합니다.</span>
          <!-- 제목 -->
          <h5 v-if="!message.editing" class="card-title">{{ message.title }}</h5>
          <input v-else v-model="message.title" type="text" id="Card title" placeholder="제목을 수정하세요" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
          <hr>
          <!-- 메시지 -->
          <p v-if="!message.editing" class="card-text">{{ message.text }}</p>
          <textarea v-else v-model="message.text" class="form-control" aria-label="With textarea" rows="4" cols="50" placeholder="메시지를 수정하세요"></textarea>
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
      <!-- 페이지 기능 추가 -->
    </ul>

    <!-- 페이지 기능 추가 -->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="goToPage(currentPage - 1)">Previous</a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <a class="page-link" @click="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" @click="goToPage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
    <!-- 페이지 기능 추가 -->
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC3QdPISsliLrHNuYJ9tjQ-hkEkGiD2g6M",
    authDomain: "myzzal-43fa5.firebaseapp.com",
    projectId: "myzzal-43fa5",
    storageBucket: "myzzal-43fa5.appspot.com",
    messagingSenderId: "611106972448",
    appId: "1:611106972448:web:d1a22c5ffd23af7247ad45",
    measurementId: "G-78YVGJN8SN"
  };
  
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default {
  name: 'MyContent',

  data() {
    return {
      newTitle: '',
      newMessage: '',
      cardcontexts: [],
      cardClassImage: '',
      defaultCardClassImage: require('@/assets/images/catandme.png'),
      currentPage: 1, // 페이지 기능 추가
    };
  },

  computed: {
    pagedCardcontexts() {
      const cardcontextsPerPage = 10;
      const startIndex = (this.currentPage - 1) * cardcontextsPerPage;
      const endIndex = startIndex + cardcontextsPerPage;
      return this.cardcontexts.slice(startIndex, endIndex);
    },
    totalPages() {
      const cardcontextsPerPage = 10;
      return Math.ceil(this.cardcontexts.length / cardcontextsPerPage);
    },
  }, //페이지 기능 추가

  mounted() {
    db.collection('MyData')
      .orderBy('postedAt', 'desc') // postedAt 필드를 내림차순으로 정렬
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          this.cardcontexts.push({
            id: doc.id,
            title: data.title,
            text: data.text,
            uploadedImage: null,
            uploadedImageUrl: data.uploadedImageUrl,
            editing: false,
            postedAt: data.postedAt.toDate(),
          });
        });
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 에러 발생: ', error);
      });
  },

  methods: {
    addMessage() {
      if (this.newMessage && this.newTitle) {
        const message = {
          title: this.newTitle,
          text: this.newMessage,
          uploadedImage: null,
          uploadedImageUrl: this.cardClassImage || this.defaultCardClassImage,
          editing: false,
          postedAt: new Date(), //현재 시간
        };

        db.collection('MyData')
          .add(message)
          .then((docRef) => {
            message.id = docRef.id;
            this.cardcontexts.push(message);
            this.newTitle = '';
            this.newMessage = '';
            this.cardClassImage = '';
          })
          .catch((error) => {
            console.error('메시지를 추가하는 중 에러 발생: ', error);
          });
      }
    },

    uploadImage(target) {
      const inputElement = target === 'cardclass' ? this.$refs.cardClassImageInput : event.target.nextElementSibling;
      inputElement.click();
    },

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

    toggleEditing(message) {
      event.preventDefault();
      message.editing = !message.editing;
      if (!message.editing) {
        // 수정이 완료되었을 때 Firestore 데이터 업데이트
        db.collection('MyData')
          .doc(message.id)
          .update({
            title: message.title,
            text: message.text,
            uploadedImageUrl: message.uploadedImageUrl,
          })
          .then(() => {
            console.log('데이터가 성공적으로 업데이트되었습니다.');
          })
          .catch((error) => {
            console.error('데이터를 업데이트하는 중 에러 발생: ', error);
          });
      }
    },

    deleteMessage(message) {
      event.preventDefault();
      db.collection('MyData')
        .doc(message.id)
        .delete()
        .then(() => {
          const index = this.cardcontexts.indexOf(message);
          if (index !== -1) {
            this.cardcontexts.splice(index, 1);
          }
          console.log('데이터가 성공적으로 삭제되었습니다.');
        })
        .catch((error) => {
          console.error('데이터를 삭제하는 중 에러 발생: ', error);
        });
    },

    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },

        // 페이지 이동
    goToPage(page) {
      this.currentPage = page;
      window.scrollTo(0, 0);
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
    width: 600px;
    margin: 0 auto;
  }

  #imageclick {
    margin-left: 12px;
    margin-bottom: 20px;
  }

  #submit {
    float: right;
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

  #imageclick2 {
    margin-left: 52px;
    margin-bottom: 20px;
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
  