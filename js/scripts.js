/*!
* Start Bootstrap - Simple Sidebar v6.0.3 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let canvas_parent = document.querySelector('.canvas-parent');

let parent_height = canvas_parent.clientHeight;
let parent_width = canvas.clientWidth;
canvas.height = parent_height;
canvas.width = parent_width;

context.textAliggn = "center";
context.texxtBaseline = "middle";

let start = document.getElementById('start');
let time_text = document.getElementById('time.text');
let drunk_status = document.getElementById('drunk.status');

let GameStatus = {
    STOP: 1,
    START: 2,
}

let status = GameStatus.STOP;
var timeout1, timeout2;

function get_rand_time(min, max) {
    let result = Math.floor(Math.random() * Math.floor(max)) + min;
    result = result * 1000;
    return result
}

function end_game() {
    canvas.style.background = "var(--bs-warning)";
    clearTimeout(timeout1);
    clearTimeout(timeout2);

   
    status = GameStatus.STOP;

}

function timeout1_function(time) {
    timeout1 = setTimeout( function() {
        canvas.style.background = "var(--bs-green)";
        let date1 = new Date();
        time_now = date1.getTime();

        canvas.addEventListener('click', function() {
            let date2 = new Date();
            time_later = date2.getTime();
            playtime = (time_later - time_now);
            time_text.innerHTML = playtime + " ms"

            if (playtime >= 400) {
                drunk_status.innerHTML = "drunk";
            }
            else {
                drunk_status.innerHTML = "sober";
            }
        })
    }, time)
}

function timeout2_function(time) {
    timeout2 = setTimeout(function() { 
        end_game();
    }, time)
}

function start_game() {
    console.log('started game')

    let change_time = get_rand_time(1, 8);
    let end_time = change_time + 1000;

    status = GameStatus.START;

    canvas.style.background = "var(--bs-red)";

    timeout1_function(change_time);
    timeout2_function(end_time);

    

}

start.addEventListener('click', function() {
    if (status === GameStatus.START) {
        end_game();
    } else {
        start_game();
    }
})

canvas.addEventListener('click', function() {
    end_game();
}) 