#!/usr/bin/env sh

ng deploy --base-href=/homeschool/

sudo git pull
sudo git add .
echo commit message
read varname
sudo git commit -m "$varname"
sudo git push --all
