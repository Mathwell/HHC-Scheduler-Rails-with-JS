class Visit {
    constructor(element){            
      this.visit=element      
      }
  }
  
 Visit.prototype.formatHtml=function(){
    return `<li>${this.visit.date} ${this.visit.patient.last_name} ${this.visit.patient.first_name}</li>`
  }
