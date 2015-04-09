requirejs(['jquery', 'modules/FileHelper'], function($, fileHelper){
    // $('#fileId').prop('href', 'filesystem:http://' + location.host + '/persistent/');
    // //fileHelper.write('/kaola/profile.txt', 'hello world', {encoding: 'utf-8', success: function(){
    //     fileHelper.read('/kaola/profile.txt', function(txt){
    //         alert(txt);
    //     });
    // //}});
    // 
    var filePath = '/kaola/profile.txt';
    $('#saveId').click(function(){
        fileHelper.write(filePath, 'hello world', {encoding: 'utf-8'});
    });

    $('#readId').click(function(){
        fileHelper.read(filePath, {success: function(txt){
            alert(txt);
        }});
    });

    $('#textId').val('filesystem:chrome-extension://' + location.host + '/persistent/');
});