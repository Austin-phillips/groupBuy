CREATE TABLE products(
  id SERIAL      PRIMARY KEY,
  name           VARCHAR(50),
  description    VARCHAR(200),
  price          INT,
  "personLimit"  INT,
  timer          INT,
  count          INT,
  category       VARCHAR(50),
  sold           BOOLEAN DEFAULT false,
  "tierOne"      FLOAT DEFAULT .95,
  "tierTwo"      FLOAT DEFAULT .90,
  "tierThree"    FLOAT DEFAULT .85
);

INSERT INTO products(name, price, "personLimit", timer, count, category, sold, "tierOne", "tierTwo", "tierThree")
VALUES
('watch', 200, 10, 4, 10, 'electronics', true, .95, .90, .85),
('purse', 350, 20, 2, 3, 'accessories', false, .95, .90, .85),
('baseball bat', 100, 15, 5, 14, 'sports', false, .95, .90, .85),
('Owlet Sock', 300, 10, 1, 0, 'electronics', true, .95, .90, .85),
('watch', 200, 10, 4, 2, 'electronics', true, .95, .90, .85),
('purse', 350, 20, 3, 3, 'accessories', false, .95, .90, .85),
('baseball bat', 100, 15, 3, 1, 'sports', false, .95, .90, .85),
('Owlet Sock', 300, 10, 5, 0, 'electronics', true, .95, .90, .85),
('watch', 200, 10, 5, 2, 'electronics', true, .95, .90, .85),
('purse', 350, 20, 4, 3, 'accessories', false, .95, .90, .85),
('baseball bat', 100, 15, 2, 1, 'sports', false, .95, .90, .85),
('Owlet Sock', 300, 10, 1, 0, 'electronics', true, .95, .90, .85);