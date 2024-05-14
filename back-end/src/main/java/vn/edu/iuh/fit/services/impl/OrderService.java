package vn.edu.iuh.fit.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.models.*;
import vn.edu.iuh.fit.repositories.*;
import vn.edu.iuh.fit.services.ICartService;
import vn.edu.iuh.fit.services.IOrderService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class OrderService implements IOrderService {
    private final ICartService cartService;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;

    @Override
    public Order createOrder(User user, Address shippingAddress) {
        shippingAddress.setUser(user);
        if(shippingAddress.getId()==null){
            Address savedAddress = addressRepository.save(shippingAddress);
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }
        Cart cart = cartService.findCartByUserId(user.getId());
        List<OrderItem> orderItems = new ArrayList<>();
        for(CartItem item : cart.getCartItems()){
            OrderItem orderItem = new OrderItem();
            orderItem.setPrice(item.getPrice());
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setSize(item.getSize());
            orderItem.setUserId(item.getUserId());

            OrderItem createdOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(createdOrderItem);

//            cartItemRepository.deleteById(item.getId());
//            cart.getCartItems().remove(item);
//            cartRepository.save(cart);
        }
        cart.getCartItems().clear();
        cartRepository.save(cart);
        Order order = new Order();
        order.setOrderId(UUID.randomUUID().toString());
        order.setOrderItems(orderItems);
        order.setUser(user);
        order.setShippingAddress(shippingAddress);
        order.setTotalPrice(cart.getTotalPrice());
        order.setTotalItem(cart.getTotalItem());
        order.setOrderStatus(OrderStatus.PENDING);
        order.setOrderDate(LocalDateTime.now());

        Order savedOrder = orderRepository.save(order);
        for(OrderItem item : orderItems){
            item.setOrder(savedOrder);
            orderItemRepository.save(item);
        }
        return savedOrder;
    }

    @Override
    public Order findOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public List<Order> findOrdersByUserId(Long id) {
        return orderRepository.getOrderByUserId(id);
    }

}
