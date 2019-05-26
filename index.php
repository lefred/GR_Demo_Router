<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MySQL InnoDB Cluster - Demo</title>
  <link href="libs/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          rel="stylesheet"
          crossorigin="anonymous">
  <link href="styles/style.css" type="text/css" rel="stylesheet" />
  <script src="libs/jquery-1.10.2.js"></script>
</head>
<body>
<div class='content'>
<img src="pics/InnoDBCluster.png">
<span style="position: fixed; right: 8px;">
<button id="button-extended-view"
     class="btn btn-info"
     onclick="enable_extended_view()">
     Extended view
</button>
<button id="button-workload"
     class="btn btn-danger"
     onclick="run_workload()">
     Run workload
</button>
</span>
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
            <span id="mysql1_pop" class="fas fa-server"></span>
            <div class="server-info">
              mysql1
              <div id="server1_info_extra" class="server-info-extra"> 
              </div> 
            </div>
        </article>
        <article id="mysql2" class="server-box server-down">
            <span id="mysql2_pop" class="fas fa-server"></span>
            <div class="server-info">
              mysql2
              <div id="server2_info_extra" class="server-info-extra"> 
              </div> 
            </div>
        </article>
        <article id="mysql3" class="server-box server-down">
            <span id="mysql3_pop" class="fas fa-server"></span>
            <div class="server-info">
              mysql3
              <div id="server3_info_extra" class="server-info-extra"> 
              </div> 
            </div>
        </article>
    </section>

  </div>
</div>
</div>
<script src="scripts/script.js"></script>

</body>
</html>
