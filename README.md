Alino
=====

## What is Alino

Alino is a small app to help the home brewer keep better tabs on the daily brew process. This app partners with a small Arduino project to keep track of the brews temperature. I'm currently extending it to automate certain parts of the brew day as well as just keeping track of the temperature and timer.

#### So I need to get this working on my phone and put together an arduino project?

Yip, that's about it. I've only tested this so far on my setup at home (a Nexus 5), but getting the app on your phone via Cordova's pretty easy. I've recently removed the code from this repo that holds the Android/Cordova stuff explicitly, but I'll add that back in once I have a proper working version. It is in this repo in an older commit if you really want to find it.

The app works independently of the Arduino project so can be used without the real time temperature monitor. The app can still be used as a timer app without a working temperature panel.

### Plans

This is currently the v2 work in progress. What I want:
 - to be able to store common 'recipes' so that timers/ideal temps can be easily brought up on brew day without too much trouble.
 - the ability for the app to talk back to the Arduino via Bluetooth to do cool things like turn on a solenoid valve or turn an heating element on and off
 - play sounds when a timer is up or a temp is met
 - send an SMS when a timer is up or a temp is met
 - tweet the current progress
