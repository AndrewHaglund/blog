---
title: Regretting SwiftData
description: Thoughts on being an early adopter for SwiftData.
date: 2024-09-03
---

While the majority of complaints in [Michael Tsai’s post](https://mjtsai.com/blog/2024/07/26/swiftdata-and-core-data-at-wwdc24/) go way over my head, I kinda regret adopting SwiftData in [MapKeep](/mapkeep). I felt adopting the latest technology was best for the longterm health of the app and I’d kick myself in 5 years when I feel burdened by a “legacy” technology like CoreData.

There have been upsides:
- I enjoy that the data model is **expressed in Swift** (as opposed to the strange PLIST-esque CoreData thing).
- It gave me **iCloud Sync** with almost no work.

Here’s my pain points:

- Adding **dynamic filtering** to [MapKeep in 1.3](/blog/2024/mapkeep-1-3) was a huge pain and added a *lot* of complexity. Without [Apple’s DataCache](https://developer.apple.com/documentation/swiftdata/maintaining-a-local-copy-of-server-data) sample project, there is *zero* chance I would have figured this out. iOS 18 appears to improve predicates, but I’ve yet to jump on the latest here to see if it would have made things smoother.
- **iCloud Sharing** is not supported. I was disappointed to learn this last summer but I figured: hey SwiftData is brand-new, I’m sure they’ll get to it next year. Well here we are a year later and they **did not** add iCloud Sharing in iOS 18. Now we wait for WWDC 2025?

***

By contrast, going all-in with SwiftUI last year worked out great. There were a few headaches and a couple things that were *impossible* to customize, but altogether I feel like it’s a mature UI system (at least on iOS and watchOS).

I’m sitting here feeling I might have been better off sticking with tried-and-true CoreData and *eventually* migrating to SwiftData when it felt more fully-baked.