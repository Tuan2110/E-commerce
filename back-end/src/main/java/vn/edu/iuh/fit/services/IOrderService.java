package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.models.Address;
import vn.edu.iuh.fit.models.Order;
import vn.edu.iuh.fit.models.OrderStatus;
import vn.edu.iuh.fit.models.User;

import java.util.List;

public interface IOrderService {
    Order createOrder(User user, Address shippingAddress);
    Order findOrderById(Long orderId);

    List<Order> findOrdersByUserId(Long id);


}
