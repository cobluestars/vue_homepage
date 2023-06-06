<template>
    <body>
    <div>
      <nav id="nav">
        <ul>
          <router-link class="router-link" to="/">Home</router-link>
          <router-link class="router-link" to="/About">About</router-link>
          <router-link class="router-link" to="/MyUmzzal">MyUmzzal</router-link>
          <a class="router-link" href="http://cobluestar.ivyro.net/board/">게시판</a>
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
			<h2>김민우</h2>
			<p>풀스택 개발자를 목표로 두고 있습니다.<br>
			시인, 프리랜서 일러스트레이터로,<br>
			목판화, 리놀륨판화를 주로 작업했습니다.<br>
			지금도 가끔 창작활동을 이어가고 있습니다.</p>
			<p id="email">E-mail: cobaltbluestars@gmail.com</p> 
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
            <li class="list-group-item"> <img src="./assets/firebasemini.png" alt="firebase"> Firebase</li>
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
  };
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
    
  #email {
    font-weight: 800;
  }
  
  #email:hover {
    background-color: yellowgreen;
  }
  </style>
  