import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import InterfaceContext from '../../context/InterfaceContext';

const CustomScrollAnimation = props => {
    const { children } = props;

    return (
        <InterfaceContext.Consumer>
            {({
                viewportIs
            }) => (
                    <ScrollAnimation
                        {...props}
                        offset={viewportIs === null ? 40 : 80}
                        animateOnce
                        animateIn='fadeIn'
                    >
                        {children}
                    </ScrollAnimation>
                )}
        </InterfaceContext.Consumer>
    );
};

export default CustomScrollAnimation;