---
title: MapKeep 1.2
description: Behind the scenes of MapKeep version 1.2. 
date: 2024-05-13
---

Yesterday I launched version 1.2 of [MapKeep](https://apps.apple.com/us/app/mapkeep/id6467408833) — an iPhone and Apple Watch app that lets you capture your current location in one tap — with a few useful features.

## New Features
Since adding the “long press to add” feature in version 1.1 I’ve wanted a **satellite view** of the map to give a better sense of where to place the pin. In 1.2 you can now switch to satellite view using the map style button.

After using the app for 6 months, my map was super cluttered with all the pins I’ve saved. (Especially on Apple Watch!) This update adds **date filters**. Just look for the calendar button on the map.

Neither feature are fully baked — the date options aren’t ideal and your options don’t persist between sessions — but I had a specific timeline[^1] in mind to get this update out the door.

## Other Enhancements
I wanted to improve how the app works when the user hasn’t granted location access. Previously the map was completely blocked if location access was denied. This didn’t sit right with me for a few reasons:
- With 1.1’s “long press to add” you don’t _technically_ need location permission to use the app.
- If you created pins _then_ denied location access, it was impossible to view (or export) your collection.

Now the app feels more seamless than before; the splashy request location view gets replaced with the “add” button after location is permitted. Simple. Even though the app is completely private, I wanted to go above and beyond here.

## Bugs
Lastly it seems like a [SwiftUI bug](https://forums.developer.apple.com/forums/thread/748996) was introduced in iOS 17.3 or 17.4 having to do with using `@Environment` with `modelContainer`. If you created a pin on Apple Watch it would wake up the iPhone app in the background to sync with iCloud then crash silently in the background. I have a workaround to fix this but it’s not ideal.

## Wrapup

The theme here is that I’m glad I shipped this update but I feel like there’s a lot of room for improvement. I hope to chip away at this before WWDC hits early June. Time will tell.

If you find a use for the app or want to share feedback please [reach out](/contact)!

[^1]: Moments after hitting the “submit for review” button my wife and I left for the hospital to give birth to our first-born. I’ll be a dad soon! I’m told most partners do dumb and unrelated tasks right before going to the hospital. Some mow the yard or build a shed. I updated an app!
