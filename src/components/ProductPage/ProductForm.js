import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import OiIcon from '../OiIcon';

import { Fieldset, Input, Label, Select, Submit } from '../shared/FormElements';

import { colors, spacing, radius, mediaQuery } from '../../utils/styles';

import StoreContext from '../../context/StoreContext';

const _ = require('lodash');

const Form = styled(`form`)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spacing['2xl']}px ${spacing.xl}px 0;

  ${mediaQuery.tablet} {
    padding: ${spacing['2xl']}px ${spacing.xl}px 0;
    justify-content: flex-start;
  }

  ${mediaQuery.desktop} {
    justify-content: flex-start;
  }
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
  margin-bottom: ${spacing.xl}px;

  ${Label} {
    justify-content: space-between;
  }
`;

const AddToCartButton = styled(Submit)`
  align-self: flex-end;
  flex-grow: 1;
  height: ${props => (props.fullWidth ? 'auto' : '')};
  flex-basis: 100%;

  ${mediaQuery.tabletFrom} {
    flex-basis: auto;
    width: auto;
    max-width: 240px;
  }
`;

class ProductForm extends Component {
  state = {
    variant: this.props.variants[0].shopifyId,
    quantity: 1,
    errors: [],
    options: _.sortBy(this.props.product.options.map( (options) => (
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

  handleChange2 = (index, variants, callback) => event => {
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

    // Update options state value

    this.state.options[index].value = event.target.value;

    // Update variant state

    this.setState({ variant: variants[this.loopComparison(this.state.options, variants)].shopifyId });

    // set variant to store context

    callback(variants[this.loopComparison(this.state.options, variants)].shopifyId);

  };

  render() {
    const { product, variants } = this.props;
    const { errors, options } = this.state;

    const hasVariants = variants.length > 1;

    /*
     * For products without variants, we disable the whole Add to Cart button
     * and change the text. This flag prevents us from duplicating the logic in
     * multiple places.
     */
    const isOutOfStock = !hasVariants && !variants[0].availableForSale;

    return (
      <StoreContext.Consumer>
        {({
          addVariantToCart,
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

              {/* {hasVariants && (
                <VariantFieldset>
                  <label htmlFor='variant'>Product Options</label>
                  <Select
                    id='variant'
                    value={this.state.variant}
                    name='variant'
                    onChange={this.handleChange(setCurrentVariant)}
                  >
                    {variants.map(variant => (
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
              )} */}

              { hasVariants && (
                product.options.map( (option, index) => (
                  <VariantFieldset key={index}>
                    <label htmlFor={option.id}>{option.name}</label>
                    <Select
                      id={option.id}
                      name={option.name}
                      onChange={this.handleChange2(index, variants, setCurrentVariant)}
                    >
                      {option.values.map(value => (
                        <option
                          value={value}
                          key={`${option.name}-${value}`}
                        >
                          {`${value}`}
                        </option>
                      ))}
                    </Select>
                  </VariantFieldset>
                )))
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
  variants: PropTypes.array.isRequired,
  product: PropTypes.object.isRequired
};

export default ProductForm;
