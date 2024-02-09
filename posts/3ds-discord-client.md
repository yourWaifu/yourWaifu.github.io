---
layout: article
title: Making a Discord Bot for Nintendo 3DS
description:
author: Hao Qi Wu
date: 2022-02-28T22:30:00
---

I’ve been getting messages asking me how to make a Discord Client on the 3DS. For people that want a quick answer, WebSockets, encryption using TLS, and a cache system. If that didn’t make sense, then I’ll go over it in this article.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/KQpN8wKLNRo?si=8l07DhqR0cMZx9DW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullscreen></iframe>
Video version of this article

![This client is for the discord api for bots, not users](/images/3ds-discord-client/1_mLzPodZjkdFK14g-8Q6Egw.webp)

But first, I need to say that doing this with a user account is against the TOS. I generally only use this client with a bot account.

![graph of protocols used for the Discord API](/images/3ds-discord-client/1_KygMj_4KUGSf5xth1HnpCA.webp)

Before we can get started, we need to understand the Discord API and it’s protocols. The main protocols being WebSocket, HTTPS, and JSON. These protocols also use other protocols, such as TLS for encryption and TCP for sending data over the internet.

<video controls loop width="100%"><source src="/images/3ds-discord-client/SkinnyKeyInexpectatumpleco-mobile.mp4" type="video/mp4" /></video>

WebSocket is very useful for sending and receiving information in real time.

<video controls loop width="100%"><source src="/images/3ds-discord-client/UnselfishWindyElectriceel-mobile.mp4" type="video/mp4" /></video>

HTTP, on the other hand, is the main protocol for the web. The web browser, or the client, would send out a request to the web server and then the web server would send back the data or the web page.

<video controls loop width="100%"><source src="/images/3ds-discord-client/PowerlessThatAvocet-mobile.mp4" type="video/mp4" /></video>

However, with HTTP, the client has to send a request to the server to ask if there’s any new messages,

<video controls loop width="100%"><source src="/images/3ds-discord-client/ValidSolidAcouchi-mobile.mp4" type="video/mp4" /></video>

but with WebSocket, a web server can send new messages without the client asking for any new messages.

