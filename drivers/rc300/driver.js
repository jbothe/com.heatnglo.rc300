'use strict';

const Homey = require('homey');

class Rc300Driver extends Homey.Driver {
    onPairListDevices(data, callback) {
        callback(null, [
            {
                name: 'Heat N Glo RC300',
                data: {
                    id: 'rc300'
                }
            }
        ]);
    }
}

module.exports = Rc300Driver;
