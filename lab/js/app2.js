'use strict';

function Horns(hornObject) {
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns
}

Horns.allHorns = [];

Horns.prototype.render = function () {
  //1. get the HTML from the template

  const $source = $('#horn-template').html();

  // compile the source with Handlbar

  const compiledSource = Handlebars.compile($source);

  // Return the HTML from the compiled method

  return compiledSource(this);

}


Horns.readJson = () => {
  $.get('data/page-2.json')
    .then(data => {
      data.forEach(horn => {
        Horns.allHorns.push(new Horns(horn));
      })
    }, 'json')
    .then(Horns.loadHorns)
    .then(dropdown)


}
Horns.loadHorns = () => {
  Horns.allHorns.forEach(horn => $('#photo-template').append(horn.render( )));
}


const dropdown = function () {
  //function that populates filters
  //function that creats filters
  const repeatedItems = [];
  Horns.allHorns.forEach(function (ele) {
    if (!repeatedItems.includes(ele.keyword)) {
      repeatedItems.push(ele.keyword);
    }
  })
  repeatedItems.forEach(val => {
    $(`select`).append(`<option value = "${val}">${val}</option>`);
  })
  console.log(repeatedItems);
}


$(`.sortnumber`).on(`click`, function(){
  Horns.allHorns.sort(function(a,b) {
    return a.horns-b.horns})
  $('#photo-template').html('');
  Horns.allHorns.forEach(horn => $('#photo-template').append(horn.render()))
});

$(`.sortalphabet`).on(`click`, function(){
  Horns.allHorns.sort(function(a,b){
    let titleA = a.title.toLowerCase()
    let titleB = b.title.toLowerCase()
    if (titleA < titleB){
      return -1}
    if (titleA > titleB){
      return 1}
    return 0
  })
  $('#photo-template').html('');
  Horns.allHorns.forEach(horn => $('#photo-template').append(horn.render()))
});





////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Filter by Keyword

$(`select[name = "keyword"]`).on('change', function () {
  let $selection = $(this).val();
  $('div').hide();
  $(`div[class = "${$selection}"]`).show();
})


$(() => Horns.readJson());
