/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = {};
    IronWar.Object = require('core/object');
    IronWar.View = require('core/view');
    IronWar.Utils = require('core/utils');
    IronWar.Loader = require('core/loader');
    IronWar.AudioPlayer = require('core/audioplayer');

    IronWar.utils = new IronWar.Utils();
    IronWar.audioPlayer = new IronWar.AudioPlayer();

    return IronWar;
});
