import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import OiIcon from '../OiIcon';

import { Fieldset, Input, Label, Select, Submit } from '../shared/FormElements';

import { colors, spacing, radius, mediaQuery, FontStyle, fontFamily, fontWeight } from '../../utils/styles';

import StoreContext from '../../context/StoreContext';

const _ = require('lodash');

const Form = styled(`form`)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Errors = styled(`div`)`
  width: 100%;
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: row;
  margin-bottom: ${spacing.md}px;
  background-color: ${colors.mainHighlight};
  border-radius: ${radius.large}px;
`;

const ErrorSign = styled(`div`)`
  align-items: center;
  color: ${colors.white};
  display: flex;
  flex-basis: 48px;
  justify-content: center;
`;

const ErrorMsgs = styled(`ul`)`
  padding: 0;
  list-style: none;
  border-left: none;
  flex-grow: 1;
  margin: 0;
  padding: ${spacing.sm}px 0;

  li {
    margin: 0;
    padding: 0;
  }
`;

const QtyFieldset = styled(Fieldset)`
  display: none;
  flex-basis: 65px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: ${spacing.md}px;

  ${Label} {
    text-align: center;
  }

  ${Input} {
    padding: ${spacing.sm}px ${spacing.sm}px;
    text-align: center;
  }
`;

const VariantFieldset = styled(Fieldset)`
  flex-basis: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${spacing.xl}px;
`;

const ProductOptions = styled(`div`)`
  display: flex;
  justify-content: flex-start;
`;

const ProductOptionSelector = styled(`div`)`
  flex: 1 0 50%;
  padding-right: ${spacing.lg}px;
`;

const OptionSelectorTitle = styled(`legend`)`
  font-family: ${fontFamily.heading};
  font-size: 1rem;
  font-weight: ${fontWeight.heading.medium};
  margin-bottom: ${spacing.sm}px;

  span {
    color: ${colors.neutral4};
    font-weight: ${fontWeight.heading.normal};
  }
`;

const OptionList = styled(`div`)`
  display: flex;
`;

const OptionItem = styled(`div`)`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 36px;
  margin-right: ${spacing.xs}px;
`;

const OptionLabel = styled(Label)`
  position: absolute;
  padding: 0;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 36px;
  color: ${colors.neutral5};

  .option-color & {
    display: none;
  }
`;

const OptionRadioInput = styled(`input`)`
  appearance: none;
  outline: none;
  position: relative;
  display: inline-block;
  width: 36px;
  height: 36px;
  margin: 0;
  padding: 0;
  border: none;
  background-color: ${colors.neutral2};
  border-radius: ${radius.large}px;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    transform-origin: 50% 50%;
    opacity: 0;
    display: inline-block;
    width: 36px;
    height: 36px;
    border: 2px solid ${colors.neutral3};
    box-shadow: inset 0 0 0 2px ${colors.white};
    border-radius: ${radius.large}px;
    transition: all 0.1s ease-in-out;
  }

  &:checked {

    &:before {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
      transition: all 0.2s ease-in-out;
    }
  }

  // Color Stripped

  [class*=optionid-Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0T3B0aW9uLzQxNzM4MjM3NzA3MDU] & {
    &.color-stripped {
      background-color: #C1C6D1;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36' fill='none'%3E%3Crect width='36' height='36' fill='%23F6F7F9'/%3E%3Crect y='5' width='36' height='2' fill='%2334353C'/%3E%3Crect y='13' width='36' height='2' fill='%2334353C'/%3E%3Crect y='21' width='36' height='2' fill='%2334353C'/%3E%3Crect y='29' width='36' height='2' fill='%2334353C'/%3E%3C/svg%3E");
    }

    &.color-light {
      background-color: #FFE398;
    }
  }
`;

const AddToCartButton = styled(Submit)`
  flex-grow: 1;
  flex-basis: 100%;

  ${mediaQuery.tabletFrom} {
    flex-basis: auto;
  }
`;

class ProductForm extends Component {
  state = {
    variant: this.props.product.variants[0].shopifyId,
    quantity: 1,
    errors: [],
    options: _.sortBy(this.props.product.options.map((options) => (
      {
        name: options.name,
        value: options.values[0]
      }
    )), ['name', 'value']),
  };

  handleChange = (setVariant) => event => {
    event.preventDefault();

    if (event.target.value) {
      const errors = this.state.errors;

      const errorIdx = errors.findIndex(
        error => error.field === event.target.name
      );

      errors.splice(errorIdx, 1);

      if (~errorIdx) {
        this.setState({ errors: errors });
      }
    }

    this.setState({ [event.target.name]: event.target.value });

    setVariant(event.target.value);
  };

