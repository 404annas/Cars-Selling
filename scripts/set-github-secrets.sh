#!/usr/bin/env bash

set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: GitHub CLI (gh) is not installed."
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Error: gh is not authenticated. Run: gh auth login"
  exit 1
fi

SECRETS=(
  "SESSION_SECRET"
  "CLOUDINARY_CLOUD_NAME"
  "CLOUDINARY_API_KEY"
  "CLOUDINARY_API_SECRET"
  "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"
  "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET"
)

echo "Setting GitHub repository secrets..."
echo "Repo: $(gh repo view --json nameWithOwner -q .nameWithOwner)"
echo

for SECRET_NAME in "${SECRETS[@]}"; do
  echo -n "Enter value for ${SECRET_NAME}: "
  read -r -s SECRET_VALUE
  echo

  if [[ -z "${SECRET_VALUE}" ]]; then
    echo "Skipped ${SECRET_NAME} (empty value)."
    continue
  fi

  gh secret set "${SECRET_NAME}" --body "${SECRET_VALUE}"
  echo "Set ${SECRET_NAME}"
done

echo
echo "Done. Current secrets:"
gh secret list
