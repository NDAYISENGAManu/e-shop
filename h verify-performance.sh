 schema |     table      |               index                
--------+----------------+------------------------------------
 public | cart_items     | idx_cart_items_cart_id
 public | cart_items     | idx_cart_items_product_id
 public | carts          | idx_carts_user_id
 public | order_items    | idx_order_items_order_id
 public | order_items    | idx_order_items_product_id
 public | orders         | idx_orders_created_at
 public | orders         | idx_orders_status
 public | orders         | idx_orders_user_id
 public | product_colors | idx_product_colors_product_id
 public | product_images | idx_product_images_is_primary
 public | product_images | idx_product_images_product_id
 public | product_images | idx_product_images_product_primary
 public | products       | idx_products_category
 public | products       | idx_products_company
 public | products       | idx_products_created_at
 public | products       | idx_products_featured
 public | products       | idx_products_price
 public | users          | idx_users_email
 public | users          | idx_users_role
(19 rows)

