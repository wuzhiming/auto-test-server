const ps = require('path');
const fs = require('fs-extra');
const WebSocket = require('ws');
const Agent = require('./agent');

class AgentManager {
    constructor() {
        this.init();
    }

    init() {
        this.idx = 0;
        this.agents = {};
        this.server = new WebSocket.Server({port: 9999});
        this.server.on('connection', (ws) => {
            this.add(ws);
        });
        this.server.on('close', (ws) => {
            this.remove(ws);
        })
    }

    add(ws) {
        this.agents[this.idx++] = new Agent(ws);
    }

    remove(ws) {
        for (let k in this.agents) {
            let agent = this.agents[k];
            if (this.agents[k] === ws) {
                agent.destroy();
                delete this.agents[k];
            }
        }
    }
}

module.exports = AgentManager;