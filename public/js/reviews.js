var request = new XMLHttpRequest();

const proxyurl = "https://curly-tree-39b1.cors-anywhere-ask.workers.dev/?";           //"https://cors-anywhere.herokuapp.com/";
const url =
  "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJX2I_ZqQpCTkRzbKcsuWqWAw&key=AIzaSyAvYpBPHJh8PRt-eUGzW6zjv72X51gQ0Oc"; // site that doesn’t send Access-Control-*

request.open("GET", proxyurl + url, true);
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    var i = 0;
    var j = 0;

    while (i < 3) {
      if (data.result.reviews[j].rating >= 3) {
        const img = document.getElementById("testimonial-img-" + (i + 1));
        img.src = data.result.reviews[j].profile_photo_url;

        const review = document.getElementById("testimonial-review-" + (i + 1));
        review.textContent = data.result.reviews[j].text;

        const reviewer = document.getElementById("testimonial-reviewer-" + (i + 1));
        reviewer.innerHTML = '<a href='+data.result.reviews[j].author_url+' target="_blank"><b>'+data.result.reviews[j].author_name+'</b></a>'+data.result.reviews[j].relative_time_description;
        //console.log(data.result.reviews[j].author_name);

        const str_rating = document.getElementById("testimonial-rating-" + (i + 1));
        var rating = data.result.reviews[j].rating;
        var ctr = 0;
        var testString = '';
        while(ctr<rating){
            testString += '<li class="list-inline-item"><i class="fa fa-star"></i></li>'
            ++ctr;
        }
        if(rating<ctr && rating>(ctr-1)){
            testString += '<li class="list-inline-item"><i class="fas fa-star-half-alt"></i></li>';
        }
        str_rating.innerHTML = testString;
        
        ++i;
      }
      ++j;
    }
    //
    
    console.log(data.result.reviews);
  } else {
    console.log("error");
  }
};

request.send();
