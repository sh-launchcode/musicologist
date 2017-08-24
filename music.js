let musicInfo = [];

function addSongFromField(event) {
  $('#list-result-info').text('')
  event.preventDefault();

  const info = $('#musicField').eq(0).val();

  musicInfo.push(info);
  renderList();
  $('#musicField').eq(0).val('');
}

$('#addButton').click(addSongFromField);

$('#clearSearch').click(function(){
  $('#list-result-info').text('')
  musicInfo = [];
  renderList();
});

$('#musicField').keyup(function(event) {
  if (event.which == 13) { // User presses Enter
    addSongFromField(event);
  }
});

function renderList() {
  const $list = $('.info').eq(0);

  $list.empty();

  for (const info of musicInfo) {
    const $item = $('<li class="list-group-item">').text(info);
    $list.append($item)
  }
}

$('#getPlaylistBtn').click(function (event) {
  $('#list-result-info').text('')
  let url = "https://itunes.apple.com/search?term=" + musicInfo.join("+") +"&limit=25.json";
  $.get(url).then(function(data){
    for(var x = 0; x < 25; x +=1){
      let resultsA = (JSON.parse(data)).results[x].artistName;
      let resultsS = (JSON.parse(data)).results[x].trackName;
      let result = resultsS + " by " + resultsA;
      const $item = $('<li class="list-result-item">').text(result);
      $('#list-result-info').append($item)
    };
  }).catch(function(){
    const $item = $('<li class="list-result-item">').text("Can't find a playlist with given parameters.");
    $('#list-result-info').append($item)
  });
});

