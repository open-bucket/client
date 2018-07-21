import * as React from 'react';
import { Button } from 'antd';

export default class FileAction extends React.Component {
  render() {
    const {
      mode = 'Normal',
      onDownload,
      onDelete,
      loading
    } = this.props;
    switch (mode) {
      case 'Normal':
        return <Button icon="download" shape="circle" onClick={onDownload} loading={loading} disabled={loading} />;
      case 'Delete':
        return <Button icon="upload" shape="circle" onClick={onDelete} loading={loading} disabled={loading} />;
      default:
        return null;
    }
  }
}
