  console.log(auth);
  console.log("test");
  var j=0


  const Userlist = firebase.database().ref('VolenteerUsers');
  const Userlist2 = firebase.database().ref('OldmanUsers');





  //SingUp - Function

    function signOut()
    {
      auth.signOut();
      alert("התנתקת !")
      location.replace("VolenteerSignUp.html")
      
    }





   //function that serch by the ekemnt
    function Search ()
    {
        const Email = document.getElementById('SearchByEmail').value;
        console.log(Email);
        Userlist.orderByChild('email').equalTo(Email).on("value", function(snapshot)
         {
            console.log(snapshot.val());


            
            snapshot.forEach(function(data) {
                if (data.key)
                {

                }
                console.log(data.key);
                readUserDetails(data.key)
             
            });
        });



    }

   
//Function that display the user info in live
function readUserDetails(userId) {
  firebase.database().ref('/VolenteerUsers/' + userId).once('value').then((snapshot) => {
      var firstName = snapshot.val().firstName
      var lastName = snapshot.val().lastName
      var email = snapshot.val().email
      var phone =snapshot.val().phone
      var points = snapshot.val().points
      
      

      var userDetails = {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
          phone : phone,
          email:email,
          points: points
          
          
      }
      console.log("jason good")
      console.log(userId)
      showUser(userDetails)

  });
}


function showUser(userDetails) {
  document.querySelector('#reqInfo').innerHTML += 
  `
  <p id="pointsid"><i class="fa fa-check-square fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.userId}</p>
   <div>   <p id="nameid"><i class="fa fa-spinner fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal" style="font-size: xx-large;"></i>${userDetails.firstName} ${userDetails.lastName}</p>
   <p id="emailid"><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.email}</p>
   <p id="pointsid"><i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.phone}</p>
   <p id="pointsid"><i class="fa fa-check-square fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.points}</p>
    </div>
  `
}



//---------------------------------------------------------------------------------------------------------------------------

const UserlistO = firebase.database().ref('OldmanUsers')


function SearchO (){
  const Email = document.getElementById('SearchByEmail').value;
  console.log(Email);
  UserlistO.orderByChild('email').equalTo(Email).on("value", function(snapshot) {
    console.log(snapshot.val());
    console.log("here")


    
    snapshot.forEach(function(data) {
        if (data.key)
        {

        }
        console.log(data.key);
        readUserDetailsO(data.key)
      });
  });
}



//Function that display the user info in live
function readUserDetailsO(userId) {
firebase.database().ref('/OldmanUsers/' + userId).once('value').then((snapshot) =>
{
var firstName = snapshot.val().firstName
var lastName = snapshot.val().lastName
var email = snapshot.val().email
var phone =snapshot.val().phone
var addres = snapshot.val().addres



var userDetails = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    phone : phone,
    email:email,
    addres: addres
    
    
}
console.log("jason good")
console.log(userId)
showUserO(userDetails)

});
}


function showUserO(userDetails) {
document.querySelector('#reqInfo2').innerHTML += 
`
<p id="pointsid"><i class="fa fa-check-square fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.userId}</p>
<div>   <p id="nameid"><i class="fa fa-spinner fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal" style="font-size: xx-large;"></i>${userDetails.firstName} ${userDetails.lastName}</p>
<p id="emailid"><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.email}</p>
<p id="pointsid"><i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.phone}</p>
<p id="pointsid"><i class="fa fa-check-square fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.addres}</p>
</div>
`
}





function AddPoints() 
{

  const ID=document.getElementById('IDpoints').value;
  const points=document.getElementById('Addpoints').value;
  database.ref('/VolenteerUsers/' + ID).once('value').then((snapshot) =>
  {
    

  var oldpoints = snapshot.val().points
  var firstName = snapshot.val().firstName
  var lastName = snapshot.val().lastName
  var email = snapshot.val().email
  var phone =snapshot.val().phone
  console.log(ID);
  console.log(points);
  console.log(oldpoints);
  
  var newe = (+points) + (+oldpoints);
  console.log("djhfjds");
  console.log(newe);
  var updatedform = 
  {
    userId: ID,
    firstName: firstName,
    lastName: lastName,
    phone : phone,
    email:email,
    points : newe
 
  }

  console.log(newe)
  newpoints(updatedform,ID)
  alert("נקודות המתנדב עודכנו בהצלחה!")
  
  });
}

function newpoints(updatedform, ID) 
{
    database.ref('VolenteerUsers/' + ID).set(updatedform, (error) => {
        if (error)
         {
            alert("Something went wrong..." + error.errorMessage)
         }
            
            
        
    })
}


function DeleteVU()
{
  const ID=document.getElementById('DeletedID').value;
  console.log("1המשתמש הוסר בהצלחה");
  var deleteRef= Userlist.child(ID);
  console.log("2המשתמש הוסר בהצלחה");
  return deleteRef.remove()
  .then(function()
  {
    console.log("המשתמש הוסר בהצלחה");

  })
  .catch(function(){
    console.log("Error!");

  });

}

function DeleteOU()
{
  const ID=document.getElementById('DeletedID').value;
  console.log("1המשתמש הוסר בהצלחה");
  var deleteRef= Userlist2.child(ID);
  console.log("2המשתמש הוסר בהצלחה");
  return deleteRef.remove()
  .then(function()
  {
    console.log("המשתמש הוסר בהצלחה");

  })
  .catch(function(){
    console.log("Error!");



  });

}









 
