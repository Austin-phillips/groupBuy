CREATE TABLE product_company_relation(
  product_id    INT,
  company_id    INT,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (company_id) REFERENCES companies("companyId")
);

INSERT INTO product_company_relation(product_id, company_id)
VALUES
(1,1),
(2,1),
(4,1);