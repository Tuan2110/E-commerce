package vn.edu.iuh.fit.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.models.Address;
import vn.edu.iuh.fit.models.Order;
import vn.edu.iuh.fit.models.OrderStatus;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.services.IOrderService;
import vn.edu.iuh.fit.services.IUserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/orders")
public class OrderController {
    private final IOrderService orderService;
    private final IUserService userService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Address shippingAddress,
                                             @RequestHeader("Authorization") String jwt) {
        User user = userService.getUserFromToken(jwt);
        Order order = orderService.createOrder(user, shippingAddress);
        return ResponseEntity.ok(order);
    }
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(@RequestHeader("Authorization") String jwt) {
        User user = userService.getUserFromToken(jwt);
        List<Order> orders = orderService.findOrdersByUserId(user.getId());
        return ResponseEntity.ok(orders);
    }


    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        Order order = orderService.findOrderById(orderId);
        return ResponseEntity.ok(order);
    }


}
