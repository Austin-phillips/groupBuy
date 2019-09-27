CREATE TABLE product_user_relation(
  "purId" SERIAL   PRIMARY KEY,
  "productId" INT,
  "userId"    INT,
  "billed"    BOOLEAN,
  FOREIGN KEY ("productId") REFERENCES products(id),
  FOREIGN KEY ("userId") REFERENCES users(id)
);