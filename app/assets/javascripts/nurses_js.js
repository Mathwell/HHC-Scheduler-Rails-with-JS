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
      $( ".visits" ).append(`<a href="#" class="add_visit" id=${dataId}>Add New Visit  </p>` );    
    });
   });
});


$(document).ready(function () {
  $(".nurses_visit").on("click", function(event) {
  event.preventDefault();
  //alert(event.target.id)
  var dataId=event.target.id
  $.get("/nurses/"+dataId+"/visits.json", function(data) {
    let visitList="";
    data.forEach(function(visit){
       visitList=visitList+visit["date"]+" "+ visit["patient"]["last_name"]+"  <a href=`#`>Edit</a><br /> ";      
    });
    $(".visits").html(visitList); 
    $( ".visits" ).append(`<a href="#" class="add_visit" id=${dataId} onClick="addVisit(this)">Add New Visit </a>` );
     
  });
 });
});

function addVisit(id) { 
  $form = $("<form></form>");
  $form.append($("<input>", 
  { type:'text', 
    placeholder:'date', 
    name:'date', 
    value: 'enter date', 
    })
  );
  $select=$("<select name='patient' placeholder='patient'></select>");
  $.get("/patients.json", function(data){
    data.forEach(function(patient){
      $select.append(`<option value=${patient.id}>${patient.last_name} ${patient.first_name}</option>`);
    })
  })
   
  $form.append($($select));
 
  $form.append( 
    $("<input>", 
         { type:'submit', 
           value:'Add Visit',            
           onClick: "postVisit(this)"
           }
      )
);

  //$form.append(`<input type="button" onClick="postVisit(this)" value="add visit">`);
  $('.visits').append($form);
  id.innerHTML = "Adding..."
  id.disable;
}

function postVisit(event){
  event.preventDefault
  alert("Posting!")
}





// function moreInfo(event){
//    event.preventDefault()
//    $(event.target).hide()
//  }
//  $('.btn').disable
//  $('.btn').click(moreInfo)
  

  