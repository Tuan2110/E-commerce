package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.iuh.fit.models.Product;
import vn.edu.iuh.fit.models.Review;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE (p.category.name = :thirdLvCategory or :thirdLvCategory = '')" +
            "and (p.category.parentCategory.name = :secondLvCategory or :secondLvCategory = '')" +
            "and (p.category.parentCategory.parentCategory.name = :category or :category = '')"+
            "and ((:minPrice is null and :maxPrice is null)" +
            "or(p.price BETWEEN :minPrice and :maxPrice))"+
            "order by " +
            "case when :sort = 'price_low' then p.price end ASC," +
            "case when :sort = 'price_high' then p.price end DESC")
    List<Product> filterProducts(String category, String secondLvCategory, String thirdLvCategory, Integer minPrice, Integer maxPrice, String sort);

    @Query("SELECT p FROM Product p join OrderItem od on p.id = od.product.id group by p.id order by sum(od.quantity) DESC limit 5")
    List<Product> getTopSaleProduct();
}
