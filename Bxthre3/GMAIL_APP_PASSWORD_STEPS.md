# Gmail App Password Setup Steps

## Overview
To enable Gmail integration with Zo, you need to set up a Google App Password. This is a 16-character password that allows third-party apps to access your Google account securely.

## Steps to Generate App Password

### 1. Enable 2-Step Verification
- Go to https://myaccount.google.com/signinoptions/two-step-verification
- Sign in to your Google account
- Follow the prompts to enable 2-Step Verification (if not already enabled)

### 2. Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Sign in if prompted
3. In the "Select app" dropdown, choose "Mail"
4. In the "Select device" dropdown, choose "Other (Custom name)" and enter "Zo Computer"
5. Click "Generate"
6. Copy the 16-character password shown

### 3. Add to Zo Secrets
1. Go to [Settings > Advanced > Secrets](/?t=settings&s=advanced)
2. Add a new secret:
   - **Name:** `GMAIL_APP_PASSWORD`
   - **Value:** Paste the 16-character password from Step 2
3. Click "Save"

### 4. Verify Setup
After adding the secret, reply "gmail done" in chat to disable the reminder.

## Troubleshooting
- **"Invalid password" error:** Make sure you generated a new App Password, not your regular Gmail password
- **2-Step not available:** You must have 2-Step Verification enabled on your Google account first
- **App Passwords not showing:** This feature requires a personal Google account (not Google Workspace/Google for Business)
