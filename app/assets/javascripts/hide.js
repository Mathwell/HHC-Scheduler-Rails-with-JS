function hideWhenClicked(event){
    event.preventDefault()
    $(event.target).hide()
   }
  
   $('#hide_this').click(hideWhenClicked)