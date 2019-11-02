import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Input } from '../shared/FormElements';
import OiIcon from '../OiIcon';
import { spacing, mediaQuery, radius, colors } from '../../utils/styles';

const QtyControlWrapper = styled(`div`)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;

    ${mediaQuery.tabletFrom} {
        flex-direction: row;
    }
`;

const Quantity = styled(Input)`
    flex-grow: 0;
    order: 1;
    width: 44px;
    height: 40px;
    padding: 0 ${spacing.xs}px 0;
    text-align: center;
    border-radius: 0;

    &::-webkit-inner-spin-button {
        appearance: none;
    }

    ${mediaQuery.tabletFrom} {
        width: 60px;
        height: 44px;
    }
`;

const ControlButton = styled(`button`)`
    appearance: none;
    outline: none;
    display: inline-block;
    width: 44px;
    height: 28px;
    background-color: ${colors.mainLight};
    border: 1px solid ${colors.neutral2};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-tap-highlight-color: rgba(0,0,0,0.2);

    &:active {
        background-color: ${colors.neutral2};
    }

    &:disabled, &[disabled] {
        cursor: not-allowed;

        i {
            color: ${colors.neutral2};
        }
    }

    i {
        font-size: 0.9rem;
        color: ${colors.neutral5};
    }

    &:first-of-type {
        order: 0;
        border-bottom: none;
        border-radius: ${radius.large}px ${radius.large}px 0 0;
    }

    &:last-of-type {
        order: 2;
        border-top: none;
        border-radius: 0 0 ${radius.large}px ${radius.large}px;
    }

    ${mediaQuery.tabletFrom} {
        width: 32px;
        height: 44px;

        &:first-of-type {
            order: 2;
            border: 1px solid ${colors.neutral2};
            border-left: none;
            border-radius: 0 ${radius.large}px ${radius.large}px 0;
            
        }
    
        &:last-of-type {
            order: 0;
            border: 1px solid ${colors.neutral2};
            border-right: none;
            border-radius: ${radius.large}px 0 0 ${radius.large}px;
        }
    }
`;

class QuantityControl extends React.Component {

    render() {

        const {
            className,
            value,
            id,
            onChange,
            onBlur,
            onClickInc,
            onClickDec,
            ...rest
        } = this.props;

        return (
            <QtyControlWrapper className={className} {...rest}>
                <ControlButton onClick={onClickInc}><OiIcon icon='oi-icon-plus' /></ControlButton>
                <Quantity
                    aria-label="Quantity"
                    id={id}
                    type="number"
                    name="quantity"
                    min="1"
                    step="1"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                />
                <ControlButton disabled={value === 1} onClick={onClickDec}><OiIcon icon='oi-icon-minus' /></ControlButton>
            </QtyControlWrapper>
        )
    }
}

export default QuantityControl;