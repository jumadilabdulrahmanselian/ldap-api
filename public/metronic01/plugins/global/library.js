function isSelectorExist(selector) {
    var body = document.querySelector('body');
    if(body.classList.contains(selector)){
        return body.classList.contains(selector);
    }else{
        // var id = document.getElementById(selector);
        // if(id !== null) {
        //     return true;
        // }
        // else{
            return body.querySelector(selector) !== null ? body.querySelector(selector) : false;
        // }
    }
}

function isJson( jsonString ) {
    try {
        JSON.parse( jsonString );
        return true; // It's a valid JSON format
    } catch (e) {
        return false; // It's not a valid JSON format
    }  
}