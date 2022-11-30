$(document).ready(function(){
     console.log('connected')
     $('#head')
     $('#head-container')
     $('#calendar-holder')
     $('#head-tittle')
     $('#main-container')
     $('#search')
     $('#submit-btn').on('click', function(){
          console.log('yeah!!')   
          const input = $('#input')
          const inputValue = input[0].value
          $('#input').val("");//clean input space
          $('#country-name').text(inputValue);//Changed country name according to input
          console.log(inputValue);
          currecncyExchangeRate(inputValue);
     })
     $('#content')
     $('#country-name')
     $('#history')

     $('#currency')


     function currecncyExchangeRate(input){
     //call restcountries.com api
          //get country data to get currency code and currency name
          $("#today-rate").siblings("h6").text("Current Exchange Rate");
          var exchangeInfo = document.querySelector('#today-rate');
          exchangeInfo.innerHTML="";

          var currencyCode = "";
          var currencyName = "";
          var country= "https://restcountries.com/v3.1/name/"+input+"?fullText=true";
               fetch(country)
                    .then(function(response){
                         if(response.ok){
                              response.json().then(function(data){
                                   console.log(data);//JSON data to show in console
                                   currencyCode = (Object.keys(data[0].currencies))[0];
                                   console.log(currencyCode);
                                   currencyName = (Object.values(data[0].currencies))[0].name;
                                   console.log(currencyName);
                                   currency()
                              })
                         } else {
                              $('#country-name').text("Please try again");
                              }      
                    })
                    .catch(function (error) {
                         $('#country-name').val("Please try again");
                    })
               
          //Currency exchange rate with USD
          function currency(){          

               var myHeaders = new Headers();
               myHeaders.append("apikey", "eEuvQv8ee37GzlxcoBm83o8xeRzhO4b4");

               var requestOptions = {
                    method: 'GET',
                    redirect: 'follow',
                    headers: myHeaders
                    };

               fetch("https://api.apilayer.com/exchangerates_data/convert?to="+"usd"+"&from="+currencyCode+"&amount=1", requestOptions)
               .then(function(response){
                    if(response.ok){
                         response.json().then(function(data){
                              console.log(data);
                              var resultLocalUsd = data.result;
                              console.log(resultLocalUsd);
                              var showResult = document.createElement("p");
                              showResult.textContent="1 "+currencyName+" = "+resultLocalUsd+" US Dollars";
                              exchangeInfo.appendChild(showResult);
                         })
                    }
                    fetch("https://api.apilayer.com/exchangerates_data/convert?to="+currencyCode+"&from="+"usd"+"&amount=1", requestOptions)
                    .then(function(response){
                    if(response.ok){
                         response.json().then(function(data){
                              console.log(data);
                              var resultUsdLocal = data.result;
                              console.log(resultUsdLocal);
                              var showResult = document.createElement("p");
                              showResult.textContent="1 US Dollars = "+resultUsdLocal+" "+currencyName;
                              exchangeInfo.appendChild(showResult);
                         })
                    }
                    })  
                    .catch(error => console.log('error', error));
               })          
               .catch(error => console.log('error', error));               
          }
     }
})
