Alino
=====

## What is Alino

Alino is a small app to help the home brewer keep better tabs on the daily brew process. This app partners with a small Arduino project to keep track of the brews temperature. 

#### So I need to get this working on my phone and put together an arduino project?

Yip, that's about it. I've only tested this so far on my setup at home (a Nexus 5), but getting the app on your phone via Cordova's pretty easy. And the Arduino project isn't complicated, even for someone who has never used it.

The app works independently of the Arduino project so can be used without the real time temperature monitor. The app can still be used as a timer app without a working temperature panel.

# What do I need to run this?

There are two components to Alino. The first is the Cordova app that runs on an Android phones (Android only at the moment) and the second is the sketch that needs to be uploaded to an Arduino.

## Running the Cordova app

There's a grunt task called `deploy` that I've put inside the `gruntfile`. This takes care of both building and running the Cordova app on any device that is plugged into your computer in debugging mode. At the moment I am commit build products for the Cordova app. If this changes these docs will be updated to let you know how to install the required Cordova plusing etc.

Assuming you have cloned this repo, you simply need to navigate into the root directory and:

 * Running `npm install`
 * Running `grunt deploy`

## Putting together the Arduino project

Put together the schematic outlined below:

![](https://raw.githubusercontent.com/jamesmacfie/Alino/master/Arduino/sketch.png)

Now open up the sketch in the `arduino` folder. Upload this to your Arduino device as you normally would (for me this is usually via USB).

When you've uploaded the sketch and the Arduino is working as it should (blinking lights and what not), go to the 'Settings' menu on your Cordova app. From there you can select the Bluetooth device from the appropriate dropdown. Once selected (it's often listed as HC-06), the app will start listening to the Arduino and respond to any temperature updates.







