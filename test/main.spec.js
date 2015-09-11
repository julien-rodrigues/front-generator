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
  let render = TestUtils.renderIntoDocument(
    React.createElement(DataTable, data)
  );
  let ComponentNode = React.findDOMNode(render);
  return {render, ComponentNode};
};

describe('Data Table component', () => {

  let render;
  let ComponentNode;

  /**
   * Dummy data.
   */
  let initialTestMock = {
    className: 'test-class',
    selectable: true,
    zDepth: 2,
    emptyState: React.createElement('h1', {}, 'Nothing here'),
    onToggleAll: function(isChecked) {
      console.log(isChecked);
    },
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
  let componentData = initialTestMock;


  /**
   * Initialize jsdom and component before each test.
   */
  beforeEach(() => {
    global.document = jsdom.jsdom();
    global.window = global.document.parentWindow;
    ({render, ComponentNode} = renderComponent(componentData));
  });

  describe('#render()', () => {
    it('should be at the right depth.', () => {
      expect(ComponentNode.className).to.contain('mdl-shadow--2dp');
    });

    it('should have a thead and a tbody.', () => {
      expect(ComponentNode.firstChild.tagName).to.equal('THEAD');
      expect(ComponentNode.lastChild.tagName).to.equal('TBODY');
    });

    it('should have header columns, each with a unique key (its index in the array of data).', () => {
      let Component = TestUtils.findRenderedDOMComponentWithTag(render, 'table');
      expect(Component.props.children[0].props.children.props.children[1][0].key).to.equal('0');
      expect(Component.props.children[0].props.children.props.children[1][1].key).to.equal('1');
      expect(Component.props.children[0].props.children.props.children[1][2].key).to.equal('2');
    });

    it('should have a total of 4 body rows, each with a unique key (its index in the array of data).', () => {
      let Component = TestUtils.findRenderedDOMComponentWithTag(render, 'table');
      expect(ComponentNode.querySelector('tbody').children.length).to.equal(4);
      expect(Component.props.children[1].props.children[0].key).to.equal('0');
      expect(Component.props.children[1].props.children[1].key).to.equal('1');
      expect(Component.props.children[1].props.children[2].key).to.equal('2');
    });

    it('should have body rows containing columns, each with a unique key (its index in the array of data).', () => {
      let Component = TestUtils.findRenderedDOMComponentWithTag(render, 'table');
      expect(Component.props.children[0].props.children.props.children[1][0].key).to.equal('0');
      expect(Component.props.children[0].props.children.props.children[1][1].key).to.equal('1');
      expect(Component.props.children[0].props.children.props.children[1][2].key).to.equal('2');
    });

    it('should pass the props down.', () => {
      expect(ComponentNode.className).to.contain(componentData.className);
    });

    /**
     * If column contains numeric values.
     */
    it('should have a non-numeric class on its column(s), if nonNumeric is true.', () => {
      expect(ComponentNode.querySelector('thead > tr > th:nth-child(2)').className)
        .to.contain('mdl-data-table__cell--non-numeric');
    });

    /**
     * If column doesn't contain numeric values.
     */
    it('should not have a non-numeric class on its column(s), if nonNumeric is false or undefined.', () => {
      componentData.columns[0].nonNumeric = false;
      ({render, ComponentNode} = renderComponent(componentData));
      expect(ComponentNode.querySelector('thead > tr > th:nth-child(2)').className)
        .to.not.contain('mdl-data-table__cell--non-numeric');

      componentData.columns[0] = {
        label: 'Material'
      };
      ({render, ComponentNode} = renderComponent(componentData));
      expect(ComponentNode.querySelector('thead > tr > th:nth-child(2)').className)
        .to.not.contain('mdl-data-table__cell--non-numeric');
    });

    /**
     * If selectable.
     */
    it('should contain a selectable class, if selectable is true.', () => {
      expect(ComponentNode.className).to.contain('mdl-data-table--selectable');
    });

    it('should render 4 header and body columns, if selectable is true.', () => {
      expect(ComponentNode.querySelector('thead > tr').children.length).to.equal(4);
      expect(ComponentNode.querySelector('tbody > tr').children.length).to.equal(4);
    });

    /**
     * If not selectable.
     */
    it('should not contain a selectable class, if selectable is false.', () => {
      componentData.selectable = false;
      ({render, ComponentNode} = renderComponent(componentData));
      expect(ComponentNode.className).to.not.contain('mdl-data-table--selectable');
    });

    it('should render 3 header and body columns, if selectable is false.', () => {
      expect(ComponentNode.querySelector('thead > tr').children.length).to.equal(3);
      expect(ComponentNode.querySelector('tbody > tr').children.length).to.equal(3);
    });

    /**
     * If there are no data.
     */
    it('should display 1 row containing the empty state, if there are no data.', () => {
      componentData.data = [];
      ({render, ComponentNode} = renderComponent(componentData));
      expect(ComponentNode.querySelector('tbody > tr > td:first-child').className).to.contain('mdl-data-table--empty');
    });

    it('should set the colspan of the empty state so it takes the entire row.', () => {
      expect(ComponentNode.querySelector('tbody > tr > td:first-child').getAttribute('colspan')).to.equal('3');

      componentData.selectable = true;
      ({render, ComponentNode} = renderComponent(componentData));
      expect(ComponentNode.querySelector('tbody > tr > td:first-child').getAttribute('colspan')).to.equal('4');
    });
  });

  describe('#onToggleAll()', () => {
    it('should add every table row to the list of selected rows.', () => {
      componentData = initialTestMock;
      ({render, ComponentNode} = renderComponent(componentData));

      TestUtils.Simulate.change(ComponentNode.querySelector('thead > tr > th:first-child input'), {
        target: {
          checked: true
        }
      });

      console.log(ComponentNode.querySelectorAll('tbody  tr'));
      ComponentNode.querySelectorAll('tbody > tr').children.map(function(e) {
        console.log(e);
      });
    });
  })
});
