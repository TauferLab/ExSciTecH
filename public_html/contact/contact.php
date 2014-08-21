<?php
    require_once("./src/php/template.php");
    
    printHeader("Contact Us");
?>

<div class="container">

<h1>Contact Us</h1>

<div class="well">
  <form class="bs-example form-horizontal">
    <fieldset>
      <legend>Legend</legend>
      <div class="form-group">
        <label for="inputEmail" class="col-lg-2 control-label">Email</label>
        <div class="col-lg-3">
          <input type="text" class="form-control" id="inputEmail" placeholder="Email">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword" class="col-lg-2 control-label">Name</label>
        <div class="col-lg-3">
          <input type="text" class="form-control" id="inputEmail" placeholder="Name">
        </div>
      </div>
      <div class="form-group">
        <label for="textArea" class="col-lg-2 control-label">Textarea</label>
        <div class="col-lg-6">
          <textarea class="form-control" rows="3" id="textArea"></textarea>
        </div>
      </div>
    </fieldset>
  </form>
</div>


<?php printFooter();?>
