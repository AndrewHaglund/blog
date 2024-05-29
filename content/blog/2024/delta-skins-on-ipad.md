---
title: The Trials and Tribulations of Creating Delta Skins on iPadOS
description: Frustrations with installing fonts, Figma, and doing complex work on iPadOS.
date: 2024-05-29
--- 

I decided to work on [Absorb](https://github.com/AndrewHaglund/delta-absorb), my [custom Gameboy skin](https://noah978.gitbook.io/delta-docs/skins) for the [Delta emulator](https://apps.apple.com/us/app/delta-game-emulator/id1048524688), from my shiny new 11-inch iPad Pro. There’s been a lot of conversation around what the iPad can and cannot do so I thought I’d give this a try. This is *fairly* complex work involving designing in Figma, editing JSON files, managing files, and committing code to GitHub. Let’s see how the experiment went.

## Figma
Designing in Figma on iPadOS is a bit of a cluster. Their marketing claims it works great in “any browser” but apparently that generous definition does not extend to Safari for iPad. If you use it directly in the browser you get weird behavior. For example, pinching with your fingers will zoom the canvas where pinching on a trackpad will zoom the entire web page. There is [Figurative](https://figurative.design/) but this has its own tradeoffs: if I left and came back it would force reload the file because it was “out of memory” and irritatingly ⌘c and ⌘v don’t work. Generally it felt like wearing mittens — the iPadOS cursor is great but it still feels like a small meaty pointer and not the precise pointer you find on macOS.

Critically dealing with custom fonts is a mess on iPadOS. [Fontcase](https://blog.iconfactory.com/2020/06/introducing-fontcase/) by the Iconfactory folks is great but it lives within Apple’s barbaric iPadOS font system. I used [SF Pro Rounded](https://developer.apple.com/fonts/) for my button labels and I completely bailed on trying to get this onto iPad. Apple provides these fonts in a macOS Installer within a `.dmg` file, which is to decidedly *not* iPadOS-friendly. How does Figma handle missing fonts? Well by making text uneditable. Fun.

Exporting PDFs out of Figma into the Files app worked great and I was able to get a lot of design work done from my iPad. It was slow-going and the font issue ultimately drove me back to the Mac.

I have an itch to try making a Figma plugin to make it super easy to create Delta skins. That’s for another day though.

## Editing JSON
Delta’s skin system is pretty straightforward. You provide PDFs of the UI your users will see and then give the coordinates of all the buttons in a JSON file. This mapping can get unwieldy though as each device and orientation is all within a single JSON file. (It would be kind of nice if each PDF had its own JSON to make these files way more manageable.)

On the Mac and other desktop platforms there’s VS Code for code editing and committing code to GitHub. It’s fantastic. It has a great [sticky scrolling](https://www.youtube.com/watch?v=iM4Vhrk4irY) feature which means you don’t lose your context. Even still it can be a pain doing all this text entry and all too often I’d forget a `,` or a `:` and everything would break!

VS Code is nowhere to be found on iPadOS and I could not find a text editor for iPad that had this sticky scrolling feature… but I ran into Simon Støvring’s [Jayson](https://jayson.app) (ha) app for editing JSON files with a GUI. This is far more approachable as you no longer need to think of the syntax for JSON and making a mistake. But it also involved a lot of navigating in-and-out due to the hierarchy of Delta’s skin system (where you have to drill into `dictionary 0` to see it’s the “A” button then back out to adjust its coordinates). Using this was better than typing manually, for sure, but I think there’s a lot of opportunity for Simon to optimize this app for fewer clicks and faster navigating up-and-down the hierarchy.

This app is also available on macOS but it’s a bare-minimum Catalyst version of the iPad app. (Sorry if I sound negative! I’m glad it exists on macOS but this was a rare case where the superior experience was definitely on iPad.)

This part of the process is a huge fun suck but that’s not the iPad’s fault.

## Managing Files
Technically a Delta skin is just a renamed ZIP file of a JSON file and some PDFs. I downloaded a [template](https://noah978.gitbook.io/delta-docs/skins) to get started, exported my designs as PDFs from Figma to the Files app, edited the JSON file in Jayson, and was able to select the files, compress, and change the extension from `.zip` to `.deltaSkin`. Pretty easy. I didn’t have any issues with the Files app other than some slow exports from Figurative.

## Committing Code to GitHub
I chose to host my files as an [open source project on GitHub](https://github.com/AndrewHaglund/delta-absorb). The big asterisk here is that my Figma files are not *yet* public. While I’ll host these themes on Gumroad and [DeltaStyles](https://deltastyles.com) for discoverability I thought it was in the spirt of Delta emulator itself being [open source](https://github.com/rileytestut/Delta) that my files are “out there” for anyone.

Doing all the file management of creating the skins (zipping, renaming, editing JSON, exporting PDFs) meant that I wanted a good git client. Turns out there is [Working Copy](https://workingcopyapp.com) by [Anders Borum](https://indieapps.space/@palmin@mastodon.social)! I happily paid $25. It stings a *little* knowing VS Code is free on macOS and it handles everything I need, but this Working Copy is a powerhouse. (I’ll be able to use this app for posting to my blog so it’s not just a one-time cost.)

After committing changes on my iPad I was able to iteratively test and debug my new GBA skin on my iPhone by sending it over AirDrop, make changes on iPad, send over, commit my work, and so on until I got everything working just right.

## Conclusion
While I had to fallback to the Mac for the design part — partly due to wanting a bigger screen and iPadOS font limitations — I was able to do most of this work from my iPad.

This is an exciting prospect as I tend to keep my MacBook Pro docked at my desk as a “desktop laptop.” This makes my iPad Pro with Magic Keyboard a perfect “around the house” machine. If I’m doing some online shopping I can leave the keyboard and just use this lovely big screen. If I want to get some serious work done or write a blog post from the back porch, I snap on the keyboard. If I want to plan some electrical upgrades and need to doodle a bit — I grab the Apple Pencil.

It’s kind of an amazing device and it echoes the [modular computing idea](https://www.macstories.net/stories/modular-computer/) Federico is always going on about. (Next up is getting it to work with my Gamesir G8 controller. Currently I’m using this [90-degree female-to-male USB-C cable](https://www.amazon.com/dp/B0BZBRG92Z?psc=1&ref=ppx_yo2ov_dt_b_product_details).)

I think my future experimentations might lie in building an app or something to automate the tedious JSON creation for Delta skins. Designing these is a lot of fun. Editing JSON is not.

In summary here are my main complaints with iPadOS for this workflow:

- Figma is not good on iPadOS. I’m not sure if this is a Safari problem or Figma but it’s kind of a huge let down that it doesn’t work well — even with a mouse and keyboard.
- Apple’s own SF fonts are impossible to install from an iPad.
- It would be remarkable if VS Code came to iPad. It’s an amazing IDE. I’m glad Working Copy exists but this would be a big game changer.

---
Lastly: If you’re playing retro games on your iPhone as much as I am, take a look at my custom skin, [Absorb](https://github.com/AndrewHaglund/delta-absorb), for Gameboy Color and Gameboy Advance. They’re great for nighttime playing! Just download the `.deltaSkin` files and go into Delta’s settings to install.