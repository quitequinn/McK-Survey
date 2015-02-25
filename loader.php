
<div class="centerWrap winH loader">
	<div class="center">
		<img data-w="1" class="no-space" src="stars.png">
	</div>
</div>

<style>
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.loader {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;
  background: #f3f3f3;
  width: 100%;
  /* height: 100vh; */
  height: 100%;
}
.loader img {
  -webkit-animation: spin 4s linear infinite;
  animation: spin 4s linear infinite;
  margin: 0 auto;
  display: block;
}
</style>