window.addEventListener('load', action);

function action() {
    var btn = document.getElementById('btn');
    btn.addEventListener('click', count);

    function loadGo() {
        document.getElementById('loader').style.display = 'block';
    }

    function loadEnd() {
        document.getElementById('loader').style.display = 'none';
    }

    function count() {
        document.getElementById("res").innerHTML = " ";

        var a = document.getElementsByName('first')[0].value,
            b = document.getElementsByName('second')[0].value,
            xhr = new XMLHttpRequest();

        xhr.open('POST', 'CalcHandler.ashx');
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById("res").innerHTML = xhr.responseText;
                loadEnd();
            }
        }

        xhr.send('a=' + a + '&b=' + b);
        loadGo();
    }
}