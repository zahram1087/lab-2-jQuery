'use strict';

function Horns(hornObject) {
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horn
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
  // .then(Horns.dropdownFilter)

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





////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Filter by Keyword

$(`select[name = "keyword"]`).on('change', function () {
  let $selection = $(this).val();
  $('div').hide();
  $(`div[class = "${$selection}"]`).show();
})


$(() => Horns.readJson());
