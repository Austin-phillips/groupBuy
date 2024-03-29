#!/bin/bash

dropdb -U node_user groupbuydb
createdb -U node_user groupbuydb

psql -U node_user groupbuydb < ./server/bin/sql/users.sql
psql -U node_user groupbuydb < ./server/bin/sql/companies.sql
psql -U node_user groupbuydb < ./server/bin/sql/products.sql
psql -U node_user groupbuydb < ./server/bin/sql/productUserRelation.sql
psql -U node_user groupbuydb < ./server/bin/sql/productCompanyRelation.sql
psql -U node_user groupbuydb < ./server/bin/sql/companyUserRelation.sql

echo "groupbuydb configured"