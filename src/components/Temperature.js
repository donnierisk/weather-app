import React from 'react';

const Temperature = (props) => {

    return (
        <div>
            <div id='weatherContainer'>
                <div className='weatherBlock'>
                    <img src={props.iconSource} alt='Weather Icon'/>
                </div>
                <div className='weatherBlock'>
                    <p id='temperature'>{props.temperature}	&#8451;</p>
                </div>
            </div>
        </div>
    );
}

export default Temperature;