
//with addEventListener method
document.getElementById("initialGen").addEventListener("click", function(){
 var name = document.getElementById("fullname").value;
  var initialsArr = name.charAt(0);
  for(var i=1; i<=name.length-1; i++) {
    if(name.charAt(i) != ' '){
      continue;
    } else initialsArr += name.charAt(i+1);
  }
  document.getElementById('initial').innerHTML = initialsArr;
}
)

// With onclick event in HTML
// function getInitialFunc(){
//   var name = document.getElementById("fullname").value;
//   var initialsArr = name.charAt(0);
//   for(var i=1; i<=name.length-1; i++) {
//     if(name.charAt(i) != ' '){
//       continue;
//     } else initialsArr += name.charAt(i+1);
//   }
//   document.getElementById('initial').innerHTML = initialsArr;
// }
