

//Load Catagories
   const loadCatagories =async()=>{
    try{
    const CataRes = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const CataData = await CataRes.json()
    displayCatagories(CataData);
    }
    catch(error)
    {
     console.error('ERROR -',error)
    };
    }

//Display Catagories
    const displayCatagories =(CataData)=>{
    const categoriesContainer = document.getElementById('categories')
    const Categories = CataData.categories;
    console.log(Categories)
    Categories.forEach(data=> {
        console.log(data.category)
        const Button = document.createElement('button')
        Button.classList.add('btn','category_btn')
        Button.id=`btn-${data.category_id}`
        // Button.classList = 'btn'
         Button.innerText = data.category
         Button.onclick=()=>{
              loadCategoryVideos(data.category_id)
         }
         categoriesContainer.append(Button)

});
}

//Load Videos
const loadVideos =async(searchItems="")=>{
    try{
    const VidRes = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchItems}`)
    const VidData = await VidRes.json()
    displayVideos(VidData.videos);
    
    const details = document.querySelector('details');

document.getElementById('DesBtn').addEventListener('click',()=>{
    SortedVideosDes(VidData.videos)
      details.removeAttribute('open');
})

document.getElementById('AscBtn').addEventListener('click',()=>{
    SortedVideosAsc(VidData.videos)
    details.removeAttribute('open');
})
    
    }
    catch(error)
    {
     console.error('ERROR -',error)
    };
    }   

//Load Category Videos
   const loadCategoryVideos =async(id)=>{
  try{
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  const data = await res.json()
  rmvActiveBtn();
  const activeBtn =document.getElementById(`btn-${id}`)
  activeBtn.classList.add('redBetton')
  displayVideos(data.category)
    
document.getElementById('DesBtn').addEventListener('click',()=>{
    SortedVideosDes(data.category)
})

document.getElementById('AscBtn').addEventListener('click',()=>{
    SortedVideosAsc(data.category)
})
  }
  catch(error){
   console.error('ERROR -',error)
  }
}   
//load Details
const loadDetails =async(VidID)=>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${VidID}`)
  const data = await res.json()
  DisplayDetails(data.video)
} 
//Display Details
const DisplayDetails =(VidDetails)=>{
 const DetailsDiv = document.getElementById('ModalDetails')
 DetailsDiv.innerHTML=`
 <img src="${VidDetails.thumbnail}"  />
 <p>${VidDetails.description}</p>
 `
}

    
// Display Videos
    const displayVideos =(VidData)=>{
    const videosContainer = document.getElementById('vidoes-container')
    videosContainer.innerHTML ="";
    if(VidData.length==0){
      videosContainer.classList.remove('grid')
      videosContainer.innerHTML=`
      <div class="grid w-full gap-6 justify-center items-center"> 
      <img class="w-full h-full" src="assests/Icon.png" />
      <h1 class="font-bold">No content in this category.</h1>
      </div>
      `
      return;
    }
    else{
      videosContainer.classList.add('grid')
    }
    VidData.forEach(Video =>{
    console.log(Video)
        console.log(Video.thumbnail)
      const VidDiv = document.createElement('div')
      VidDiv.classList.add("card", "card-compact");
      VidDiv.innerHTML=
    `
      <figure class=" h-[200px] relative">
    <img class="w-full h-full object-cover"
      src=${Video.thumbnail}
      alt="Shoes" />
      ${Video.others.posted_date?.length == 0?"":`<span class="absolute right-2 bottom-2 bg-black p-1 rounded text-white">${giveTimeString(Video.others.posted_date)}</span>`}
      
  </figure>
  <div class="py-3 gap-3 flex">
   <div class="">
   <img class="w-13 h-11 rounded-full object-cover" src=${Video.authors[0].profile_picture}/>
  </div>
  <div class="flex w-full items-center">
  <div  class="w-full">
   <h2 class="font-bold" >${Video.title} </h2>
   <div class="gap-1 flex items-center">
   <p class="text-gray-500 text-sm" >${Video.authors[0].profile_name} </p>
   ${Video.authors[0].verified==true?`<img class="w-4 h-4 object-cover" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` :""}
   </div>
   <p class="text-gray-500 text-sm">${Video.others.views} views </p>
   </div>
   <button onclick="my_modal_5.showModal();loadDetails('${Video.video_id}');" id="detailsButton" class="btn btn-error btn-sm">Details</button>
  </div>
  </div>
  `
    videosContainer.append(VidDiv)
    })
}



//rmv Active button   
   const rmvActiveBtn= ()=>{
    const getAllCtgryButttons=document.getElementsByClassName('category_btn')
    for(ctgryBtn of getAllCtgryButttons){
     ctgryBtn.classList.remove('redBetton')
    }
}

//time Conversation
    const giveTimeString = (givenSec)=>{
    const Hour = Math.floor(givenSec/3600)
    if(Hour>=24){
    const Days =Math.floor(Hour/24)
    if(Days<30){
    return `${Days} days ago`
   }
    else if(Days>=30){
        const Months =Math.floor(Days/30)
        if(Months<12){
             return `${Months} months ago`
        }
        else if(Months>=12){
            const Years =Math.floor(Months/12)
            return `${Years} years ago`
        }
    }
}
else if(Hour<24){
    const Min = Math.floor((givenSec%3600)/60)
return `${Hour}hrs ${Min} min ago`
}
}

//get value Search Box
document.getElementById('searchInput').addEventListener('keyup',(e)=>{
  loadVideos(e.target.value)
})


//Sorting 
const StringToNumber = (str)=>{
    str=str.toUpperCase();
    let num = parseFloat(str.split("K")[0])*1000
 return num;
}
const SortedVideosDes =(Vids)=>{
 const DescendingData =Vids.sort((a,b)=>{
    return(StringToNumber(b.others.views)-StringToNumber(a.others.views))
 })
 displayVideos(DescendingData)
}
const SortedVideosAsc =(Vids)=>{
 const AscendingData =Vids.sort((a,b)=>{
    return(StringToNumber(a.others.views)-StringToNumber(b.others.views))
 })
 displayVideos(AscendingData)
}
  
//call function
loadCatagories();
loadVideos();























// const cardDemo ={
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }