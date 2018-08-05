import * as React from 'react';
import { Button } from 'antd';

export default class FileAction extends React.Component {
  render() {
    const {
      isDeleting = false,
      onDownload,
      onDelete,
      loading
    } = this.props;
    if (isDeleting) {
      return <Button icon="delete" shape="circle" onClick={onDelete} loading={loading} disabled={loading} />;
    }
    return <Button icon="download" shape="circle" onClick={onDownload} loading={loading} disabled={loading} />;
  }
}
