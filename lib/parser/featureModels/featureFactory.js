'use strict';
/* eslint camelcase: 0 */

var scenarioOrBackgroundFactory = require('./scenarioOrBackgroundFactory');

function Feature(config) {
  this.token = 'feature';

  // Contains backgrounds and scenarios.
  this.scenarios = [];
  this.scenarios.getLatest = function() { return this[this.length - 1]; }

  this.keyword = config.keyword;
  this.name = config.name;
  this.description = config.description;
  this.line = config.line;
  this.tags = config.tags;
  this.comments = config.comments;
};

Feature.prototype.addScenarioOrBackground = function(config) {
  this.scenarios.push(scenarioOrBackgroundFactory(config));
};

Feature.prototype.addStep = function(config) {
  var currentScenario = this.scenarios.getLatest();
  currentScenario.addStep(config);
};

// Export the feature factory.
module.exports = function(config) {
  return new Feature(config);
}