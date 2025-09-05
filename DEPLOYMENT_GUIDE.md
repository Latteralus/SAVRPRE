# Vercel Deployment Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Deploy to Vercel**:
```bash
vercel
```

3. **Follow the prompts** to connect your GitHub repository and configure the project.

## Step 3: Configure Environment Variables

After deployment, go to your Vercel project dashboard and configure these environment variables:

### Required Environment Variables:
- `ADMIN_PASSWORD` - Set your admin password (default: "admin123")

### Vercel Postgres (Auto-configured):
Vercel will automatically configure Postgres when you:
1. Go to your Vercel project dashboard
2. Navigate to "Storage" → "Connect Store" → "Postgres"
3. Follow the setup wizard

### Vercel Blob (Auto-configured):
Vercel Blob will be automatically configured when you:
1. Go to your Vercel project dashboard  
2. Navigate to "Storage" → "Connect Store" → "Blob"
3. Follow the setup wizard

## Step 4: Initialize Database

After deployment, initialize the database by making a POST request to:

```
POST https://your-app.vercel.app/api/init-db
```

You can use curl, Postman, or run this command:

```bash
curl -X POST https://your-app.vercel.app/api/init-db
```

## Step 5: Test the Application

1. **Visit your deployed app**: `https://your-app.vercel.app`
2. **Test admin functionality**: Click "Admin" and use the password you set
3. **Test property management**: Add, edit, and delete properties
4. **Test image uploads**: Upload property images

## Troubleshooting

### Build Issues:
If you encounter dependency issues during build, try:
```bash
npm install --legacy-peer-deps
```

### Database Connection:
- Ensure Vercel Postgres is properly connected
- Check that environment variables are set correctly

### Image Uploads:
- Verify Vercel Blob storage is connected
- Check file size limits (default: 4.5MB per file)

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `ADMIN_PASSWORD` | Password for admin access | Yes |
| `POSTGRES_URL` | Vercel Postgres connection URL | Auto |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob access token | Auto |

## Support

If you encounter issues:
1. Check the Vercel deployment logs
2. Verify all environment variables are set
3. Ensure database and blob storage are connected
4. Test API endpoints directly

## Security Notes

- Change the default admin password in production
- Consider implementing proper authentication (NextAuth.js, Auth0)
- Enable HTTPS and secure cookies
- Regularly backup your database