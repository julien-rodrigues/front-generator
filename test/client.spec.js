'use strict';

/**
 * import "jsdom": "^3.1.2"
 */
import jsdom from 'jsdom';
import React from 'react/addons';
import {expect} from 'chai';
import {DataTable} from '../../src';
let {TestUtils} = React.addons;

let renderComponent = (data) => {
  let render = TestUtils.renderIntoDocument(React.createElement(DataTable, data));
  let Component = TestUtils.findRenderedDOMComponentWithTag(render, 'table');
  return {render, Component};
};

describe('Data Table component', () => {

  let render;
  let Component;

  /**
   * Dummy data.
   */
  let testData = {
    className: 'test-class',
    selectable: true,
    zDepth: 2,
    emptyState: 'Nothing here',
    data: [
      ['Cucumber', 25, '$2.90'],
      ['Banana', 67, '$60'],
      ['Rice', 2, '$8'],
      ['Pineapple', 34, '$.99']
    ],
    columns: [
      {
        label: 'Material',
        nonNumeric: true
      },
      {
        label: 'Quantity'
      },
      {
        label: 'Unit price'
      }
    ]
  };


  /**
   * Initialize jsdom and component before each test.
   */
  beforeEach(() => {
    global.document = jsdom.jsdom();
    global.window = global.document.parentWindow;
    ({render, Component} = renderComponent(testData));
  });

  describe('#render()', () => {
    it('should pass the props down.', () => {
      expect(Component.props.className).to.contain(testData.className);
    });

    it('should be at the right depth.', () => {
      expect(Component.props.className).to.contain('mdl-shadow--' + testData.zDepth + 'dp');
    });

    it('should contain a selectable class, if selectable is true.', () => {
      expect(Component.props.className).to.contain('mdl-data-table--selectable');
    });

    it('should not contain a selectable class, if selectable is false.', () => {
      testData.selectable = false;
      render = TestUtils.renderIntoDocument(React.createElement(DataTable, testData));
      Component = TestUtils.findRenderedDOMComponentWithTag(render, 'table');
      expect(Component.props.className).to.not.contain('mdl-data-table--selectable');
    });
  });
});