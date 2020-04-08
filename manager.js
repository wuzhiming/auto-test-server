const ps = require('path');
const fs = require('fs-extra');
const WebSocket = require('ws');
const Agent = require('./agent');
const Constant = require('./const');

class AgentManager {
    constructor() {

        this.init();
    }

    init() {
        this.idx = 0;
        this.agents = {};
        this.server = new WebSocket.Server({port: Constant.PORT});
        this.server.on('connection', (ws) => {
            this.add(ws);
        });
    }

    add(ws) {
        let agent = new Agent(ws);
        this.agents[this.idx++] = agent;

        agent.on('disconnect', (agent) => {
            this.remove(agent);
        })
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