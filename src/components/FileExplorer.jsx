// @flow
import React, {Component} from 'react';
import 'react-ui-tree/dist/react-ui-tree.css';
import Tree from 'react-ui-tree';

const tree = {
  children: [
    {
      module: 'node.js',
      leaf: true
    },
    {
      module: 'react-ui-tree.css',
      leaf: true
    },
    {
      module: 'react-ui-tree.js',
      leaf: true
    },
    {
      module: 'tree.js',
      leaf: true
    }
  ]
};

export default class FileExplorer extends Component<{}> {
  renderNode = (node: *) => {
    return (
      <span className='node'>
        {node.module}
      </span>
    );
  };

  render() {
    return (
      <Tree
        paddingLeft={20}
        tree={tree}
        renderNode={this.renderNode}
      />
    );
  }
}
