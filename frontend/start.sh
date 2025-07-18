#!/bin/bash

# 设置主目录权限
chmod 0701 ~

# 设置 public_html 目录及其子目录权限
chmod 0701 ~/public_html
chmod 0701 ~/public_html/privacyeducation

# 设置 html/js/css 文件权限
find ~/public_html/privacyeducation -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" \) -exec chmod 0604 {} \;

# 设置所有子目录权限
find ~/public_html/privacyeducation -type d -exec chmod 0701 {} \;

# 设置 .htaccess 权限
chmod 0604 ~/public_html/.htaccess

# 设置 cgi-bin 权限
chmod 0701 ~/public_html/cgi-bin
chmod 0700 ~/public_html/cgi-bin/php-cgi

echo "✅ Permissions fixed!"