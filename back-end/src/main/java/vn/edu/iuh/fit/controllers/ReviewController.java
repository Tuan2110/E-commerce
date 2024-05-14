package vn.edu.iuh.fit.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.exceptions.ProductException;
import vn.edu.iuh.fit.models.Review;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.requests.ReviewRequest;
import vn.edu.iuh.fit.services.IReviewService;
import vn.edu.iuh.fit.services.IUserService;

import java.util.List;

@RequestMapping("${api.prefix}/reviews")
@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final IReviewService reviewService;
    private final IUserService userService;
    @PostMapping("/create/{productId}/item/{itemId}")
    public ResponseEntity<Review> createReview(@RequestHeader("Authorization") String token,
                                               @RequestBody ReviewRequest review,
                                               @PathVariable Long productId,
                                               @PathVariable Long itemId) throws ProductException {
        User user = userService.getUserFromToken(token);
        Review newReview = reviewService.createReview(user,review, productId,itemId);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProduct(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getReviewsByProduct(productId);
        return new ResponseEntity<>(reviews, HttpStatus.ACCEPTED);
    }
}
