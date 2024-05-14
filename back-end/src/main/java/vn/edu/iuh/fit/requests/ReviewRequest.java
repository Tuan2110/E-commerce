package vn.edu.iuh.fit.requests;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequest {
    private String review;
    private Float rating;
}
