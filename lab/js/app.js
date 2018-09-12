'use strict';

function Horns(hornObject){
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horn
}

Horns.allHorns = [];

Horns.prototype.render = function (){
  $(`main`).append('<section class = "clone"></section>');
  const $hornClone = $('section[class= "clone"]');

  const $hornHtml = $(`#photo-template`).html();

  $hornClone.html($hornHtml);

  $hornClone.find('h2').text(this.title);
  $hornClone.find('img').attr('src', this.image_url);
  $hornClone.find('p').text(this.description);
  $hornClone.removeClass('clone');
  $hornClone.addClass(this.title);

}

Horns.readJson = () =>{
  $.get('data/page-1.json')
    .then(data => {
      data.forEach(horn => {
        Horns.allHorns.push( new Horns(horn));
      })
    },'json')
    .then (Horns.loadHorns)

}

Horns.loadHorns = () => {
  Horns.allHorns.forEach(horn => horn.render());
}

$(() => Horns.readJson());