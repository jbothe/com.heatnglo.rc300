'use strict';

const Homey = require('homey');

const RC300_OFF = [2, 2, 3, 2, 2, 2, 3, 1, 3, 2, 3, 2, 2, 3, 3, 0, 2, 3, 3, 2, 2, 3, 3, 0, 2, 2, 2, 2, 2, 3, 2, 1, 3, 3, 2, 3, 3, 3, 2, 0, 2, 2, 3, 2, 2, 2, 3];
const RC300_ON = [2, 2, 3, 2, 2, 2, 3, 1, 3, 2, 3, 2, 2, 3, 3, 0, 2, 3, 3, 2, 2, 3, 3, 0, 2, 2, 2, 2, 2, 2, 3, 1, 3, 3, 2, 3, 3, 2, 3, 0, 2, 2, 3, 2, 2, 3, 2];

class Rc300Device extends Homey.Device {
    // This method is called when the Device is initiated
    onInit() {
        this.rc300Signal = new Homey.Signal433('rc300');
        this.rc300Signal.register().catch(this.error);

        // Register the callback to hadle state changes
        this.registerCapabilityListener('onoff', this.onCapabilityOnOff.bind(this));
        //this.registerCapabilityListener('fan_speed', this.onCapabilityFanSpeed.bind(this));
    }

    onCapabilityOnOff(value, opts, callback) {
        if (this.rc300Signal !== undefined) {
            if (value) {
                this.rc300Signal.tx(RC300_ON);
            }
            else {
                this.rc300Signal.tx(RC300_OFF);
            }
        }
        else {
            return Promise.reject(new Error('Signal not ready.'));
        }

        callback(null);
    }

    onCapabilityFanSpeed(value, opts, callback) {
        callback(null);
    }
}

module.exports = Rc300Device;
