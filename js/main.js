
const get_all_breeds = "https://dog.ceo/api/breeds/list/all"
//get all breeds
const getAllBreeds = () => {  
    $.get(get_all_breeds, data => {
        if (data.status === "success"){
            const list = Object.keys(data.message)
            Object.keys(data.message).forEach(val => {
                $(".list").append(`<li>${val}</li>`);
            })

            //set default breed
            $(".dog-breeds").text(list[0])
        }
        
    });
}

//fetch data
const fetchData = (breed) => {
    const api_url = `https://dog.ceo/api/breed/${breed}/images/random`
    $.get(api_url, data => {
        if (data.status === "success"){
            $("img").attr("src", data.message)
        }
    });
}


//handle click li - select a specific breed
$(document).on("click", ".list li", function () {
    const val = $(this).text()
    $(".dog-breeds").text(val)
    $(".list").fadeOut(100);
});

//select breeds 
$(".dog-breeds").click(function (e) { 
    e.preventDefault();
    $(".list").slideToggle();
});


/* 
//set url cho input
$("input").val(api_url) */

//calling 
getAllBreeds();


//fetchData();

$("button").click(function (e) { 
    //console.log("hello");
    e.preventDefault();
    const breed = $(".dog-breeds").text()
    fetchData(breed);
});

/* const fetchData = () => {
    
    //loading icon
    $(".dog-area").append(
        `<span class="loading"></span>`
    )
    //remove previous image
    $(".dog-image").attr("src", "");
    $.get(api_url, (data)=>{
        if(data.status === "success"){
            $(".dog-image").attr("src", data.message)
        }
    }).done(()=>{
        
        $(".dog-area  .loading").remove();
    }).fail(()=>{
        $(".dog-area  .loading").remove();
    })
} */