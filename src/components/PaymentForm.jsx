import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createPayment } from '../services/paymentService';
import './PaymentForm.css';

export default function PaymentForm({ jobId, amount, onSuccess, onCancel }) {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would integrate with a payment gateway
      // For now, we'll just simulate the payment process
      const paymentData = {
        companyId: user._id,
        jobId,
        amount,
        paymentMethod,
        cardNumber: paymentMethod === 'card' ? cardNumber : null,
        expiryDate: paymentMethod === 'card' ? expiryDate : null,
        cvv: paymentMethod === 'card' ? cvv : null
      };
      
      // Submit payment
      await createPayment(paymentData);
      
      // Call success callback
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container">
      <h2>Payment Details</h2>
      <p>Amount: Rs. {amount}</p>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label>Payment Method</label>
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit/Debit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Bank Transfer
            </label>
          </div>
        </div>
        
        {paymentMethod === 'card' && (
          <>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </>
        )}
        
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </form>
    </div>
  );
}