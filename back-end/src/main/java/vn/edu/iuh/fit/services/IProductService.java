package vn.edu.iuh.fit.services;

import org.springframework.data.domain.Page;
import vn.edu.iuh.fit.exceptions.ProductException;
import vn.edu.iuh.fit.models.Product;
import vn.edu.iuh.fit.models.Review;
import vn.edu.iuh.fit.requests.CreateProductRequest;

import java.util.List;

public interface IProductService {
    Product createProduct(CreateProductRequest request);

    Page<Product> getAllProduct(String category, List<String> colors, Integer minPrice, Integer maxPrice,String sort, String secondLvCategory, String thirdLvCategory, Integer pageNumber, Integer pageSize);

    Product findProductById(Long productId) throws ProductException;

    List<Product> getTopSaleProduct();
}
