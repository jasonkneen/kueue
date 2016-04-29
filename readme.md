# kueue

## Why?

I was working on an app that needed to be able to do some background tasks; uploading images to a server. I wanted a background uploader but wanted to make it generic so it could carry out any function and handle next, retry and cancellation of tasks.

## Quick Start
* [Download the latest version](https://github.com/jasonkneen/kueue/kueue.js).
* Place in your lib folder

Wherever you want to initialise it, put this:-

```javascript
var kueue = require("kueue");
var queue = new kueue();

(if you're using Titanium for example, you could assign it to Alloy.Globals.queue)

// simulates a REST call with timeout -- say uploading an image
queue.add("myFirstTask", function(status, next, retry, cancel) {
    setTimeout(function() {
        next();
    }, 3000);
});

queue.add("mySecondTask", function(status, next, retry, cancel) {
    setTimeout(function() {
        next();
    }, 3000);
});

queue.start();
```
When adding tasks, you wrap your task in a function that can receive four parameters; status, next, retry, cancel.

Once your task finishes, you can call next() to start the next task -- if your task fails, you can call retry() to have it go back in the queue to try again. If you call cancel() your task is removed. The "status" property is an object that gives you the id of the task, plus an "attempts" property that will show you how many times the task was called. This is useful if you want to keep track and then cancel() a task if it's failed too many times

You can stop the queue by issuing a .stop() command and clear it with .clear().

## License

<pre>
Copyright 2016 Jason Kneen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>
