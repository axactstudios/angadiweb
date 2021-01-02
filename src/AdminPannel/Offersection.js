import React from 'react';
import { Route, Switch} from 'react-router-dom'

import Addoffer from './Addoffer'
import Addofferforfirst from './AddOfferFirst'
import Addofferforcateg from './AddofferCateg'

const Offersection = () => {
    return (
        <div>
            <Switch>
                <Route path='/add/offer/' exact component={Addoffer} />
                <Route path='/add/offer/forfirstuser' exact component={Addofferforfirst} />
                <Route path='/add/offer/forcategory' exact component={Addofferforcateg} />
            </Switch>
        </div>
    );
};

export default Offersection;