  handleSubmit = callback => event => {
    event.preventDefault();

    const errors = [];

    if (this.state.quantity < 1) {
      errors.push({
        field: 'quantity',
        msg: 'Choose a <b>quantity</b> of 1 or more.'
      });
    }

    if (this.state.variant === '' || this.state.variant === '.') {
      errors.push({
        field: 'variant',
        msg: 'Please select a product option.'
      });
    }

    if (errors.length) {
      this.setState({ errors: errors });
      return;
    }

    callback(this.state.variant, this.state.quantity);
  };

  loopComparison = (options, variants) => {
    let variantItem = 0;
    for (let i = 0; _.isEqual(options, _.sortBy(variants[i].selectedOptions, ['name', 'value'])) === false; i++) {
      variantItem++;
    }
    return variantItem;
  }

  handleChange2 = (
    index,
    variants,
    callbackVariants
  ) => event => {

    if (event.target.value) {
      const errors = this.state.errors;

      const errorIdx = errors.findIndex(
        error => error.field === event.target.name
      );

      errors.splice(errorIdx, 1);

      if (~errorIdx) {
        this.setState({ errors: errors });
      }
    }

    // Update options state value

    this.state.options[index].value = event.target.value;

    // Update variant state

    this.setState({ variant: variants[this.loopComparison(this.state.options, variants)].shopifyId });

    // set variant to store context

    callbackVariants(variants[this.loopComparison(this.state.options, variants)].shopifyId);

  };

  render() {
    const {
      product,
      compactVariants
    } = this.props;

    const { errors } = this.state;

    const hasVariants = product.variants.length > 1;

    /*
     * For products without variants, we disable the whole Add to Cart button
     * and change the text. This flag prevents us from duplicating the logic in
     * multiple places.
     */
    const isOutOfStock = !hasVariants && !product.variants[0].availableForSale;

    return (
      <StoreContext.Consumer>
        {({
          addVariantToCart,
          currentVariant,
          setCurrentVariant
        }) => (
            <Form onSubmit={this.handleSubmit(addVariantToCart)} noValidate>
              <Errors show={errors.length}>
                <ErrorSign>
                  <OiIcon icon='oi-icon-error' />
                </ErrorSign>
                <ErrorMsgs>
                  {errors.map(error => (
                    <li
                      key={error.field}
                      dangerouslySetInnerHTML={{ __html: error.msg }}
                    />
                  ))}
                </ErrorMsgs>
              </Errors>

              <QtyFieldset>
                <Input
                  type='number'
                  id='quantity'
                  name='quantity'
                  min='1'
                  step='1'
                  inputmode='numeric'
                  pattern='[0-9]*'
                  onChange={this.handleChange}
                  value={this.state.quantity}
                />
              </QtyFieldset>

              {hasVariants && (
                compactVariants ? (
                  <VariantFieldset>
                    <label htmlFor='variant'>Product Options</label>
                    <Select
                      id='variant'
                      value={this.state.variant}
                      name='variant'
                      onChange={this.handleChange(setCurrentVariant)}
                    >
                      {product.variants.map(variant => (
                        <option
                          disabled={!variant.availableForSale}
                          value={variant.shopifyId}
                          key={variant.shopifyId}
                        >
                          {variant.title}
                        </option>
                      ))}
                    </Select>
                  </VariantFieldset>
                ) : (
                    <ProductOptions>
                      {product.options.map((option, idx) => (
                        <ProductOptionSelector className={`optionid-${option.shopifyId} ${`option-${option.name.toLowerCase().replace(/\s/g, '')}`}`} key={idx}>
                          <VariantFieldset>
                            <OptionSelectorTitle>{`${option.name}: `}<span>{this.state.options[idx].value}</span></OptionSelectorTitle>
                            <OptionList>
                              {option.values.map((value, index) => (
                                <OptionItem key={`${option.name}-${value}-${index}`}>
                                  <OptionRadioInput
                                    className={`${option.name.toLowerCase().replace(/\s/g, '')}-${value.toLowerCase().replace(/\s/g, '')}`}
                                    type='radio'
                                    id={`${option.name}-${value}`}
                                    name={option.name}
                                    value={value}
                                    defaultChecked={index == 0}
                                    onChange={this.handleChange2(
                                      idx,
                                      product.variants,
                                      setCurrentVariant
                                    )}
                                  /><OptionLabel htmlFor={`${option.name}-${value}`}>{`${value}`}</OptionLabel>
                                </OptionItem>
                              ))}
                            </OptionList>
                          </VariantFieldset>
                        </ProductOptionSelector>
                      )
                      )}
                    </ProductOptions>
                  )
              )
              }

              <AddToCartButton
                type="submit"
                disabled={isOutOfStock}
                fullWidth={!hasVariants}
              >
                {isOutOfStock ? 'Tạm hết hàng' : 'Chọn mua'}
              </AddToCartButton>
            </Form>
          )}
      </StoreContext.Consumer>
    );
  }
}

ProductForm.propTypes = {
  id: PropTypes.string.isRequired,
  compactVariants: PropTypes.bool,
  product: PropTypes.object.isRequired
};

export default ProductForm;
