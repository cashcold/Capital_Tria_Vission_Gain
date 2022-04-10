// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Document</title>
//   </head>
//   <body>
//     <div id="location"></div>
//     <script>
//       var div = document.getElementById("location");

//       function getLocation() {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(showPosition, console.log);
//         } else {
//           div.innerHTML = "The Browser Does not Support Geolocation";
//         }
//       }

//       function showPosition(position) {
//         var lat = position.coords.latitude;
//         var lon = position.coords.longitude;
//         // You need to enter your API Key here
//         var api_key = "";
//         var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x300&sensor=false&key=${api_key}`;
//         div.innerHTML = `<img src='${img_url}'>`;
//       }
//       getLocation();
//     </script>
//   </body>
// </html>
