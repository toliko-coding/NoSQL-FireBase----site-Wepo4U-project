console.log(firebase);

console.log(auth); /// בדיקה אם הפונקצייה של הזיהוי תקינה
var user=0
console.log(database);

firebase.auth().onAuthStateChanged(function(user) {
  
  
  
    if (user) {
      
      console.log("גש להיסטוריית התנדבויות שלך")
        
        user1=user.uid;
        FetchAllData(user1);
        console.log("check!!")
  
      
    } else {
      
      alert("אנא התחבר למשתמש שלך")
      FetchAllData(user1);
    }
  });





  function FetchAllData(user)
  {
      
    firebase.database().ref('VolenteeringHistory/'+user).once('value' , function(snapshot){
      snapshot.forEach(


        
        function(childSnapshot){
          var place = childSnapshot.val().place;
          var time = childSnapshot.val().time;
          var type= childSnapshot.val().type;
          console.log("!");


          
  
  
          addItemsToList(place,time,type);
  
        }
      );
    });
  }


  //Function that get values and display it when ever you want in div
function addItemsToList(place,time,type)
{
  var ul = document.getElementById('list');
  var p = document.getElementById('p')
  var header = document.createElement('h2');

  var _Company_name = document.createElement('li');
  var _Msg = document.createElement('li');
  var _Phone = document.createElement('li');
  var _Prize = document.createElement('li');
  var _Points = document.createElement('li');


  /*
  header.innerHTML = 'Company Name ' + (Company_name);

  _Msg.innerHTML = 'הודעה :' + Msg;
  _Phone.innerHTML = 'מספר טלפון :' + Phone;
  _Msg.innerHTML = 'הודעה :' + Msg;
*/
  document.querySelector('#Bdata').innerHTML += 
  `
  <div class="w3-container w3-teal">
  
</div>
  
  <div class="w3-content">
  
    <div class="w3-row w3-margin">
  
      <div class="w3-third">
      <img src="Logo.png" style="width:100%;min-height:200px">
      </div>
    <div class="w3-twothird w3-container">
     <h2>${place}</h2>
     <p>
     ${time}
     </p>

     <h3>type : ${type}</h3>




   </div>
  
  </div>
  `
  


  ul.appendChild(header);
  ul.appendChild(_Msg);
  ul.appendChild(_Phone);


}
