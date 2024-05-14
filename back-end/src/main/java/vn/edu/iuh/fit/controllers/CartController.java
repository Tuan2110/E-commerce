package vn.edu.iuh.fit.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.exceptions.ProductException;
import vn.edu.iuh.fit.exceptions.UserException;
import vn.edu.iuh.fit.models.Cart;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.requests.AddItemRequest;
import vn.edu.iuh.fit.responses.ApiResponse;
import vn.edu.iuh.fit.services.ICartService;
import vn.edu.iuh.fit.services.IUserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/carts")
public class CartController {
    private final ICartService cartService;
    private final IUserService userService;

    @GetMapping
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String token) throws UserException {
        User user = userService.getUserFromToken(token);
        Cart cart = cartService.findCartByUserId(user.getId());
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest item, @RequestHeader("Authorization") String token) throws ProductException {
        User user = userService.getUserFromToken(token);
        cartService.addCartItem(user.getId(), item);
        return ResponseEntity.ok(new ApiResponse("Item Added To Cart Successfully", true));
    }
}
