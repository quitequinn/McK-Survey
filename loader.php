
<div class="centerWrap winH loader">
	<div class="center">
		<img data-w="1" class="no-space" src="stars.png">
    <h6>Try using your arrow keys or swiping</h6>
	</div>
</div>

<style>
.loader h6 {
    text-transform: uppercase;
    letter-spacing: .15em;
    font-size: 14px;
    line-height: 2;
    font-weight: 600;
    text-align: center;
    font-family: sans-serif;
    width: 250px;
    margin: 3em auto;
}

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
  display: table;
}
.loader .center{
    display: table-cell;
    margin-right: auto;
    margin-left: auto;
    vertical-align: middle;
}
.loader img {
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 4s linear infinite;
  margin: 0 auto;
  display: block;
  width: 100px;
}
</style>