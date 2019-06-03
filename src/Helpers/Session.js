
function getMenuItems() {
    let menuData = localStorage.getItem("menuData");
    if(menuData)
        return JSON.parse(menuData);
    else 
        return null;
 }

function getLoginData() {
    let userData = localStorage.getItem("userData");
    userData = JSON.parse(userData);
    return userData;
}

function storeMenuItems(menuData) {
    localStorage.setItem("menuData",JSON.stringify(menuData));
}

function storeUserData(data) {
    localStorage.setItem("userData",JSON.stringify(data));
}

function storeToken(token) {
    localStorage.setItem("token",token);
}

function getToken() {
    return localStorage.getItem("token");
}

function clearStorage(name) {
    localStorage.setItem(name,null);
}

function pageAccessPermission(path,type) {
    let pathname = path.pathname;
    pathname = pathname.replace('/create','');
    pathname = pathname.replace('/edit','');
    pathname = pathname.replace(/[0-9]/g, '');
    if (pathname.charAt(pathname.length - 1) == '/') {
        pathname = pathname.substr(0, pathname.length - 1);
    }
    // console.log(pathname);
    let menuData = localStorage.getItem("menuData");
    if(menuData) {
        // console.log(menuData);
        menuData = JSON.parse(menuData);
        if(menuData) {
            let menuList = menuData; 
            let status = false;
            menuList.map((value, index) => {
                // console.log(pathname);
                // console.log(value.url);
                if(value.url == pathname) {
                    if(type == 'read' && value.read == "on")
                        status = true;
                    else if(type == 'edit' && value.edit == "on")
                        status =  true;
                    else if(type == 'delete' && value.delete == "on")
                        status =  true;
                }

                if(value.children) {
                    value.children.map((value2,index2) => {
                        // console.log(pathname);
                        // console.log(value2);
                        if(value2.url == pathname) {
                            if(type == 'read' && value2.read == "on")
                                status =  true;
                            else if(type == 'edit' && value2.edit == "on")
                                status =  true;
                            else if(type == 'delete' && value2.delete == "on")
                            status =  true;
                        }
                    })
                }
            })
            //  console.log(status);
            return status;
        }
    }
    else 
    return false;
         
    
}

 
// Now you have to export each function you want
 export {
    getMenuItems,
    storeToken,
    storeMenuItems,
    getToken,
    clearStorage,
    pageAccessPermission,
    getLoginData,
    storeUserData,
 };