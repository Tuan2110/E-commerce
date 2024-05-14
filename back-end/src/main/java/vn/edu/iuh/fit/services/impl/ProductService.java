package vn.edu.iuh.fit.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.exceptions.ProductException;
import vn.edu.iuh.fit.models.Category;
import vn.edu.iuh.fit.models.Product;
import vn.edu.iuh.fit.models.ProductImage;
import vn.edu.iuh.fit.models.Review;
import vn.edu.iuh.fit.repositories.CategoryRepository;
import vn.edu.iuh.fit.repositories.ProductRepository;
import vn.edu.iuh.fit.requests.CreateProductRequest;
import vn.edu.iuh.fit.services.IProductService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public Product createProduct(CreateProductRequest request) {
        Category topLevel = categoryRepository.findByName(request.getTopLevelCategory());
        if(topLevel == null){
            Category topCategory = new Category();
            topCategory.setName(request.getTopLevelCategory());
            topCategory.setLevel(1);
            topLevel = categoryRepository.save(topCategory);
        }
        Category secondLevel=categoryRepository.
                findByNameAndParent(request.getSecondLevelCategory(),topLevel.getName());
        if(secondLevel==null) {
            Category secondLavelCategory=new Category();
            secondLavelCategory.setName(request.getSecondLevelCategory());
            secondLavelCategory.setParentCategory(topLevel);
            secondLavelCategory.setLevel(2);
            secondLevel= categoryRepository.save(secondLavelCategory);
        }
        Category thirdLevel=categoryRepository.findByNameAndParent(request.getThirdLevelCategory(),secondLevel.getName());
        if(thirdLevel==null) {

            Category thirdLavelCategory=new Category();
            thirdLavelCategory.setName(request.getThirdLevelCategory());
            thirdLavelCategory.setParentCategory(secondLevel);
            thirdLavelCategory.setLevel(3);

            thirdLevel=categoryRepository.save(thirdLavelCategory);
        }


        Product product=new Product();
        product.setTitle(request.getTitle());
        product.setPrice(request.getPrice());
        product.setThumbnail(request.getProductImages().get(0).getImageUrl());
        product.setDescription(request.getDescription());
        product.setQuantity(request.getQuantity());
        product.setBrand(request.getBrand());
        product.setColor(request.getColor());
        product.setProductImages(request.getProductImages());
        product.setCategory(thirdLevel);
        product.setCreatedAt(LocalDateTime.now());
        for (ProductImage productImage : request.getProductImages()) {
            productImage.setProduct(product);
        }
        Product savedProduct= productRepository.save(product);

        System.out.println("products - "+product);

        return savedProduct;
    }

    @Override
    public Page<Product> getAllProduct(String category, List<String> colors, Integer minPrice, Integer maxPrice, String sort, String secondLvCategory, String thirdLvCategory, Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        List<Product> products = productRepository.filterProducts(category,secondLvCategory,thirdLvCategory,minPrice,maxPrice,sort);
        if(!colors.isEmpty()){
            products = products.stream().filter(p->colors.stream().anyMatch((c->c.equalsIgnoreCase(p.getColor())))).toList();
        }
        int startIndex = (int)pageable.getOffset();
        int endIndex = Math.min((startIndex+pageable.getPageSize()),products.size());
        List<Product> pageContent = products.subList(startIndex,endIndex);

        return new PageImpl<>(pageContent,pageable,products.size());
    }

    @Override
    public Product findProductById(Long productId) throws ProductException {
        return productRepository.findById(productId).orElseThrow(()
                ->new ProductException("Product not found with id "+productId));
    }

    @Override
    public List<Product> getTopSaleProduct() {
        return productRepository.getTopSaleProduct();
    }

}
