$(document).ready(function(){
    document.addEventListener('deviceready', onDeviceReady(), false);
    function onDeviceReady(){
        getRepos()
    }

    $('.ui-input-clear').click(function () {
        $('#search-list').hide()
        $('#user-info').hide()
    })
    $('#search-btn').click(function(event){
        event.preventDefault()
        var searchHtml = ''
        var userHtml = ''
        var username = $('#search-input').val()
        console.log('Searching User: ' + username)

        var userUrl = 'https://api.github.com/users/' + username
        var repoUrl = 'https://api.github.com/users/' + username + '/repos'

        $.ajax({
            url: repoUrl,
            dataType: 'jsonp',
            success: function(response){
                $.ajax({
                    url: userUrl,
                    data: 'jsonp',
                    success: function(data){
                        userHtml = '<h1><img class="thumbnail avatar" src="'+data.avatar_url+'"><a class="user-name" href="'+data.html_url+'" target="_blank">'+data.name+'</a></h1>'
                        $('#user-info').html(userHtml);
                    }

                })
                $.each(response.data, function(){
                    searchHtml += '<li>' +
                                    '<h1><a href="'+this.html_url+'" target="_blank">'+this.name+'</a></h1>' +
                                    '<p>By '+this.owner.login+'</p>'+
                                  '</li>'
                    $('#search-list').append(searchHtml)
                    $('#search-list').listview('refresh')
                })
            }
        })
    })
})
//Get repos for homescreen
function getRepos() {

    var html = ''

    $.ajax({
        url: 'https://api.github.com/repositories',
        dataType: 'jsonp',
        success: function(response){
            $.each(response.data, function(i, item){
                if (i < 10) {
                    html += '<li>' +
                                '<img class="thumbnail" src="'+this.owner.avatar_url+'">' +
                                '<h1><a href="'+this.html_url+'" target="_blank">'+this.name+'</a></h1>' +
                                '<p>By '+this.owner.login+'</p>'+
                            '</li>'
                }
            })
            $('#repo-list').append(html)
            $('#repo-list').listview('refresh')
        }
    })
}