import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ borderBottom: '1px solid #e0e0e0' }}>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      
      <Modal.Body style={{ padding: '0' }}>
        {cartItems && cartItems.length > 0 ? (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '15px' }}>
                {/* Item Image */}
                <div style={{ marginRight: '15px', flexShrink: 0 }}>
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      border: '1px solid #eee'
                    }} 
                  />
                </div>
                
                {/* Item Details */}
                <div style={{ flexGrow: 1 }}>
                  <h6 style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{item.name}</h6>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                    Quantity: <strong>{item.quantity}</strong>
                  </p>
                </div>
                
                {/* Item Price */}
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <div style={{ padding: '30px', textAlign: 'center', color: '#666' }}>
            Your cart is empty.
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer style={{ display: 'block', borderTop: '1px solid #e0e0e0', backgroundColor: '#f8f9fa' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h5 style={{ margin: 0 }}>Total Price:</h5>
          <h3 style={{ margin: 0, color: '#2c3e50' }}>${totalPrice.toFixed(2)}</h3>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" onClick={handleClose} style={{ flexGrow: 1 }}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={handleCheckout} 
            disabled={!cartItems || cartItems.length === 0}
            style={{ flexGrow: 1 }}
          >
            Confirm Purchase
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutPopup;