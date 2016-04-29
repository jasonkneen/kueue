module.exports = function() {
    var onSuccess,
           running;

    // holds the queue
    var queue = [];

    // log the current status
    function status() {
        console.log("Queue has " + queue.length + " items");
    }

    // event handler for status updates
    this.onSuccess = function(handler) {
        onSuccess = handler;
    };

    // add an item to the queue
    this.add = function(id, action) {

        // add the item to the queue
        queue.push({
            id: id,
            attempts: 0,
            action: action
        });

        status();
    };

    // get the queue status
    this.status = function() {
        return {
            length: queue.length
        };
    };

    // clear the queue
    this.clear = function() {
        queue = [];
    };

    // start the queue
    this.start = function() {
        console.log("Starting queue");

        // set us to running
        running = true;

        function run() {

            // only process if we're running
            if (running) {
                queue[0] && queue[0].action({
                    id: queue[0].id,
                    attempts: queue[0].attempts
                }, function next() {
                    onSuccess({
                        id: queue[0].id,
                        length: queue.length - 1
                    });
                    queue.shift();
                    status();
                    if (running === true) {
                        run();
                    }

                }, function retry() {
                    console.log("queue item failed -- retrying");
                    queue.push(queue[0]);
                    queue[0].attempts++;
                    queue.shift();
                    status();
                    if (running === true) {
                        run();
                    }

                }, function cancel() {
                    console.log("cancelling queue item");
                    queue.shift();
                    status();
                    if (running === true) {
                        run();
                    }
                })
            }

        }
        run();
    };

    // stop the queue
    this.stop = function() {
        console.log("Stopping queue");
        running = false;
    };

    return this;
};
