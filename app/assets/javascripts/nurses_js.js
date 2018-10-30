$(document).ready(function(){
  $(".js-next").on("click", function(event) {
    event.preventDefault();    
    var nextId = parseInt($(".js-next").attr("data-id")) + 1;
    $.get("/nurses/" + nextId + ".json", function(data) {
      $(".nurseName").text(data["last_name"]+ " "+data["first_name"]);
      $(".js-next").attr("data-id", data["id"]);      
    });
  })
})

$(document).ready(function () {
  $(".js-back").on("click", function(event) {
      event.preventDefault();
    var backId = parseInt($(".js-next").attr("data-id"))-1;
    var currentId=$(".js-next").attr("data-id")
    $.get("/visits/" + backId + ".json", function(data) {
      $(".nurseName").text(data["nurse"]["last_name"]+ " "+data["nurse"]["first_name"]);      
      // re-set the id to current on the link
      $(".id").text(data["id"]);
      $(".js-back").attr("dataid", backId);
      $(".js-next").attr("data-id", data["id"]);
    });
  });
});

$(document).ready(function () {
    $(".js-more").on("click", function(event) {
    event.preventDefault();
    var id=$(".js-more").attr("data-id")
    $.get("/nurses/"+id+"/visits.json", function(data) {
      let visitList="";
      data.forEach(function(visit){
         visitList=visitList+visit["date"]+" "+ visit["patient"]["last_name"]+"<br /> ";      
      });
      $(".visits").html(visitList);      
    });
   });
});


 function moreInfo(event){
    event.preventDefault()
    $(event.target).hide()
  }
  $('.btn').disable
  $('.btn').click(moreInfo)
  

  