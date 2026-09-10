# Media provenance

## Cursor-free studio film

- `studio-motion.png`: first frame of the live CSS 3D presentation.
- `studio-motion.webm`: VP9 version of the 1280 × 800, seven-second film at 60 fps.
- `studio-motion.mp4`: H.264, 420 browser-rendered frames at 60 fps. JavaScript timers and animation timelines are stepped for frame-accurate rendering; this is not frame interpolation of a 25 fps recording.
- `studio-motion.gif`: 960px-wide, 50 fps inline README version.

The scene in `public/studio-motion.html` mounts real library components and their controllers. Concurrent local button clicks and input events drive Save, Like, Appearance, fractional Rating and Navigation. No cursor is shown. A presentation-only layer supplies elongated graphite housings, thicker rims, directional cast shadows and raised button/slider styling. The film is a designed 3D presentation, not a claim that every exported control has a 3D housing.

The rating moves continuously in the film, without tenth-step position quantization; only its numeric label is rounded. Its shorter travel uses a gentle reversal. The interactive showcase and exported rating behavior remain unchanged. Ordinary embedded library previews are tested separately from this film.

## Generated studio photography

`cover.png`, `collection.png` and `studio.png` were created with the built-in image-generation tool. The first and last preserve the approved studio compositions. The collection image has large category labels and counts, is centered at 240px wide in the README, and has descriptive alternative text. The duplicate visual table is removed.

Prompt specifications and reference roles are in `prompts.md`. Photographic materials, lighting and depth are promotional styling, not screenshots. No external stock photographs or icon packs are used.

## Earlier local review captures

The superseded flat showcase captures and cursor recording are kept in a personal local review archive, outside the publishable repository. They are not used in the current README. The `navigation.png` and `overlays.png` category images support the plugin listing.

## GitHub playback

The README embeds the GIF and links to committed MP4/WebM files. The local GitHub preview has a native video player; GitHub Markdown does not reproduce arbitrary HTML video players. No anonymous attachments or third-party media hosts are used. See [GitHub attachment documentation](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/attaching-files).
