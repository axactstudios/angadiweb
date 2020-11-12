import React, { useEffect, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';

const ShowImage = ({ item }) => {

    const [jjurl, setUrl] = useState('');

    useEffect(() => {
        setUrl(`${item.url}`)
    }, [item])

    const change = (e) => {
        if (e.target.src) {
            setUrl(e.target.src)
        }
    }

    return (
        <div className="cardPic mt-0 p-1">
            <div className="cardPic2 mt-0">
                <div className="cardPic3" onClick={change}>
                    <img src={`${item.url}`}
                        alt={item.name} />
                </div>
                <div className="cardPic3" onClick={change}>
                    <img src={`${item.url2}`}
                        alt={item.name} />
                </div>
                <div className="cardPic3" onClick={change}>
                    <img src={`${item.url3}`}
                        alt={item.name} />
                </div>
            </div>
            <div className="cardPic1" >
                {
                    jjurl &&
                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'fsdjfkldskf',
                            isFluidWidth: true,
                            src: jjurl,
                            imageClassName: 'main-img'
                        },
                        largeImage: {
                            src: jjurl,
                            width: 1200,
                            height: 1800
                        }
                    }} />
                }
            </div>
        </div>
    );
}


export default ShowImage;