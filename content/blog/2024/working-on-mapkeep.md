---
title: Working on MapKeep
description: A short update on some recent work with my app MapKeep.
date: 2024-07-09
---

I took advantage of the long Fourth of July weekend to work on [MapKeep](/mapkeep/). Don't worry: I was able to enjoy the beautiful weather from our back porch. I shipped [version 1.2](/blog/2024/mapkeep-1-2/) _right_ before our daughter was born but since then we haven't had the ~~time~~ brain power to do side projects. I’m testing an all-new design inspired by Apple’s [Find My](https://www.apple.com/icloud/find-my/) which should unlock some new interactions (and expand to iPadOS/macOS).

~~Sadly~~ I’ve taken this as an opportunity to completely rewrite the app. I’ve learned _a lot_ since last summer. For example, I couldn’t figure how to get SwiftUI Previews working in my main view because it needed a fake array of SwiftData objects. Well I took the time to [figure that out](https://www.hackingwithswift.com/quick-start/swiftdata/how-to-use-swiftdata-in-swiftui-previews) (thanks to Paul Hudson) and now I can iterate way faster. There’s a **ton** of optimizations like this that add up.

I’m not sure this new design is a slam dunk: I'm trying to get a feel for it by using it daily. Even if I revert to the old design the code will be in a _much_ better place.

Tinkering with a new design is a fun distraction :-) but I probably should be thinking about iOS 18 features like [Dark Mode app icons](https://developer.apple.com/design/human-interface-guidelines/app-icons#Platform-considerations) and App Intents[^1] ahead of [Apple Intelligence](https://developer.apple.com/documentation/AppIntents/Integrating-your-app-with-siri-and-apple-intelligence).

As a newbie app developer I hit a **lot** of brick walls. It can be truly frustrating. But when I figure it out, it feels like flying.


[^1]: We use [Mango Baby](https://mangobaby.app/) which has _extensive_ App Intent support. Between widgets, live activities, and Siri integration. This app has it all and inspires me to deeply integrate MapKeep with iOS.