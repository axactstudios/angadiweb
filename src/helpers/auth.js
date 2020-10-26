// Set in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    setLocalStorage('user', response);
    next();
};

// Access user info from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user'));
        } else {
            return false;
        }
    }
};

//signout user
export const signout = next => {
    removeLocalStorage('user');
    next();
};


//update user info
export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response;
        localStorage.setItem('user', JSON.stringify(auth));
        next();
    }

};