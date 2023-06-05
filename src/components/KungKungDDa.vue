<template>
    <body>
    <div>
      <nav id="nav">
        <ul>
          <router-link class="router-link" to="/">Home</router-link>
          <router-link class="router-link" to="/About">About</router-link>
          <router-link class="router-link" to="/MakeTheGif">MakeTheGif</router-link>
          <router-link class="router-link" to="/KungKungDDa">KungKungDDa</router-link>         
          <!--<li><a href="#">게시판</a></li>-->
       </ul>
      </nav>
  
      <header id="header">
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="./assets/images/catandme.png" class="d-block w-100" alt="cam" height="600px">
              </div>
              <div class="carousel-item">
                <img src="./assets/images/catandme2.png" class="d-block w-100" alt="cam2" height="600px">
              </div>
              <div class="carousel-item">
                <img src="./assets/images/catandme3.png" class="d-block w-100" alt="cam3" height="600px">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
      </header>
  
      <div id="container">
        <div class="card" style="width: 200px;">
          <img class="card-img-top" src="./assets/images/catandme2.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Front-End</h5>
            <p class="card-text">Current Using Tech-Stac</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"> <img src="./assets/android-icon-36x36.png" alt="vue"> Vue</li>
            <li class="list-group-item"> <img src="./assets/android-icon-36x361.png" alt="react"> React</li>
            <li class="list-group-item"> <img src="./assets/android-icon-36x362.png" alt="js"> JavaScript</li>
          </ul>
        </div>

          <div id="content">
            <h2 id="kkd">공포의 쿵쿵따</h2>
              <div id="app">
                <h5>♪♬쿵쿵따리 쿵쿵따 쿵쿵따리 쿵쿵따♪♬</h5>
                <br>
                <div class="container">
                  <div class="player" v-if="currentPlayer === 1">
                    <h5>플레이어 1</h5>
                    <input type="text" v-model="word" placeholder="단어를 입력하세요" />
                    <button type="button" class="btn btn-success" @click="submitWord">입력</button>
                  </div>
                  <div class="player" v-else>
                    <h5>플레이어 2 (컴퓨터)</h5>
                    <p>{{ computerWord }}</p>
                  </div>
                </div>
                <div id="result">{{ result }}</div>
              </div>
        </div>
        
        <div class="card" style="width: 200px;">
          <img class="card-img-top" src="./assets/images/catandme3.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Back-End</h5>
            <p class="card-text">Current Using Tech-Stac</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"> <img src="./assets/javamini.png" alt="java"> Java</li>
            <li class="list-group-item"> <img src="./assets/nodemini.png" alt="node.js"> Node.js</li>
            <li class="list-group-item"> <img src="./assets/phpmini.png" alt="php"> php</li>
          </ul>
        </div>
      </div>
  
      <div id="clear"></div>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      a: [], // 단어 목록으로 초기화
      currentPlayer: 1,
      word: "",
      lastSyllable: "",
      gameOver: false,
      result: ""
    };
  },

  created() {
    fetch("/word.txt")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then(data => {
        const wordList = data.split(",");
        this.a = wordList.map(word => word.trim().toLowerCase());
        console.log(this.a); // this.a 배열의 값 출력
      })
      .catch(error => {
        console.error(error);
      });
  },

  computed: {
    computerWord() {
      if (this.currentPlayer === 2) {
        return this.selectComputerWord();
      }
      return "";
    }
  },

  methods: {
    submitWord() {
      const word = this.word.trim();

      if (word === "") {
        return;
      }

      if (!this.isValidWord(word)) {
        this.showResult("유효한 단어가 아닙니다. 다시 입력하세요.");
        return;
      }

      if (!this.isLastSyllableMatch(word)) {
        this.showResult("마지막 음절이 일치하지 않습니다. 다시 입력하세요.");
        return;
      }

      this.word = "";

      if (this.currentPlayer === 1) {
        this.lastSyllable = this.getLastSyllable(word);
        this.currentPlayer = 2;
        setTimeout(this.computerTurn, 1000);
      } else {
        this.lastSyllable = this.getLastSyllable(word);
        this.currentPlayer = 1;
        this.word = this.computerWord;
        this.submitWord();
      }

      this.gameOver = this.isGameOver();
      if (this.gameOver) {
        this.showResult("게임 종료!");
      }
    },

    isValidWord(word) {
      const trimmedWord = word.trim().toLowerCase();

      // 플레이어가 첫 번째로 입력한 단어는 유효성 검사를 생략
      if (this.currentPlayer === 1) {
        return true;
      }

      return this.a.includes(trimmedWord);
    },

    isGameOver() {
      return this.a.every((word) => word === "");
    },

    computerTurn() {
      if (this.currentPlayer === 2) {
        const word = this.selectComputerWord();
        this.word = word;
        this.submitWord();
      }
    },

    selectComputerWord() {
  for (let i = 0; i < this.a.length; i++) {
        const word = this.a[i];
        if (word === "" && this.isLastSyllableMatch(word) && this.getLastSyllable(word) === this.lastSyllable) {
          return word;
        }
      }

      // 마지막 음절이 일치하는 단어가 없는 경우, 컴퓨터가 패배한 것으로 처리
      this.showResult("컴퓨터가 졌습니다!");
      return "";
    },

    // selectComputerWord() {
    //   const matchingWords = this.a.filter(
    //     (word) => word !== "" && this.isLastSyllableMatch(word)
    //   );

    //   if (matchingWords.length > 0) {
    //     const chosenWord = matchingWords.find(word => this.getLastSyllable(word) === this.lastSyllable);
    //     if (chosenWord) {
    //       return chosenWord;
    //     }
    //     return matchingWords[Math.floor(Math.random() * matchingWords.length)];
    //   }

    //   // 마지막 음절이 일치하는 단어가 없는 경우, 모든 단어 중 마지막 음절이 일치하는 단어를 선택
    //   const allWords = this.a.filter((word) => word !== "");
    //   const chosenWord = allWords.find(word => this.getLastSyllable(word) === this.lastSyllable);
    //   if (chosenWord) {
    //     return chosenWord;
    //   }

    //   // 마지막 음절이 일치하는 단어도 없는 경우, 랜덤하게 단어 선택
    //   return allWords[Math.floor(Math.random() * allWords.length)];
    // },

  isLastSyllableMatch(word) {
    const lastSyllable = this.getLastSyllable(word);

    // 플레이어가 첫 번째로 입력한 단어는 유효성 검사를 생략
    if (this.currentPlayer === 1) {
      return true;
    }

    // 컴퓨터의 차례에서 마지막 음절이 일치하는지 확인
    if (lastSyllable === this.lastSyllable) {
      return true;
    }

    // 컴퓨터의 차례에서 첫 음절이 일치하지 않는 경우 false 반환
    if (this.currentPlayer === 2) {
      return false;
    }

    // 플레이어의 차례에서 마지막 음절이 일치하지 않는 경우
    // 마지막 음절이 일치하는 다른 단어가 있는지 확인하여 반환
    const matchingWords = this.a.filter((word) => word !== "");
    const matchedWord = matchingWords.find((word) => this.getLastSyllable(word) === lastSyllable);
    return matchedWord !== undefined;
  },

    getLastSyllable(word) {
      const lastChar = word.charAt(word.length - 1);

      // 플레이어가 첫 번째로 입력한 단어는 유효성 검사를 생략
      if (this.currentPlayer === 1) {
        return this.getLastSound(lastChar);
      }

      if (!lastChar || lastChar < "가" || lastChar > "힣") {
        return lastChar;
      }

      const lastCharSound = this.getLastSound(lastChar);
      if (!lastCharSound) {
        return lastChar;
      }

      return lastCharSound;
    },

    getLastSound(c) {
      const HANGUL_BASE_UNIT = 28;

      if (!c || c < "가" || c > "힣") {
        return c;
      }

      const code = c.charCodeAt(0) - "가".charCodeAt(0);
      const jong = code % HANGUL_BASE_UNIT;

      switch (jong) {
        case 0:
          return "ㄱ";
        case 1:
          return "ㄲ";
        case 2:
          return "ㄴ";
        case 3:
          return "ㄷ";
        case 4:
          return "ㄹ";
        case 5:
          return "ㅁ";
        case 6:
          return "ㅂ";
        case 7:
          return "ㅅ";
        case 8:
          return "ㅆ";
        case 9:
          return "ㅇ";
        case 10:
          return "ㅈ";
        case 11:
          return "ㅊ";
        case 12:
          return "ㅋ";
        case 13:
          return "ㅌ";
        case 14:
          return "ㅍ";
        case 15:
          return "ㅎ";
        default:
          return c;
      }
    },

    showResult(message) {
      this.result = message;
    }
  }
};

