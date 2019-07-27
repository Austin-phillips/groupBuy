CREATE TABLE products(
  id SERIAL      PRIMARY KEY,
  name           VARCHAR(50),
  description    VARCHAR(200),
  link           VARCHAR(200),
  price          INT,
  "personLimit"          INT,
  timer          VARCHAR(50),
  category       VARCHAR(50),
  "companyId"    INT,
  sold           BOOLEAN DEFAULT false
);

INSERT INTO products(name, link, price, "personLimit", timer, category, "companyId", sold)
VALUES
('watch', 'https://watches.com', 200, 10, '5 days', 'electronics', 2, true),
('purse', 'https://purses.com', 350, 20, '5 days', 'accessories', 4, false),
('baseball bat', 'https://baseball.com', 100, 15, '4 days', 'sports', 3, false),
('Owlet Sock', 'https://owlet.com', 300, 10, '3 days', 'electronics', 1, true);