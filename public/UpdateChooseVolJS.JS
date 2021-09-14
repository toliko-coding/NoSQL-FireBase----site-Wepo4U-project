console.log(firebase);
const auth = firebase.auth();
const database = firebase.database();
const usersRef = database.ref('/Volenteering');
const Send = document.getElementById('Send');
const user = firebase.auth().currentUser;



  function catchitems(){
    auth.onAuthStateChanged(user => {
        
        if (user)
         {
             alert(user.uid)
            var newsub={
                place: document.querySelector('input[name="radio1"]:checked').id,
                time:document.querySelector('input[name="radio2"]:checked').id,
                type:document.querySelector('input[name="radio3"]:checked').id
            }
            
            var test=user.uid;
            alert(test+"!!!");
            console.log("writen11")
            writeUserData(newsub, user,test)
            console.log("writen22")
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                
            });
        
          console.log(user.uid);
          console.log(user);
    
          
          
        } else {
          console.log('user logged out');
        }
      })
}


function writeUserData(user, userId,test) {
    database.ref('Volenteering/' + test).set(user, (error) => {
        if (error) {
            alert("Something went wrong..." + error.errorMessage)
        } else {
            alert("volenteer chekced!!")
            location.replace("VolenteerEnter.html")
        }
    })
}



if (firebase.auth().currentUser === null) {
    console.log('User not signed in');
  }

  function checking (test){
    var var1=database.ref('Volenteering/'+test).place
    console.log(var1);

  }
  function signOut()
  {
    auth.signOut();
    alert("התנתקת !")
    location.replace("VolenteerSignUp.html")
    
  }
  