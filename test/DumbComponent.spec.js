'use strict';

/**
 * import "jsdom": "^3.1.2"
 */
import React from 'react/addons';
import Chart from '../../src/section/line-chart/Chart';
import {expect} from 'chai';
import DumbComponent from '../../src/section/DumbComponent';
import packageJSON from 'package.json';
import jsdom from 'jsdom';
let {TestUtils} = React.addons;


/**
 * Renders element in a shadow dom.
 * @method shallowrenderer
 * @param element {JSXElement} - The element to render.
 * @returns {object} - The React element.
 */
let shallowrenderer = (element) => {
  let shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(element);
  return shallowRenderer.getRenderOutput();
};

describe('Line Chart component', () => {


  /**
   * Initialize jsdom.
   */
  global.document = jsdom.jsdom();
  global.window = document.parentWindow;


  /**
   * Render components in jsdom.
   */
  let render = TestUtils.renderIntoDocument(React.createElement(DumbComponent, {
    corp: 'YOLILOL CORPORATION'
  }));

  let Component = TestUtils.findRenderedDOMComponentWithTag(render, 'div');


  /**
   * Test of the h1 element.
   */
  it('should contains an h1 tag as first children', () => {
    expect(Component.props.children[0].type).to.equal('h1');
    expect(Component.props.children[0].props.children).to.equal('Welcome to React');
  });


  /**
   * Test of the version element.
   */
  it('should have a version number that matches the package.json version property', () => {
    let version = packageJSON.version;
    let versionElement = shallowrenderer(<span>version {version}</span>);

    expect(Component.props.children[1].type).to.equal(versionElement.type);
    expect(Component.props.children[1].props.children).to.include.members(versionElement.props.children);
  });


  /**
   * Test of the powered by element.
   */
  it('should have a powered by that matches the passed prop', () => {
    let poweredElement = shallowrenderer(<p>Powered by: <span>YOLILOL CORPORATION</span></p>);
    let generatedElement = Component.props.children[2];

    expect(generatedElement.type).to.equal(poweredElement.type);
    expect(generatedElement.props.children[0]).to.equal(poweredElement.props.children[0]);
    expect(generatedElement.props.children[1].props.children).to.equal(poweredElement.props.children[1].props.children);
  });

});
