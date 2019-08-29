CREATE TABLE products(
  id SERIAL      PRIMARY KEY,
  name           VARCHAR(50),
  "companyName"  VARCHAR(50),
  description    VARCHAR(200),
  price          INT,
  "personLimit"  INT,
  timer          INT,
  "timeStamp"    Date DEFAULT '28 Aug 2019 00:12:00 GMT',
  count          INT,
  category       VARCHAR(50),
  sold           BOOLEAN DEFAULT false,
  "tierOne"      FLOAT DEFAULT .95,
  "tierTwo"      FLOAT DEFAULT .90,
  "tierThree"    FLOAT DEFAULT .85,
  image1         VARCHAR(200) DEFAULT 'https://assets.pcmag.com/media/images/618865-iphone-xs-max.jpg?thumb=y&width=810&height=456',
  image2         VARCHAR(200) DEFAULT NULL,
  image3         VARCHAR(200) DEFAULT NULL,
  image4         VARCHAR(200) DEFAULT NULL,
  image5         VARCHAR(200) DEFAULT NULL
);

INSERT INTO products(name, "companyName", price, "personLimit", timer, count, category, sold, "tierOne", "tierTwo", "tierThree")
VALUES
('watch', 'Apple', 200, 10, 4, 10, 'electronics', true, .95, .90, .85),
('purse', 'Gucci', 350, 20, 2, 3, 'accessories', false, .95, .90, .85),
('baseball Bat', 'Louisville', 100, 15, 5, 14, 'sports', false, .95, .90, .85),
('Smart Sock', 'Owlet', 300, 10, 1, 0, 'electronics', true, .95, .90, .85),
('watch', 'Arvo', 200, 10, 4, 2, 'electronics', true, .95, .90, .85),
('purse', 'Louis Vutton', 350, 20, 3, 3, 'accessories', false, .95, .90, .85),
('baseball Bat', 'Marucci', 100, 15, 3, 1, 'sports', false, .95, .90, .85),
('iPhone 69', 'Apple', 300, 10, 5, 0, 'electronics', true, .95, .90, .85),
('Hydro Flask', 'Hydro Flask', 200, 10, 5, 2, 'electronics', true, .95, .90, .85);