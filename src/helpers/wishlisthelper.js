export const addItems = (item, next) => {
    let whishlist = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('whishlist')) {
            whishlist = JSON.parse(localStorage.getItem('whishlist'))
        }
        whishlist.push({
            ...item,
            count: 1
        })

        whishlist = Array.from(new Set(whishlist.map((p) => p._id))).map(id => {
            return whishlist.find(p => p._id === id)
        })
        localStorage.setItem('whishlist', JSON.stringify(whishlist));

        next();
    }
}

export const itemTotals = () => {
    if (typeof window != 'undefined') {
        if (localStorage.getItem('whishlist')) {
            return JSON.parse(localStorage.getItem('whishlist')).length;
        }
    }
}

export const getwhishlist = () => {
    if (typeof window != 'undefined') {
        if (localStorage.getItem('whishlist')) {
            return JSON.parse(localStorage.getItem('whishlist'));
        }
    }
    return [];
}

export const removeItems = (productId) => {
    let whishlist = []
    if (typeof window != 'undefined') {
        if (localStorage.getItem('whishlist')) {
            whishlist = JSON.parse(localStorage.getItem('whishlist'))
        }
        whishlist.map((product, i) => {
            if (product._id === productId) {
                whishlist.splice(i, 1)
            }
        })
        localStorage.setItem('whishlist', JSON.stringify(whishlist))


    }

    return whishlist;

}

export const emptywhishlist = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('whishlist')
        next();
    }
}