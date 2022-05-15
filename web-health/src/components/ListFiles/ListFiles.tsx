import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { FiTrash } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

import PreviewImage from 'components/PreviewImage'
import {
  ContainerImage,
  ContainerListFiles,
  ContainerListFilesEmpty,
  ContainerTitleImage,
  ItemListFile,
  MessageListEmpty,
  NameFile,
} from './styles'

type IListFiles = {
  files: any[]
  removeFiles: (fileRemoved: number) => void
}

const ListFiles = (props: IListFiles) => {
  const { files, removeFiles } = props

  const { t } = useTranslation()

  return (
    <>
      {files && [...files].length > 0 ? (
        <ContainerListFiles className="my-3">
          {files &&
            [...files].map((file, indexFile) => (
              <Card key={file.name} className="my-1">
                <Card.Body>
                  <ItemListFile className="py-2" key={file.name}>
                    <ContainerImage>
                      <PreviewImage
                        height={50}
                        width={50}
                        roundedCircle
                        file={file}
                      />
                    </ContainerImage>
                    <ContainerTitleImage>
                      <NameFile>{file.name}</NameFile>
                    </ContainerTitleImage>
                    <Button
                      variant="light"
                      onClick={() => removeFiles(indexFile)}
                    >
                      <FiTrash size={24} />
                    </Button>
                  </ItemListFile>
                </Card.Body>
              </Card>
            ))}
        </ContainerListFiles>
      ) : (
        <Card className="mb-1 mt-3">
          <Card.Body>
            <ContainerListFilesEmpty>
              <MessageListEmpty>{t('list_files_empty')}</MessageListEmpty>
            </ContainerListFilesEmpty>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default ListFiles
