import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import {
  MdErrorOutline,
  MdShoppingCart,
  MdSentimentDissatisfied
} from 'react-icons/md';

import { Fieldset, Input, Label, Select, Submit } from '../shared/FormElements';

import { colors, spacing, radius, mediaQuery } from '../../utils/styles';

import StoreContext from '../../context/StoreContext';

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
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: row;
  margin-bottom: ${spacing.xs}px;
  width: 100%;
`;

const ErrorSign = styled(`div`)`
  align-items: center;
  background: ${colors.error};
  border-radius: ${radius.default}px 0 0 ${radius.default}px;
  color: ${colors.white};
  display: flex;
  flex-basis: 40px;
  justify-content: center;

  svg {
    height: 20px;
    width: 20px;
  }
`;

const ErrorMsgs = styled(`ul`)`
  border: 1px dashed ${colors.error};
  border-left: none;
  border-radius: 0 ${radius.default}px ${radius.default}px 0;
  color: ${colors.error};
  flex-grow: 1;
  margin: 0;
  padding: ${spacing.xs}px;
  padding-left: ${spacing.xl}px;
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
  margin-bottom: ${spacing.md}px;

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
    variant:
      this.props.variants.length === 1 ? this.props.variants[0].shopifyId : '',
    quantity: 1,
    errors: []
  };

  handleChange = event => {
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

  render() {
    const { variants } = this.props;
    const { errors } = this.state;

    const hasVariants = variants.length > 1;

    /*
     * For products without variants, we disable the whole Add to Cart button
     * and change the text. This flag prevents us from duplicating the logic in
     * multiple places.
     */
    const isOutOfStock = !hasVariants && !variants[0].availableForSale;

    return (
      <StoreContext.Consumer>
        {({ addVariantToCart }) => (
          <Form onSubmit={this.handleSubmit(addVariantToCart)} noValidate>
            <Errors show={errors.length}>
              <ErrorSign>
                <MdErrorOutline />
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
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                step="1"
                onChange={this.handleChange}
                value={this.state.quantity}
              />
            </QtyFieldset>
            {hasVariants && (
              <VariantFieldset>
                <Select
                  id="variant"
                  value={this.state.variant}
                  name="variant"
                  onChange={this.handleChange}
                >
                  <option disabled value="">
                    Options...
                  </option>
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
            )}
            <AddToCartButton
              type="submit"
              disabled={isOutOfStock}
              fullWidth={!hasVariants}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </AddToCartButton>
          </Form>
        )}
      </StoreContext.Consumer>
    );
  }
}

ProductForm.propTypes = {
  id: PropTypes.string.isRequired,
  variants: PropTypes.array.isRequired
};

export default ProductForm;
