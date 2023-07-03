const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn=inputPart.querySelector("button"),
wIcon=document.querySelector(".weather-part img");
backBtn=wrapper.querySelector("header i")




inputField.addEventListener("keyup",e=>{
    if(e.key == "Enter" && inputField.value!="")
    {
        // console.log("hello");
        requestApi(inputField.value)
    }
})


locationBtn.addEventListener("click", ()=> {
    // console.log("hello")
  
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else
    {
        alert("Your browser do not support geolocation")
    } 
});
let api;
const apiKey="bd7d481d35f01e5650f0e64266ac3f1b";

function onSuccess(position)
{
    // console.log(position);
    const {latitude,longitude} = position.coords; 
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}
function onError(error)
{
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}



function requestApi(city)
{
    
    api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}

function fetchData()
{
        infoTxt.innerText="Getting weather details.....";
        infoTxt.classList.add("pending");
        fetch(api).then(response => response.json()).then(result => weatherDeatils(result));
}


 function weatherDeatils(info)
{
    
    if(info.cod == "404")
    {
        infoTxt.classList.replace("pending","error");
        infoTxt.innerText=`${inputField.value} is not a calid city name`;
        
    }
    else
    {
        //to get reqired properties from info
        const city=info.name;
        const country=info.sys.country;
        const{description,id}=info.weather[0]
        const{feels_like,humidity,temp}=info.main;


        if(id==800)
        {
            wIcon.src="icons/clear.svg";
        }
        else if(id>=200 && id<=232)
        {
            wIcon.src="icons/storm.svg";
        }
        else if(id>=300 && id<=321 || (id>=500 && id<=531))
        {
            wIcon.src="icons/rain.svg";
        }
        else if(id>=600 && id<=622)
        {
            
            wIcon.src="icons/snow.svg";
        }
        else if(id>=701 && id<=781)
        {
            wIcon.src="icons/haze.svg"
        }
        else if(id>=801 && id<=804)
        {
            wIcon.src="icons/cloud.svg";
        }



        wrapper.querySelector(".temp .numb").innerText=Math.floor(temp);
        wrapper.querySelector(".weather").innerText=description;
        wrapper.querySelector(".location span").innerText=`${city},${country}`;
        wrapper.querySelector(".temp .numb-2").innerText=Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText=`${humidity}%`;

        infoTxt.remove("pending")
        wrapper.classList.add("active");
        console.log(info);
        
    } 
 }


 backBtn.addEventListener("click",() =>{
    wrapper.classList.remove("active");
    inputField.value="";
    
 }
 )
    




