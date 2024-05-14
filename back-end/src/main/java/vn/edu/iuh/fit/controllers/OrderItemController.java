package vn.edu.iuh.fit.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.services.IOrderItemService;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/order-items")
public class OrderItemController {
    private final IOrderItemService orderItemService;
}
