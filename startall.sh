#!/bin/bash

cd auth/auth-backend && php -S localhost:8001 -t public &
cd auth/auth-frontend && npm start  &

cd dashboard/dashboardfrontend && npm start  &

cd courses/courses-backend && php -S localhost:8002 -t public &
cd courses/courses-frontend && npm start &

cd registerstudent/registerstudent-backend && php -S localhost:8003 -t public &
cd registerstudent/registerstudent-frontend && npm start  &

cd tables/grouptables-backend && php -S localhost:8004 -t public &
cd tables/assigntogroups-frontend && npm start  &