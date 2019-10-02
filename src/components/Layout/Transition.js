import React from 'react';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

const timeoutIn = 800;
const timeoutOut = 1200;

const getTransitionStyles = {
  entering: {
    position: `absolute`,
    transform: `translate3d(100px, 0, 0)`,
    opacity: 0,
  },
  entered: {
    transform: `translate3d(0, 0, 0)`,
    transition: `opacity 0.8s ease,transform 1s cubic-bezier(.075,.82,.165,1)`,
    opacity: 1,
  },
  exiting: {
    transform: `translate3d(-200px, 0, 0)`,
    transition: `opacity 0.6s cubic-bezier(.9,0,.95,.95),transform 1.2s cubic-bezier(.63,.26,.63,.97)`,
    opacity: 0,
  },
}

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props
    return (
      <TransitionGroup>
        <ReactTransition
          key={location.pathname}
          timeout={{
            enter: timeoutIn,
            exit: timeoutOut,
          }}
        >
          {status => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    )
  }
}

export default Transition;