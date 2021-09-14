
//
  //SingUp - Function

    function signUp()
    {

     
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var takanon = document.getElementById("takanon");
    
    if (validate() == true)
    {
        alert("תודה שהצטרפת :)");
        
        registerNewUser(email.value,password.value)
    }
    else
    {
      alert("מרענן דף .. אנא מלא את הפרטים מחדש");
      
    }
  

    function registerNewUser(email,password)
    {
        auth.createUserWithEmailAndPassword(email, password).then((loggedUser) => {
            // Signed in with email and password, now insert details to DB
            var userId = loggedUser.user.uid
            var firstName = document.getElementById("firstName").value
            var lastName = document.getElementById("lastName").value
            var phone = document.getElementById("phone").value
            var addres = document.getElementById("addres").value
    
            var newUser = {
                userId: userId,
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                phone : phone,
                addres : addres
            }
            //insert user details to DB
            console.log("writen1")
            writeUserData(newUser, userId)
            console.log("writen2")
        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                
            });
    }

            
        function writeUserData(user, userId) {
            database.ref('OldmanUsers/' + userId).set(user, (error) => {
                if (error) {
                    alert("Something went wrong..." + error.errorMessage)
                } else {
                    alert(" ההרשמה הסתיימה!")
                    location.replace("OldmanEnter.html")
                    
                }
            })
        }
  
    //SingIn - Function

  

    //sign Out 

    function signOut()
    {
      auth.signOut();
      alert("התנתקת !")
      location.replace("XXXXX")
    }
/*
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        
        alert("משתמש מחובר :" + user.email )
        
      } else {
        // No user is signed in.
        alert("משתמש כרגע לא מחובר !")
        
      }
    });
*/

    //check that the checkbox is checked
    function validate(){
      var remember = document.getElementById('takanon');
      if (remember.checked)
      {
          alert("התקנון אושר") ;
          return true;
      }
      else
      {
          alert("אנא לאשר את התקנון לפני ההרשמה ")
          return false;
      }
  }}


  function signIn()
    {
      var email = document.getElementById("email");
      var password = document.getElementById("password");

      var kanes = firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((user) => {
        
        alert("nice !")
        alert("התחברת !" + email.value );
        location.replace("OldmanEnter.html")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
       
      if (error) {
        alert("Something went wrong..." + error.errorMessage)
    } else {
        alert(" !!!!!!!ההרשמה הסתיימה!")
        location.replace("OldmanEnter.html")
        
    }

       // alert("התחברת !" + email.value );
       // location.replace("OldmanEnter.html")
        
    }


    