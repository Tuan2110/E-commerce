package vn.edu.iuh.fit.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.exceptions.UserException;
import vn.edu.iuh.fit.models.CartItem;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.responses.ApiResponse;
import vn.edu.iuh.fit.services.ICartItemService;
import vn.edu.iuh.fit.services.IUserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/cart_items")
public class CartItemController {
    private final ICartItemService cartItemService;
    private final IUserService userService;
    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long cartItemId, @RequestBody CartItem cartItem, @RequestHeader("Authorization")String jwt) throws UserException {

        User user=userService.getUserFromToken(jwt);

        CartItem updatedCartItem =cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);

        return new ResponseEntity<>(updatedCartItem, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse>deleteCartItem(@PathVariable Long cartItemId,
                                                     @RequestHeader("Authorization")String jwt)
            throws UserException {

        User user=userService.getUserFromToken(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);

        ApiResponse res=new ApiResponse("Item Remove From Cart",true);

        return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
    }
}
