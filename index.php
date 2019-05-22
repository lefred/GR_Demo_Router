<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MySQL InnoDB Cluster - Demo</title>
  <link href="style.css" type="text/css" rel="stylesheet" />
  <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>
<div class='content'>
<img src="InnoDBCluster.png">
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


  <div id="group">
  group
  </div>
  <div id="recovery">
  recovery
  </div>
  <div id="off">
    <div id="serveur1-off" class="">
      <span class="fas fa-server"></span>
      <p class="texte">mysql1</p>
     </div>
    
        <div id="serveur2-off" class="">
            <span class="fas fa-server"></span>
            <p class="texte">mysql2</p>
        </div>
    
        <div id="serveur3-off" class="">
            <span class="fas fa-server"></span>
            <p class="texte">mysql3</p>
        </div>
  </div>




  </div>
</div>
</div>
<script src="script.js"></script>

</body>
</html>
