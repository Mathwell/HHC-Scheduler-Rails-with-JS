class Visit {
    constructor(visitJSON){            
      this.date=visitJSON.date
      this.patient=visitJSON.patient_name     
      }
  }
  
 Visit.prototype.formatHtml=function(){
    return `<li>${this.date} ${this.patient} </li>`
  }
