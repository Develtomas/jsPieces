    var count1 = document.createElement('p');
    count1.setAttribute('id', 'count');
    count1.innerHTML = '00:00';

    var btn = document.createElement('input');
    btn.setAttribute('type', 'button');
    btn.setAttribute('value', 'start');
    btn.style = "margin-right: 5px;"
    btn.id = 'startBtn';

    var btnStop = btn.cloneNode(false);
    btnStop.setAttribute('value', 'stop');
    btnStop.id = 'stopBtn';

    var btnDrop = btn.cloneNode(false);
    btnDrop.setAttribute('value', 'drop');
    btnDrop.id = 'dropBtn';

    document.body.appendChild(count1);
    document.body.appendChild(btn);
    document.body.appendChild(btnStop);
    document.body.appendChild(btnDrop);