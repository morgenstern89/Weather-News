let weather = {
   apiKey:"2b73fd832231df7fe8a42e939485d478",
 fetchWeather: function(city){
   fetch("https://api.openweathermap.org/data/2.5/weather?q="
   +city
   +"&units=metric&appid="
   +this.apiKey
   )
   .then((response)=>response.json())
   .then((data)=>this.displayWeather(data));
 },


 displayWeather: function(data){
   const{name}=data;
   const{icon,description}=data.weather[0];
   const{temp, humidity}=data.main;
   const{speed}=data.wind;
   console.log(name,icon,description, temp,humidity,speed)
   document.querySelector(".city").innerHTML="Weather in " + name;
   document.querySelector(".icon").src="https:openweathermap.org/img/wn/" + icon +".png";
   document.querySelector(".description").innerHTML=description;
   document.querySelector(".temp").innerHTML= temp + "°C";
   document.querySelector(".humidity").innerHTML="Humidity: " + humidity + "%";
   document.querySelector(".wind").innerHTML="Wind Speed: " + speed + " km/h";
   document.querySelector(".weather").classList.remove("loading");
   document.body.style.backgroundImage= "url('https://source.unsplash.com/1600x900/?" + name + "')"
 },

 search:function(){
   this.fetchWeather(document.querySelector(".searchbar").value);
 }
 };

 document.querySelector(".search-button").addEventListener("click", function (){
 weather.search(); searchNewsByKeyword();
 });
 
 document.querySelector(".searchbar").addEventListener("keyup", function(event){
   if(event.key == "Enter"){
       weather.search(); searchNewsByKeyword();
   }
 });
 weather.fetchWeather("Germany");

const API_KEY="pi--PMA0vt0BvVXWbcxbxyj1qyLVft2a69mXt1mRgBo";
let articles=[]
let page = 1;
let totalPage= 1;
let url= new URL(
  "https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=10"
)


const displayNews = async()=>{
   let header = new Headers();
   header.append("x-api-key", API_KEY);
   url.searchParams.set("page",page);
   let response = await fetch(url,{headers:header});
   let data = await response.json();
   articles=data.articles
   console.log(articles);
   totalPage=data.totalPage;

    render();
    pagination();
 }; 
 
 const searchNewsByKeyword =async()=>{
  let keyword = document.querySelector(".searchbar").value;
  page=1;
  url=new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);
  displayNews();
}; 
 
 
const render = ()=> {
  let newsHTML="";
  newsHTML= articles.map((news)=>{
    return `<div class="news row">
    <div class="col-lg-4">
        <img class="news-img" src="${news.media ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}"/>
      </div>
      <div class="col-lg-8">
      <a class="title" target="_blank" href="${news.link}">${news.title}</a>
      <p>${ news.summary == null || news.summary == "" ? "no contents to show." :
      news.summary.length > 150 ? news.summary.substring(0, 100) + "..."
      : news.summary }</p>
      <div>${news.rights || "no source"} ${moment( news.published_date).fromNow()}</div>
    </div>
</div>`
  })
  .join('');

  document.getElementById("news-board").innerHTML=newsHTML;
};
displayNews();


const pagination = ()=>{
  let paginationHTML=``;
  let pageGroup = Math.ceil(page/5);
  let last = pageGroup*5;
  if(last > totalPage){
    last = totalPage;
  }
  let first = last-4;
  paginationHTML = `<li class="page-item">
  <a class="page-link" href='#js-bottom' aria-label="Previous" onclick="pageClick(${page-1})">
  <span aria-hidden="true">&lt;</span>
  </a>
  </li>`;

  for(let i = first; i <= last; i++){
    paginationHTML += `<li class="page-item ${i == page ? "active" : ""}">
  <a class="page-link" href='#js-bottom' onclick="pageClick(${i})">${i}</a>
  </li>`
  }
    paginationHTML += `<li class="page-item">
    <a class="page-link" href='#js-bottom' aria-label="Next" onclick="pageClick(${page+1})>
    <span aria-hidden="true">&gt;</span>
    </a>
    </li>`;
  
  document.querySelector(".pagination").innerHTML=paginationHTML;
};

const pageClick=(pageNum)=>{
  page=pageNum;
  window.scrollTo({top : 0, behavior: "smooth" });
  displayNews();
}



  
 