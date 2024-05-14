package vn.edu.iuh.fit.requests;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddItemRequest {
    private Long productId;
    private String size;
}
