#!/usr/bin/env sh

ng deploy --base-href=/homeschool/

sudo git add .
sudo git commit -m "update"
sudo git push --all
