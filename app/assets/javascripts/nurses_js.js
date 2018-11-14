//renders visit index page via JS and Active Model Serialization JSON backend
function addEventListeners(){
   const visit_buttons=document.getElementsByClassName("nurses_visit")
  Array.from(visit_buttons).forEach(function(element) {
    element.addEventListener('click',function(event){showVisits(event)});
  });  
  //debugger
}

function showVisits(event){  
  event.preventDefault();  
  var dataId=event.target.id
  fetch("/nurses/"+dataId+"/visits.json",{
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then((resp) => resp.json())
  .then(data=>{
    let visitList="";    
    data.forEach(function(visit){
      visitList=visitList+visit["date"]+" "+ visit["patient"]["last_name"]+ visit["patient"]["first_name"]+"  <a href=`#`>Edit</a><br /> ";
    });
    debugger
    document.getElementById("visits").innerHTML=visitList + `<a href="#" class="add_visit" id=${dataId} onClick="postVisit(${dataId})">Add New Visit </a>`;
    //visits.innerHtml=visitList +`<a href="#" class="add_visit" id=${dataId} onClick="postVisit(${dataId})">Add New Visit </a>`;
  }).then(console.log('got to data')).catch(error=>console.log('Error:', error));
  
  $.get("/nurses/"+dataId+".json", function(data) {
    $("#nurseNameVisits").html("<h3>"+data.first_name+" "+data.last_name+"'s Visits: </h3>")
    });
}


  function postVisit(id) {
      const url = "/nurses/"+id+"/visits/new.html";
      $( location ).attr("href", url);
    };



$(document).ready(function(){
  $(".js-next").on("click", function(event) {
    event.preventDefault();
    var nextId = parseInt($(".js-next").attr("data-id")) + 1;
    $.get("/nurses/" + nextId + ".json", function(data) {
      $(".nurseName").text(data["last_name"]+ " "+data["first_name"]);
      $(".nurseVisits").text(data["visits"].length);
      $(".nursePatients").text(data["patients"].length);
      $(".nurseNameVisits").html(data["first_name"]+" "+data["last_name"]+"'s Visits:")
      $(".nurses_visit").attr("id",data["id"]);
      $(".visits").text("");
      $(".js-next").attr("data-id", data["id"]);
      $(".js-back").attr("data-id", data["id"]);
    });
  })
})

$(document).ready(function () {
  $(".js-back").on("click", function(event) {
    event.preventDefault();
    var backId = parseInt($(".js-back").attr("data-id"))-1;
    $.get("/nurses/" + backId + ".json", function(data) {
      $(".nurseName").text(data["last_name"]+ " "+data["first_name"]);
      $(".nurseVisits").text(data["visits"].length);
      $(".nursePatients").text(data["patients"].length);
      $(".nurseNameVisits").html(data["first_name"]+" "+data["last_name"]+"'s Visits:")
      $(".nurses_visit").attr("id",data["id"]);
      $(".visits").text("");
      $(".js-next").attr("data-id", data["id"]);
      $(".js-back").attr("data-id", data["id"]);
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
      //$( ".visits" ).append(`<a href="#" class="add_visit" id=${dataId} onClick="">Add New Visit  </p>` );
    });
   });
});


function addVisit(id) {
  $form = $(`<form></form>`);
  $form.append($("<input>",
  { type:'text',
    placeholder:':visit.date',
    name:'date',
    value: 'enter date',
    })
  );
  $select=$("<select name=':visit.patient_id' placeholder='patient'></select>");
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
           }
      )
);

  //$form.append(`<input type="button" onClick="postVisit(this)" value="add visit">`);
  $('.visits').append($form);
  //$form.addEventListener("submit", postVisit)
  id.innerHTML = "Adding..."
  id.disable;
}

//function postVisit(event){
   //event.preventDefault();
  //    alert(this.data)

//}





// function moreInfo(event){
//    event.preventDefault()
//    $(event.target).hide()
//  }
//  $('.btn').disable
//  $('.btn').click(moreInfo)
addEventListeners()