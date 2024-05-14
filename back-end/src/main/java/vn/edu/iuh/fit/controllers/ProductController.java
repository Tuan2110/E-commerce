package vn.edu.iuh.fit.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.exceptions.ProductException;
import vn.edu.iuh.fit.models.Product;
import vn.edu.iuh.fit.requests.CreateProductRequest;
import vn.edu.iuh.fit.responses.ApiResponse;
import vn.edu.iuh.fit.services.IProductService;

import java.util.List;

@RequestMapping("${api.prefix}/products")
@RestController
@RequiredArgsConstructor
public class ProductController {
    private final IProductService productService;
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest product){
        return ResponseEntity.ok(productService.createProduct(product));
    }
    @PostMapping("/creates")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> createProducts(@RequestBody CreateProductRequest[] products){
        for (CreateProductRequest product:products){
            productService.createProduct(product);
        }
        return ResponseEntity.ok(new ApiResponse("Products created successfully",true));
    }

    @GetMapping
    public ResponseEntity<Page<Product>> findProductByCategory(
            @RequestParam String category,@RequestParam List<String> colors
            ,@RequestParam Integer minPrice,@RequestParam Integer maxPrice
            , @RequestParam String sort,@RequestParam String secondLvCategory
            ,@RequestParam String thirdLvCategory,@RequestParam Integer pageNumber
            ,@RequestParam Integer pageSize){
        Page<Product> res= productService.getAllProduct(category,colors,minPrice,maxPrice,sort,secondLvCategory,thirdLvCategory,pageNumber,pageSize);

        System.out.println("complete products");
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);

    }
    @GetMapping("/top-sale")
    public ResponseEntity<List<Product>> findTopSaleProduct(){
        List<Product> products = productService.getTopSaleProduct();
        return new ResponseEntity<>(products, HttpStatus.ACCEPTED);
    }
    @GetMapping("/id/{productId}")
    public ResponseEntity<Product> findProductById(@PathVariable Long productId) throws ProductException {

        Product product=productService.findProductById(productId);

        return new ResponseEntity<>(product,HttpStatus.ACCEPTED);
    }
}
