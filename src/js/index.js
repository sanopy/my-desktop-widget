const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const menu = new Menu();
menu.append(new MenuItem({
  label: 'ひめ',
  click() {
    document.getElementById('img').src = '../img/image001.jpg';
  }
}));
menu.append(new MenuItem({
  label: 'かまって',
  click() {
    document.getElementById('img').src = '../img/image002.jpg';
  }
}));
menu.append(new MenuItem({
  label: 'あっ嬉しい',
  click() {
    document.getElementById('img').src = '../img/image003.jpg';
  }
}));
menu.append(new MenuItem({
  label: 'ドン引き',
  click() {
    document.getElementById('img').src = '../img/image004.jpg';
  }
}));
menu.append(new MenuItem({
  label: 'きょとん',
  click() {
    document.getElementById('img').src = '../img/image005.jpg';
  }
}));

window.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);

setInterval(function() {
  var ballon = document.getElementById('balloon');
  var date = new Date();
  // ballon.textContent = date.toDateString();
  ballon.textContent = date.toLocaleString();
}, 100);
