import $ from 'jquery';

$(document).ajaxSend((event, jqxhr, settings) => {
  settings.url = 'http://localhost:9000' + settings.url;
});
