var mainURL = "http://pokeapi.co/api/v2/type/";
var giphyKey = "d052bee2015b488cbdaae34f0c2b0dbd";
var giphyAPI = "https://api.giphy.com/v1/" + giphyKey;
function searchPokemon(userChoice) {
    $.get(mainURL, function (data) {
        for (var i = 0; i < data.results.length; i++) {
            if (userChoice == data.results[i].name) {
                var dataURL = data.results[i].url;
                $.get(dataURL, function (data2) {
                    var rand = Math.floor(Math.random() * data2.pokemon.length);
                    var pokeName = data2.pokemon[rand].pokemon.name;
                    var pokeURL = data2.pokemon[rand].pokemon.url;
                    var pokeGif = $.get("http://api.giphy.com/v1/gifs/search?q=" + pokeName + "&api_key=" + giphyKey + "&limit=5");
                    pokeGif.done(function (data4) {
                        console.log("success got data", data4);
                        $("#giphy").attr("src", data4.data[0].images.fixed_width_still.url)
                    });
                    $.get(pokeURL, function (data3) {
                        var pokeSprite = data3.sprites.front_default;
                        $("#pokename").text(pokeName);
                        $("#YourPokemon").attr("src", pokeSprite);
                    })
                });
            }
        }
    });
}


//OAUTH

//called when successful user log in
function onSignIn(googleUser) {
    console.log('User signed in!');
    var profile = googleUser.getBasicProfile();
    //change userName text, img source, & email text based on profile
    $(".userName").text(profile.getName());
    $("#userPhoto").attr("src", profile.getImageUrl());
    $(".email").text(profile.getEmail());
}

//called when "sign out" button clicked
function onSignOut() {
    //should sign user out and toggleHidden
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.')
        //setting back to default
        $(".userName").text("USER_NAME");
        $("#userPhoto").attr("src", "http://farazblog.com/theme/logo-404.jpg");
        $(".email").text("example@example.com");
    });
}