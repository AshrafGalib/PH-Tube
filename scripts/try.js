// const getViews =async ()=>{
//     const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
//     const data = await res.json()
//    SortedVideos(data.videos)
// }
 
// const StringToNumber = (str)=>{
//     str=str.toUpperCase();
//     let num = parseFloat(str.split("K")[0])*1000
//  return num;
// }

// const SortedVideos =(Vids)=>{
//  const DescendingData =Vids.sort((a,b)=>{
//     return(StringToNumber(b.others.views)-StringToNumber(a.others.views))
//  })
//  console.log(DescendingData)
// }

// getViews()

// {
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


let numbers =[23,12,78,4,3,54];

numbers.sort(function(a,b){
    return a-b;
})
console.log(numbers);





