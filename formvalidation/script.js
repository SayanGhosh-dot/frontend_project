const submitBtn = document.getElementById('submitBtn');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passError');
const confirmpassword=document.getElementById('confirmpassword')

submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    if(validateName() && validateEmail() && validatePassword() && checkconfirm()){
        
       document.getElementById("signupForm").reset();
        alert("Form Submitted Successfully");
    }
});


function validateName(){
    let name = document.getElementById('name').value;

    if(name.length == 0){
        nameError.innerHTML = "Name is required";
   
        return false;
    }

    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.innerHTML = "Write full Name";
     
        return false;
    }
    nameError.innerHTML = "";
    
    return true;
}

function validateEmail(){
    let email = document.getElementById('email').value;

    if(email.length == 0){
        emailError.innerHTML = "Email is required";
      
        return false;
    }

    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        emailError.innerHTML = "Enter Valid Email";
     
        return false;
    }
    emailError.innerHTML = "";
    
    return true;
}
function validatePassword(){
    let password = document.getElementById('password').value;

    if(password.length == 0){
        passError.innerHTML = "Password is required";
       
        return false;
    }

    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/)){
        passError.innerHTML = "Password should contain 1 Uppercase, 1 Lowecase, 1 Digit & 1 Alphabet";
       
        return false;
    }
    passError.innerHTML = "";
   
    return true;
}
function checkconfirm()
{
     let password = document.getElementById('password').value;
     let confirm=document.getElementById('confirmpass').value;
     if(password!=confirm)
     {
        confirmpassword.innerHTML="please enter the confirm password";
        return false;
     }
     confirmpassword.innerHTML="";
     return true;
}