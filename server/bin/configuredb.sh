#!/bin/bash

dropdb -U node_user groupbuydb
createdb -U node_user groupbuydb

psql -U node_user groupbuydb < ./server/bin/sql/users.sql
psql -U node_user groupbuydb < ./server/bin/sql/companies.sql
psql -U node_user groupbuydb < ./server/bin/sql/products.sql

echo "groupbuydb configured"