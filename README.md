# Baseball Scoreboard

A tiny offline-friendly baseball scoreboard for phone use.

It tracks:

- Inning
- Top / Bottom
- Away score
- Home score
- Balls
- Strikes
- Outs

## Controls

- Use the up and down arrows to change numbers.
- `New batter` resets balls and strikes.
- `Add out` resets balls and strikes, then adds one out.
- After three outs, the app automatically moves to the next half inning.
- `Reset` starts a new game.

## Offline use

This is a small Progressive Web App. After it is loaded once on your phone, it can be added to your home screen and used like a simple app.

On iPhone:

1. Open the live app link in Safari.
2. Tap the Share button.
3. Tap `Add to Home Screen`.
4. Open it from the home screen at the field.

## Deploy with GitHub Pages

This repo is plain HTML, CSS, and JavaScript. No build step is required.

1. Create a new GitHub repository.
2. Upload these files to the repository.
3. Go to `Settings` → `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Choose the `main` branch and `/root` folder.
6. Save.

Your app will be available at the GitHub Pages URL after it publishes.

## Files

```txt
index.html
style.css
app.js
manifest.webmanifest
service-worker.js
icons/
README.md
```
