import React from 'react';

const Editoffer = ({match}) => {
    return (
        <div>
            {match.params.offerId}
        </div>
    );
};

export default Editoffer;