// public styles
import '@viivue/atomic-css';
import 'honcau';

// private style
import {EasyTabAccordion} from "@/_index";
import './style.scss';
import 'github-markdown-css/github-markdown-light.css'
import {highlightCodeSyntax} from "@phucbm/gfm";
import mdBegin from "./md/begin.md";
import {testLayout} from "./js/test-layout";
import {testInit} from "./js/test-init";
import {testOptions} from "./js/test-options";
import {testMethods} from "./js/test-methods";
import {testEnd} from "./js/test-end";

// import package info
const packageInfo = require('../package.json');

/**
 * Update HTML
 */
// update title
const title = `${packageInfo.prettyName} v${packageInfo.version}`;
document.title = `${title} - ${packageInfo.description}`;
document.querySelector('[data-title]').innerHTML = title;
document.querySelector('[data-description]').innerHTML = packageInfo.description;

// add HTML
const root = document.querySelector('#content');
root.insertAdjacentHTML('beforeend', mdBegin);

testInit(root);
testOptions(root);
testMethods(root);
testEnd(root);

// code highlight
highlightCodeSyntax().then();