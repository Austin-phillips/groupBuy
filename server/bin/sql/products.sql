CREATE TABLE products(
  id SERIAL      PRIMARY KEY,
  name           VARCHAR(50),
  description    VARCHAR(200),
  link           VARCHAR(200),
  price          INT,
  "personLimit"  INT,
  timer          VARCHAR(50),
  count          INT,
  category       VARCHAR(50),
  sold           BOOLEAN DEFAULT false
);

INSERT INTO products(name, link, price, "personLimit", timer, count, category, sold)
VALUES
('watch', 'https://watches.com', 200, 10, '5 days', 10, 'electronics', true),
('purse', 'https://purses.com', 350, 20, '5 days', 3, 'accessories', false),
('baseball bat', 'https://baseball.com', 100, 15, '4 days', 14, 'sports', false),
('Owlet Sock', 'https://owlet.com', 300, 10, '3 days', 0, 'electronics', true),
('watch', 'https://watches.com', 200, 10, '5 days', 2, 'electronics', true),
('purse', 'https://purses.com', 350, 20, '5 days', 3, 'accessories', false),
('baseball bat', 'https://baseball.com', 100, 15, '4 days', 1, 'sports', false),
('Owlet Sock', 'https://owlet.com', 300, 10, '3 days', 0, 'electronics', true),
('watch', 'https://watches.com', 200, 10, '5 days', 2, 'electronics', true),
('purse', 'https://purses.com', 350, 20, '5 days', 3, 'accessories', false),
('baseball bat', 'https://baseball.com', 100, 15, '4 days', 1, 'sports', false),
('Owlet Sock', 'https://owlet.com', 300, 10, '3 days', 0, 'electronics', true);