
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

//class Visit_1{
//    constructor(attr){
//        this.patient=attr.patient
//        this.nurse=attr.nurse
//        this.date=attr.date
//    }
//}

//Visit_1.prototype.renderHTML=function(){
  //  return '<div>${this.date}+" "+${this.nurse.name}+" "+${this.patient}</div>'
//}