//   methods: {
//     submitWord() {
//       const word = this.word.trim();

//       if (word === "") {
//         return;
//       }

//       if (!this.isValidWord(word)) {
//         this.showResult("유효한 단어가 아닙니다. 다시 입력하세요.");
//         return;
//       }

//       if (!this.isFirstSoundMatch(this.lastWord, word)) {
//         this.showResult("끝말잇기 규칙에 어긋납니다. 다시 입력하세요.");
//         return;
//       }

//       this.word = "";

//       if (this.currentPlayer === 1) {
//         this.lastWord = word.charAt(word.length - 1);
//         this.currentPlayer = 2;
//         setTimeout(this.computerTurn, 1000);
//       } else {
//         this.lastWord = word.charAt(word.length - 1);
//         this.currentPlayer = 1;
//       }

//       this.gameOver = this.isGameOver();
//       if (this.gameOver) {
//         this.showResult("게임 종료!");
//       }
//     },

//     isValidWord(word) {
//       const trimmedWord = word.trim().toLowerCase();

//       // 플레이어가 찻 반째로 입력한 단어는 유효성 검사를 생략
//       if (this.currentPlayer === 1) {
//         return true;
//       }

//       return this.a.includes(trimmedWord);
//     },

//       isFirstSoundMatch(lastWord, word) {
//         const lastLastChar = lastWord.charAt(lastWord.length - 1);
//         const currentFirstChar = word.charAt(0);

