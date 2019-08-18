CREATE TABLE product_user_relation(
  "productId" INT,
  "userId"    INT,
  FOREIGN KEY ("productId") REFERENCES products(id),
  FOREIGN KEY ("userId") REFERENCES users(id)
);