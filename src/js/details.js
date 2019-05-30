import "../less/my-styles.less";
import { Get } from "./service";
import jquery from "jquery";

let page = 1;
function urlParameters(filter) {
  var url = new URL(window.location.href);
  var Urlfilter = url.searchParams.get(filter);
  return Urlfilter;
}

function addedMovieItem(data) {
  if (data.Response == "True") {
    page == 1 && jquery("#movieDetails").empty();
    page == 1 &&
      jquery("#movieDetailsCount").append(
        "" + data.totalResults + " Film Bulundu"
      );
    data.Search.map(x => jquery("#movieDetails").append(movieItem(x)));
  } else {
    page == 1 && jquery("#movieDetails").empty();
  }
}
function addedMovieDetails(data) {
  jquery("#Language" + data.imdbID + "").append(
    "Dil:" + (data.Language == "N/A" ? "Bilinmiyor" : data.Language) + ""
  );
  jquery("#Rate" + data.imdbID + "").append(
    data.imdbRating == "N/A" ? "Oy Yok" : data.imdbRating
  );
  jquery("#Actors" + data.imdbID + "").append(
    "Oyuncular:" + data.Actors + " | <b>Tümünü Listeyi Gör</b>"
  );
  jquery("#Plot" + data.imdbID + "").append(
    "" +
      (data.Plot.length > 170
        ? data.Plot.substring(0, 170) + "..."
        : data.Plot) +
      " <b>Detaylar</b>"
  );
}
function movieItem(movie) {
  Get("", { i: movie.imdbID }, addedMovieDetails);
  const noImage = "https://antmovies.tv/uploads/no-poster.png";
  return (
    '<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style="margin-top:15px;"> ' +
    '<div class="row">' +
    ' <div class="col-6 offset-3 col-sm-4 offset-sm-4 col-md-4  offset-md-0 col-lg-4  offset-lg-0 col-xl-4 offset-xl-0">' +
    ' <img src=" ' +
    movie.Poster +
    ' "   class="rounded float-left" onerror="this.src=\'' +
    noImage +
    '\'" style="width: 100%;height: 250px;"> ' +
    "  </div> " +
    '   <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8"> ' +
    '      <div class="row"> ' +
    '       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> ' +
    "<h3> " +
    "" +
    movie.Title +
    " " +
    "(" +
    movie.Year +
    " )</h3> " +
    "    </div> " +
    '   <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8" style="margin-top: -10px"> ' +
    '<i class="fas fa-star rateIcon"></i> ' +
    '<strong style="color:#5982fc" id="Rate' +
    movie.imdbID +
    '"></strong>/<small>10</small> ' +
    "</div> " +
    '<div  class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="margin-top: 15px;font-size: 13px;word-break: break-word;">' +
    '<div  id="Language' +
    movie.imdbID +
    '" ></div> ' +
    '<div  id="Actors' +
    movie.imdbID +
    '" ></div>' +
    '<div id="Plot' +
    movie.imdbID +
    '" style="margin-top: 20px;font-size: 13px"> ' +
    "</div>  " +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>"
  );
}
window.onload = function() {
  const UrlFilter = urlParameters("filter");
  jquery("#movieDetailsTitle").append(UrlFilter + " için Sonuçlar");
  Get("", { s: UrlFilter, page: page }, addedMovieItem);
  $(window).scroll(function() {
    if (
      $(window).scrollTop() >=
      $(document).height() - $(window).height() - 5
    ) {
      page = page + 1;
      Get("", { s: UrlFilter, page: page }, addedMovieItem);
    }
  });
};
