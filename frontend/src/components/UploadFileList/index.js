import React, { Component } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Container, FileInfo, Preview } from './styles';
import { primaryColor } from '../../styles/global';
import FileIcon from 'react-feather/dist/icons/file';
import CheckCircleIcon from 'react-feather/dist/icons/check-circle';
import AlertIcon from 'react-feather/dist/icons/alert-circle';
import api from '../../services/api';

class UploadFileList extends Component {

  handleDelete = async id => {
    let newUploadedFiles = [];
    await api.delete(`file/${id}`);

    newUploadedFiles = this.props.files.filter(file => file.id !== id);

    if (this.props.onDelete) {
      this.props.onDelete(newUploadedFiles);
    }
  };

  render() {
    const { files } = this.props;

    return (
      <Container>
        {files.map((uploadedFile, idx) => (
          <li key={uploadedFile.id || idx}>
            <FileInfo>
              <Preview><FileIcon size={24} color={primaryColor} /></Preview>
              <div>
                <strong>{uploadedFile.name}</strong>
                <span>
                  {uploadedFile.readableSize}{" "}
                  {!!uploadedFile.id && (
                    <div onClick={() => this.handleDelete(uploadedFile.id)}>
                      Excluir
                    </div>
                  )}
                </span>
              </div>
            </FileInfo>

            <div>
              {!uploadedFile.uploaded &&
                !uploadedFile.error && (
                  <CircularProgressbar
                    styles={{
                      root: { width: 45 },
                      path: { stroke: primaryColor }
                    }}
                    strokeWidth={10}
                    value={uploadedFile.progress}
                    text={`${uploadedFile.progress}%`}
                  />
                )}

              {uploadedFile.uploaded && <CheckCircleIcon size={24} color="#78e5d5" />}
              {uploadedFile.error && <AlertIcon size={24} color="#e57878" />}
            </div>
          </li>
        ))}
      </Container>
    )
  }
}

export default UploadFileList;