//         // 플레이어가 첫 번째로 입력한 단어는 유효성 검사를 생략
//         if (this.currentPlayer === 1) {
//           return true;
//         }

//         return lastLastChar === currentFirstChar;
//       },

//       isDuplicateWord(word) {
//         return this.a.includes(word.toLowerCase());
//       },

//       selectComputerWord() {
//       const matchingWords = this.a.filter((word) =>
//         this.isFirstSoundMatch(this.lastWord, word)
//       );

//       if (matchingWords.length > 0) {
//         const randomIndex = Math.floor(Math.random() * matchingWords.length);
//         const selectedWord = matchingWords[randomIndex];
//         this.a = this.a.filter((word) => word !== selectedWord); // 단어 배열에서 선택한 단어 제거
//         return selectedWord;
//       }

//       const nonEmptyWords = this.a.filter((word) => word !== "");

//       if (nonEmptyWords.length > 0) {
//         const randomIndex = Math.floor(Math.random() * nonEmptyWords.length);
//         const selectedWord = nonEmptyWords[randomIndex];
//         this.a = this.a.filter((word) => word !== selectedWord); // 단어 배열에서 선택한 단어 제거
//         return selectedWord;
//       }

//       return "";
//     },
  
//     // removeWordFromList(word) {
//     //   const index = this.a.indexOf(word);
//     //   if (index !== -1) {
//     //     this.a.splice(index, 1);
//     //   }
//     // },

//     isGameOver() {
//       return this.a.every(word => word === "");
//     },

//     showResult(message) {
//       this.result = message;
//     },

//     computerTurn() {
//       if (this.currentPlayer === 2) {
//         const word = this.selectComputerWord();
//         this.word = word;
//         this.submitWord();
//       }
//     }
//   }
// };
</script>

  <style scoped>
  body {
      box-sizing: border-box;
      width: 940px;
      margin: 0px auto;
  }
  /* body {
    width: 940px;
    margin: 0px auto;
  } */
  
  #nav {
    background: #000;
    padding: .15em 0;
    width: 940px;
    position: fixed;
    height: 50px;
    padding-top: 10px;
    top: 0px;
    z-index: 2;
  }
  
  #nav .router-link {
    margin-left: 2.5em;
    display: inline;
    list-style: none;
    text-decoration: none;
    color: white;
  }
  
  #nav .router-link:hover {
    font-weight: 800;
  }
  
  #nav li a {
    color: #fff;
    text-decoration: none;
  }
  
  #header {
    position: sticky;
    top: 45px;
    color: #fff;
    font-size: 4em;
    z-index: 1;
    line-height: 180px;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 40px;
  }
  
  #header > h1 {
    margin: 0px;
  }
  
  .card {
    float: left;
    padding: 20px;
  }
  
  #content {
    float: left;
    width: 500px;
    padding: 20px;
    margin-bottom: 20px;
    margin: 0 20px;
    border: 1px solid rgb(186, 186, 186);
    border-radius: 5px;
  }

  /*쿵쿵따 */
    #app {
    text-align: center;
    padding: 20px;
    }

    #content #kkd {
    text-align: center;
    }

    .title {
    font-size: 20px;
    margin-bottom: 20px;
    }

    .container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    }

    .player {
    width: 200px;
    }

    input {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    }

    #result {
    font-size: 18px;
    font-weight: bold;
    }
  </style>
  