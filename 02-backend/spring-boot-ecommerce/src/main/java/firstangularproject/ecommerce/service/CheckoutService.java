package firstangularproject.ecommerce.service;

import firstangularproject.ecommerce.dto.Purchase;
import firstangularproject.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
