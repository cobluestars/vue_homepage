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
        <!-- 비밀번호 입력 필드 -->
        <div class="col-auto" id="pw">
          <label for="inputPassword" class="visually-hidden">password</label>
          <input v-model="addMessagePassword" type="password" class="form-control" id="inputPassword" placeholder="비밀번호">
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
        <img :src="message.uploadedImageUrl || cardClassImage" class="card-img-top" alt="uploaded-image" @click="message.editing ? () => uploadImage($event, message) : null">
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
          <!-- 수정 시 비밀번호 입력 필드 -->
          <div v-if="message.editing" class="col-auto" id="pw">
            <label for="inputPassword2" class="visually-hidden">Password</label>
            <input v-model="message.password" type="password" class="form-control" id="inputPassword2" placeholder="Password" ref="passwordInput">
          </div>
          <!-- 삭제 시 비밀번호 입력 필드 -->
          <div v-if="message.deleting" class="col-auto">
            <label for="inputPassword2" class="visually-hidden">비밀번호</label>
            <input v-model="message.password" type="password" class="form-control" id="inputPassword2" placeholder="비밀번호" ref="passwordInput">
          </div>

          <!-- 삭제 버튼 -->
          <a href="#" class="btn btn-dark" id="delete" v-if="!message.editing" @click="deleteMessage(message)">삭제</a>
          <!-- 수정 버튼 -->
          <a href="#" class="btn btn-secondary" id="modify" v-if="!message.deleting" @click="message.editing = true; toggleEditing(message, $event, addMessagePassword)">수정</a>
          <!-- 삭제 버튼 -->
          <!-- <a href="#" class="btn btn-dark" id="delete" @click="deleteMessage(message)">삭제</a> -->
          <!-- 수정 버튼 -->
          <!-- <a href="#" class="btn btn-secondary" id="modify" @click="toggleEditing(message, $event, addMessagePassword)">수정</a> -->
        </div>
      </div>
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
      addMessagePassword: '', // 새 메시지 추가용 비밀번호를 저장하는 데이터 속성
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
            correctPassword: data.correctPassword, // correctPassword 속성 추가
          });
        });
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 에러 발생: ', error);
      });
  },

  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Intl.DateTimeFormat('ko-KR', options).format(date);
    },

    addMessage() {
      if (this.addMessagePassword === '') {
        alert('비밀번호를 입력하세요.');
        return;
      }
      const message = {
        title: this.newTitle,
        text: this.newMessage,
        uploadedImage: null,
        uploadedImageUrl: this.cardClassImage || this.defaultCardClassImage,
        editing: false,
        postedAt: new Date(), //현재 시간
        password: this.addMessagePassword,
        correctPassword: this.addMessagePassword, // correctPassword 속성 추가
      };

      db.collection('MyData')
        .add(message)
        .then((docRef) => {
          message.id = docRef.id;
          this.cardcontexts.unshift(message); // 새로운 게시물을 배열의 맨 앞에 추가
          this.newTitle = '';
          this.newTitle = '';
          this.newMessage = '';
          this.cardClassImage = '';
          this.addMessagePassword = ''; // 비밀번호 입력 필드 초기화
        })
        .catch((error) => {
          console.error('메시지를 추가하는 중 에러 발생: ', error);
        });
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

    toggleEditing(message, event) {
      const previousScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      // 비밀번호 확인 로직 추가
      const inputPassword = message.password; // 입력한 비밀번호
      const correctPassword = message.correctPassword; // 정확한 비밀번호

      if (message.created) {
        // 게시물이 생성된 직후에는 업데이트를 실행하지 않음
        message.editing = !message.editing;
      } else if (inputPassword === correctPassword) {
        message.editing = !message.editing;

        if (message.editing) {
          // 수정 모드로 전환되었을 때, 비밀번호 필드를 표시하기 위해 Vue.nextTick 사용
          this.$nextTick(() => {
            const passwordInput = event.target.closest('.card').querySelector('#inputPassword2');
            if (passwordInput) {
              setTimeout(() => {
                passwordInput.focus();
              }, 0);
            }
          });
        } else {
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
              // 스크롤 위치 복원 (딜레이 추가)
              setTimeout(() => {
                window.scrollTo(0, previousScrollTop);
              }, 100); // 100ms 딜레이
              this.restoreScrollPosition(previousScrollTop);
            })
            .catch((error) => {
              console.error('데이터를 업데이트하는 중 에러 발생: ', error);
            });
        }
      } else {
        if (!message.passwordMismatch) {
          message.passwordMismatch = true;
          setTimeout(() => {
            message.passwordMismatch = false;
          }, 3000); // 3초 후에 비밀번호 불일치 상태를 초기화
        }
        // 스크롤 위치 복원 (딜레이 추가)
        setTimeout(() => {
          window.scrollTo(0, previousScrollTop);
        }, 100); // 100ms 딜레이
      }
    },

    deleteMessage(message) {
      const previousScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.restoreScrollPosition(previousScrollTop);

      if (message.deleting) {
        const index = this.cardcontexts.indexOf(message);
        if (index > -1) {
          this.restoreScrollPosition(previousScrollTop);
          // 삭제 확인 작업을 위해 confirmDeleteMessage 메서드 호출
          this.confirmDeleteMessage(message, previousScrollTop)
            .then(() => {
              // 삭제 작업이 완료된 후 스크롤 위치 복원
              this.restoreScrollPosition(previousScrollTop);
            })
            .catch(() => {
              // 삭제 작업이 실패한 경우에도 스크롤 위치 복원
              this.restoreScrollPosition(previousScrollTop);
            });
        }
      } else {
        message.deleting = true;
      }
    },

    confirmDeleteMessage(message, previousScrollTop) {
      return new Promise((resolve, reject) => {
        const inputPassword = message.password; // 입력한 비밀번호
        const correctPassword = message.correctPassword; // 정확한 비밀번호

        if (inputPassword === correctPassword) {
          const index = this.cardcontexts.indexOf(message);
          if (index > -1) {
            this.cardcontexts.splice(index, 1);

            db.collection('MyData')
              .doc(message.id)
              .delete()
              .then(() => {
                console.log('데이터가 성공적으로 삭제되었습니다.');
                resolve();
              })
              .catch((error) => {
                console.error('데이터를 삭제하는 중 에러 발생: ', error);
                reject();
              })
              .finally(() => {
                // 삭제 작업이 완료된 후 스크롤 위치 복원
                this.restoreScrollPosition(previousScrollTop);
              });
          }
        } else {
          alert('비밀번호가 일치하지 않습니다.');
          reject();
        }
      });
    },

    // 스크롤 위치 복원
    restoreScrollPosition(previousScrollTop) {
      setTimeout(() => {
        window.scrollTo(0, previousScrollTop);
      }, 100); // 100ms 딜레이
    },

    // 페이지 이동
    goToPage(page) {
      this.currentPage = page;
      window.scrollTo(0, 0);
    },
  }
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

  #pw {
    float: left;
    width: 160px;
    margin-top: 4px;
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
  