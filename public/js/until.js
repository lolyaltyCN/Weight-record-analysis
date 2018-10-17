var until = {
    /**
     * 设置cookie
     * @param {*} value
     */
    setCookie(value) {
        var Hours = 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
        document.cookie = "userToken =" + escape(value) + ";expires=" + exp.toGMTString();
        console.log(document.cookie)
    },
    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].replace(/(^\s*)|(\s*$)/g, "");
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}