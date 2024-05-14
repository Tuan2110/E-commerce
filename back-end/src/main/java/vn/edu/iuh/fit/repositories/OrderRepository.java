package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.iuh.fit.models.Order;
import vn.edu.iuh.fit.models.OrderStatus;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.user.id = ?1 ORDER BY o.orderDate DESC")
    List<Order> getOrderByUserId(Long id);
}