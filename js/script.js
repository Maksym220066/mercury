
const tuggle = document.querySelector('.tuggle');
const btn = document.querySelector('.tuggle span');
const navMenu = document.querySelector('.header__menu');

//burger menu.When width of display 768 px or less the works;
tuggle.addEventListener('click', () => {
   btn.classList.toggle('active')
   navMenu.classList.toggle('header__menu--active')
})




//drag & drop



const zone = document.querySelector('.drag__drop-her');
const elementDrag = document.querySelectorAll('.card-drag--drop');
const completedZone = document.querySelector('.drag__completed');

zone.ondragover = allowDrop;

elementDrag.forEach(function (e) {
   e.ondragstart = drag;
})

//resets all default setting;
function allowDrop(e) {
   e.preventDefault();
}

//When you start drag block, data of the block is saved;
function drag(e) {
   e.dataTransfer.setData('id', e.target.id)
}
zone.ondrop = drop;

//works when block dropping
function drop(e) {
   //get data that was token before
   let itemClass = e.dataTransfer.getData('id');
   let elem = document.getElementById(itemClass);

   //moves the block which we drag inside another block;
   completedZone.append(elem);

   //get the element we dropped;
   let elemComleted = completedZone.querySelector('#' + itemClass);

   // if elements have been moved, element's classes changing;
   if (elemComleted) {
      let clock = elemComleted.querySelector('.card-drag__clock-time');
      clock.className = 'card-drag__clock-time card-drag__clock-time--completed fas fa-check-circle';
      let infoTsk = elemComleted.querySelector('.card-drag__info-task');
      infoTsk.textContent = 'completed';
      infoTsk.className = 'card-drag__info-task card-drag__info-task--completed';
   }
   sumProgresCpmpleted()
}
//The function is verifed amount of blocks and number is changed in tittle ('In proggres' and 'Completed' task);
function sumProgresCpmpleted() {
   let inProgresSum = document.querySelector('.drag__total-number--progres');
   let completedSum = document.querySelector('.drag__total-number--completed');
   let BlocksInProgres = document.querySelector('.drag__in-progres').querySelectorAll('.card-drag').length;
   let BlocksInComoleted = document.querySelector('.drag__completed').querySelectorAll('.card-drag').length;
   inProgresSum.textContent = `(${(BlocksInProgres)})`;
   completedSum.textContent = `(${(BlocksInComoleted)})`;
   deleteProgres(BlocksInProgres)
}
//If inside block of 'In progres' don't have any task the block is deleted;
function deleteProgres(deleteProgres) {
   if (deleteProgres == 0) {
      document.querySelector('.drag__in-progres').style.display = 'none';
      zone.style.display = 'none';
   }
}

//pub menu


const btnPub = document.querySelector('.header__list-item--pub');
const overflow = document.querySelector('.overflow');
const error = document.querySelector('.errors');
const btnPubFooter = document.querySelector('.footer__contact--pub');


btnPub.addEventListener('click', pubMenu);
btnPubFooter.addEventListener('click', pubMenu);
overflow.addEventListener('click', menuCancel);

function pubMenu() {
   if (overflow.style.display = 'none') overflow.style.display = 'block';
}

function menuCancel(e) {
   if (e.target.classList.contains('btn--cancel') || e.target == this) overflow.style.display = 'none';
}


//link to telegram and send dataValue;


const btnLink = document.querySelector('.btn--link');
let nameValue = document.querySelector('#name');
let numberValue = document.querySelector('#phone');
let emailValue = document.querySelector('#email');

//token and id form telegram-bot;
let token = '1493196906:AAFToUZNu-BPyY19WIHU8a_oHuoJKh0yODM';
let id = '739141801';


btnLink.addEventListener('click', sendData);


//post request to telegram-bot;
function sendData(e) {
   e.preventDefault();
   //set data value from inputs;
   let form = new FormData(document.querySelector('form'));

   //if inputs are empty, function return false;
   if (nameValue.value == '' || numberValue.value == '' || emailValue.value == '') {
      error.style.display = 'block';
      error.textContent = 'You have just entered incorrect data';
      return false;
   }
   //text which will be send telegram-bot;
   let txt = ` <b>name:</b> ${form.get('name')}%0A<b>phone:</b> ${form.get('phone')}%0A<b>email:</b> ${form.get('email')}`

   //send request to telegram;
   fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&parse_mode=html&text=${txt}`, {
      method: 'POST',
   })
   //redirect to group telegrams;
   window.location.href = 'https://t.me/joinchat/AAAAAEXRYW7T4gN2_uHxJA';
   return false;
}

