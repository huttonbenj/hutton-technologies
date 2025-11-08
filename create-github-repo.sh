#!/bin/bash
echo "Creating GitHub repository..."
curl -X POST https://api.github.com/user/repos \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer \${GITHUB_TOKEN}" \
  -d '{
    "name": "hutton-technologies",
    "description": "Cyberpunk-themed website for Hutton Technologies",
    "private": false,
    "auto_init": false
  }'
