import jquery from "jquery";
import { searchDropShow, searchDropHide } from "./searchDrop";
import { Get } from "./service";
import "../less/my-styles.less";
export const searchInput = document.getElementById("searchInput");
const IconType = {
  arrow: 1,
  search: 2
};

let InputValue;
function addedMovieDetails(data) {
  jquery("#Language" + data.imdbID + "").append("Adı:" + data.Language + "");
  jquery("#Rate" + data.imdbID + "").append(data.imdbRating);
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
  return (
    '<div class="row" style="margin-top:15px;"> ' +
    ' <div class="col-6 offset-3 col-sm-4 offset-sm-4 col-md-4  offset-md-0 col-lg-4  offset-lg-0 col-xl-4 offset-xl-0">' +
    ' <img src=" ' +
    '' +
    movie.Poster +
    '' +
    '  " class="rounded float-left" style="width: 100%;height: 250px;"> ' +
    '  </div> ' +
    '   <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8"> ' +
    '      <div class="row"> ' +
    '       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> ' +
    '<h3> ' +
    '' +
    movie.Title +
    ' ' +
    '(' +
    movie.Year +
    ' )</h3> ' +
    '    </div> ' +
    '   <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8" style="margin-top: -10px"> ' +
    '<i class="fas fa-star rateIcon"></i> ' +
    '<strong style="color:#5982fc" id="Rate' +
    movie.imdbID +
    '"></strong>/<small>10</small> ' +
    '</div> ' +
    '<div  class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-12" style="margin-top: 15px;font-size: 13px;word-break: break-word;">' +
    '<div  id="Language' +
    movie.imdbID +
    '" ></div> ' +
    '<div  id="Actors' +
    movie.imdbID +
    '" ></div>' +
    '<div id="Plot' +
    movie.imdbID +
    '" style="margin-top: 20px;font-size: 13px"> ' +
    '</div>  ' +
    '</div>' +
    '</div>' +
    '</div>'
  );
}
function addedMovieDropFooter() {
  return (
    '<div class="row" style="margin-top:10px;">' +
    '<div class="col-12 dropdownFooter" ><a href="details.html?filter=' +
    InputValue +
    '">Daha Fazla Sonuç</a></div>' +
    "</div>"
  );
}
function addedMovieDropFooterNoData() {
  return (
    '<div class="row" style="margin-top:10px;">' +
    '<div class="col-12 dropdownFooterNoData" >Veri Bulunamadı</div>' +
    "</div>"
  );
}
function addedMovieItem(data) {
  if (data.Response == "True") {
    jquery("#searchDrop").empty();
    data.Search.slice(0, 2).map(x =>
      jquery("#searchDrop").append(movieItem(x))
    );
    jquery("#searchDrop").append(addedMovieDropFooter());
  } else {
    jquery("#searchDrop").empty();
    jquery("#searchDrop").append(addedMovieDropFooterNoData());
  }
}
function changeIcon(type) {
  if (type == IconType.arrow) {
    jquery("#searchIcon").removeClass("fa-search");
    jquery("#searchIcon").addClass("fa-arrow-right");
  } else {
    jquery("#searchIcon").removeClass("fa-arrow-right");
    jquery("#searchIcon").addClass("fa-search");
  }
}
window.onload = function() {
  searchInput.onkeyup = function() {
    InputValue = searchInput.value;
    if (InputValue.length > 0) {
      jquery("#searchInputDiv").animate({ marginTop: "50px" }, 300);
      changeIcon(IconType.arrow);
      if (InputValue.length > 2) {
        searchDropShow();
        Get("", { s: InputValue }, addedMovieItem);
      } else {
        searchDropHide();
      }
    } else {
      jquery("#searchInputDiv").animate({ marginTop: "200px" }, 300);
      changeIcon(IconType.search);
      searchDropHide();
    }
  };
};
