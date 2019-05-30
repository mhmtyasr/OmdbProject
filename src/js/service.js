import jquery from "jquery"

const BaseUrl =
  'http://www.omdbapi.com/?apikey=ebb5f279&type=movie';

const GetUrl=(url)=>{
return BaseUrl+url;
}


export const Get =  (url,params,callback) => {
  jquery.ajax({
     type: 'GET',
     url: GetUrl(url),
     data:{...params},
       success: function(data) {
         callback(data)
         
      },
      error: function(data) {
        throw 'Error';
      },
    });
}