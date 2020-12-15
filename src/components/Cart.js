import React from "react";

import "./Cart.scss";

function Cart(props) {
  let total = 0;
  props.products.forEach((ele) => {
    total = total + ele.price * ele.count;
  });
  let cartOffertext = "You won't find it cheaper anywhere";
  return (
    <div
      style={props.toggle === true ? { display: "block" } : { display: "none" }}
      className="model"
    >
      <div className="cartContent">
        <div className="cartHead">
          <div className="cartHeadLeft">
            <span>
              <strong>{"My Cart"}</strong>
            </span>
            <span>{props.count > 0 ? " (" + props.count + " Items)" : ""}</span>
          </div>
          <div className="cartHeadRight" onClick={props.cartClose}>
            <i className="fa fa-times" />
          </div>
        </div>

        {props.products.length > 0 ? (
          <div className="cartItems">
            {props.products.map((item, index) => {
              return (
                <div className="cartItem" key={index}>
                  <img src={item.imageURL} alt={item.name} height="75px" />
                  <div className="itemDetails">
                    <div className="itemName">
                      <strong>{item.name}</strong>
                    </div>
                    <div className="quantity">
                      <div className="btnsHolder">
                        <div
                          className="btnCnt"
                          onClick={props.click.bind(this, -1, item)}
                        >
                          <span className="btns">{"-"}</span>
                        </div>
                        <span className="itemCount">{item.count}</span>
                        <div
                          className="btnCnt"
                          onClick={props.click.bind(this, +1, item)}
                        >
                          <span className="btns">{"+"}</span>
                        </div>
                        <div className="itemPrice">
                          <span>X</span>
                          <span>{item.price}</span>
                        </div>
                      </div>
                      <div className="itemTotal">
                        {"Rs." + item.count * item.price}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <>
              {props.products.length > 0 ? (
                <div className="cartOffer">
                  <img
                    src="/static/images/lowest-price.png"
                    alt="Lowest Price Offer"
                  />
                  <span>{cartOffertext}</span>
                </div>
              ) : (
                ""
              )}
            </>
          </div>
        ) : (
          <div className="noItem">
            <div className="noItemdes">
              <strong>No items in your cart</strong>
            </div>
            <div className="noItemsMess">
              Your favorite items are just a click away
            </div>
          </div>
        )}
        <div className="cartFooter">
          {props.products.length > 0 ? (
            <div className="checkOut">
              <div className="promo">
                Promo code can be applied on payment page
              </div>
              <button onClick={props.cartClose}>
                <span>Proceed to CheckOut</span>
                <span>
                  {"Rs." + total}
                  <span className="fa fa-angle-right"></span>
                </span>
              </button>
            </div>
          ) : (
            <div className="startShopping">
              <button onClick={props.cartClose}>Start Shopping</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
