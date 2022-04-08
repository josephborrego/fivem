﻿var drawingAlerts = false;
var drawingInfos = false;
var pendingAlerts = [];
var pendingInfos = [];
$(function() {
    window.addEventListener('message', e => {
        var item = e.data;
        //console.log('message ' + JSON.stringify(item));

        if (item.shown === true) {
            $('#content').show();
            $('#instructions-container').fadeIn();
            setTimeout(() => {
                $('#instructions-container').fadeOut();
            }, 7500);
        }
        else if (item.shown === false) {
            $('#content').hide();
            $('#instructions').hide();
            return;
        }

        if (item.heli === true) {
            $('#heli').fadeIn();
            $('#plane').fadeOut();
        }
        else if (item.plane === true) {
            $('#plane').fadeIn();
            $('#heli').fadeOut();
        }
        else if (item.hasOwnProperty('rotation')) {
            $('#heading').removeClass().addClass('rotate-' + item.rotation);
            var text = '' + item.rotation;
            text = '00' + text;
            $('#headingNum').text(text.slice(text.length - 3));
        }
        else if (item.hasOwnProperty('camtilt')) {
            $('#tilt').removeClass().addClass('rotate-' + (-item.camtilt + 90));
            let text;
            if (item.camtilt < 0) {
                $('#tiltNum').text(item.camtilt);
            } else {
                text = '00' + item.camtilt;
                $('#tiltNum').text(text.slice(text.length - 3));
            }
        } else if (item.hasOwnProperty('northheading')) {
            $('#arrow').removeClass().addClass('rotate-' + (360 - item.northheading));
        }

        if (item.type == 'alert') {
            pendingAlerts.push(item.message);
            if (!drawingAlerts) {
                showAlerts();
            }
        }
        else if (item.type == 'info') {
            pendingInfos.push(item.message);
            if (!drawingInfos) {
                showInfos();
            }
        }
		else if (item.type == "help") {
			$('#instructions-container').fadeIn();
            setTimeout(() => {
                $('#instructions-container').fadeOut();
            }, 7500);
		}
    });
});

function showAlerts() {
    drawingAlerts = true;
    let msg = pendingAlerts.shift();
    $('#alert-text').text(msg);
    $('.alert').fadeIn();
    setTimeout(() => {
        $('.alert').fadeOut();
        setTimeout(() => {
            $('#alert-text').text('');
            if (pendingAlerts.length > 0) {
                showAlerts();
            }
            else {
                drawingAlerts = false;
            }
        }, 750);
    }, 2500);
}

function showInfos() {
    drawingInfos = true;
    let msg = pendingInfos.shift();
    $('#info-text').text(msg);
    $('.info').fadeIn();
    setTimeout(() => {
        $('.info').fadeOut();
        setTimeout(() => {
            $('#info-text').text('');
            if (pendingInfos.length > 0) {
                showInfos();
            }
            else {
                drawingInfos = false;
            }
        }, 750);
    }, 2500);
}