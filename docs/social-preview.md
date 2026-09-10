# Social previews

The website serves Open Graph metadata in its initial HTML, so link preview crawlers do not need to run JavaScript. The image URL is absolute HTTPS and uses a versioned filename.

The generated cover has no component count. For the GitHub repository URL itself, download `public/assets/social-preview-v1.jpg`, open repository Settings, then Social preview → Edit → Upload an image. Website metadata does not change GitHub's repository metadata. The JPEG is under 1 MB.

After deployment, verify the page and image return HTTP 200 without authentication. A cached preview in a messaging app may not refresh immediately. Test the hosted URL in a draft or personal chat before announcing it.

References: [Open Graph](https://ogp.me/) and [GitHub social previews](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview).

## Generation

Created with the built-in image-generation tool using the approved cover as a style reference. Final image: `public/assets/social-preview-v1.jpg`. The image has no component count or version. JPEG delivery encoding preserves the generated composition.

Prompt: Create a wide 2:1 social card with the exact title "SL UI Library", elongated matte graphite Save changes and Like controls, a five-star rating slider and a toggle on a warm ivory studio surface. Preserve visible thickness, soft bevels and directional cast shadows. Keep text readable at messenger-preview size. No cursor, watermark, marketing slogan or four-square icons.

Final edit: Remove the entire subtitle "110 UI components" and restore the background. Keep the title, controls, labels, shadows, lighting and composition unchanged. Do not add any replacement subtitle, count or version.