My Discord client wasn’t the first client on the 3DS, but I believe it was the first to use WebSocket. [Other clients](https://github.com/cheuble/3DiScord) simply [spammed Discord’s API with many HTTP requests](https://github.com/cheuble/3DiScord/blob/master/source/Discord.cpp), which is mush simpler on the client side but very inefficient on Discord’s end. Plus, they were typically used with a user account. With all that combined, it’s no wonder people got banned for using them. [Some people thought I said that my client doesn’t get people banned, but I never said this](https://www.reddit.com/r/3dshacks/comments/77095v/comment/doi4o67/).

<video controls loop width="100%"><source src="/images/3ds-discord-client/RemoteImaginaryChafer-mobile.mp4" type="video/mp4" /></video>

The main difference between other clients and mine is that my client only sent a request when sending a message and getting the message history from the past.

Unless, you are very familiar with these APIs, I recommend using a Discord library. I used my Discord library, Sleepy Discord, to achieve this. My library was made to be modular, so I used this as a test to see if modules can add support for strange platforms. We’ll need a module for the 2 protocols that work differently on the 3DS platforms. Those being the ones that rely on the internet protocol or sockets, so WebSockets, and HTTPS. At first, I used the HTTP library that was part of the Homebrew SDK, but Discord would reject it a lot. I made my own, as libcurl wasn’t available through the Homebrew SDK. It’s available now, but not when I created this app. Wslay is a WebSocket library that uses callbacks, this is where you give it functions for wslay to use to access things like TLS and HTTPS. We write the needed functions for wslay which use the Homebrew SDK’s TLS library, and my custom HTTPS library. The HTTPS library is where the TLS connection is first created, however unlike most HTTPS requests, which end after getting a response, we keep it open and must poll it and wslay. This should let us connect to Discord’s WebSockets server and the Discord Gateway.

![Discord Websockets Server tells client to do a task in 1 minute. Using a Timer, the client does that task 1 minute later](/images/3ds-discord-client/1_XFi7jfkp28Zys9CZnSz3DQ.webp)

Now, we need to keep the connection open. There are a number of tasks that need to be done to do this, the library will handle most of them without help but some (reconnects, connection health check, etc.) require a timer running in the background. So you’ll need to implement a timer system that does the task at the time given.

![while 3DS SDK's main loop runs, our code runs. Our code contains polling the WebSockets connection and the timer system](/images/3ds-discord-client/1_aErgLCm9YYazzIgHBUGd8Q.webp)

I chose to use a “temporary” solution. A list of task to do and when to do them is stored. When as task needs to be done, we add them to the list. 3DS programs have, what the Homebrew SDK calls, the main loop, where code runs over and over again until the user press close on the system UI. In there we check if it’s time to do a task and then do that task.

<video controls loop width="100%"><source src="/images/3ds-discord-client/SlipperyShorttermKrill-mobile.mp4" type="video/mp4" /></video>

After that, you’ll need the client to listen for Discord events. This is where you’ll get your data, and a lot of data.

<video controls loop width="100%"><source src="/images/3ds-discord-client/MagnificentFocusedAmazonparrot-mobile.mp4" type="video/mp4" /></video>

Most of the data, you don’t need right away, but Discord often isn’t going to give you the same data more than once. So, you’ll need to store it somewhere. As a “temporary” solution, I used the memory. At first, I used hash maps because accessing data from one is quick, even for lots of data. However, it would quickly run out of ram, so I used linked lists, which is slower when accessing data when dealing with lots of data, but it used less memory. Again, “temporary solution”.

![The client only really has 64 MB of ram to work with](/images/3ds-discord-client/1_020H5PmaI6ft9EGq3RB5MA.webp)

The 3DS had 128 MB of ram and Homebrew apps mostly had access to 64mb of it, or 80mb with tricks, so I also did some optimizations on everything above, but it’ll always run out of memory at some point. It’ll happen faster if you are on more servers, big servers, very active, or worse, all the above. A more permanent solution would be some cache system that stored this data off the memory if it’s not needed just yet. The 3DS Homebrew can store data on the user’s SD card, and in the background, it could stream in the data into memory when it’s needed.

![Async & Multi-threading](/images/3ds-discord-client/1_PtglB4x_j4sqRxWROSGBrw.webp)

I really wish I added async and multi-threading, as that would have really helped with the streaming in of data from the SD card and dealing with the many background tasks. However, a big issue I found was that threads on the 3DS work differently than threads that I normally work with. Meaning that I can’t just reuse my normal multi-threading code.

<video controls loop width="100%"><source src="/images/3ds-discord-client/UnfoldedConcernedIcelandichorse-mobile.mp4" type="video/mp4" /></video>

From what I understand, on the 3DS, you have to yield and let the 3DS switch threads. This is called cooperative scheduling.

<video controls loop width="100%"><source src="/images/3ds-discord-client/ReasonableFondImperatorangel-mobile.mp4" type="video/mp4" /></video>

On most OS and modern CPUs, they will every so often interrupt the process to make the decision to switch or not. And this is known as preemptive scheduling.

Why cooperative scheduling? I believe it’s because it saves time that can be used doing the task instead of interrupting said task.

<video controls loop width="100%"><source src="/images/3ds-discord-client/JovialHeavyCutworm-mobile.mp4" type="video/mp4" /></video>

But the downside is that a task could fail to yield and cause a deadlock unless it’s killed.

![2 CPUs, Left one has 2 cores, Right one has 4 cores. Right one is in the spotlight](/images/3ds-discord-client/1_38Mo8FssZLns1OUPTM72Tw.webp)

The 3DS has 2 cores, 4 on the new 3DS, but one of them is used up by the system,

![Left CPU one is in the spotlight](/images/3ds-discord-client/1_-XyceDKW-Szhro_-6biX4Q.webp)

so on the original 3DS, you only really have one thread running at a time.

Looking back, I’m really glad I took the chance to do this, as it taught me a lot about developing software for very limited hardware. I had to stop, as I already proved the point that I wanted to make. Which was getting my Discord library working on something strange. Going further than that would have required more work than it’s worth. Especially considering the fact that, if you just wanted to run a Discord Bot, there are other better options out there like the Raspberry Pi.

---

Assets used: [3D Model Library — Package_QFP](https://kicad.github.io/packages3d/Package_QFP), [Poly Haven](https://polyhaven.com/), [Font Awesome](https://fontawesome.com/), [ambientCG](https://ambientcg.com/), [New Nintendo 3DS 3D Model](https://sketchfab.com/3d-models/new-nintendo-3ds-1e820d14445d45edbda0434dff8fe037)