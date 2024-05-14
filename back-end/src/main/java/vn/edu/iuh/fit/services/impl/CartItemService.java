package vn.edu.iuh.fit.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.exceptions.UserException;
import vn.edu.iuh.fit.models.Cart;
import vn.edu.iuh.fit.models.CartItem;
import vn.edu.iuh.fit.models.Product;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.repositories.CartItemRepository;
import vn.edu.iuh.fit.services.ICartItemService;
import vn.edu.iuh.fit.services.IUserService;

@Service
@RequiredArgsConstructor
public class CartItemService implements ICartItemService {

    private final CartItemRepository cartItemRepository;
    private final IUserService userService;

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws UserException {
        CartItem item = findCartItemById(id);
        User user = userService.findUserById(item.getUserId());
        if(user.getId().equals(userId)){
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(item.getProduct().getPrice()*item.getQuantity());
        }
        return cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {
        return cartItemRepository.isCartItemExist(cart,product,size,userId);
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws UserException {
        CartItem item = findCartItemById(cartItemId);
        User user = userService.findUserById(item.getUserId());
        if(user.getId().equals(userId)){
            cartItemRepository.delete(item);
        }else{
            throw new UserException("User not authorized to delete this item");
        }
    }

    @Override
    public CartItem findCartItemById(Long cartItemId) {
        return cartItemRepository.findById(cartItemId).orElseThrow(()->new RuntimeException("Cart item not found with id: "+cartItemId));
    }
}
