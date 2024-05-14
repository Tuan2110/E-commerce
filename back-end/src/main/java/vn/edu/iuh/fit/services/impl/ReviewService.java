package vn.edu.iuh.fit.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.exceptions.ProductException;
import vn.edu.iuh.fit.models.Product;
import vn.edu.iuh.fit.models.Review;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.repositories.ReviewRepository;
import vn.edu.iuh.fit.requests.ReviewRequest;
import vn.edu.iuh.fit.services.IOrderItemService;
import vn.edu.iuh.fit.services.IProductService;
import vn.edu.iuh.fit.services.IReviewService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {

    private final ReviewRepository reviewRepository;
    private final IProductService productService;
    private final IOrderItemService orderItemService;

    @Override
    public List<Review> getReviewsByProduct(Long productId) {
        return reviewRepository.findReviewsByProductId(productId);
    }

    @Override
    public Review createReview(User user, ReviewRequest review, Long productId, Long itemId) throws ProductException {
        orderItemService.reviewOrderItem(itemId);
        Product product = productService.findProductById(productId);
        Review newReview = new Review();
        newReview.setUser(user);
        newReview.setReview(review.getReview());
        newReview.setRating(review.getRating());
        newReview.setProduct(product);
        newReview.setCreatedAt(LocalDateTime.now());
        return reviewRepository.save(newReview);
    }
}
