package vn.edu.iuh.fit.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import vn.edu.iuh.fit.models.ProductImage;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductRequest {
    private String title;
    private Integer price;
    private String description;
    private int quantity;
    private String brand;
    private String color;
    @JsonProperty("product_images")
    private List<ProductImage> productImages;
    private String topLevelCategory;
    private String secondLevelCategory;
    private String thirdLevelCategory;
}
