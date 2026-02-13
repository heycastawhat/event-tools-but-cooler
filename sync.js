const _syncListeners = [];
let _syncConnected = false;
let _evtSource = null;

function sendCommand(type, data) {
    const payload = { type: type, data: data || {} };
    fetch('/api/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).catch(function () {});
}

function onCommand(callback) {
    _syncListeners.push(callback);
    if (!_evtSource) {
        _startListening();
    }
}

function _startListening() {
    _evtSource = new EventSource('/api/events');
    _evtSource.onmessage = function (e) {
        try {
            var msg = JSON.parse(e.data);
            if (msg.type === 'connected') {
                _syncConnected = true;
                return;
            }
            for (var i = 0; i < _syncListeners.length; i++) {
                _syncListeners[i](msg.type, msg.data);
            }
        } catch (err) {}
    };
    _evtSource.onerror = function () {
        _syncConnected = false;
        _evtSource.close();
        _evtSource = null;
        setTimeout(_startListening, 2000);
    };
}
