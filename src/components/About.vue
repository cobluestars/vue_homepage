<template>
    <body>
    <div>
      <nav id="nav">
        <ul>
          <router-link class="router-link" to="/">Home</router-link>
          <router-link class="router-link" to="/About">About</router-link>
          <router-link class="router-link" to="/MyUmzzal">MyUmzzal</router-link>
          <a class="router-link" href="http://cobluestar.ivyro.net/board/">게시판</a>
        </ul>
      </nav>
  
      <header id="header">
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="./assets/images/catandme.png" class="d-block w-100" alt="cam">
            </div>
            <div class="carousel-item">
              <img src="./assets/images/catandme2.png" class="d-block w-100" alt="cam2">
            </div>
            <div class="carousel-item">
              <img src="./assets/images/catandme3.png" class="d-block w-100" alt="cam3">
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
        <div class="card" id="card1">
          <img class="card-img-top" src="./assets/images/catandme2.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Front-End</h5>
            <p class="card-text">Current Using Tech-Stac</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"> <img src="./assets/android-icon-36x36.png" alt="vue"> Vue</li>
            <li class="list-group-item"> <img src="./assets/android-icon-36x361.png" alt="react"> React</li>
            <li class="list-group-item" v-if="isDesktop">
                <img src="./assets/android-icon-36x362.png" alt="js"> JavaScript
            </li>
            <li class="list-group-item" v-else>
                <img src="./assets/android-icon-36x362.png" alt="js"> Java<br>Script
            </li>
          </ul>
        </div>
  
        <div id="content">
            <h3>김민우</h3>
            <hr>
            <p class="content-title">Content</p>
            <div class="content-content">
               <ul>
                <li>서강대학교 물리학과 & 국어국문학과 졸</li>
                <li>시인, 이야기꾼</li>
                <li>일러스트레이터</li>
               </ul>
            </div>
            <hr>
            <p class="tech-stac">Tech-Stac</p>
            <div class="tech-stac-content">
              <ul>
                <li class="tsc">Front-End:<br>Html, CSS, JS, BootStrap, Vue, React</li>
                <li class="tsc">Back-End:<br> Node.js, Express, Mysql, Firebase, Tomcat, Java</li>
                <li class="tsc">Common:<br> Git, Github</li>
              </ul>
            </div> 
        </div>
  
      <div class="card" id="card2">
        <img class="card-img-top" src="./assets/images/catandme3.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Back-End</h5>
            <p class="card-text">Current Using Tech-Stac</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"> <img src="./assets/javamini.png" alt="java"> Java</li>
            <li class="list-group-item"> <img src="./assets/nodemini.png" alt="node.js"> Node.js</li>
            <li class="list-group-item" v-if="isDesktop">
              <img src="./assets/firebasemini.png" alt="firebase"> Firebase
            </li>
            <li class="list-group-item" v-else>
              <img src="./assets/firebasemini.png" alt="firebase"> Fire<br>base
            </li>
          </ul>
        </div>
      </div>
  
      <div id="clear"></div>
    </div>
  </body>
  </template>
  
  <script>
  export default {
    name: 'MyPage',
    mounted() {
      if (window.innerWidth >= 768) {
        this.isDesktop = true;
      } else {
        this.isDesktop = false;
      }
    },
    data() {
      return {
        isDesktop: false,
      };
    },
  };
  </script>
  
  <style scoped>
  @media screen and (min-width: 768px) {
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

  #nav li a:hover {
    font-weight: 800;
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
  
  .card {
    float: left;
    padding: 20px;
    width: 200px;
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
}

@media screen and (max-width: 767px) {
  
  body {
    margin: 0 auto;
    width: 100%;
  }

  #nav {
    width: 100%;
    background: #000;
    position: fixed;
    height: 50px;
    padding-top: 10px;
    top: 0px;
    z-index: 2;
  }

  #nav .router-link {
    text-align: center;
    margin-left: 2.2em;
    display: inline;
    list-style: none;
    text-decoration: none;
    font-size: small;
    color: white;
  }
  
  #nav .router-link:hover {
    font-weight: 800;
  }

  #header {
    position: relative;
    z-index: 1;
    margin-bottom: 20px;
    margin-top: 48px;
  }

  #card1 {
    float: left;
    padding: 20px;
    width: 30%; /* Adjust the width as needed */
    font-size: xx-small;
    text-align: center;
  }

  #card2 {
    float: right;
    padding: 20px;
    width: 30%; /* Adjust the width as needed */
    font-size: xx-small;
    text-align: center;

  }
  
  .card-title {
    text-align: center;
    font-size: small;
  }

  .card-text {
    text-align: center;
    font-size: x-small;
  }
  
  #content {
    width: 40%;
    float: left;
    padding: 20px;
    margin-bottom: 20px;
    margin: 0 0 20px 0; /* Adjust the margin as needed */
    border: 1px solid rgb(186, 186, 186);
    border-radius: 5px;

    font-size: xx-small;
  }

  #content .content-title {
    font-size: medium;
    margin-top: 1px;
  }

  #content .content-content {
    margin-left: -24px;
  }

  #content .tech-stac {
    font-size: medium;
    margin-top: 1px;
  }
  #content .tech-stac-content {
    margin-left: -24px;
  }
  #content .tsc {
    margin: 2px;
  }
}

  </style>
  