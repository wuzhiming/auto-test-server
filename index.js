const ps = require('path');
const fs = require('fs-extra');
const childProcess = require('child_process');
const AgentManager = require('./manager');

let AgentInstant = new AgentManager();
