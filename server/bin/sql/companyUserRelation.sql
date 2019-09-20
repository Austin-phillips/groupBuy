CREATE TABLE company_user_relation(
  "curId"     SERIAL PRIMARY KEY,
  "userId"    INT,
  "companyId" INT,
  FOREIGN KEY ("userId") REFERENCES users(id),
  FOREIGN KEY ("companyId") REFERENCES companies(id)
);