package vn.edu.iuh.fit.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.models.OrderItem;
import vn.edu.iuh.fit.repositories.OrderItemRepository;
import vn.edu.iuh.fit.services.IOrderItemService;

@RequiredArgsConstructor
@Service
public class OrderItemService implements IOrderItemService {

    private final OrderItemRepository orderItemRepository;

    @Override
    public void reviewOrderItem(Long orderItemId) {
        OrderItem orderItem = orderItemRepository.findById(orderItemId).orElseThrow( () -> new RuntimeException("Order Item not found with id: "+orderItemId));
        orderItem.setReviewed(true);
        orderItemRepository.save(orderItem);
    }
}
