export default function highlightButton (index) {
    const navbar = document.querySelector('.navbar-container');

    navbar?.classList.add('navbar-updating');

    document.querySelectorAll('.navbar-active-button, .navbar-left-button, .navbar-right-button').forEach(btn => {
        btn.classList.remove('navbar-active-button', 'navbar-left-button', 'navbar-right-button');
      });
    
      document.querySelectorAll('.side-button-wrapper').forEach(parent => {
        parent.classList.remove('side-button-wrapper');
      });
  

      const buttonList = document.querySelectorAll('.navbar-button');
     
      const buttonToChange = buttonList[index];
      
      if (buttonToChange){
      const buttonParent = buttonToChange.closest('div');

      const leftButtonWrapper = buttonParent.previousElementSibling;
      const rightButtonWrapper = buttonParent.nextElementSibling;
  

  
      const leftButton = leftButtonWrapper?.querySelector('button');
  
      const rightButton = rightButtonWrapper?.querySelector('button');
  
      buttonToChange.classList.add('navbar-active-button'); 

  
  
      if (leftButton) {
        leftButton.classList.add('navbar-left-button');
        leftButtonWrapper.classList.add('side-button-wrapper'); 
      
      } 
  
      if (rightButton) {

        rightButton.classList.add('navbar-right-button'); 
        rightButtonWrapper.classList.add('side-button-wrapper'); 
        
      } 
  
  
    };

    requestAnimationFrame(() => {
      navbar?.classList.remove('navbar-updating');
    });
}
