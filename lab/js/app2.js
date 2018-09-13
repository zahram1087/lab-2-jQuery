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
  $(`main`).append('<section class = "clone"></section>');
  const $hornClone = $('section[class= "clone"]');

  const $hornHtml = $(`#photo-template`).html();

  $hornClone.html($hornHtml);

  $hornClone.find('h2').text(this.title);
  $hornClone.find('h2').attr('keyword', this.keyword);
  $hornClone.find('img').attr('src', this.image_url);
  $hornClone.find('img').attr('keyword', this.keyword);
  $hornClone.find('p').text(this.description);
  $hornClone.find('p').attr('keyword', this.keyword);
  $hornClone.removeClass('clone');
  $hornClone.addClass(this.title);

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
  Horns.allHorns.forEach(horn => horn.render());
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
  $('img').hide();
  $('p').hide();
  $('h2').hide();
  $(`img[keyword = "${$selection}"]`).show();
  $(`h2[keyword = "${$selection}"]`).show();
  $(`p[keyword = "${$selection}"]`).show();

})


$(() => Horns.readJson());
