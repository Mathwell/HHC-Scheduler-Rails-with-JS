
function addEventListeners(){
  const visit_buttons=document.getElementsByClassName("nurses_visit")
  Array.from(visit_buttons).forEach(function(element) {
    element.addEventListener('click',function(event){showVisits(event)});
  });   
  const next_link=document.getElementById("js-next")
  //Array.from(next_link).forEach(function(element){
    next_link.addEventListener('click',function(event){showNext(event)});
//});
}

//renders visit index page via JS and Active Model Serialization JSON backend
function showVisits(event){  
  event.preventDefault();  
  
    var dataId=event.target.attributes["data-id"].value
  
  
//   //visit list
//  // fetch("/nurses/"+dataId+"/visits",{
//  //   headers: new Headers({
//  //     'Content-Type': 'application/json',
//  //      'Accept': 'application/json'   
//  //   })
//  // })
//   .then((resp) => resp.json())
//   .then(data=>{
    
//     newVisitList(data, dataId)
//     //document.getElementById("visits").innerHTML=visitList(data,dataId)    
//   }).catch(error=>console.log('Error:', error));
  
  //nurse info
  fetch("/nurses/"+dataId+".json",{
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then((resp) => resp.json())
    .then(data=>{
      //debugger
      const sortedData=data.visits.slice().sort(function(a, b) {
        var nameA = a.patient_name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.patient_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
      newVisitList(sortedData, dataId)
      document.getElementById("nurseNameVisits").innerHTML="<h3>"+data.first_name+" "+data.last_name+"'s Visits: </h3>"      
    }).catch(error=>console.log('Error:', error));    
}


function visitList(visits,nurseId){
  let visitList="";    
    visits.forEach(function(visit){
      visitList=visitList+visit["date"]+" "+ visit["patient"]["last_name"]+ visit["patient"]["first_name"]+"  <a href=`#`>Edit</a><br /> ";
    });    
    visitList+=`<a href="#" class="add_visit" id=${nurseId} onClick="postVisit(${nurseId})">Add New Visit </a>`
    return visitList
}



function newVisitList(data, nurseId){
  let visitList='';
  data.forEach(function(element){
    const visit=new Visit(element);    
    const visitHtml =visit.formatHtml();
    visitList+=visitHtml
  })
  visitList+=`<a href="#" class="add_visit" id=${nurseId} onClick="postVisit(${nurseId})">Add New Visit </a>`
  document.getElementById("visits").innerHTML=visitList
}





//posting new visit via Java Script
  function postVisit(id) {
      const url = "/nurses/"+id+"/visits/new.html";
      $( location ).attr("href", url);
    };


//rendering show page: next and back navigation
function showNext(event){
  event.preventDefault();  
  var nextId = parseInt(document.getElementById("js-next").getAttribute("data-id")) + 1;

  fetch("/nurses/" + nextId + ".json",{
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then((resp)=>resp.json()) 
  .then(data=>{
    document.getElementById("nurseName").innerHTML=data["last_name"]+ " "+data["first_name"];
    document.getElementById("nurseVisits").innerHTML=data["visits"].length;
    document.getElementById("nursePatients").innerHTML=data["patients"].length;
    document.getElementById("role").innerHTML=data["role"]
    document.getElementById("nurseNameVisits").innerHTML=data["first_name"]+" "+data["last_name"]+"'s Visits:"
    document.getElementById("visits").innerHTML=""
    document.getElementById("nurses_visit").setAttribute("data-id", data["id"])      
    document.getElementById("js-next").setAttribute("data-id", data["id"])      
    document.getElementById("js-back").setAttribute("data-id", data["id"])
    document.getElementById("edit_nurse").setAttribute("href","/nurses/"+data["id"]+"/edit")          
  });  
}

//rendering show page: next and back navigation jQuery
//$(document).ready(function(){
//  $("#js-next").on("click", function(event) {
//    event.preventDefault();
//    var nextId = parseInt($(".js-next").attr("data-id")) + 1;
//    $.get("/nurses/" + nextId + ".json", function(data) {
//      $(".nurseName").text(data["last_name"]+ " "+data["first_name"]);
//      $(".nurseVisits").text(data["visits"].length);
//      $(".nursePatients").text(data["patients"].length);
//      $(".nurseNameVisits").html(data["first_name"]+" "+data["last_name"]+"'s Visits:")
//      $(".nurses_visit").attr("id",data["id"]);
//      $(".visits").text("");
//      $(".js-next").attr("data-id", data["id"]);
//      $(".js-back").attr("data-id", data["id"]);
//    });
//  })
//})

$(document).ready(function () {
  $("#js-back").on("click", function(event) {
    event.preventDefault();
    var backId = parseInt($("#js-back").attr("data-id"))-1;
    $.get("/nurses/" + backId + ".json", function(data) {
      $("#nurseName").text(data["last_name"]+ " "+data["first_name"]);
      $("#nurseVisits").text(data["visits"].length);
      $("#nursePatients").text(data["patients"].length);
      $('#role').text(data["role"])
      $("#edit_nurse").attr("href","/nurses/"+data["id"]+"/edit") 
      $("#nurseNameVisits").html(data["first_name"]+" "+data["last_name"]+"'s Visits:")
      $("#nurses_visit").attr("data-id",data["id"]);
      $("#visits").text("");
      $("#js-next").attr("data-id", data["id"]);
      $("#js-back").attr("data-id", data["id"]);
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





//adding a visit usinng JS form

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