$(document).ready(function() {
  
  var dispatcher1 = new WebSocketRails('localhost:3000/websocket');
  var dispatcher2 = new WebSocketRails('localhost:3000/websocket');
  var dispatcher3 = new WebSocketRails('localhost:3000/websocket');
  
  channel1 = dispatcher1.subscribe('posts');
  channel2 = dispatcher2.subscribe('posts');
  channel3 = dispatcher3.subscribe('posts');

  channel1.bind('chat', function(post) {
    $('#user1 .chat-massages').append('<p>'+post.body+'</p>');
  });

  channel2.bind('chat', function(post) {
    $('#user2 .chat-massages').append('<p>'+post.body+'</p>');
  });

  channel3.bind('chat', function(post) {
    $('#user3 .chat-massages').append('<p>'+post.body+'</p>');
    $('#'+post.owner+' .chat-massages p:last-child').css('color','red');
  });
 
  $('.chat button').click(function(event) {
    event.preventDefault();

    var id = $(this).closest('.chat').attr('id');

    $.ajax({
      async: false,
      type: 'post',
      url: '/users/1/create',
      data: {
        authenticity_token: $('#'+id+' input[name=authenticity_token]').val(),
        micropost: {
          body: $('#'+id+' input').val(),
          owner: id
        }
      }
    });
  });

});