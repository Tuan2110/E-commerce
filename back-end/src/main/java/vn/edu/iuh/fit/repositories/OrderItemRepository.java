package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.models.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
