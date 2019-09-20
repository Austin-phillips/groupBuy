CREATE TABLE product_company_relation(
  "productId"    INT,
  "companyId"    INT,
  FOREIGN KEY ("productId") REFERENCES products(id),
  FOREIGN KEY ("companyId") REFERENCES companies(id)
);