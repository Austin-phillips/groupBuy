#!/bin/bash

dropdb -U node_user groupbuydb
createdb -U node_user groupbuydb

psql -U node_user groupbuydb < ./server/bin/sql/users.sql

echo "groupbuydb configured"