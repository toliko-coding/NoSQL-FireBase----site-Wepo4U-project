

  //SingUp - Function

    function signUp()
    {
       
      
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      if (validate() == true)
      {
        alert("תודה שהצטרפת :)");

        registerNewUser(email,password);
      
      }
      else
      {
       
        
      }
  }
  

    function registerNewUser(email,password)
    {
        auth.createUserWithEmailAndPassword(email, password).then((loggedUser) => {
            // Signed in with email and password, now insert details to DB
            points=0
            var userId = loggedUser.user.uid
            var firstName = document.getElementById("firstName").value
            var lastName = document.getElementById("lastName").value
            var phone = document.getElementById("phone").value
            
            

    
            var newUser = {
                userId: userId,
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                points: points,
                phone: phone
                
            }
            //insert user details to DB
            console.log("writen3")
            writeUserData(newUser, userId)
            console.log("writen4")
            
        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                
            });
    }

            
        function writeUserData(user, userId) {
            database.ref('VolenteerUsers/' + userId).set(user, (error) => {
                if (error) {
                    alert("Something went wrong..." + error.errorMessage)
                } else {
                    alert("ההרשמה הסתיימה בהצלחה!")
                    location.replace("VolenteerEnter.html")
                    
                }
            })
        }
  
    //SingIn - Function
    function signIn()
    {
      var email = document.getElementById("email");
      var password = document.getElementById("password");

      var kanes = firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((user) => {
        
       
        alert("התחברת !" + email.value );
        location.replace("VolenteerEnter.html")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    }   


    function signOut()
    {
      auth.signOut();
      alert("התנתקת !")
      location.replace("XXXXX")
    }


    function validate(){
      var remember = document.getElementById('vehicle1');
      if (remember.checked){
          
          return true;
      }else{
          alert("אנא אשר את התקנון")
          return false;
      }
    }
    
