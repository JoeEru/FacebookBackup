import React, { Component } from 'react';

export default class FbLogin extends Component{



    componentDidMount(){
        // Load the required SDK asynchronously for facebook
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function() {
            window.FB.init({
              appId      : '2041386602760785',
              autoLogAppEvents: true,
              xfbml      : true,
              version    : 'v2.10'
            });
        };
    }

    facebookLogin(){
        window.FB.login(
            function(res){
                this.statusChangeCallback(res);
            }.bind(this),{ scope : 'public_profile,email,user_birthday,user_location,user_photos' });
    }

    checkLoginState() {
        console.log( "Checking login status..........." );
        window.FB.getLoginStatus(function(response) {
            alert("FB Callback")
            console.log("----------->")
            console.log(response)
            this.statusChangeCallback(response);
        }.bind(this));
    }

    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            this.fetchDataFacebook();
        } else if (response.status === 'not_authorized') {
            console.log('Import error', 'Authorize app to import data', 'error')
        } else {
            console.log('Import error', 'Error occured while importing data', 'error')
        }
    }

    fetchDataFacebook(){
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('me?fields=name,email,location,cover,birthday,picture.type(large){url},albums{id,name,count,cover_photo{source},photos.limit(1000){source}}', function(user) {
          this.props.displayUserInfos(user);
          console.log('Successful login from facebook : ' + user.name);
        }.bind(this));
    }


    render(){
      //if the user is authenticated we hide the sign in button
      let visibility = "";
      if(this.props.hide){
        visibility = "hidden";
      }
        return(
            <button id="fb-btn" className={"btn btn-lg btn-primary " + visibility } onClick={this.facebookLogin.bind(this) }>
              <span className="fa fa-facebook"></span> Connect With Facebook
            </button>
        )
    }
}
