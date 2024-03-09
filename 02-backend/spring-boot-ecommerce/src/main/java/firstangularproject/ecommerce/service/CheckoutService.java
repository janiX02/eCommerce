package firstangularproject.ecommerce.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import firstangularproject.ecommerce.dto.PaymentInfo;
import firstangularproject.ecommerce.dto.Purchase;
import firstangularproject.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
