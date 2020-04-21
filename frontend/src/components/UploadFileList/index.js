import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Container, FileInfo, Preview } from './styles';
import { primaryColor } from '../../styles/global';
import FileIcon from 'react-feather/dist/icons/file';
import CheckCircleIcon from 'react-feather/dist/icons/check-circle';
import AlertIcon from 'react-feather/dist/icons/alert-circle';

const UploadFileList = ({ files, onDelete }) => (
  <Container>
    {files.map(uploadedFile => (
      <li key={uploadedFile.id}>
        <FileInfo>
          <Preview><FileIcon size={24} color={primaryColor} /></Preview>
          <div>
            <strong>{uploadedFile.name}</strong>
            <span>
              {uploadedFile.readableSize}{" "}
              {!!uploadedFile.url && (
                <button onClick={() => onDelete(uploadedFile.id)}>
                  Excluir
                </button>
              )}
            </span>
          </div>
        </FileInfo>

        <div>
          {!uploadedFile.uploaded &&
            !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#7159c1" }
                }}
                strokeWidth={10}
                percentage={uploadedFile.progress}
              />
            )}

          {uploadedFile.uploaded && <CheckCircleIcon size={24} color="#78e5d5" />}
          {uploadedFile.error && <AlertIcon size={24} color="#e57878" />}
        </div>
      </li>
    ))}
  </Container>
);

export default UploadFileList;