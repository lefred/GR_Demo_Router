<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MySQL InnoDB Cluster - Demo</title>
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          rel="stylesheet"
          crossorigin="anonymous">
  <link href="styles/style.css" type="text/css" rel="stylesheet" />
  <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>
<div class='content'>
<img src="pics/InnoDBCluster.png">
<button id="button-workload"
     class="btn btn-danger"
     style="float:right;"
     onclick="run_workload()">
     Run workload
</button>
<div class='displayflex content'>
  <div class='router'>
    <div class='displayflex'>
       <div class='reads_title green'>READS</div>
       <div class='reads_title red'>WRITES</div>
    </div>
    <div class='displayflex' id='router_window'>
       <div class='reads_title'><p class='read_div'></p></div>
       <div class='reads_title'><p class='write_div'></p></div>
    </div>
    <div class='displayflex'>
       <div class='reads_title reads_results'><p class='read_res'></p></div>
       <div class='reads_title reads_results'><p class='write_res'></p></div>
    </div>
  </div>
  <div class='group_overview'>

    <section id="server-zone">
        <h4 class="recovery">Group</h4>
    </section>


    <section id="server-zone">
        <h4 class="recovery">Recovery</h4>
    </section>

    <section id="server-dock">
        <article id="mysql1" class="server-box server-down">
            <span class="fas fa-server"></span>
            <div class="server-info">
              mysql1 
            </div>
        </article>
        <article id="mysql2" class="server-box server-down">
            <span class="fas fa-server"></span>
            <div class="server-info">
              mysql2
            </div>
        </article>
        <article id="mysql3" class="server-box server-down">
            <span class="fas fa-server"></span>
            <div class="server-info">
              mysql3
            </div>
        </article>
    </section>

  </div>
</div>
</div>
<script src="scripts/script.js"></script>

</body>
</html>
