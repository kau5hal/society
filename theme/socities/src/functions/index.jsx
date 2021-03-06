export async function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    if (window.location.hostname === "localhost")
      document.cookie =
        cname + "=" + cvalue + "; " + expires + ";SameSite=None;path=/";
    else
      document.cookie =
        cname +
        "=" +
        cvalue +
        "; " +
        expires +
        ";SameSite=None;domain=.localhost:2000;path=/";
  }

  export async function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export async function checkLogin(){
  var user_id = getCookie('user_id');
  if(user_id != null && user_id != ''){
    return true;
  }else{
    return false;
  }
}



  export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }