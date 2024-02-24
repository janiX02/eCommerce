package firstangularproject.ecommerce.dto;

import firstangularproject.ecommerce.entity.Address;
import firstangularproject.ecommerce.entity.Customer;
import firstangularproject.ecommerce.entity.Order;
import firstangularproject.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
