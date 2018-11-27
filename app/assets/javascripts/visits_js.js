function addViewEventListeners(){
  //debugger
  const add_new=document.getElementById("new_visit")
  add_new.addEventListener('submit',function(event){postNewVisit(event)});
}


$(document).ready(function () {
  $(".js-next-visit").on("click", function(event) {
    event.preventDefault();    
    var nextId = parseInt($(".js-next-visit").attr("data-id")) + 1;
    $.get("/visits/" + nextId + ".json", function(data) {
      $(".nurseName").text(data["nurse"]["last_name"]+ " "+data["nurse"]["first_name"]);
      $(".visitDate").text(data["date"]);
      $(".visitPatient").text(data["patient"]["last_name"]+" "+data["patient"]["first_name"]);
      // re-set the id to current on the link
      $(".js-next-visit").attr("data-id", data["id"]);
    });
  });
});

$(document).ready(function () {
  $(".js-back-visit").on("click", function(event) {
      event.preventDefault();
    var backId = parseInt($(".js-next-visit").attr("data-id"))-1;
    var currentId=$(".js-next-visit").attr("data-id")
    $.get("/visits/" + backId + ".json", function(data) {
      $(".nurseName").text(data["nurse"]["last_name"]+ " "+data["nurse"]["first_name"]);
      $(".visitDate").text(data["date"]);
      $(".visitPatient").text(data["patient"]["last_name"]+ " "+data["patient"]["first_name"]);
      // re-set the id to current on the link
      $(".id").text(data["id"]);
      $(".js-back-visit").attr("dataid", backId);
      $(".js-next-visit").attr("data-id", data["id"]);
    });
  });
});

//$(document).ready(function () {
//  $('.new_visit').submit(function(event) {
      //prevent form from submitting the default way
//      event.preventDefault();
      //event.stopPropagation();     
//      var values = $(this).serialize();       
//      var posting = $.post('/visits', values);
//      posting.done(function(data) {
//        window.location="/visits/"+data.id;        
//      });
//    })
//  })
  
function postNewVisit(event)
{
  //prevent form from submitting the default way
  event.preventDefault();
  //event.stopPropagation();     
  //debugger
  var values = $(event.target).serialize();       
  var posting = $.post('/visits', values);
  posting.done(function(data) {
    window.location="/visits/"+data.id;

  });
}

  addViewEventListeners();