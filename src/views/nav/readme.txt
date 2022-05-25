html 파일에 nav, footer 적용하기

1. src/view/view 경로에 nav, footer 파일 저장

2. 각 html 파일 header 안에

    <!-- navbar, footer 활용을 위한 css, js -->
    <link rel="stylesheet" href="../nav/nav.css">
    <link rel="stylesheet" href="../footer/footer.css">
    <script src="../nav/nav.js"></script>
    <!-- navbar, footer 활용을 위한 jquery -->
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>

3. body 맨 앞에 nav
    <!--Navigation bar-->
    <div id="nav-placeholder"></div>

    <script>
      $(document).ready(function() {
        $('#nav-placeholder').load("../nav/nav.html", () => {
          navFunc()
        });
      });
    </script>
    
4. body 맨 뒤에 footer 추가하기
    <!--footer-->
    <div id="footer-placeholder"></div>

    <script>
      $(function () {
        $("#footer-placeholder").load("../footer/footer.html");
      });
    </script>